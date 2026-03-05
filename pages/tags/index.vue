<template>
  <div class="tags-page">
    <div class="container">
      <h1 class="page-title">文章标签</h1>
      
      <div v-if="loading" class="loading">
        加载中...
      </div>

      <div v-else-if="tags.length === 0" class="empty">
        <p>暂无标签</p>
      </div>

      <div v-else class="tags-cloud">
        <NuxtLink
          v-for="tag in tags"
          :key="tag.name"
          :to="`/tags/${encodeURIComponent(tag.name)}`"
          class="tag-item"
          :style="{ fontSize: `${Math.min(1.5, 0.875 + tag.count * 0.05)}rem` }"
        >
          #{{ tag.name }}
          <span class="tag-count">({{ tag.count }})</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const loading = ref(true)

const { data: posts } = await useAsyncData('tags', () => 
  queryContent('/posts').only(['tags']).find()
)

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

.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
}

.tag-item {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  color: #3b82f6;
  border-radius: 9999px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background-color: #3b82f6;
    color: #ffffff;
    transform: scale(1.05);
  }
}

.tag-count {
  color: #6b7280;
  font-size: 0.75em;
  margin-left: 0.25rem;

  .tag-item:hover & {
    color: rgba(255, 255, 255, 0.8);
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .tags-cloud {
    gap: 0.75rem;
  }

  .tag-item {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem !important;
  }
}
</style>
