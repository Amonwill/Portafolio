<template>
  <canvas ref="canvasRef" class="global-background"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const canvasRef = ref(null);
let ctx, animationFrame, particles = [];
const isDark = ref(document.documentElement.classList.contains('dark'));

const lightColors = ['#5bd6b9', '#48c6ef', '#fc5c7d']; 

class Particle {
  constructor(w, h, dark) {
    this.reset(w, h, dark);
  }

  reset(w, h, dark) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.size = dark ? Math.random() * 2 : Math.random() * 15 + 5;
    this.speedX = (Math.random() - 0.5) * (dark ? 0.5 : 1);
    this.speedY = (Math.random() - 0.5) * (dark ? 0.5 : 1);
    this.color = dark ? '#ffffff' : lightColors[Math.floor(Math.random() * lightColors.length)];
    this.opacity = dark ? Math.random() : 0.4;
  }

  update(w, h, dark) {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
      this.reset(w, h, dark);
    }
  }

  draw(ctx, dark) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.fill();
    if (dark) { 
      ctx.shadowBlur = 5;
      ctx.shadowColor = '#ffffff';
    } else {
      ctx.shadowBlur = 0;
    }
  }
}

const init = () => {
  const canvas = canvasRef.value;
  ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  particles = Array.from({ length: 100 }, () => new Particle(canvas.width, canvas.height, isDark.value));
};

const animate = () => {
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  const dark = document.documentElement.classList.contains('dark');
  
  particles.forEach(p => {
    p.update(canvasRef.value.width, canvasRef.value.height, dark);
    p.draw(ctx, dark);
  });
  animationFrame = requestAnimationFrame(animate);
};

onMounted(() => {
  init();
  animate();
  window.addEventListener('resize', init);
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrame);
  window.removeEventListener('resize', init);
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