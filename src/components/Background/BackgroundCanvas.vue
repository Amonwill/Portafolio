<template>
  <canvas ref="canvasRef" class="global-background" :class="{ 'is-ready': isReady }"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const canvasRef = ref(null);
const isReady = ref(false);

let ctx, animationFrame;
let farNodes = [];
let nearNodes = [];
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

// --- Configuración de capas (profundidad) -----------------------------------
// "far": muchas partículas pequeñas y tenues, casi no reaccionan al cursor.
// "near": pocas partículas grandes y brillantes, con parallax e interacción más fuertes.
const LAYER_CONFIG = {
  far: {
    densityMobile: 30000, densityDesktop: 20000,
    floorMobile: 18, capMobile: 44,
    floorDesktop: 36, capDesktop: 85,
    connectDistance: 130,
    parallaxMult: 16,
    mouseForce: 0.014,
    velocity: 0.16,
    radius: [0.7, 1.5],
    baseAlpha: 0.55,
    lineAlpha: 0.11,
    lineWidth: 1,
  },
  near: {
    densityMobile: 90000, densityDesktop: 60000,
    floorMobile: 7, capMobile: 16,
    floorDesktop: 12, capDesktop: 26,
    connectDistance: 180,
    parallaxMult: 50,
    mouseForce: 0.042,
    velocity: 0.28,
    radius: [1.5, 2.8],
    baseAlpha: 0.9,
    lineAlpha: 0.2,
    lineWidth: 1.4,
  },
};

// --- Rejilla espacial ---------------------------------------------------------
// Sustituye la comparación O(n²) entre todos los nodos: cada nodo solo se
// compara contra los que caen en su celda y las 8 vecinas. El tamaño de celda
// coincide con la distancia máxima de conexión, así que ningún vecino real
// puede quedar fuera del rango de búsqueda de 3x3 celdas.
const buildGrid = (nodes, cellSize) => {
  const cells = new Map();
  for (const n of nodes) {
    const cx = Math.floor(n.x / cellSize);
    const cy = Math.floor(n.y / cellSize);
    const key = cx + ',' + cy;
    let bucket = cells.get(key);
    if (!bucket) {
      bucket = [];
      cells.set(key, bucket);
    }
    bucket.push(n);
  }
  return { cells, cellSize };
};

// Visita cada par de nodos vecinos exactamente una vez, usando el índice
// estable `i` de cada nodo para no procesar (a,b) y (b,a) por separado.
const forEachNearbyPair = (nodes, grid, callback) => {
  const { cells, cellSize } = grid;
  for (let idx = 0; idx < nodes.length; idx++) {
    const a = nodes[idx];
    const cx = Math.floor(a.x / cellSize);
    const cy = Math.floor(a.y / cellSize);
    for (let ox = -1; ox <= 1; ox++) {
      for (let oy = -1; oy <= 1; oy++) {
        const bucket = cells.get((cx + ox) + ',' + (cy + oy));
        if (!bucket) continue;
        for (const b of bucket) {
          if (b.i <= a.i) continue; // evita duplicados y auto-comparación
          callback(a, b);
        }
      }
    }
  }
};

// --- Partículas -------------------------------------------------------------
const createLayerNodes = (w, h, cfg) => {
  const density = profile.isMobile ? cfg.densityMobile : cfg.densityDesktop;
  const cap = profile.isMobile ? cfg.capMobile : cfg.capDesktop;
  const floor = profile.isMobile ? cfg.floorMobile : cfg.floorDesktop;
  const count = Math.max(floor, Math.min(cap, Math.floor((w * h) / density)));

  return Array.from({ length: count }, (_, i) => ({
    i,
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * cfg.velocity,
    vy: (Math.random() - 0.5) * cfg.velocity,
    r: cfg.radius[0] + Math.random() * (cfg.radius[1] - cfg.radius[0]),
    phase: Math.random() * Math.PI * 2,
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
    farNodes = createLayerNodes(w, h, LAYER_CONFIG.far);
    nearNodes = createLayerNodes(w, h, LAYER_CONFIG.near);
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
  mouse.x = e.clientX; // antes no se actualizaba: el radio horizontal nunca activaba la interacción
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

// --- Física de una capa -------------------------------------------------------
const updateLayerPositions = (nodes, w, h, cfg, parallax) => {
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
        const force = (1 - dist / MOUSE_RADIUS) * cfg.mouseForce;
        n.vx += (dx / dist) * force;
        n.vy += (dy / dist) * force;
      }
    }
    n.vx *= 0.985;
    n.vy *= 0.985;
  });
};

const drawLayerConnections = (nodes, cfg, parallax, c1, c2) => {
  const grid = buildGrid(nodes, cfg.connectDistance);
  ctx.lineWidth = cfg.lineWidth;

  forEachNearbyPair(nodes, grid, (a, b) => {
    const dx = a.x - b.x;
    const dy = a.y - b.y; // el parallax es un desplazamiento uniforme: se cancela en la resta
    const dist = Math.hypot(dx, dy);
    if (dist >= cfg.connectDistance) return;

    let boost = 0;
    if (mouse.active) {
      const midX = (a.x + b.x) / 2;
      const midY = (a.y + b.y) / 2 - parallax;
      const distToMouse = Math.hypot(midX - mouse.x, midY - mouse.y);
      if (distToMouse < MOUSE_RADIUS) boost = (1 - distToMouse / MOUSE_RADIUS) * 0.35;
    }

    const alpha = (1 - dist / cfg.connectDistance) * cfg.lineAlpha + boost;
    ctx.strokeStyle = `rgba(${a.i % 2 === 0 ? c1 : c2}, ${alpha})`;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y - parallax);
    ctx.lineTo(b.x, b.y - parallax);
    ctx.stroke();
  });
};

const drawLayerNodes = (nodes, cfg, parallax, time, reduceMotion, c1, c2) => {
  nodes.forEach((n) => {
    const pulse = reduceMotion ? 0.65 : Math.sin(time * 0.0018 + n.phase) * 0.35 + 0.65;
    const color = n.i % 2 === 0 ? c1 : c2;
    const ny = n.y - parallax;
    const glowSize = (n.r + 4) * (0.8 + pulse * 0.4) * 2.8;

    if (glowSprite) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = 0.3 * pulse * cfg.baseAlpha;
      ctx.drawImage(glowSprite, n.x - glowSize / 2, ny - glowSize / 2, glowSize, glowSize);
      ctx.restore();
    }

    ctx.fillStyle = `rgba(${color}, ${(0.55 + pulse * 0.25) * cfg.baseAlpha})`;
    ctx.beginPath();
    ctx.arc(n.x, ny, n.r * (0.85 + pulse * 0.3), 0, Math.PI * 2);
    ctx.fill();
  });
};

// --- Aura de fondo ------------------------------------------------------------
// Dos manchas de luz grandes y muy suaves que derivan lentamente. Es solo un
// par de rellenos radiales por frame (barato), pero le da profundidad
// atmosférica a la escena sin tocar el presupuesto de partículas.
const drawAura = (w, h, time, c1, c2, reduceMotion) => {
  const t = reduceMotion ? 0 : time * 0.00006;

  const blobs = [
    { x: w * (0.28 + Math.sin(t) * 0.14), y: h * (0.32 + Math.cos(t * 0.8) * 0.12), r: Math.max(w, h) * 0.55, color: c1, alpha: 0.10 },
    { x: w * (0.72 + Math.cos(t * 0.7) * 0.14), y: h * (0.68 + Math.sin(t * 0.9) * 0.12), r: Math.max(w, h) * 0.5, color: c2, alpha: 0.09 },
  ];

  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  for (const blob of blobs) {
    const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r);
    gradient.addColorStop(0, `rgba(${blob.color}, ${blob.alpha})`);
    gradient.addColorStop(1, `rgba(${blob.color}, 0)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
  }
  ctx.restore();
};

// --- Cometa ocasional -----------------------------------------------------
let comet = null;
let nextCometAt = 0;

const scheduleComet = (time) => {
  nextCometAt = time + 9000 + Math.random() * 14000; // cada 9–23s
};

const maybeSpawnComet = (time, w, h) => {
  if (comet || time < nextCometAt) return;

  const fromLeft = Math.random() < 0.5;
  const speed = 5.5 + Math.random() * 2.5;
  const descent = 0.32 + Math.random() * 0.28;

  comet = {
    x: fromLeft ? -40 : w + 40,
    y: Math.random() * h * 0.55,
    vx: (fromLeft ? 1 : -1) * speed,
    vy: speed * descent,
    trail: [],
    life: 0,
    maxLife: 160,
    useC1: Math.random() < 0.5,
  };
};

const updateAndDrawComet = (w, h, c1, c2) => {
  if (!comet) return;

  comet.x += comet.vx;
  comet.y += comet.vy;
  comet.life += 1;
  comet.trail.push({ x: comet.x, y: comet.y });
  if (comet.trail.length > 22) comet.trail.shift();

  const color = comet.useC1 ? c1 : c2;

  ctx.save();
  ctx.globalCompositeOperation = 'lighter';

  const n = comet.trail.length;
  for (let k = 0; k < n - 1; k++) {
    const p = comet.trail[k];
    const next = comet.trail[k + 1];
    const t = k / n;
    ctx.strokeStyle = `rgba(${color}, ${t * 0.5})`;
    ctx.lineWidth = t * 2.4;
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(next.x, next.y);
    ctx.stroke();
  }

  if (glowSprite) {
    const glowSize = 26;
    ctx.globalAlpha = 0.9;
    ctx.drawImage(glowSprite, comet.x - glowSize / 2, comet.y - glowSize / 2, glowSize, glowSize);
  }
  ctx.restore();

  const outOfBounds = comet.x < -60 || comet.x > w + 60 || comet.y > h + 60;
  if (outOfBounds || comet.life > comet.maxLife) {
    comet = null;
    scheduleComet(performance.now());
  }
};

// --- Loop principal -------------------------------------------------------
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
  const reduceMotion = prefersReducedMotion();

  const parallaxFar = scrollFactor * LAYER_CONFIG.far.parallaxMult;
  const parallaxNear = scrollFactor * LAYER_CONFIG.near.parallaxMult;

  currentC1 = lerpColor(currentC1, targetC1, 0.06);
  currentC2 = lerpColor(currentC2, targetC2, 0.06);
  const c1 = currentC1.map((v) => Math.round(v)).join(',');
  const c2 = currentC2.map((v) => Math.round(v)).join(',');

  ctx.clearRect(0, 0, w, h);

  drawAura(w, h, time, c1, c2, reduceMotion);

  if (!reduceMotion) {
    updateLayerPositions(farNodes, w, h, LAYER_CONFIG.far, parallaxFar);
    updateLayerPositions(nearNodes, w, h, LAYER_CONFIG.near, parallaxNear);
  }

  drawLayerConnections(farNodes, LAYER_CONFIG.far, parallaxFar, c1, c2);
  drawLayerNodes(farNodes, LAYER_CONFIG.far, parallaxFar, time, reduceMotion, c1, c2);

  drawLayerConnections(nearNodes, LAYER_CONFIG.near, parallaxNear, c1, c2);
  drawLayerNodes(nearNodes, LAYER_CONFIG.near, parallaxNear, time, reduceMotion, c1, c2);

  if (!reduceMotion) {
    maybeSpawnComet(time, w, h);
    updateAndDrawComet(w, h, c1, c2);
  }

  animationFrame = requestAnimationFrame(animate);
};

const handleResize = () => init(false);

onMounted(() => {
  buildGlowSprite();
  applyDarkModeTarget();
  currentC1 = [...targetC1];
  currentC2 = [...targetC2];

  init(true);
  handleScroll();
  scheduleComet(performance.now());
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