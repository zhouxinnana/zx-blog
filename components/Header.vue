<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <NuxtLink to="/" class="logo">
          ZX Blog
        </NuxtLink>
        
        <div class="nav-links" :class="{ 'nav-links--open': isMenuOpen }">
          <NuxtLink to="/" class="nav-link" @click="closeMenu">
            首页
          </NuxtLink>
          <NuxtLink to="/categories" class="nav-link" @click="closeMenu">
            分类
          </NuxtLink>
          <NuxtLink to="/tags" class="nav-link" @click="closeMenu">
            标签
          </NuxtLink>
          <NuxtLink to="/admin" class="nav-link" @click="closeMenu">
            管理
          </NuxtLink>
        </div>

        <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
          <span class="hamburger"></span>
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<style scoped>
.header {
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #3b82f6;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: #1f2937;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;

  &:hover,
  &.router-link-active {
    color: #3b82f6;
  }

  &.router-link-active::after {
    content: '';
    position: absolute;
    bottom: -0.25rem;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #3b82f6;
  }
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 0.25rem;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
}

.hamburger {
  display: block;
  width: 1.5rem;
  height: 2px;
  background-color: #1f2937;
  transition: all 0.3s ease;

  &::before,
  &::after {
    content: '';
    display: block;
    width: 1.5rem;
    height: 2px;
    background-color: #1f2937;
    position: absolute;
    transition: all 0.3s ease;
  }

  &::before {
    transform: translateY(-0.5rem);
  }

  &::after {
    transform: translateY(0.5rem);
  }
}

@media (max-width: 768px) {
  .nav-links {
    position: fixed;
    top: 4rem;
    left: 0;
    right: 0;
    background-color: #ffffff;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
    border-bottom: 1px solid #e5e7eb;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;

    &--open {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
  }

  .menu-toggle {
    display: flex;
  }

  .nav-link {
    width: 100%;
    text-align: center;
    padding: 0.75rem;
    border-radius: 0.5rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #f3f4f6;
    }
  }
}
</style>
