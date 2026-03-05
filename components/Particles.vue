<template>
  <div class="particles-container">
    <canvas ref="canvas" class="particles-canvas"></canvas>
    <div class="glow-orbs">
      <div class="glow-orb glow-orb--1"></div>
      <div class="glow-orb glow-orb--2"></div>
      <div class="glow-orb glow-orb--3"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const canvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const particles = ref<Particle[]>([])
const animationId = ref<number>()

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

const initCanvas = () => {
  if (!canvas.value) return
  
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
  ctx.value = canvas.value.getContext('2d')
  
  createParticles()
  animate()
}

const createParticles = () => {
  const particleCount = Math.floor(window.innerWidth / 15)
  
  for (let i = 0; i < particleCount; i++) {
    particles.value.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.1
    })
  }
}

const drawParticles = () => {
  if (!ctx.value) return
  
  ctx.value.clearRect(0, 0, window.innerWidth, window.innerHeight)
  
  particles.value.forEach((particle, index) => {
    ctx.value!.beginPath()
    ctx.value!.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx.value!.fillStyle = `rgba(0, 240, 255, ${particle.opacity})`
    ctx.value!.fill()
    
    particle.x += particle.speedX
    particle.y += particle.speedY
    
    if (particle.x < 0 || particle.x > window.innerWidth) {
      particle.speedX *= -1
    }
    if (particle.y < 0 || particle.y > window.innerHeight) {
      particle.speedY *= -1
    }
    
    particles.value.forEach((otherParticle, otherIndex) => {
      if (index !== otherIndex) {
        const dx = particle.x - otherParticle.x
        const dy = particle.y - otherParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100) {
          ctx.value!.beginPath()
          ctx.value!.moveTo(particle.x, particle.y)
          ctx.value!.lineTo(otherParticle.x, otherParticle.y)
          ctx.value!.strokeStyle = `rgba(0, 240, 255, ${0.1 * (1 - distance / 100)})`
          ctx.value!.stroke()
        }
      }
    })
  })
}

const animate = () => {
  drawParticles()
  animationId.value = requestAnimationFrame(animate)
}

const handleResize = () => {
  if (!canvas.value) return
  
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
  particles.value = []
  createParticles()
}

onMounted(() => {
  initCanvas()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.particles-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
}

.particles-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glow-orbs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  animation: float 20s ease-in-out infinite;
}

.glow-orb--1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(0, 240, 255, 0.3) 0%, transparent 70%);
  top: -200px;
  left: -200px;
  animation-delay: 0s;
}

.glow-orb--2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, transparent 70%);
  bottom: -150px;
  right: -150px;
  animation-delay: -7s;
}

.glow-orb--3 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -14s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(50px, -50px) scale(1.1);
  }
  50% {
    transform: translate(0, 50px) scale(0.9);
  }
  75% {
    transform: translate(-50px, -25px) scale(1.05);
  }
}

@media (max-width: 768px) {
  .glow-orb--1 {
    width: 400px;
    height: 400px;
  }
  
  .glow-orb--2 {
    width: 300px;
    height: 300px;
  }
  
  .glow-orb--3 {
    width: 250px;
    height: 250px;
  }
}
</style>
