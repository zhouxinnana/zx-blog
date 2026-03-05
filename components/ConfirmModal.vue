<template>
  <div class="modal-overlay" @click.self="$emit('cancel')">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">{{ title }}</h2>
        <button class="close-button" @click="$emit('cancel')">
          ×
        </button>
      </div>

      <div class="modal-body">
        <p class="modal-message">{{ message }}</p>
      </div>

      <div class="modal-footer">
        <button class="btn btn-outline" @click="$emit('cancel')">
          取消
        </button>
        <button class="btn btn-danger" @click="$emit('confirm')">
          确认删除
        </button>
      </div>
    </div>
  </div>
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
  max-width: 500px;
  width: 100%;
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
  font-size: 1.25rem;
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

.modal-message {
  color: #374151;
  line-height: 1.6;
  margin: 0;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
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

  &-outline {
    background-color: transparent;
    border: 1px solid #d1d5db;
    color: #374151;

    &:hover {
      border-color: #3b82f6;
      color: #3b82f6;
    }
  }

  &-danger {
    background-color: #ef4444;
    color: white;

    &:hover {
      background-color: #dc2626;
    }
  }
}

@media (max-width: 768px) {
  .modal-header,
  .modal-body,
  .modal-footer {
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
