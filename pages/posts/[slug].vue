<template>
  <div class="article-detail">
    <div class="container">
      <div v-if="pending" class="loading">
        <div class="loading-spinner"></div>
        <p class="loading-text">加载中...</p>
      </div>

      <div v-else-if="error" class="error">
        <div class="error-icon">🚫</div>
        <p class="error-text">文章不存在或已被删除</p>
        <NuxtLink to="/" class="btn btn-primary">
          返回首页
        </NuxtLink>
      </div>

      <article v-else-if="article" class="article">
        <div class="article-header">
          <NuxtLink to="/" class="back-link">
            <span class="back-icon">←</span>
            <span class="back-text">返回首页</span>
          </NuxtLink>
          
          <div class="article-meta-top">
            <div v-if="article.category" class="category-badge">
              <span class="category-icon">📂</span>
              {{ article.category }}
            </div>
            <div class="article-date">
              <span class="date-icon">📅</span>
              {{ formatDate(article.date) }}
            </div>
          </div>
          
          <h1 class="article-title">{{ article.title }}</h1>
          
          <div v-if="article.description" class="article-description">
            {{ article.description }}
          </div>

          <div v-if="article.tags && article.tags.length > 0" class="article-tags">
            <span
              v-for="tag in article.tags"
              :key="tag"
              class="tag"
            >
              <NuxtLink :to="`/tags/${encodeURIComponent(tag)}`">
                #{{ tag }}
              </NuxtLink>
            </span>
          </div>
        </div>

        <div v-if="article.image" class="article-image">
          <div class="image-overlay"></div>
          <img :src="article.image" :alt="article.title" />
        </div>

        <div class="article-body">
          <ContentRenderer :value="article" />
        </div>

        <div class="article-footer">
          <div class="footer-divider"></div>
          <div class="footer-content">
            <div class="share-buttons">
              <button class="btn btn-outline" @click="shareArticle">
                <span class="btn-icon">🔗</span>
                <span>分享文章</span>
              </button>
            </div>
            
            <div class="article-navigation">
              <NuxtLink 
                v-if="prevArticle" 
                :to="prevArticle._path" 
                class="nav-link nav-link--prev"
              >
                <span class="nav-label">上一篇</span>
                <span class="nav-title">{{ prevArticle.title }}</span>
              </NuxtLink>
              
              <NuxtLink 
                v-if="nextArticle" 
                :to="nextArticle._path" 
                class="nav-link nav-link--next"
              >
                <span class="nav-label">下一篇</span>
                <span class="nav-title">{{ nextArticle.title }}</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const { data: article, pending, error } = await useAsyncData(
  `article-${route.params.slug}`,
  () => queryContent('/posts').where({ _path: `/posts/${route.params.slug}` }).findOne()
)

const { data: allArticles } = await useAsyncData('all-articles', () => 
  queryContent('/posts').sort({ date: -1 }).find()
)

const currentIndex = computed(() => {
  if (!allArticles.value || !article.value) return -1
  return allArticles.value.findIndex((a: any) => a._path === article.value?._path)
})

const prevArticle = computed(() => {
  if (currentIndex.value === -1 || currentIndex.value >= allArticles.value.length - 1) return null
  return allArticles.value[currentIndex.value + 1]
})

const nextArticle = computed(() => {
  if (currentIndex.value <= 0) return null
  return allArticles.value[currentIndex.value - 1]
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const shareArticle = async () => {
  if (navigator.share && article.value) {
    try {
      await navigator.share({
        title: article.value.title,
        text: article.value.description,
        url: window.location.href
      })
    } catch (err) {
      console.log('分享失败:', err)
    }
  }
}

if (article.value) {
  useHead({
    title: `${article.value.title} - ZX Blog`,
    meta: [
      { name: 'description', content: article.value.description },
      { property: 'og:title', content: article.value.title },
      { property: 'og:description', content: article.value.description },
      { property: 'og:type', content: 'article' }
    ]
  })
}
</script>

<style scoped>
.article-detail {
  min-height: 100vh;
  position: relative;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--spacing-2xl) var(--spacing-lg);
}

.loading,
.error {
  text-align: center;
  padding: var(--spacing-2xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 3px solid var(--border-primary);
  border-top-color: var(--accent-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-text {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin: 0;
}

.error-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-md);
}

.error-text {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin: 0;
}

.article {
  position: relative;
}

.article-header {
  margin-bottom: var(--spacing-xl);
  position: relative;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-lg);
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: all var(--transition-fast);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  
  &:hover {
    color: var(--accent-primary);
    background: var(--accent-glow);
    transform: translateX(-4px);
  }
}

.back-icon {
  font-size: 1.25rem;
}

.back-text {
  font-size: 0.875rem;
}

.article-meta-top {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
}

.category-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-md);
  background: var(--accent-glow);
  color: var(--accent-primary);
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 600;
  font-family: var(--font-mono);
  letter-spacing: 0.5px;
}

.category-icon {
  font-size: 1rem;
}

.article-date {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--text-secondary);
  font-size: 0.8125rem;
  font-family: var(--font-mono);
}

.date-icon {
  font-size: 1rem;
}

.article-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-lg);
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.article-description {
  font-size: 1.125rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0 0 var(--spacing-lg);
  padding-left: var(--spacing-lg);
  border-left: 3px solid var(--accent-primary);
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.tag {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-md);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 500;
  font-family: var(--font-mono);
  transition: all var(--transition-fast);
  
  a {
    color: var(--text-secondary);
    text-decoration: none;
  }
  
  &:hover {
    background: var(--accent-glow);
    border-color: var(--accent-primary);
    
    a {
      color: var(--accent-primary);
    }
  }
}

.article-image {
  width: 100%;
  height: 450px;
  overflow: hidden;
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-xl);
  position: relative;
  background: var(--bg-tertiary);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-slow);
  }
  
  &:hover img {
    transform: scale(1.02);
  }
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(0, 0, 0, 0.2) 0%, 
    transparent 50%,
    rgba(0, 240, 255, 0.1) 100%
  );
  pointer-events: none;
}

.article-body {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
  
  :deep(h2) {
    font-size: 1.75rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: var(--spacing-xl) 0 var(--spacing-md);
    padding-bottom: var(--spacing-sm);
    border-bottom: 2px solid var(--border-primary);
    
    &::before {
      content: '#';
      color: var(--accent-primary);
      margin-right: var(--spacing-sm);
      font-family: var(--font-mono);
    }
  }
  
  :deep(h3) {
    font-size: 1.375rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: var(--spacing-lg) 0 var(--spacing-sm);
  }
  
  :deep(p) {
    margin-bottom: var(--spacing-md);
  }
  
  :deep(a) {
    color: var(--accent-primary);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: all var(--transition-fast);
    
    &:hover {
      border-bottom-color: var(--accent-primary);
    }
  }
  
  :deep(code) {
    background: var(--bg-tertiary);
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-family: var(--font-mono);
    font-size: 0.9em;
    color: var(--accent-primary);
  }
  
  :deep(pre) {
    background: var(--bg-tertiary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
    overflow-x: auto;
    margin: var(--spacing-md) 0;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
      opacity: 0.5;
    }
    
    code {
      background: transparent;
      padding: 0;
      color: var(--text-primary);
      font-family: var(--font-mono);
      font-size: 0.875rem;
      line-height: 1.6;
    }
  }
  
  :deep(ul),
  :deep(ol) {
    padding-left: var(--spacing-xl);
    margin-bottom: var(--spacing-md);
    
    li {
      margin-bottom: var(--spacing-xs);
    }
  }
  
  :deep(blockquote) {
    border-left: 4px solid var(--accent-primary);
    padding-left: var(--spacing-lg);
    margin: var(--spacing-md) 0;
    color: var(--text-secondary);
    font-style: italic;
    background: var(--accent-glow);
    padding: var(--spacing-md) var(--spacing-lg);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
  }
  
  :deep(img) {
    max-width: 100%;
    height: auto;
    border-radius: var(--radius-md);
    margin: var(--spacing-md) 0;
  }
  
  :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: var(--spacing-md) 0;
    
    th,
    td {
      padding: var(--spacing-sm) var(--spacing-md);
      text-align: left;
      border-bottom: 1px solid var(--border-primary);
    }
    
    th {
      background: var(--bg-tertiary);
      color: var(--text-primary);
      font-weight: 600;
    }
    
    tr:hover {
      background: var(--bg-card-hover);
    }
  }
}

.article-footer {
  padding-top: var(--spacing-xl);
}

.footer-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-primary), transparent);
  margin-bottom: var(--spacing-xl);
}

.footer-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.share-buttons {
  display: flex;
  gap: var(--spacing-md);
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  border: none;
  font-family: var(--font-display);
  
  &-primary {
    background: var(--accent-primary);
    color: var(--bg-primary);
    
    &:hover {
      background: var(--accent-secondary);
      transform: translateY(-2px);
      box-shadow: var(--shadow-glow);
    }
  }
  
  &-outline {
    background: transparent;
    border: 2px solid var(--border-primary);
    color: var(--text-primary);
    
    &:hover {
      border-color: var(--accent-primary);
      color: var(--accent-primary);
      transform: translateY(-2px);
      box-shadow: var(--shadow-glow);
    }
  }
}

.btn-icon {
  font-size: 1rem;
}

.article-navigation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
}

.nav-link {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  padding: var(--spacing-lg);
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all var(--transition-fast);
  
  &:hover {
    border-color: var(--accent-primary);
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }
  
  &--prev {
    text-align: left;
  }
  
  &--next {
    text-align: right;
  }
}

.nav-label {
  font-size: 0.75rem;
  font-weight: 600;
  font-family: var(--font-mono);
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-title {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.4;
}

@media (max-width: 768px) {
  .container {
    padding: var(--spacing-xl) var(--spacing-md);
  }
  
  .article-title {
    font-size: 1.75rem;
  }
  
  .article-description {
    font-size: 1rem;
    padding-left: var(--spacing-md);
  }
  
  .article-image {
    height: 250px;
  }
  
  .article-body {
    font-size: 1rem;
    
    :deep(h2) {
      font-size: 1.5rem;
    }
    
    :deep(h3) {
      font-size: 1.25rem;
    }
  }
  
  .article-navigation {
    grid-template-columns: 1fr;
  }
  
  .nav-link--next {
    text-align: left;
  }
}
</style>
