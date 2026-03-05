<template>
  <header class="header">
    <div class="header-container">
      <div class="header-content">
        <NuxtLink to="/" class="logo">
          <span class="logo-text">ZX</span>
          <span class="logo-accent">Blog</span>
        </NuxtLink>
        
        <nav class="nav" :class="{ 'nav--open': isMenuOpen }">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path" 
            class="nav-link"
            @click="closeMenu"
          >
            <span class="nav-link-icon">{{ item.icon }}</span>
            <span class="nav-link-text">{{ item.label }}</span>
          </NuxtLink>
        </nav>

        <button 
          class="menu-toggle" 
          @click="toggleMenu"
          :class="{ 'menu-toggle--active': isMenuOpen }"
          aria-label="Toggle menu"
        >
          <span class="menu-toggle-line"></span>
          <span class="menu-toggle-line"></span>
          <span class="menu-toggle-line"></span>
        </button>
      </div>
      
      <div class="header-glow"></div>
    </div>
  </header>
</template>

<script setup lang="ts">
const isMenuOpen = ref(false)

const navItems = [
  { path: '/', label: '首页', icon: '⚡' },
  { path: '/categories', label: '分类', icon: '📂' },
  { path: '/tags', label: '标签', icon: '🏷️' },
  { path: '/admin', label: '管理', icon: '⚙️' }
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(10, 10, 15, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-primary);
  transition: all var(--transition-base);
  
  &::before {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      var(--accent-primary) 20%, 
      var(--accent-secondary) 50%, 
      var(--accent-primary) 80%, 
      transparent 100%
    );
    animation: glowMove 3s linear infinite;
  }
}

@keyframes glowMove {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) 0;
  position: relative;
}

.logo {
  display: flex;
  align-items: baseline;
  gap: 4px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.75rem;
  letter-spacing: -0.03em;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
    transform: scaleX(0);
    transition: transform var(--transition-base);
  }
  
  &:hover::before {
    transform: scaleX(1);
  }
}

.logo-text {
  color: var(--text-primary);
  background: linear-gradient(135deg, var(--text-primary), var(--accent-primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-accent {
  color: var(--accent-primary);
  font-weight: 300;
}

.nav {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -20px;
    width: 1px;
    height: 0;
    background: linear-gradient(180deg, var(--accent-primary), transparent);
    transition: height var(--transition-base);
  }
  
  &:hover::before {
    height: 40px;
  }
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.1), transparent);
    transition: left var(--transition-slow);
  }
  
  &:hover {
    color: var(--text-primary);
    background: var(--accent-glow);
    
    &::before {
      left: 100%;
    }
  }
  
  &.router-link-active {
    color: var(--accent-primary);
    background: var(--accent-glow);
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: var(--spacing-md);
      right: var(--spacing-md);
      height: 2px;
      background: var(--accent-primary);
      box-shadow: 0 0 10px var(--accent-primary);
    }
  }
}

.nav-link-icon {
  font-size: 1rem;
}

.nav-link-text {
  font-family: var(--font-display);
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 6px;
  background: transparent;
  border: none;
  padding: var(--spacing-sm);
  cursor: pointer;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    transform: translate(-50%, -50%);
    background: var(--accent-glow);
    border-radius: 50%;
    opacity: 0;
    transition: opacity var(--transition-base);
  }
  
  &:hover::before {
    opacity: 1;
  }
}

.menu-toggle-line {
  width: 24px;
  height: 2px;
  background: var(--text-primary);
  transition: all var(--transition-fast);
  border-radius: 2px;
}

.menu-toggle--active {
  .menu-toggle-line {
    &:nth-child(1) {
      transform: rotate(45deg) translate(6px, 6px);
      background: var(--accent-primary);
    }
    
    &:nth-child(2) {
      opacity: 0;
      transform: translateX(20px);
    }
    
    &:nth-child(3) {
      transform: rotate(-45deg) translate(6px, -6px);
      background: var(--accent-primary);
    }
  }
}

.header-glow {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    var(--accent-primary) 50%, 
    transparent 100%
  );
  opacity: 0.5;
  filter: blur(2px);
}

@media (max-width: 768px) {
  .nav {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    background: rgba(10, 10, 15, 0.98);
    backdrop-filter: blur(20px);
    padding: var(--spacing-lg);
    gap: var(--spacing-sm);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all var(--transition-base);
    border-bottom: 1px solid var(--border-primary);
    
    &--open {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
    
    &::before {
      display: none;
    }
  }
  
  .nav-link {
    justify-content: flex-start;
    padding: var(--spacing-md);
    
    &::after {
      left: var(--spacing-md);
      right: var(--spacing-md);
    }
  }
  
  .menu-toggle {
    display: flex;
  }
  
  .logo {
    font-size: 1.5rem;
  }
}
</style>
