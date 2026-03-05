<template>
  <article class="article-card">
    <NuxtLink :to="post._path" class="article-link">
      <div v-if="post.image" class="article-image">
        <img :src="post.image" :alt="post.title" loading="lazy" />
      </div>
      
      <div class="article-content">
        <div class="article-meta">
          <span class="article-date">{{ formatDate(post.date) }}</span>
          <span v-if="post.category" class="article-category">
            {{ post.category }}
          </span>
        </div>

        <h2 class="article-title">{{ post.title }}</h2>
        
        <p v-if="post.description" class="article-description">
          {{ post.description }}
        </p>

        <div v-if="post.tags && post.tags.length > 0" class="article-tags">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="tag"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
interface Post {
  _path: string
  title: string
  description?: string
  date: string
  category?: string
  tags?: string[]
  image?: string
}

const props = defineProps<{
  post: Post
}>()

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.article-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
}

.article-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.article-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: #f3f4f6;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
}

.article-content {
  padding: 1.5rem;
}

.article-meta {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
}

.article-date {
  color: #6b7280;
}

.article-category {
  color: #3b82f6;
  font-weight: 500;
}

.article-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.75rem;
  line-height: 1.4;
}

.article-description {
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: #f3f4f6;
  color: #6b7280;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background-color: #3b82f6;
    color: #ffffff;
  }
}

@media (max-width: 768px) {
  .article-content {
    padding: 1rem;
  }

  .article-title {
    font-size: 1.125rem;
  }

  .article-description {
    font-size: 0.875rem;
  }
}
</style>
