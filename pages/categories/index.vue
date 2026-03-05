<template>
  <div class="categories-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">
          <span class="title-icon">📂</span>
          文章分类
        </h1>
        <p class="page-subtitle">探索不同领域的知识与技术</p>
      </div>
      
      <div v-if="loading" class="loading">
        <div class="loading-spinner"></div>
        <p class="loading-text">加载中...</p>
      </div>

      <div v-else-if="categories.length === 0" class="empty">
        <div class="empty-icon">📭</div>
        <p class="empty-text">暂无分类</p>
      </div>

      <div v-else class="categories-grid">
        <TransitionGroup name="category" tag="div" class="categories-grid-inner">
          <NuxtLink
            v-for="(category, index) in categories"
            :key="category.name"
            :to="`/categories/${encodeURIComponent(category.name)}`"
            class="category-card"
            :style="{ '--accent-color': getAccentColor(index) }"
          >
            <div class="category-icon-wrapper">
              <span class="category-icon">{{ category.icon }}</span>
              <div class="icon-glow"></div>
            </div>
            <h2 class="category-name">{{ category.name }}</h2>
            <div class="category-stats">
              <span class="stat-item">
                <span class="stat-icon">📝</span>
                {{ category.count }} 篇文章
              </span>
            </div>
            <div class="category-arrow">→</div>
          </NuxtLink>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const loading = ref(true)

const { data: posts } = await useAsyncData('categories', () => 
  queryContent('/posts').only(['category']).find()
)

const accentColors = ['#00f0ff', '#7c3aed', '#10b981', '#f59e0b', '#ef4444', '#ec4899']

const categories = computed(() => {
  if (!posts.value) return []
  
  const categoryMap = new Map<string, { name: string; count: number; icon: string }>()
  
  const icons = ['📚', '💻', '🎨', '🔧', '🚀', '💡', '🎯', '📊', '🔥', '⚡', '🌟', '🎪']
  let iconIndex = 0

  posts.value.forEach((post: any) => {
    if (post.category) {
      if (!categoryMap.has(post.category)) {
        categoryMap.set(post.category, {
          name: post.category,
          count: 0,
          icon: icons[iconIndex % icons.length]
        })
        iconIndex++
      }
      categoryMap.get(post.category)!.count++
    }
  })

  return Array.from(categoryMap.values()).sort((a, b) => b.count - a.count)
})

const getAccentColor = (index: number) => {
  return accentColors[index % accentColors.length]
}

onMounted(() => {
  loading.value = false
})

useHead({
  title: '分类 - ZX Blog',
  meta: [
    { name: 'description', content: '浏览所有文章分类' }
  ]
})
</script>

<style scoped>
.categories-page {
  min-height: 100vh;
  position: relative;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-2xl) var(--spacing-lg);
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.page-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  letter-spacing: -0.02em;
}

.title-icon {
  font-size: 2.5rem;
}

.page-subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin: 0;
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

.loading,
.empty {
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

.empty-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-md);
}

.empty-text {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin: 0;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--spacing-xl);
}

.categories-grid-inner {
  display: contents;
}

.category-card {
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  text-decoration: none;
  color: inherit;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--accent-color, var(--accent-primary)), transparent);
    opacity: 0;
    transition: opacity var(--transition-base);
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg), 0 0 30px rgba(0, 240, 255, 0.15);
    border-color: var(--accent-color);
    
    &::before {
      opacity: 1;
    }
    
    .category-icon {
      transform: scale(1.1) rotate(5deg);
    }
    
    .icon-glow {
      opacity: 1;
    }
    
    .category-arrow {
      transform: translateX(4px);
      color: var(--accent-color);
    }
  }
}

.category-icon-wrapper {
  position: relative;
  margin-bottom: var(--spacing-lg);
}

.category-icon {
  font-size: 4rem;
  display: block;
  transition: transform var(--transition-base);
}

.icon-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
  border-radius: 50%;
  opacity: 0;
  transition: opacity var(--transition-base);
  pointer-events: none;
}

.category-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-md);
  text-align: center;
}

.category-stats {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-family: var(--font-mono);
}

.stat-icon {
  font-size: 1rem;
}

.category-arrow {
  margin-top: auto;
  font-size: 1.5rem;
  color: var(--text-tertiary);
  transition: all var(--transition-fast);
}

.category-enter-active {
  transition: all var(--transition-base);
}

.category-enter-from {
  opacity: 0;
  transform: translateY(40px) scale(0.95);
}

.category-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

@media (max-width: 1024px) {
  .categories-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .container {
    padding: var(--spacing-xl) var(--spacing-md);
  }
  
  .page-title {
    font-size: 1.75rem;
  }
  
  .page-subtitle {
    font-size: 1rem;
  }
  
  .categories-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
  
  .category-card {
    padding: var(--spacing-lg);
  }
  
  .category-icon {
    font-size: 3rem;
  }
  
  .category-name {
    font-size: 1.25rem;
  }
}
</style>
