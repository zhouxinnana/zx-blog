<template>
  <div class="code-block">
    <div class="code-header">
      <span class="code-language">{{ language }}</span>
      <button 
        class="code-copy" 
        :class="{ copied: isCopied }"
        @click="copyCode"
      >
        <span class="copy-icon">{{ isCopied ? '✓' : '📋' }}</span>
        <span>{{ isCopied ? '已复制' : '复制' }}</span>
      </button>
    </div>
    
    <div class="code-content">
      <div class="code-line-numbers">
        <span 
          v-for="(_, index) in lines" 
          :key="index" 
          class="line-number"
        >
          {{ index + 1 }}
        </span>
      </div>
      
      <div class="code-body">
        <code class="code-highlight">
          <span 
            v-for="(line, index) in lines" 
            :key="index" 
            class="line"
            v-html="highlightLine(line)"
          ></span>
        </code>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  code: string
  language?: string
}>()

const isCopied = ref(false)
const language = computed(() => props.language || 'code')

const lines = computed(() => {
  return props.code.split('\n')
})

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}

const highlightLine = (line: string) => {
  let highlighted = escapeHtml(line)
  
  highlighted = highlightKeywords(highlighted)
  highlighted = highlightStrings(highlighted)
  highlighted = highlightNumbers(highlighted)
  highlighted = highlightComments(highlighted)
  highlighted = highlightFunctions(highlighted)
  
  return highlighted
}

const escapeHtml = (text: string) => {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

const highlightKeywords = (text: string) => {
  const keywords = [
    'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 
    'class', 'extends', 'import', 'export', 'default', 'from', 'async', 'await',
    'try', 'catch', 'finally', 'throw', 'new', 'this', 'super', 'static',
    'typeof', 'instanceof', 'in', 'of', 'true', 'false', 'null', 'undefined',
    'interface', 'type', 'enum', 'implements', 'public', 'private', 'protected'
  ]
  
  const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g')
  return text.replace(keywordRegex, '<span class="token-keyword">$1</span>')
}

const highlightStrings = (text: string) => {
  return text.replace(/(['"`])(.*?)\1/g, '<span class="token-string">$1$2$1</span>')
}

const highlightNumbers = (text: string) => {
  return text.replace(/\b(\d+\.?\d*)\b/g, '<span class="token-number">$1</span>')
}

const highlightComments = (text: string) => {
  return text.replace(/(\/\/.*$)/gm, '<span class="token-comment">$1</span>')
}

const highlightFunctions = (text: string) => {
  return text.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, '<span class="token-function">$1</span>(')
}
</script>

<style scoped>
.code-block {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  overflow: hidden;
  margin: var(--spacing-md) 0;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-primary);
}

.code-language {
  font-size: 0.75rem;
  font-weight: 600;
  font-family: var(--font-mono);
  color: var(--accent-primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.code-copy {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  background: transparent;
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-size: 0.75rem;
  font-weight: 500;
  font-family: var(--font-mono);
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &:hover {
    border-color: var(--accent-primary);
    color: var(--accent-primary);
    background: var(--accent-glow);
  }
  
  &.copied {
    border-color: var(--accent-tertiary);
    color: var(--accent-tertiary);
    background: rgba(16, 185, 129, 0.1);
  }
}

.copy-icon {
  font-size: 0.875rem;
}

.code-content {
  display: flex;
  overflow-x: auto;
}

.code-line-numbers {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-md);
  background: var(--bg-card);
  border-right: 1px solid var(--border-secondary);
  user-select: none;
  min-width: 3rem;
}

.line-number {
  font-size: 0.75rem;
  color: var(--text-tertiary);
  font-family: var(--font-mono);
  line-height: 1.6;
  text-align: right;
}

.code-body {
  flex: 1;
  overflow-x: auto;
}

.code-highlight {
  display: block;
  white-space: pre;
  padding: var(--spacing-md);
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--text-primary);
  font-family: var(--font-mono);
}

.line {
  display: block;
  padding: 0 var(--spacing-sm);
  border-radius: 2px;
  transition: background var(--transition-fast);
  
  &:hover {
    background: var(--bg-card-hover);
  }
}
</style>
