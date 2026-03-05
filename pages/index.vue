<template>
  <div class="home">
    <div class="container">
      <div class="home-header">
        <h1 class="home-title">欢迎来到 ZX Blog</h1>
        <p class="home-subtitle">探索技术、分享知识、记录成长</p>
      </div>

      <div class="search-section">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索文章..."
          class="search-input"
          @input="handleSearch"
        />
      </div>

      <div v-if="loading" class="loading">
        加载中...
      </div>

      <div v-else-if="filteredPosts.length === 0" class="empty">
        <p>暂无文章</p>
      </div>

      <div v-else class="posts-grid">
        <ArticleCard
          v-for="post in filteredPosts"
          :key="post._path"
          :post="post"
        />
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

const handleSearch = () => {
  onMounted(() => {
    loading.value = false
  })
}

useHead({
  title: '首页 - ZX Blog',
  meta: [
    { name: 'description', content: '欢迎来到 ZX Blog，探索技术、分享知识、记录成长' }
  ]
})
</script>

<style scoped>
.home {
  min-height: 60vh;
}

.home-header {
  text-align: center;
  margin-bottom: 3rem;
}

.home-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.home-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0;
}

.search-section {
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.search-input {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
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
  .home-title {
    font-size: 2rem;
  }

  .home-subtitle {
    font-size: 1rem;
  }

  .posts-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
