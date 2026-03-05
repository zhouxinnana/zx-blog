<template>
  <div class="category-detail">
    <div class="container">
      <div class="category-header">
        <NuxtLink to="/categories" class="back-link">
          ← 返回分类列表
        </NuxtLink>
        <h1 class="category-title">{{ categoryName }}</h1>
        <p class="category-count">{{ posts.length }} 篇文章</p>
      </div>

      <div v-if="loading" class="loading">
        加载中...
      </div>

      <div v-else-if="posts.length === 0" class="empty">
        <p>该分类下暂无文章</p>
      </div>

      <div v-else class="posts-grid">
        <ArticleCard
          v-for="post in posts"
          :key="post._path"
          :post="post"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const loading = ref(true)

const categoryName = decodeURIComponent(route.params.category as string)

const { data: posts } = await useAsyncData(
  `category-${categoryName}`,
  () => queryContent('/posts').where({ category: categoryName }).sort({ date: -1 }).find()
)

onMounted(() => {
  loading.value = false
})

useHead({
  title: `${categoryName} - 分类 - ZX Blog`,
  meta: [
    { name: 'description', content: `浏览 ${categoryName} 分类下的所有文章` }
  ]
})
</script>

<style scoped>
.category-detail {
  min-height: 60vh;
}

.category-header {
  text-align: center;
  margin-bottom: 3rem;
}

.back-link {
  display: inline-block;
  margin-bottom: 1.5rem;
  color: #6b7280;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #3b82f6;
  }
}

.category-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1f2937;
  margin: 0 0 0.5rem;
}

.category-count {
  color: #6b7280;
  font-size: 1.125rem;
  margin: 0;
}

.loading,
.empty {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
  font-size: 1.125rem;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .category-title {
    font-size: 2rem;
  }

  .category-count {
    font-size: 1rem;
  }

  .posts-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
