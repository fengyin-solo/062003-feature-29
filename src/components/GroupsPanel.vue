<template>
  <div class="groups-panel card">
    <h3>🌟 出道组合</h3>
    <div v-if="groups.length === 0" class="empty">暂无出道组合</div>
    <div v-for="group in groups" :key="group.id" class="group-item glow-accent">
      <div class="group-head">
        <strong>{{ group.name }}</strong>
        <span class="status-pill accent">已出道</span>
      </div>
      <div class="members">
        {{ memberNames(group).join(' · ') }}
      </div>
      <div class="group-stats">
        <span class="stat">
          <span class="stat-label">销量</span>
          <span class="stat-value text-success">{{ group.totalSales.toLocaleString() }}</span>
        </span>
        <span class="stat">
          <span class="stat-label">单曲</span>
          <span class="stat-value text-accent">{{ group.singles.length }} 张</span>
        </span>
      </div>
      <button
        class="btn primary sm"
        :disabled="money < singleCost"
        @click="$emit('release', group.id)"
      >
        发行单曲 (¥{{ singleCost.toLocaleString() }})
      </button>
    </div>
  </div>
</template>

<script setup>
import { GAME_CONFIG } from '../config/gameConfig'

const props = defineProps({
  groups: Array,
  trainees: Array,
  money: Number,
})

defineEmits(['release'])

const singleCost = GAME_CONFIG.single.creationCost

function memberNames(group) {
  return group.memberIds
    .map((id) => props.trainees.find((t) => t.id === id)?.name)
    .filter(Boolean)
}
</script>

<style scoped>
.groups-panel h3 { margin-bottom: 0.75rem; }

.empty {
  color: var(--text-muted);
  font-size: 0.9rem;
  text-align: center;
  padding: 2rem 1rem;
}

.group-item {
  padding: 1rem;
  background: var(--bg-card);
  border: 1px solid var(--accent);
  border-radius: 12px;
  margin-bottom: 0.75rem;
  transition: all 0.2s ease;
}

.group-item:hover {
  transform: translateY(-2px);
}

.group-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.group-head strong {
  font-size: 1.05rem;
  color: var(--accent);
}

.members {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
  padding: 0.5rem;
  background: var(--bg-secondary);
  border-radius: 6px;
}

.group-stats {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 0.75rem;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 0.7rem;
  color: var(--text-muted);
}

.stat-value {
  font-weight: 700;
  font-size: 0.95rem;
}

.btn {
  width: 100%;
}
</style>
