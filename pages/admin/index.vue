<template>
  <div class="admin-page">
    <div class="container">
      <h1 class="page-title">文章管理</h1>
      
      <div class="admin-actions">
        <button class="btn btn-primary" @click="showCreateModal = true">
          创建新文章
        </button>
      </div>

      <div v-if="loading" class="loading">
        加载中...
      </div>

      <div v-else-if="posts.length === 0" class="empty">
        <p>暂无文章</p>
      </div>

      <div v-else class="posts-table">
        <table>
          <thead>
            <tr>
              <th>标题</th>
              <th>分类</th>
              <th>发布日期</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts" :key="post._path">
              <td>
                <NuxtLink :to="post._path" class="post-link">
                  {{ post.title }}
                </NuxtLink>
              </td>
              <td>{{ post.category || '-' }}</td>
              <td>{{ formatDate(post.date) }}</td>
              <td class="actions">
                <button class="btn btn-outline btn-sm" @click="editPost(post)">
                  编辑
                </button>
                <button class="btn btn-outline btn-sm btn-danger" @click="confirmDelete(post)">
                  删除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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
  min-height: 60vh;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 2rem;
}

.admin-actions {
  margin-bottom: 2rem;
}

.loading,
.empty {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
  font-size: 1.125rem;
}

.posts-table {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #f9fafb;
}

th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
}

td {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

tr:last-child td {
  border-bottom: none;
}

.post-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &-sm {
    padding: 0.375rem 0.75rem;
    font-size: 0.8125rem;
  }

  &-primary {
    background-color: #3b82f6;
    color: white;

    &:hover {
      background-color: #2563eb;
    }
  }

  &-outline {
    background-color: transparent;
    border: 1px solid #d1d5db;
    color: #374151;

    &:hover {
      border-color: #3b82f6;
      color: #3b82f6;
    }

    &.btn-danger {
      &:hover {
        border-color: #ef4444;
        color: #ef4444;
      }
    }
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .posts-table {
    overflow-x: auto;
  }

  table {
    min-width: 600px;
  }
}
</style>
