<template>
  <Transition name="modal" appear>
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">
            <span class="title-icon">{{ mode === 'create' ? '➕' : '✏️' }}</span>
            {{ mode === 'create' ? '创建新文章' : '编辑文章' }}
          </h2>
          <button class="close-button" @click="$emit('close')" aria-label="关闭">
            <span class="close-icon">×</span>
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="modal-body">
          <div class="form-group">
            <label for="title">
              <span class="label-icon">📝</span>
              标题 *
            </label>
            <input
              id="title"
              v-model="formData.title"
              type="text"
              required
              placeholder="输入文章标题"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="slug">
              <span class="label-icon">🔗</span>
              URL 别名 *
            </label>
            <input
              id="slug"
              v-model="formData.slug"
              type="text"
              required
              placeholder="url-friendly-slug"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="description">
              <span class="label-icon">💬</span>
              描述
            </label>
            <textarea
              id="description"
              v-model="formData.description"
              rows="3"
              placeholder="简短描述文章内容"
              class="form-textarea"
            />
          </div>

          <div class="form-group">
            <label for="category">
              <span class="label-icon">📂</span>
              分类
            </label>
            <input
              id="category"
              v-model="formData.category"
              type="text"
              placeholder="文章分类"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="tags">
              <span class="label-icon">🏷️</span>
              标签（用逗号分隔）
            </label>
            <input
              id="tags"
              v-model="tagsInput"
              type="text"
              placeholder="tag1, tag2, tag3"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="image">
              <span class="label-icon">🖼️</span>
              封面图片 URL
            </label>
            <input
              id="image"
              v-model="formData.image"
              type="url"
              placeholder="https://example.com/image.jpg"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="content">
              <span class="label-icon">📄</span>
              内容 (Markdown) *
            </label>
            <textarea
              id="content"
              v-model="formData.content"
              rows="15"
              required
              placeholder="使用 Markdown 编写文章内容..."
              class="form-textarea form-textarea--large"
            />
          </div>

          <div class="form-group">
            <label for="author">
              <span class="label-icon">👤</span>
              作者
            </label>
            <input
              id="author"
              v-model="formData.author"
              type="text"
              placeholder="作者名称"
              class="form-input"
            />
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-outline" @click="$emit('close')">
              <span class="btn-icon">✕</span>
              取消
            </button>
            <button type="submit" class="btn btn-primary" :disabled="submitting">
              <span class="btn-icon">{{ submitting ? '⏳' : '💾' }}</span>
              {{ submitting ? '保存中...' : '保存' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
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
  background: rgba(10, 10, 15, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--spacing-lg);
}

.modal-content {
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg), 0 0 40px rgba(0, 240, 255, 0.1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-primary));
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-primary);
  background: var(--bg-secondary);
  position: sticky;
  top: 0;
  z-index: 10;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.title-icon {
  font-size: 1.5rem;
}

.close-button {
  background: transparent;
  border: none;
  font-size: 2rem;
  color: var(--text-secondary);
  cursor: pointer;
  padding: var(--spacing-xs);
  line-height: 1;
  transition: all var(--transition-fast);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: var(--accent-primary);
    background: var(--accent-glow);
    transform: rotate(90deg);
  }
}

.close-icon {
  display: block;
  line-height: 1;
}

.modal-body {
  padding: var(--spacing-xl);
}

.form-group {
  margin-bottom: var(--spacing-lg);
}

label {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  font-size: 0.875rem;
}

.label-icon {
  font-size: 1rem;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-family: var(--font-display);
  transition: all var(--transition-fast);
  color: var(--text-primary);
  
  &::placeholder {
    color: var(--text-tertiary);
  }
  
  &:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 3px var(--accent-glow);
  }
  
  &:hover:not(:focus) {
    border-color: var(--border-secondary);
  }
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
  
  &--large {
    min-height: 300px;
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    line-height: 1.6;
  }
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border-primary);
  margin-top: var(--spacing-lg);
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
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &-primary {
    background: var(--accent-primary);
    color: var(--bg-primary);
    
    &:hover:not(:disabled) {
      background: var(--accent-secondary);
      transform: translateY(-2px);
      box-shadow: var(--shadow-glow);
    }
  }
  
  &-outline {
    background: transparent;
    border: 1px solid var(--border-primary);
    color: var(--text-primary);
    
    &:hover:not(:disabled) {
      border-color: var(--accent-primary);
      color: var(--accent-primary);
      background: var(--accent-glow);
      transform: translateY(-2px);
    }
  }
}

.btn-icon {
  font-size: 1rem;
}

.modal-enter-active,
.modal-leave-active {
  transition: all var(--transition-base);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9) translateY(-20px);
}

.modal-enter-to .modal-content,
.modal-leave-from .modal-content {
  transform: scale(1) translateY(0);
}

@media (max-width: 768px) {
  .modal-overlay {
    padding: var(--spacing-sm);
  }
  
  .modal-content {
    max-height: 95vh;
    border-radius: var(--radius-md);
  }
  
  .modal-header {
    padding: var(--spacing-md);
  }
  
  .modal-title {
    font-size: 1.125rem;
  }
  
  .modal-body {
    padding: var(--spacing-md);
  }
  
  .form-group {
    margin-bottom: var(--spacing-md);
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
