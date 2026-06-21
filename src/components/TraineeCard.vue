<template>
  <div class="trainee-card card" :class="statusClass">
    <div class="card-top">
      <h4>{{ trainee.name }}</h4>
      <span class="badge" :class="trainee.status">{{ statusLabel }}</span>
    </div>

    <div class="bars">
      <div class="bar-row">
        <span>疲劳</span>
        <div class="bar" :class="fatigueBarClass">
          <div class="fill" :class="fatigueFillClass" :style="{ width: trainee.fatigue + '%' }"></div>
        </div>
        <span :class="fatigueTextClass">{{ trainee.fatigue }}</span>
      </div>
      <div class="bar-row">
        <span>压力</span>
        <div class="bar" :class="stressBarClass">
          <div class="fill" :class="stressFillClass" :style="{ width: trainee.stress + '%' }"></div>
        </div>
        <span :class="stressTextClass">{{ trainee.stress }}</span>
      </div>
    </div>

    <div class="stats-grid">
      <div v-for="key in statKeys" :key="key" class="stat-cell" :class="{ 'stat-highlight': trainee.stats[key] >= 80 }">
        <span class="stat-label">{{ statLabels[key] }}</span>
        <span class="stat-val">{{ trainee.stats[key] }}</span>
      </div>
    </div>

    <div v-if="score !== null" class="score">
      综合评分 <strong :class="{ 'text-accent': score >= debutThreshold }">{{ score }}</strong>
      <span v-if="trainee.status === 'trainee'" class="debut-hint">
        {{ score >= debutThreshold ? '✓ 可出道' : `需 ${debutThreshold}` }}
      </span>
    </div>

    <div v-if="trainee.illnessDays > 0" class="illness">🤒 休养中 ({{ trainee.illnessDays }}天)</div>
    <div v-if="trainee.fans > 0" class="fans">个人粉丝 {{ trainee.fans.toLocaleString() }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { GAME_CONFIG } from '../config/gameConfig'

const props = defineProps({
  trainee: Object,
  score: { type: Number, default: null },
})

const statKeys = GAME_CONFIG.stats
const statLabels = GAME_CONFIG.statLabels
const debutThreshold = GAME_CONFIG.rating.debutScoreThreshold
const { fatigueExhausted, stressHigh, stressBreakdown } = GAME_CONFIG.thresholds

const statusLabel = computed(() => {
  const map = { trainee: '练习生', debuted: '已出道', left: '已离开' }
  return map[props.trainee.status] || props.trainee.status
})

const statusClass = computed(() => ({
  debuted: props.trainee.status === 'debuted',
  left: props.trainee.status === 'left',
  ill: props.trainee.illnessDays > 0,
}))

const fatigueBarClass = computed(() => {
  if (props.trainee.fatigue >= fatigueExhausted) return 'bar-danger'
  if (props.trainee.fatigue >= 50) return 'bar-warning'
  return ''
})

const fatigueFillClass = computed(() => {
  if (props.trainee.fatigue >= fatigueExhausted) return 'fill-danger'
  if (props.trainee.fatigue >= 50) return 'fill-warning'
  return 'fill-fatigue'
})

const fatigueTextClass = computed(() => {
  if (props.trainee.fatigue >= fatigueExhausted) return 'text-danger'
  if (props.trainee.fatigue >= 50) return 'text-warning'
  return ''
})

const stressBarClass = computed(() => {
  if (props.trainee.stress >= stressBreakdown) return 'bar-danger glow-danger'
  if (props.trainee.stress >= stressHigh) return 'bar-warning'
  return ''
})

const stressFillClass = computed(() => {
  if (props.trainee.stress >= stressBreakdown) return 'fill-danger'
  if (props.trainee.stress >= stressHigh) return 'fill-warning'
  return 'fill-stress'
})

const stressTextClass = computed(() => {
  if (props.trainee.stress >= stressBreakdown) return 'text-danger'
  if (props.trainee.stress >= stressHigh) return 'text-warning'
  return ''
})
</script>

<style scoped>
.trainee-card {
  padding: 1rem;
  transition: all 0.2s ease;
}

.trainee-card.debuted {
  border-color: var(--accent);
  box-shadow: 0 0 0 1px var(--accent), var(--shadow);
}

.trainee-card.left {
  opacity: 0.5;
}

.trainee-card.ill {
  border-color: var(--warning);
  background: var(--warning-soft);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.card-top h4 { font-size: 1rem; }

.badge {
  font-size: 0.7rem;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  background: var(--bg-secondary);
  font-weight: 600;
}

.badge.debuted {
  background: var(--accent);
  color: var(--text-on-accent);
}

.badge.left {
  background: var(--danger-soft);
  color: var(--danger);
}

.bars { margin-bottom: 0.75rem; }

.bar-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
}

.bar-row span:first-child { width: 28px; color: var(--text-muted); }
.bar-row span:last-child {
  width: 24px;
  text-align: right;
  font-weight: 600;
}

.bar {
  flex: 1;
  height: 8px;
  background: var(--bg-secondary);
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.bar.bar-warning {
  box-shadow: 0 0 8px var(--warning-glow);
}

.bar.bar-danger {
  box-shadow: 0 0 8px var(--danger-glow);
}

.fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease, background-color 0.3s ease;
}

.fill-fatigue { background: var(--warning); }
.fill-stress { background: var(--danger); }
.fill-warning { background: var(--warning-strong); }
.fill-danger { background: var(--danger-strong); }

.stats-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.25rem;
  text-align: center;
}

.stat-cell {
  background: var(--bg-secondary);
  border-radius: 6px;
  padding: 0.3rem 0.1rem;
  transition: all 0.2s ease;
}

.stat-cell.stat-highlight {
  background: var(--accent-soft);
  border: 1px solid var(--accent);
}

.stat-cell.stat-highlight .stat-val {
  color: var(--accent);
}

.stat-label { display: block; font-size: 0.65rem; color: var(--text-muted); }
.stat-val { font-weight: 700; font-size: 0.85rem; }

.score {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.score strong {
  font-size: 1rem;
}

.debut-hint {
  margin-left: 0.5rem;
  font-size: 0.75rem;
  color: var(--accent);
  font-weight: 600;
}

.illness, .fans {
  margin-top: 0.35rem;
  font-size: 0.8rem;
  color: var(--warning);
  font-weight: 500;
}
</style>
