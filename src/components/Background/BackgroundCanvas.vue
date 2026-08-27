<template>
  <canvas ref="canvasRef" class="global-background"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const canvasRef = ref(null);
let ctx, animationFrame, nodes = [];
let scrollFactor = 0;

// Paleta: azul/verde en modo claro, rojos en modo oscuro (misma lógica que App.vue)
const PALETTE = {
  light: { c1: '37,99,235', c2: '13,150,104' },
  dark: { c1: '225,29,72', c2: '242,85,79' }
};

const checkDarkMode = () => document.documentElement.classList.contains('dark');
const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const createNodes = (w, h) => {
  const count = Math.max(28, Math.min(70, Math.floor((w * h) / 28000)));
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    r: 1 + Math.random() * 1.8
  }));
};

const init = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  nodes = createNodes(canvas.width, canvas.height);
};

const handleScroll = () => {
  const max = document.body.scrollHeight - window.innerHeight;
  scrollFactor = max > 0 ? Math.min(1, window.scrollY / max) : 0;
};

const animate = () => {
  const canvas = canvasRef.value;
  if (!canvas || !ctx) return;
  const { width: w, height: h } = canvas;
  const { c1, c2 } = checkDarkMode() ? PALETTE.dark : PALETTE.light;
  const parallax = scrollFactor * 40;
  const reduceMotion = prefersReducedMotion();

  ctx.clearRect(0, 0, w, h);

  if (!reduceMotion) {
    nodes.forEach((n) => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    });
  }

  // Conexiones entre nodos cercanos
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
      const dx = a.x - b.x;
      const dy = (a.y - parallax) - (b.y - parallax);
      const dist = Math.hypot(dx, dy);
      if (dist < 150) {
        ctx.strokeStyle = `rgba(${c1}, ${(1 - dist / 150) * 0.16})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y - parallax);
        ctx.lineTo(b.x, b.y - parallax * 0.6);
        ctx.stroke();
      }
    }
  }

  // Nodos
  nodes.forEach((n, i) => {
    ctx.fillStyle = `rgba(${i % 2 === 0 ? c1 : c2}, .55)`;
    ctx.beginPath();
    ctx.arc(n.x, n.y - parallax * (i % 2 === 0 ? 0.4 : 0.8), n.r, 0, Math.PI * 2);
    ctx.fill();
  });

  animationFrame = requestAnimationFrame(animate);
};

onMounted(() => {
  init();
  handleScroll();
  animate();

  window.addEventListener('resize', init);
  window.addEventListener('scroll', handleScroll, { passive: true });

  onUnmounted(() => {
    cancelAnimationFrame(animationFrame);
    window.removeEventListener('resize', init);
    window.removeEventListener('scroll', handleScroll);
  });
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
}
</style>