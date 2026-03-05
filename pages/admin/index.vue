<template>
  <div class="admin-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">
          <span class="title-icon">⚙️</span>
          文章管理
        </h1>
        <button class="btn btn-primary" @click="showCreateModal = true">
          <span class="btn-icon">➕</span>
          创建新文章
        </button>
      </div>

      <div v-if="loading" class="loading">
        <div class="loading-spinner"></div>
        <p class="loading-text">加载中...</p>
      </div>

      <div v-else-if="posts.length === 0" class="empty">
        <div class="empty-icon">📭</div>
        <p class="empty-text">暂无文章</p>
        <p class="empty-hint">点击上方按钮创建第一篇文章</p>
      </div>

      <div v-else class="posts-list">
        <TransitionGroup name="post" tag="div" class="posts-list-inner">
          <div
            v-for="(post, index) in posts"
            :key="post._path"
            class="post-item"
            :style="{ '--accent-color': getAccentColor(index) }"
          >
            <div class="post-main">
              <NuxtLink :to="post._path" class="post-title">
                <span class="post-number">{{ index + 1 }}</span>
                <span class="post-name">{{ post.title }}</span>
              </NuxtLink>
              
              <div class="post-meta">
                <span v-if="post.category" class="meta-item">
                  <span class="meta-icon">📂</span>
                  {{ post.category }}
                </span>
                <span class="meta-item">
                  <span class="meta-icon">📅</span>
                  {{ formatDate(post.date) }}
                </span>
              </div>
            </div>

            <div class="post-actions">
              <button class="action-btn action-btn--edit" @click="editPost(post)">
                <span class="action-icon">✏️</span>
                <span class="action-text">编辑</span>
              </button>
              <button class="action-btn action-btn--delete" @click="confirmDelete(post)">
                <span class="action-icon">🗑️</span>
                <span class="action-text">删除</span>
              </button>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>

    <PostModal
      v-if="showCreateModal || showEditModal"
      :post="editingPost"
      :mode="showCreateModal ? 'create' : 'edit'"
      @close="closeModal"
      @save="handleSave"
    />

    <ConfirmModal
      v-if="showDeleteModal"
      :title="`删除文章: ${deletingPost?.title}`"
      message="确定要删除这篇文章吗？此操作不可恢复。"
      @confirm="handleDelete"
      @cancel="showDeleteModal = false"
    />
  </div>
</template>

<script setup lang="ts">
const loading = ref(true)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const editingPost = ref<any>(null)
const deletingPost = ref<any>(null)

const { data: posts, refresh } = await useAsyncData('admin-posts', () => 
  queryContent('/posts').sort({ date: -1 }).find()
)

const accentColors = ['#00f0ff', '#7c3aed', '#10b981', '#f59e0b', '#ef4444', '#ec4899']

const getAccentColor = (index: number) => {
  return accentColors[index % accentColors.length]
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const editPost = (post: any) => {
  editingPost.value = { ...post }
  showEditModal.value = true
}

const confirmDelete = (post: any) => {
  deletingPost.value = post
  showDeleteModal.value = true
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  editingPost.value = null
}

const handleSave = async (postData: any) => {
  try {
    await $fetch('/api/posts', {
      method: 'POST',
      body: postData
    })
    closeModal()
    await refresh()
  } catch (error) {
    console.error('保存失败:', error)
    alert('保存失败，请重试')
  }
}

const handleDelete = async () => {
  if (!deletingPost.value) return
  
  try {
    await $fetch(`/api/posts/${deletingPost.value._path.split('/').pop()}`, {
      method: 'DELETE'
    })
    showDeleteModal.value = false
    deletingPost.value = null
    await refresh()
  } catch (error) {
    console.error('删除失败:', error)
    alert('删除失败，请重试')
  }
}

onMounted(() => {
  loading.value = false
})

useHead({
  title: '文章管理 - ZX Blog',
  meta: [
    { name: 'description', content: '管理博客文章' }
  ]
})
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  position: relative;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-2xl) var(--spacing-lg);
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.page-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  letter-spacing: -0.02em;
}

.title-icon {
  font-size: 2rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  border: none;
  font-family: var(--font-display);
  
  &-primary {
    background: var(--accent-primary);
    color: var(--bg-primary);
    
    &:hover {
      background: var(--accent-secondary);
      transform: translateY(-2px);
      box-shadow: var(--shadow-glow);
    }
  }
  
  &-icon {
    font-size: 1rem;
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

.empty-hint {
  font-size: 0.875rem;
  color: var(--text-tertiary);
  margin: 0;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.posts-list-inner {
  display: contents;
}

.post-item {
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-lg);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: var(--accent-color);
    opacity: 0;
    transition: opacity var(--transition-base);
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
    border-color: var(--accent-color);
    
    &::before {
      opacity: 1;
    }
  }
}

.post-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.post-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 600;
  font-size: 1.125rem;
  transition: color var(--transition-fast);
  
  &:hover {
    color: var(--accent-primary);
  }
}

.post-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  font-family: var(--font-mono);
  color: var(--accent-primary);
}

.post-name {
  flex: 1;
}

.post-meta {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--text-secondary);
  font-size: 0.8125rem;
  font-family: var(--font-mono);
}

.meta-icon {
  font-size: 1rem;
}

.post-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-sm);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  border: 1px solid var(--border-primary);
  background: transparent;
  color: var(--text-secondary);
  font-family: var(--font-display);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }
  
  &--edit {
    &:hover {
      border-color: var(--accent-primary);
      color: var(--accent-primary);
      background: var(--accent-glow);
    }
  }
  
  &--delete {
    &:hover {
      border-color: var(--accent-secondary);
      color: var(--accent-secondary);
      background: rgba(124, 58, 237, 0.1);
    }
  }
}

.action-icon {
  font-size: 1rem;
}

.action-text {
  font-size: 0.8125rem;
}

.post-enter-active {
  transition: all var(--transition-base);
}

.post-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.post-enter-to {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1024px) {
  .post-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .post-actions {
    width: 100%;
    justify-content: flex-start;
  }
}

@media (max-width: 768px) {
  .container {
    padding: var(--spacing-xl) var(--spacing-md);
  }
  
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
  
  .post-title {
    font-size: 1rem;
  }
  
  .post-item {
    padding: var(--spacing-md);
  }
  
  .action-text {
    display: none;
  }
  
  .action-btn {
    padding: var(--spacing-xs);
  }
}
</style>
