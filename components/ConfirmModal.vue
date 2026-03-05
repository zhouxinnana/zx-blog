<template>
  <Transition name="modal" appear>
    <div class="modal-overlay" @click.self="$emit('cancel')">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">
            <span class="title-icon">⚠️</span>
            {{ title }}
          </h2>
          <button class="close-button" @click="$emit('cancel')" aria-label="关闭">
            <span class="close-icon">×</span>
          </button>
        </div>

        <div class="modal-body">
          <p class="modal-message">{{ message }}</p>
        </div>

        <div class="modal-footer">
          <button class="btn btn-outline" @click="$emit('cancel')">
            <span class="btn-icon">✕</span>
            取消
          </button>
          <button class="btn btn-danger" @click="$emit('confirm')">
            <span class="btn-icon">🗑️</span>
            确认删除
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  message: string
}>()

defineEmits(['confirm', 'cancel'])
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
  max-width: 500px;
  width: 100%;
  box-shadow: var(--shadow-lg), 0 0 40px rgba(239, 68, 68, 0.1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--accent-danger), var(--accent-primary), var(--accent-danger));
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
    color: var(--accent-danger);
    background: var(--accent-danger-glow);
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

.modal-message {
  color: var(--text-primary);
  line-height: 1.6;
  margin: 0;
  font-size: 1rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  border-top: 1px solid var(--border-primary);
  background: var(--bg-secondary);
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
  
  &-outline {
    background: transparent;
    border: 1px solid var(--border-primary);
    color: var(--text-primary);
    
    &:hover {
      border-color: var(--accent-primary);
      color: var(--accent-primary);
      background: var(--accent-glow);
      transform: translateY(-2px);
    }
  }
  
  &-danger {
    background: var(--accent-danger);
    color: var(--bg-primary);
    
    &:hover {
      background: var(--accent-danger-hover);
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(239, 68, 68, 0.4);
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
  
  .modal-footer {
    padding: var(--spacing-md);
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
