<template>
  <div class="tags-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">
          <span class="title-icon">🏷️</span>
          文章标签
        </h1>
        <p class="page-subtitle">发现感兴趣的主题与话题</p>
      </div>
      
      <div v-if="loading" class="loading">
        <div class="loading-spinner"></div>
        <p class="loading-text">加载中...</p>
      </div>

      <div v-else-if="tags.length === 0" class="empty">
        <div class="empty-icon">📭</div>
        <p class="empty-text">暂无标签</p>
      </div>

      <div v-else class="tags-cloud">
        <TransitionGroup name="tag" tag="div" class="tags-cloud-inner">
          <NuxtLink
            v-for="(tag, index) in tags"
            :key="tag.name"
            :to="`/tags/${encodeURIComponent(tag.name)}`"
            class="tag-item"
            :style="{ 
              '--accent-color': getAccentColor(index),
              '--tag-size': `${Math.min(1.5, 0.875 + tag.count * 0.05)}rem`
            }"
          >
            <span class="tag-name">#{{ tag.name }}</span>
            <span class="tag-count">{{ tag.count }}</span>
            <div class="tag-glow"></div>
          </NuxtLink>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const loading = ref(true)

const { data: posts } = await useAsyncData('tags', () => 
  queryContent('/posts').only(['tags']).find()
)

const accentColors = ['#00f0ff', '#7c3aed', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#06b6d4', '#8b5cf6']

const tags = computed(() => {
  if (!posts.value) return []
  
  const tagMap = new Map<string, { name: string; count: number }>()
  
  posts.value.forEach((post: any) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag: string) => {
        if (!tagMap.has(tag)) {
          tagMap.set(tag, { name: tag, count: 0 })
        }
        tagMap.get(tag)!.count++
      })
    }
  })

  return Array.from(tagMap.values()).sort((a, b) => b.count - a.count)
})

const getAccentColor = (index: number) => {
  return accentColors[index % accentColors.length]
}

onMounted(() => {
  loading.value = false
})

useHead({
  title: '标签 - ZX Blog',
  meta: [
    { name: 'description', content: '浏览所有文章标签' }
  ]
})
</script>

<style scoped>
.tags-page {
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

.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
}

.tags-cloud-inner {
  display: contents;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 9999px;
  text-decoration: none;
  font-weight: 500;
  font-family: var(--font-mono);
  transition: all var(--transition-fast);
  position: relative;
  overflow: hidden;
  font-size: var(--tag-size);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--accent-color);
    opacity: 0;
    transition: opacity var(--transition-fast);
    z-index: 0;
  }
  
  &:hover {
    transform: translateY(-4px) scale(1.05);
    border-color: var(--accent-color);
    box-shadow: var(--shadow-md), 0 0 20px rgba(0, 240, 255, 0.15);
    
    &::before {
      opacity: 0.1;
    }
    
    .tag-name {
      color: var(--accent-color);
    }
    
    .tag-count {
      color: var(--accent-color);
      background: var(--accent-color);
    }
    
    .tag-glow {
      opacity: 1;
    }
  }
}

.tag-name {
  color: var(--text-primary);
  position: relative;
  z-index: 1;
  transition: color var(--transition-fast);
}

.tag-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.5rem;
  height: 1.5rem;
  padding: 0 var(--spacing-xs);
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  position: relative;
  z-index: 1;
  transition: all var(--transition-fast);
}

.tag-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, var(--accent-color) 0%, transparent 70%);
  opacity: 0;
  transition: opacity var(--transition-fast);
  pointer-events: none;
  z-index: -1;
}

.tag-enter-active {
  transition: all var(--transition-base);
}

.tag-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.tag-enter-to {
  opacity: 1;
  transform: scale(1);
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
  
  .tags-cloud {
    gap: var(--spacing-sm);
  }
  
  .tag-item {
    padding: var(--spacing-xs) var(--spacing-md);
    font-size: 0.875rem !important;
  }
  
  .tag-count {
    min-width: 1.25rem;
    height: 1.25rem;
    font-size: 0.625rem;
  }
}
</style>
