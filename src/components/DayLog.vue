<template>
  <div class="day-log card">
    <h3>📋 事务所日志</h3>
    <div class="log-list" ref="logRef">
      <div
        v-for="(log, i) in recentLogs"
        :key="i"
        class="log-item"
        :class="getLogClass(log)"
      >
        <span class="log-day">D{{ log.day }}</span>
        <span class="log-text">{{ log.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, nextTick } from 'vue'

const props = defineProps({
  logs: Array,
})

const logRef = ref(null)

const recentLogs = computed(() => [...(props.logs || [])].reverse().slice(0, 30))

watch(() => props.logs?.length, async () => {
  await nextTick()
  if (logRef.value) logRef.value.scrollTop = 0
})

function getLogClass(log) {
  const text = log.text || ''
  if (text.includes('出道') || text.includes('发行') || text.includes('暴涨') || text.includes('灵感')) {
    return 'log-success'
  }
  if (text.includes('负面') || text.includes('生病') || text.includes('挖角') || text.includes('离开') || text.includes('崩溃') || text.includes('倒下')) {
    return 'log-danger'
  }
  if (text.includes('警告') || text.includes('疲劳') || text.includes('压力')) {
    return 'log-warning'
  }
  return ''
}
</script>

<style scoped>
.day-log h3 { margin-bottom: 0.75rem; }

.log-list {
  max-height: 280px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding-right: 0.5rem;
}

.log-item {
  display: flex;
  gap: 0.5rem;
  font-size: 0.8rem;
  line-height: 1.5;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.log-item:hover {
  background: var(--bg-secondary);
}

.log-item.log-success {
  background: var(--success-soft);
  border-left-color: var(--success);
}

.log-item.log-success .log-text {
  color: var(--success);
  font-weight: 500;
}

.log-item.log-danger {
  background: var(--danger-soft);
  border-left-color: var(--danger);
}

.log-item.log-danger .log-text {
  color: var(--danger);
  font-weight: 500;
}

.log-item.log-warning {
  background: var(--warning-soft);
  border-left-color: var(--warning);
}

.log-item.log-warning .log-text {
  color: var(--warning);
}

.log-day {
  flex-shrink: 0;
  color: var(--text-muted);
  font-size: 0.7rem;
  width: 36px;
  font-weight: 600;
}

.log-text {
  color: var(--text-secondary);
}

.log-item.log-success .log-day,
.log-item.log-danger .log-day,
.log-item.log-warning .log-day {
  color: var(--text-muted);
  opacity: 0.8;
}
</style>
