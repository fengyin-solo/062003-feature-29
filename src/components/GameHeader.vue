<template>
  <header class="game-header">
    <div class="header-left">
      <button class="btn ghost" @click="$emit('back')">← 存档</button>
      <h2>第 {{ state.day }} 天</h2>
      <span class="days-left" :class="daysLeftClass">
        剩余 {{ daysLeft }} 天
      </span>
    </div>
    <div class="header-stats">
      <div class="stat-item">
        <span class="label">资金</span>
        <span
          class="value"
          :class="moneyClass"
        >
          ¥{{ state.money.toLocaleString() }}
        </span>
      </div>
      <div class="stat-item">
        <span class="label">粉丝</span>
        <span class="value">{{ state.fans.toLocaleString() }}</span>
      </div>
      <div class="stat-item">
        <span class="label">盈利</span>
        <span
          class="value"
          :class="profit >= 0 ? 'text-success' : 'text-danger'"
        >
          {{ profit >= 0 ? '+' : '' }}¥{{ profit.toLocaleString() }}
        </span>
      </div>
      <div class="stat-item">
        <span class="label">出道</span>
        <span
          class="value"
          :class="{ 'text-accent': state.groups.length >= targetGroups }"
        >
          {{ state.groups.length }}/{{ targetGroups }}
        </span>
      </div>
    </div>
    <button class="theme-btn" @click="$emit('toggle-theme')">
      {{ theme === 'light' ? '🌙' : '☀️' }}
    </button>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { GAME_CONFIG } from '../config/gameConfig'

const props = defineProps({
  state: Object,
  daysLeft: Number,
  profit: Number,
  theme: String,
})
defineEmits(['back', 'toggle-theme'])

const targetGroups = GAME_CONFIG.victory.targetGroups

const daysLeftClass = computed(() => {
  if (props.daysLeft <= 30) return 'text-danger glow-danger'
  if (props.daysLeft <= 90) return 'text-warning'
  return ''
})

const moneyClass = computed(() => {
  if (props.state.money < 5000) return 'text-danger glow-danger'
  if (props.state.money < 20000) return 'text-warning'
  return ''
})
</script>

<style scoped>
.game-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--bg-card);
  border-bottom: 1px solid var(--border);
  flex-wrap: wrap;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-left h2 {
  font-size: 1.25rem;
}

.days-left {
  font-size: 0.85rem;
  color: var(--text-muted);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
}

.days-left.text-danger {
  background: var(--danger-soft);
  color: var(--danger);
  animation: pulse-danger 2s infinite;
}

.days-left.text-warning {
  background: var(--warning-soft);
  color: var(--warning);
}

.header-stats {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-item .label {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.stat-item .value {
  font-weight: 700;
  font-size: 1rem;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
}

.stat-item .value.text-danger {
  background: var(--danger-soft);
}

.stat-item .value.text-warning {
  background: var(--warning-soft);
}

.stat-item .value.text-success {
  background: var(--success-soft);
}

.stat-item .value.text-accent {
  background: var(--accent-soft);
  color: var(--accent);
}

.theme-btn {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: all 0.2s ease;
}

.theme-btn:hover {
  border-color: var(--accent);
  background: var(--accent-soft);
}

@keyframes pulse-danger {
  0%, 100% {
    box-shadow: 0 0 0 0 var(--danger-glow);
  }
  50% {
    box-shadow: 0 0 0 8px transparent;
  }
}
</style>
