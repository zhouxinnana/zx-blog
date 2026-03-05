<template>
  <footer class="footer">
    <div class="footer-glow"></div>
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <div class="footer-brand">
            <h3 class="footer-title">
              <span class="title-main">ZX</span>
              <span class="title-accent">Blog</span>
            </h3>
            <p class="footer-description">
              探索技术 · 分享知识 · 记录成长
            </p>
          </div>
          
          <div class="footer-social">
            <a href="#" class="social-link" aria-label="GitHub">
              <span class="social-icon">💻</span>
            </a>
            <a href="#" class="social-link" aria-label="Twitter">
              <span class="social-icon">🐦</span>
            </a>
            <a href="#" class="social-link" aria-label="Email">
              <span class="social-icon">📧</span>
            </a>
          </div>
        </div>

        <div class="footer-section">
          <h4 class="footer-heading">
            <span class="heading-icon">🔗</span>
            快速链接
          </h4>
          <ul class="footer-links">
            <li>
              <NuxtLink to="/" class="footer-link">
                <span class="link-icon">⚡</span>
                首页
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/categories" class="footer-link">
                <span class="link-icon">📂</span>
                分类
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/tags" class="footer-link">
                <span class="link-icon">🏷️</span>
                标签
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="footer-section">
          <h4 class="footer-heading">
            <span class="heading-icon">ℹ️</span>
            关于
          </h4>
          <div class="footer-info">
            <p class="info-item">
              <span class="info-icon">🚀</span>
              基于 Nuxt.js 3 构建
            </p>
            <p class="info-item">
              <span class="info-icon">🎨</span>
              Vue.js 3 + TypeScript
            </p>
            <p class="info-item">
              <span class="info-icon">📝</span>
              Markdown 内容管理
            </p>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-divider"></div>
        <div class="footer-copyright">
          <p class="copyright-text">
            <span class="copyright-icon">©</span>
            {{ currentYear }} ZX Blog. All rights reserved.
          </p>
          <p class="tech-stack">
            Powered by 
            <span class="tech-item">Nuxt.js</span>
            <span class="tech-item">Vue.js</span>
            <span class="tech-item">TypeScript</span>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  position: relative;
  background: var(--bg-secondary);
  color: var(--text-primary);
  padding: var(--spacing-2xl) 0 var(--spacing-lg);
  margin-top: auto;
  border-top: 1px solid var(--border-primary);
}

.footer-glow {
  position: absolute;
  top: 0;
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
  opacity: 0.5;
  filter: blur(2px);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.footer-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: baseline;
  gap: 4px;
  letter-spacing: -0.02em;
}

.title-main {
  background: linear-gradient(135deg, var(--text-primary), var(--accent-primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-accent {
  color: var(--accent-primary);
  font-weight: 300;
}

.footer-description {
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
  font-size: 0.9375rem;
}

.footer-social {
  display: flex;
  gap: var(--spacing-sm);
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  text-decoration: none;
  transition: all var(--transition-fast);
  
  &:hover {
    border-color: var(--accent-primary);
    color: var(--accent-primary);
    background: var(--accent-glow);
    transform: translateY(-2px);
    box-shadow: var(--shadow-glow);
  }
}

.social-icon {
  font-size: 1.25rem;
}

.footer-heading {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.heading-icon {
  font-size: 1.25rem;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.footer-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9375rem;
  transition: all var(--transition-fast);
  padding: var(--spacing-xs) 0;
  
  &:hover {
    color: var(--accent-primary);
    transform: translateX(4px);
  }
}

.link-icon {
  font-size: 1rem;
}

.footer-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.info-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--text-secondary);
  margin: 0;
  font-size: 0.9375rem;
  font-family: var(--font-mono);
}

.info-icon {
  font-size: 1rem;
}

.footer-bottom {
  padding-top: var(--spacing-lg);
}

.footer-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-primary), transparent);
  margin-bottom: var(--spacing-lg);
}

.footer-copyright {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  text-align: center;
}

.copyright-text {
  color: var(--text-secondary);
  margin: 0;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
}

.copyright-icon {
  font-size: 1rem;
}

.tech-stack {
  color: var(--text-tertiary);
  margin: 0;
  font-size: 0.8125rem;
  font-family: var(--font-mono);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}

.tech-item {
  color: var(--accent-primary);
  font-weight: 500;
}

@media (max-width: 768px) {
  .footer {
    padding: var(--spacing-xl) 0 var(--spacing-md);
  }
  
  .container {
    padding: 0 var(--spacing-md);
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
  
  .footer-title {
    font-size: 1.5rem;
  }
  
  .footer-heading {
    font-size: 1rem;
  }
  
  .footer-copyright {
    gap: var(--spacing-sm);
  }
  
  .tech-stack {
    flex-direction: column;
    gap: var(--spacing-xs);
  }
}
</style>
