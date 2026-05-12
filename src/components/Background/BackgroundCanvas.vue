<template>
  <canvas ref="canvasRef" class="global-background"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const canvasRef = ref(null);
let ctx, animationFrame, particles = [];

const lightColors = ['#5bd6b9', '#48c6ef', '#fc5c7d'];

class Particle {
  constructor(w, h, isDark) {
    this.reset(w, h, isDark);
  }

  reset(w, h, isDark) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    
    if (isDark) {
      this.size = Math.random() * 6;
      this.color = '#ffffff';
      this.opacity = Math.random();
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
    } else {
      this.size = Math.random() * 15 + 5;
      this.color = lightColors[Math.floor(Math.random() * lightColors.length)];
      this.opacity = Math.random() * 0.2;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
    }
  }

  update(w, h, isDark) {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
      this.reset(w, h, isDark);
    }
  }

  draw(ctx, isDark) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    
    if (isDark) {
      ctx.shadowBlur = 5;
      ctx.shadowColor = '#ffffff';
    } else {
      ctx.shadowBlur = 0;
    }
    ctx.fill();
  }
}

const checkDarkMode = () => document.documentElement.classList.contains('dark');

const init = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const isDark = checkDarkMode();
  particles = []; 
  particles = Array.from({ length: 80 }, () => new Particle(canvas.width, canvas.height, isDark));
};

const animate = () => {
  if (!canvasRef.value) return;
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  const isDark = checkDarkMode();
  
  particles.forEach(p => {
    p.update(canvasRef.value.width, canvasRef.value.height, isDark);
    p.draw(ctx, isDark);
  });
  animationFrame = requestAnimationFrame(animate);
};

onMounted(() => {
  init();
  animate();
  window.addEventListener('resize', init);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        particles = []; 
        init();
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });

  onUnmounted(() => {
    observer.disconnect();
    cancelAnimationFrame(animationFrame);
    window.removeEventListener('resize', init);
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