<template>
  <canvas ref="canvasRef" class="global-background" :class="{ 'is-ready': isReady }"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { debounce } from '../../utils/debounce';

const canvasRef = ref(null);
const isReady = ref(false);

let ctx, animationFrame, nodes = [];
let scrollFactor = 0;
let lastWidth = 0;
let lastHeight = 0;
let dpr = 1;
let lastFrameTime = 0;
let paused = false;

const profile = {
  isMobile: false,       
  isCoarsePointer: false, 
  targetFPS: 60,
};

const updateProfile = () => {
  profile.isMobile = window.innerWidth <= 768;
  profile.isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  profile.targetFPS = profile.isMobile ? 30 : 60; 
};

const mouse = { x: -9999, y: -9999, active: false };
const MOUSE_RADIUS = 170;

const PALETTE = {
  light: { c1: [37, 99, 235], c2: [13, 150, 104] },
  dark: { c1: [225, 29, 72], c2: [242, 85, 79] }
};

let currentC1 = [...PALETTE.light.c1];
let currentC2 = [...PALETTE.light.c2];
let targetC1 = [...PALETTE.light.c1];
let targetC2 = [...PALETTE.light.c2];

const lerp = (a, b, t) => a + (b - a) * t;
const lerpColor = (from, to, t) => [
  lerp(from[0], to[0], t), lerp(from[1], to[1], t), lerp(from[2], to[2], t)
];

const applyDarkModeTarget = () => {
  const p = document.documentElement.classList.contains('dark') ? PALETTE.dark : PALETTE.light;
  targetC1 = p.c1;
  targetC2 = p.c2;
};

let darkModeObserver;

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let glowSprite = null;

const buildGlowSprite = () => {
  const size = 64;
  const off = document.createElement('canvas');
  off.width = size;
  off.height = size;
  const octx = off.getContext('2d');
  const gradient = octx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  gradient.addColorStop(0, 'rgba(255,255,255,0.95)');
  gradient.addColorStop(0.3, 'rgba(255,255,255,0.28)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  octx.fillStyle = gradient;
  octx.fillRect(0, 0, size, size);
  glowSprite = off;
};

// --- Partículas -------------------------------------------------------------
const createNodes = (w, h) => {
  const density = profile.isMobile ? 42000 : 28000;
  const cap = profile.isMobile ? 32 : 70;
  const floor = profile.isMobile ? 16 : 28;
  const count = Math.max(floor, Math.min(cap, Math.floor((w * h) / density)));

  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    r: 1 + Math.random() * 1.8,
    phase: Math.random() * Math.PI * 2
  }));
};

const resizeCanvas = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const w = window.innerWidth;
  const h = window.innerHeight;
  dpr = Math.min(window.devicePixelRatio || 1, profile.isMobile ? 1.5 : 2);

  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  return { w, h };
};

const init = (forceRecreate = false) => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  ctx = ctx || canvas.getContext('2d');
  updateProfile();
  const { w, h } = resizeCanvas();

  if (forceRecreate || w !== lastWidth || h !== lastHeight) {
    nodes = createNodes(w, h);
    lastWidth = w;
    lastHeight = h;
  }
};

const handleScroll = () => {
  const max = document.body.scrollHeight - window.innerHeight;
  scrollFactor = max > 0 ? Math.min(1, window.scrollY / max) : 0;
};

const handlePointerMove = (e) => {
  if (profile.isCoarsePointer) return; 
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  mouse.active = true;
};

const handlePointerLeave = () => { mouse.active = false; };

const handleVisibilityChange = () => {
  paused = document.hidden;
  if (!paused) {
    lastFrameTime = 0;
    animationFrame = requestAnimationFrame(animate);
  }
};

const animate = (time = 0) => {
  if (paused) return; 

  const frameInterval = 1000 / profile.targetFPS;
  if (time - lastFrameTime < frameInterval) {
    animationFrame = requestAnimationFrame(animate);
    return;
  }
  lastFrameTime = time;

  const canvas = canvasRef.value;
  if (!canvas || !ctx) return;

  const w = canvas.width / dpr;
  const h = canvas.height / dpr;
  const parallax = scrollFactor * 40;
  const reduceMotion = prefersReducedMotion();

  currentC1 = lerpColor(currentC1, targetC1, 0.06);
  currentC2 = lerpColor(currentC2, targetC2, 0.06);
  const c1 = currentC1.map((v) => Math.round(v)).join(',');
  const c2 = currentC2.map((v) => Math.round(v)).join(',');

  ctx.clearRect(0, 0, w, h);

  if (!reduceMotion) {
    nodes.forEach((n) => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;

      if (mouse.active) {
        const dx = n.x - mouse.x;
        const dy = (n.y - parallax) - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_RADIUS && dist > 0.01) {
          const force = (1 - dist / MOUSE_RADIUS) * 0.035;
          n.vx += (dx / dist) * force;
          n.vy += (dy / dist) * force;
        }
      }
      n.vx *= 0.985;
      n.vy *= 0.985;
    });
  }

  ctx.lineWidth = 1;
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
      const dx = a.x - b.x;
      const dy = (a.y - parallax) - (b.y - parallax);
      const dist = Math.hypot(dx, dy);
      if (dist >= 150) continue;

      let boost = 0;
      if (mouse.active) {
        const midX = (a.x + b.x) / 2;
        const midY = (a.y - parallax + (b.y - parallax)) / 2;
        const distToMouse = Math.hypot(midX - mouse.x, midY - mouse.y);
        if (distToMouse < MOUSE_RADIUS) boost = (1 - distToMouse / MOUSE_RADIUS) * 0.35;
      }

      const alpha = (1 - dist / 150) * 0.16 + boost;
      ctx.strokeStyle = `rgba(${i % 2 === 0 ? c1 : c2}, ${alpha})`;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y - parallax);
      ctx.lineTo(b.x, b.y - parallax * 0.6);
      ctx.stroke();
    }
  }
  nodes.forEach((n, i) => {
    const pulse = reduceMotion ? 0.65 : Math.sin(time * 0.0018 + n.phase) * 0.35 + 0.65;
    const color = i % 2 === 0 ? c1 : c2;
    const ny = n.y - parallax * (i % 2 === 0 ? 0.4 : 0.8);
    const glowSize = (n.r + 4) * (0.8 + pulse * 0.4) * 2.8;

    if (glowSprite) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = 0.35 * pulse;
      ctx.drawImage(glowSprite, n.x - glowSize / 2, ny - glowSize / 2, glowSize, glowSize);
      ctx.restore();
    }

    ctx.fillStyle = `rgba(${color}, ${0.55 + pulse * 0.25})`;
    ctx.beginPath();
    ctx.arc(n.x, ny, n.r * (0.85 + pulse * 0.3), 0, Math.PI * 2);
    ctx.fill();
  });

  animationFrame = requestAnimationFrame(animate);
};

// Debounced: reconstruir los nodos del canvas en cada pixel de un resize
// arrastrado es innecesario y cuesta CPU/GPU de más, sobre todo en móvil.
const handleResize = debounce(() => init(false), 150);

onMounted(() => {
  buildGlowSprite();
  applyDarkModeTarget();
  currentC1 = [...targetC1];
  currentC2 = [...targetC2];

  init(true);
  handleScroll();
  animationFrame = requestAnimationFrame(animate);
  requestAnimationFrame(() => { isReady.value = true; });

  darkModeObserver = new MutationObserver(applyDarkModeTarget);
  darkModeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  window.addEventListener('resize', handleResize);
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('pointermove', handlePointerMove, { passive: true });
  window.addEventListener('pointerleave', handlePointerLeave);
  document.addEventListener('visibilitychange', handleVisibilityChange);
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrame);
  darkModeObserver?.disconnect();
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('pointermove', handlePointerMove);
  window.removeEventListener('pointerleave', handlePointerLeave);
  document.removeEventListener('visibilitychange', handleVisibilityChange);
});
</script>

<style scoped>
.global-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
  background: transparent;
  overflow: hidden;

  opacity: 0;
  transition: opacity 0.8s ease;
}

.global-background.is-ready {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .global-background {
    transition: none;
  }
}
</style>