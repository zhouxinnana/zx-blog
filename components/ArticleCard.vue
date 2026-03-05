<template>
  <article class="article-card" :style="{ '--accent-color': getAccentColor() }">
    <NuxtLink :to="post._path" class="article-link">
      <div v-if="post.image" class="article-image">
        <div class="image-overlay"></div>
        <img :src="post.image" :alt="post.title" loading="lazy" />
      </div>
      
      <div class="article-content">
        <div class="article-meta">
          <span class="article-date">
            <span class="meta-icon">📅</span>
            {{ formatDate(post.date) }}
          </span>
          <span v-if="post.category" class="article-category">
            <span class="meta-icon">📂</span>
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
            #{{ tag }}
          </span>
        </div>
        
        <div class="article-footer">
          <span class="read-time">⏱️ {{ getReadTime() }} 分钟阅读</span>
          <span class="read-more">阅读全文 →</span>
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

const accentColors = ['#00f0ff', '#7c3aed', '#10b981', '#f59e0b', '#ef4444']

const getAccentColor = () => {
  const index = Math.floor(Math.random() * accentColors.length)
  return accentColors[index]
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getReadTime = () => {
  if (!props.post.description) return 3
  const words = props.post.description.split(' ').length
  return Math.ceil(words / 200)
}
</script>

<style scoped>
.article-card {
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-base);
  position: relative;
  display: flex;
  flex-direction: column;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--accent-color, var(--accent-color)), transparent);
    opacity: 0;
    transition: opacity var(--transition-base);
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg), 0 0 30px var(--accent-glow);
    border-color: var(--accent-color);
    
    &::before {
      opacity: 1;
    }
    
    .article-image img {
      transform: scale(1.05);
    }
  }
}

.article-link {
  display: block;
  text-decoration: none;
  color: inherit;
  height: 100%;
}

.article-image {
  width: 100%;
  height: 240px;
  overflow: hidden;
  position: relative;
  background: var(--bg-tertiary);
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: linear-gradient(to top, var(--bg-card), transparent);
    pointer-events: none;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-slow);
  }
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(0, 0, 0, 0.3) 0%, 
    transparent 50%,
    rgba(0, 240, 255, 0.1) 100%
  );
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--transition-base);
}

.article-card:hover .image-overlay {
  opacity: 1;
}

.article-content {
  padding: var(--spacing-lg);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.article-meta {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  flex-wrap: wrap;
}

.article-date,
.article-category {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--bg-tertiary);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
  font-family: var(--font-mono);
  color: var(--text-secondary);
  transition: all var(--transition-fast);
  
  &:hover {
    background: var(--accent-glow);
    color: var(--accent-primary);
  }
}

.meta-icon {
  font-size: 0.875rem;
}

.article-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-md);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color var(--transition-fast);
  
  &:hover {
    color: var(--accent-primary);
  }
}

.article-description {
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0 0 var(--spacing-md);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.9375rem;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.tag {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--accent-glow);
  color: var(--accent-primary);
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  font-family: var(--font-mono);
  letter-spacing: 0.5px;
  transition: all var(--transition-fast);
  cursor: pointer;
  
  &:hover {
    background: var(--accent-primary);
    color: var(--bg-primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--accent-glow);
  }
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border-secondary);
  margin-top: var(--spacing-md);
}

.read-time {
  font-size: 0.8125rem;
  color: var(--text-tertiary);
  font-family: var(--font-mono);
}

.read-more {
  font-size: 0.875rem;
  color: var(--accent-primary);
  font-weight: 500;
  transition: all var(--transition-fast);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--accent-primary);
    transition: width var(--transition-base);
  }
  
  &:hover::after {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .article-image {
    height: 180px;
  }
  
  .article-title {
    font-size: 1.25rem;
  }
  
  .article-description {
    font-size: 0.875rem;
  }
  
  .article-content {
    padding: var(--spacing-md);
  }
}
</style>
