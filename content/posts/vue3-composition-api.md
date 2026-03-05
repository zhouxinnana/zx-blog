---
title: 'Vue 3 组合式 API 实战'
description: '深入理解 Vue 3 的组合式 API，提升开发效率'
date: 2024-01-25
category: '前端开发'
tags: ['Vue.js', 'JavaScript', '前端']
author: 'ZX'
image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800'
---

# Vue 3 组合式 API 实战

Vue 3 引入了组合式 API（Composition API），这是一种全新的编写 Vue 组件的方式，提供了更好的代码组织和复用能力。

## 什么是组合式 API？

组合式 API 是一组 API，允许我们使用函数的方式组织组件逻辑，而不是通过选项（如 `data`、`methods`、`computed`）来组织。

## 基本用法

### setup 函数

```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)

const doubleCount = computed(() => count.value * 2)

function increment() {
  count.value++
}
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>
```

### ref 和 reactive

```javascript
import { ref, reactive } from 'vue'

const count = ref(0)
const state = reactive({
  name: 'Vue',
  version: 3
})

console.log(count.value)
console.log(state.name)
```

### computed

```javascript
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})
```

### watch 和 watchEffect

```javascript
import { ref, watch, watchEffect } from 'vue'

const count = ref(0)

watch(count, (newVal, oldVal) => {
  console.log(`Count changed from ${oldVal} to ${newVal}`)
})

watchEffect(() => {
  console.log(`Current count: ${count.value}`)
})
```

## 自定义组合式函数

```javascript
// useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const doubleCount = computed(() => count.value * 2)
  
  function increment() {
    count.value++
  }
  
  function decrement() {
    count.value--
  }
  
  return {
    count,
    doubleCount,
    increment,
    decrement
  }
}
```

使用自定义组合式函数：

```vue
<script setup>
import { useCounter } from './useCounter'

const { count, doubleCount, increment, decrement } = useCounter(10)
</script>
```

## 生命周期钩子

```javascript
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  console.log('Component mounted')
})

onUnmounted(() => {
  console.log('Component unmounted')
})
```

## 依赖注入

```javascript
// 父组件
import { provide, ref } from 'vue'

const theme = ref('dark')
provide('theme', theme)

// 子组件
import { inject } from 'vue'

const theme = inject('theme')
```

## 总结

组合式 API 提供了更灵活的代码组织方式，特别适合：

- 大型应用的代码组织
- 逻辑复用
- TypeScript 集成

开始使用组合式 API，提升你的 Vue 开发体验吧！
