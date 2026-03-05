<template>
  <div class="categories-page">
    <div class="container">
      <h1 class="page-title">文章分类</h1>
      
      <div v-if="loading" class="loading">
        加载中...
      </div>

      <div v-else-if="categories.length === 0" class="empty">
        <p>暂无分类</p>
      </div>

      <div v-else class="categories-grid">
        <NuxtLink
          v-for="category in categories"
          :key="category.name"
          :to="`/categories/${encodeURIComponent(category.name)}`"
          class="category-card"
        >
          <div class="category-icon">
            {{ category.icon }}
          </div>
          <h2 class="category-name">{{ category.name }}</h2>
          <p class="category-count">{{ category.count }} 篇文章</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const loading = ref(true)

const { data: posts } = await useAsyncData('categories', () => 
  queryContent('/posts').only(['category']).find()
)

const categories = computed(() => {
  if (!posts.value) return []
  
  const categoryMap = new Map<string, { name: string; count: number; icon: string }>()
  
  const icons = ['📚', '💻', '🎨', '🔧', '🚀', '💡', '🎯', '📊', '🔥', '⚡']
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
  min-height: 60vh;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1f2937;
  text-align: center;
  margin-bottom: 3rem;
}

.loading,
.empty {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
  font-size: 1.125rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.category-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
    border-color: #3b82f6;
  }
}

.category-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.category-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem;
}

.category-count {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .categories-grid {
    grid-template-columns: 1fr;
  }
}
</style>
