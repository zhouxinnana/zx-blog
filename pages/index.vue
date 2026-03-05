<template>
  <div class="home">
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="hero-title-main">ZX</span>
          <span class="hero-title-accent">Blog</span>
        </h1>
        <p class="hero-subtitle">
          探索技术 · 分享知识 · 记录成长
        </p>
        
        <div class="search-container">
          <div class="search-wrapper">
            <span class="search-icon">🔍</span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索文章、标签、分类..."
              class="search-input"
              @input="handleSearch"
            />
            <div class="search-glow"></div>
          </div>
        </div>
        
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-number">{{ posts.length }}</span>
            <span class="stat-label">篇文章</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ uniqueCategories }}</span>
            <span class="stat-label">个分类</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ uniqueTags }}</span>
            <span class="stat-label">个标签</span>
          </div>
        </div>
      </div>
      
      <div class="hero-particles"></div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <h2 class="section-title">
          <span class="section-title-icon">⚡</span>
          最新文章
        </h2>
        <div class="section-line"></div>
      </div>

      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p class="loading-text">加载中...</p>
      </div>

      <div v-else-if="filteredPosts.length === 0" class="empty-state">
        <div class="empty-icon">📭</div>
        <p class="empty-text">暂无文章</p>
        <p class="empty-hint">试试搜索其他关键词</p>
      </div>

      <div v-else class="posts-grid">
        <TransitionGroup name="post" tag="div" class="posts-grid-inner">
          <ArticleCard
            v-for="(post, index) in filteredPosts"
            :key="post._path"
            :post="post"
            :style="{ 'animation-delay': `${index * 0.1}s` }"
          />
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const searchQuery = ref('')
const loading = ref(true)

const { data: posts } = await useAsyncData('posts', () => 
  queryContent('/posts').sort({ date: -1 }).find()
)

const filteredPosts = computed(() => {
  if (!posts.value) return []
  
  if (!searchQuery.value.trim()) {
    return posts.value
  }

  const query = searchQuery.value.toLowerCase()
  return posts.value.filter((post: any) => 
    post.title?.toLowerCase().includes(query) ||
    post.description?.toLowerCase().includes(query) ||
    post.tags?.some((tag: string) => tag.toLowerCase().includes(query))
  )
})

const uniqueCategories = computed(() => {
  if (!posts.value) return 0
  const categories = new Set(posts.value.map((post: any) => post.category).filter(Boolean))
  return categories.size
})

const uniqueTags = computed(() => {
  if (!posts.value) return 0
  const tags = new Set(posts.value.flatMap((post: any) => post.tags || []))
  return tags.size
})

const handleSearch = () => {
  onMounted(() => {
    loading.value = false
  })
}

onMounted(() => {
  loading.value = false
})

useHead({
  title: '首页 - ZX Blog',
  meta: [
    { name: 'description', content: '欢迎来到 ZX Blog，探索技术、分享知识、记录成长' }
  ]
})
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.hero-section {
  position: relative;
  padding: var(--spacing-2xl) 0;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 30% 40%, rgba(0, 240, 255, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 70% 60%, rgba(124, 58, 237, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 700;
  margin: 0 0 var(--spacing-lg);
  letter-spacing: -0.05em;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.5rem;
}

.hero-title-main {
  background: linear-gradient(135deg, var(--text-primary), var(--accent-primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-title-accent {
  color: var(--accent-primary);
  font-weight: 300;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin: 0 0 var(--spacing-xl);
  letter-spacing: 0.05em;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
    border-radius: 2px;
  }
}

.search-container {
  margin: var(--spacing-xl) 0;
}

.search-wrapper {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
}

.search-icon {
  position: absolute;
  left: var(--spacing-md);
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.25rem;
  z-index: 2;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-md) var(--spacing-md) 3rem;
  background: rgba(10, 10, 15, 0.8);
  border: 2px solid var(--border-primary);
  border-radius: var(--radius-lg);
  color: var(--text-primary);
  font-size: 1rem;
  font-family: var(--font-display);
  transition: all var(--transition-fast);
  
  &::placeholder {
    color: var(--text-tertiary);
  }
  
  &:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 20px var(--accent-glow), inset 0 0 20px rgba(0, 240, 255, 0.05);
  }
}

.search-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  background: var(--accent-glow);
  border-radius: var(--radius-lg);
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  transition: opacity var(--transition-base);
}

.search-wrapper:focus-within .search-glow {
  opacity: 1;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: var(--spacing-xl);
  margin-top: var(--spacing-xl);
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-md) var(--spacing-lg);
  background: rgba(10, 10, 15, 0.5);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  backdrop-filter: blur(10px);
  transition: all var(--transition-base);
  min-width: 120px;
  
  &:hover {
    transform: translateY(-4px);
    border-color: var(--accent-primary);
    box-shadow: var(--shadow-md);
  }
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent-primary);
  font-family: var(--font-mono);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.hero-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.content-section {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-2xl) var(--spacing-lg);
}

.section-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  position: relative;
}

.section-title {
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.section-title-icon {
  font-size: 1.5rem;
}

.section-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-primary), transparent);
}

.loading-state,
.empty-state {
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--text-secondary);
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid var(--border-primary);
  border-top-color: var(--accent-primary);
  border-radius: 50%;
  margin: 0 auto var(--spacing-lg);
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
  margin: 0;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-md);
}

.empty-text {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 var(--spacing-sm);
}

.empty-hint {
  font-size: 0.875rem;
  color: var(--text-tertiary);
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: var(--spacing-xl);
}

.posts-grid-inner {
  display: contents;
}

.post-enter-active {
  transition: all var(--transition-base);
}

.post-enter-from {
  opacity: 0;
  transform: translateY(40px) scale(0.95);
}

.post-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.post-leave-active {
  transition: all var(--transition-base);
  position: absolute;
  width: 100%;
}

.post-leave-to {
  opacity: 0;
  transform: translateY(-40px) scale(0.95);
}

@media (max-width: 1024px) {
  .posts-grid {
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: var(--spacing-lg);
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: var(--spacing-xl) 0;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .search-wrapper {
    max-width: 100%;
  }
  
  .hero-stats {
    gap: var(--spacing-md);
  }
  
  .stat-item {
    min-width: 100px;
    padding: var(--spacing-sm) var(--spacing-md);
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .content-section {
    padding: var(--spacing-xl) var(--spacing-md);
  }
  
  .posts-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
}
</style>
