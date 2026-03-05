<template>
  <div class="article-detail">
    <div class="container">
      <div v-if="pending" class="loading">
        加载中...
      </div>

      <div v-else-if="error" class="error">
        <p>文章不存在或已被删除</p>
        <NuxtLink to="/" class="btn btn-primary">
          返回首页
        </NuxtLink>
      </div>

      <article v-else-if="article" class="article">
        <div class="article-header">
          <NuxtLink to="/" class="back-link">
            ← 返回首页
          </NuxtLink>
          
          <h1 class="article-title">{{ article.title }}</h1>
          
          <div class="article-meta">
            <div class="meta-item">
              <span class="meta-label">发布于</span>
              <span class="meta-value">{{ formatDate(article.date) }}</span>
            </div>
            
            <div v-if="article.category" class="meta-item">
              <span class="meta-label">分类</span>
              <NuxtLink 
                :to="`/categories/${encodeURIComponent(article.category)}`" 
                class="meta-value meta-link"
              >
                {{ article.category }}
              </NuxtLink>
            </div>
            
            <div v-if="article.author" class="meta-item">
              <span class="meta-label">作者</span>
              <span class="meta-value">{{ article.author }}</span>
            </div>
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
          <img :src="article.image" :alt="article.title" />
        </div>

        <div class="article-body prose">
          <ContentRenderer :value="article" />
        </div>

        <div class="article-footer">
          <div class="share-buttons">
            <button class="btn btn-outline" @click="shareArticle">
              分享文章
            </button>
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
  min-height: 60vh;
}

.loading,
.error {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
  font-size: 1.125rem;
}

.error {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.article {
  max-width: 800px;
  margin: 0 auto;
}

.article-header {
  margin-bottom: 2rem;
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

.article-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1f2937;
  margin: 0 0 1.5rem;
  line-height: 1.2;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.meta-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.meta-label {
  color: #6b7280;
  font-size: 0.875rem;
}

.meta-value {
  color: #1f2937;
  font-weight: 500;
  font-size: 0.875rem;
}

.meta-link {
  color: #3b82f6;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #1d4ed8;
  }
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: #f3f4f6;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;

  a {
    color: #6b7280;
    text-decoration: none;
  }

  &:hover {
    background-color: #3b82f6;

    a {
      color: #ffffff;
    }
  }
}

.article-image {
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  background-color: #f3f4f6;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.article-body {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #374151;
  margin-bottom: 3rem;
}

.article-footer {
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.share-buttons {
  display: flex;
  gap: 1rem;
}

@media (max-width: 768px) {
  .article-title {
    font-size: 1.75rem;
  }

  .article-meta {
    flex-direction: column;
    gap: 0.75rem;
  }

  .article-image {
    height: 250px;
  }

  .article-body {
    font-size: 1rem;
  }
}
</style>
