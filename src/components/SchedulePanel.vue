<template>
  <div class="schedule-panel card">
    <h3>📅 今日日程安排</h3>
    <p class="hint">为每位练习生选择活动，同活动一起训练可提升默契</p>

    <div class="schedule-list">
      <div
        v-for="trainee in schedulable"
        :key="trainee.id"
        class="schedule-row"
      >
        <span class="name">{{ trainee.name }}</span>
        <span v-if="trainee.illnessDays > 0" class="ill-tag">休养中</span>
        <div v-else class="activity-btns">
          <button
            v-for="(act, key) in activities"
            :key="key"
            class="act-btn"
            :class="{ active: schedule[trainee.id] === key }"
            :title="`${act.label} ¥${act.moneyCost}`"
            @click="$emit('set', trainee.id, key)"
          >
            {{ act.icon }}
          </button>
        </div>
        <span v-if="schedule[trainee.id]" class="chosen">
          {{ activities[schedule[trainee.id]]?.label }}
        </span>
      </div>
    </div>

    <div class="legend">
      <span v-for="(act, key) in activities" :key="key" class="legend-item">
        {{ act.icon }} {{ act.label }}
      </span>
    </div>

    <div class="actions">
      <button class="btn ghost" @click="$emit('clear')">清空</button>
      <button class="btn primary" :disabled="!canEnd" @click="$emit('end-day')">
        结束今日 →
      </button>
    </div>
    <p v-if="!canEnd" class="warn">请为所有可安排的练习生选择日程</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { GAME_CONFIG } from '../config/gameConfig'

const props = defineProps({
  trainees: Array,
  schedule: Object,
  canEnd: Boolean,
})

defineEmits(['set', 'clear', 'end-day'])

const activities = GAME_CONFIG.activities

const schedulable = computed(() =>
  props.trainees.filter((t) => t.status !== 'left')
)
</script>

<style scoped>
.schedule-panel h3 { margin-bottom: 0.25rem; }

.hint {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.schedule-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.schedule-row:hover {
  background: var(--bg-secondary);
}

.name {
  width: 72px;
  font-weight: 600;
  font-size: 0.9rem;
}

.activity-btns {
  display: flex;
  gap: 0.35rem;
}

.act-btn {
  width: 38px;
  height: 38px;
  border: 2px solid var(--border);
  border-radius: 10px;
  background: var(--bg-secondary);
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.15s ease;
}

.act-btn:hover {
  border-color: var(--accent);
  transform: translateY(-1px);
}

.act-btn.active {
  background: var(--accent-soft);
  border-color: var(--accent);
  transform: scale(1.08);
  box-shadow: 0 0 0 2px var(--accent-glow);
}

.chosen {
  font-size: 0.8rem;
  color: var(--accent);
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  background: var(--accent-soft);
  border-radius: 6px;
}

.ill-tag {
  font-size: 0.8rem;
  color: var(--warning);
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  background: var(--warning-soft);
  border-radius: 6px;
  animation: pulse-warning 2s infinite;
}

@keyframes pulse-warning {
  0%, 100% {
    box-shadow: 0 0 0 0 var(--warning-glow);
  }
  50% {
    box-shadow: 0 0 0 4px transparent;
  }
}

.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--bg-secondary);
  border-radius: 8px;
}

.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.warn {
  text-align: right;
  font-size: 0.8rem;
  color: var(--warning);
  margin-top: 0.5rem;
  font-weight: 500;
}
</style>
