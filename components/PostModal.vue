<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">
          {{ mode === 'create' ? '创建新文章' : '编辑文章' }}
        </h2>
        <button class="close-button" @click="$emit('close')">
          ×
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="modal-body">
        <div class="form-group">
          <label for="title">标题 *</label>
          <input
            id="title"
            v-model="formData.title"
            type="text"
            required
            placeholder="输入文章标题"
          />
        </div>

        <div class="form-group">
          <label for="slug">URL 别名 *</label>
          <input
            id="slug"
            v-model="formData.slug"
            type="text"
            required
            placeholder="url-friendly-slug"
          />
        </div>

        <div class="form-group">
          <label for="description">描述</label>
          <textarea
            id="description"
            v-model="formData.description"
            rows="3"
            placeholder="简短描述文章内容"
          />
        </div>

        <div class="form-group">
          <label for="category">分类</label>
          <input
            id="category"
            v-model="formData.category"
            type="text"
            placeholder="文章分类"
          />
        </div>

        <div class="form-group">
          <label for="tags">标签（用逗号分隔）</label>
          <input
            id="tags"
            v-model="tagsInput"
            type="text"
            placeholder="tag1, tag2, tag3"
          />
        </div>

        <div class="form-group">
          <label for="image">封面图片 URL</label>
          <input
            id="image"
            v-model="formData.image"
            type="url"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div class="form-group">
          <label for="content">内容 (Markdown) *</label>
          <textarea
            id="content"
            v-model="formData.content"
            rows="15"
            required
            placeholder="使用 Markdown 编写文章内容..."
          />
        </div>

        <div class="form-group">
          <label for="author">作者</label>
          <input
            id="author"
            v-model="formData.author"
            type="text"
            placeholder="作者名称"
          />
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-outline" @click="$emit('close')">
            取消
          </button>
          <button type="submit" class="btn btn-primary" :disabled="submitting">
            {{ submitting ? '保存中...' : '保存' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  mode: 'create' | 'edit'
  post?: any
}>()

const emit = defineEmits(['close', 'save'])

const submitting = ref(false)

const formData = ref({
  title: '',
  slug: '',
  description: '',
  category: '',
  tags: [] as string[],
  image: '',
  content: '',
  author: ''
})

const tagsInput = computed({
  get: () => formData.value.tags.join(', '),
  set: (value: string) => {
    formData.value.tags = value
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)
  }
})

if (props.post) {
  formData.value = {
    title: props.post.title || '',
    slug: props.post._path?.split('/').pop() || '',
    description: props.post.description || '',
    category: props.post.category || '',
    tags: props.post.tags || [],
    image: props.post.image || '',
    content: props.post.content || '',
    author: props.post.author || ''
  }
}

const handleSubmit = async () => {
  submitting.value = true
  try {
    const postData = {
      ...formData.value,
      date: props.post?.date || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    emit('save', postData)
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background-color: #ffffff;
  border-radius: 0.5rem;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 2rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: color 0.3s ease;

  &:hover {
    color: #1f2937;
  }
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

input,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-family: inherit;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }

  &::placeholder {
    color: #9ca3af;
  }
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &-primary {
    background-color: #3b82f6;
    color: white;

    &:hover:not(:disabled) {
      background-color: #2563eb;
    }
  }

  &-outline {
    background-color: transparent;
    border: 1px solid #d1d5db;
    color: #374151;

    &:hover:not(:disabled) {
      border-color: #3b82f6;
      color: #3b82f6;
    }
  }
}

@media (max-width: 768px) {
  .modal-content {
    max-height: 95vh;
  }

  .modal-header,
  .modal-body {
    padding: 1rem;
  }

  .modal-footer {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
