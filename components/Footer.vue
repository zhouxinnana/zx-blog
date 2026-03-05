<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">ZX Blog</h3>
          <p class="footer-description">
            一个基于 Nuxt.js 构建的简单博客系统
          </p>
        </div>

        <div class="footer-section">
          <h4 class="footer-heading">快速链接</h4>
          <ul class="footer-links">
            <li>
              <NuxtLink to="/">首页</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/categories">分类</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/tags">标签</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="footer-section">
          <h4 class="footer-heading">关于</h4>
          <p class="footer-text">
            使用 Nuxt.js、Vue.js 和 Markdown 构建
          </p>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} ZX Blog. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  background-color: #1f2937;
  color: #ffffff;
  padding: 3rem 0 1rem;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #3b82f6;
  margin: 0;
}

.footer-description {
  color: #9ca3af;
  line-height: 1.6;
  margin: 0;
}

.footer-heading {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  color: #ffffff;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-links a {
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #3b82f6;
  }
}

.footer-text {
  color: #9ca3af;
  margin: 0;
  line-height: 1.6;
}

.footer-bottom {
  border-top: 1px solid #374151;
  padding-top: 1rem;
  text-align: center;
  color: #9ca3af;
}

@media (max-width: 768px) {
  .footer {
    padding: 2rem 0 1rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
