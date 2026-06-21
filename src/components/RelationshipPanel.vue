<template>
  <div class="relation-panel card">
    <h3>🤝 练习生关系</h3>
    <div class="rel-list">
      <div v-for="pair in pairs" :key="pair.key" class="rel-row" :class="`row-${pair.type}`">
        <span class="names">{{ pair.a }} ↔ {{ pair.b }}</span>
        <div class="rel-bar-wrap">
          <div class="rel-bar">
            <div
              class="rel-fill"
              :class="pair.type"
              :style="{ width: pair.barWidth + '%', marginLeft: pair.barOffset + '%' }"
            ></div>
          </div>
          <span class="rel-val" :class="pair.type">
            {{ pair.value > 0 ? '+' : '' }}{{ pair.value }}
          </span>
        </div>
        <span class="rel-tag" :class="pair.type">{{ pair.tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { GAME_CONFIG } from '../config/gameConfig'
import { pairKey } from '../utils/random'

const props = defineProps({
  trainees: Array,
  relationships: Object,
})

const CFG = GAME_CONFIG.relationships

const pairs = computed(() => {
  const active = props.trainees.filter((t) => t.status !== 'left')
  const result = []
  for (let i = 0; i < active.length; i++) {
    for (let j = i + 1; j < active.length; j++) {
      const value = props.relationships[pairKey(active[i].id, active[j].id)] ?? 0
      let type = 'neutral'
      let tag = '普通'
      if (value >= CFG.synergyThreshold) { type = 'synergy'; tag = '默契 ✓' }
      else if (value <= CFG.competitionThreshold) { type = 'competition'; tag = '竞争 ⚠' }

      const normalized = (value - CFG.min) / (CFG.max - CFG.min) * 100
      const barWidth = Math.abs(value) / CFG.max * 50
      const barOffset = value < 0 ? 50 - barWidth : 50

      result.push({
        key: pairKey(active[i].id, active[j].id),
        a: active[i].name,
        b: active[j].name,
        value,
        type,
        tag,
        barWidth: Math.max(barWidth, 2),
        barOffset,
        normalized,
      })
    }
  }
  return result.sort((a, b) => Math.abs(b.value) - Math.abs(a.value))
})
</script>

<style scoped>
.relation-panel h3 { margin-bottom: 0.75rem; }

.rel-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.rel-row {
  display: grid;
  grid-template-columns: 110px 1fr auto;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.rel-row.row-synergy {
  background: var(--success-soft);
  border: 1px solid var(--success);
}

.rel-row.row-competition {
  background: var(--danger-soft);
  border: 1px solid var(--danger);
}

.rel-row.row-neutral {
  background: var(--bg-secondary);
}

.names {
  color: var(--text-secondary);
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rel-bar-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.rel-bar {
  flex: 1;
  height: 8px;
  background: var(--bg-primary);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

.rel-bar::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border-strong);
  transform: translateX(-50%);
}

.rel-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease, background-color 0.3s ease;
}

.rel-fill.synergy {
  background: var(--success);
  box-shadow: 0 0 6px var(--success-glow);
}

.rel-fill.competition {
  background: var(--danger);
  box-shadow: 0 0 6px var(--danger-glow);
}

.rel-fill.neutral {
  background: var(--text-muted);
}

.rel-val {
  width: 36px;
  text-align: right;
  font-weight: 700;
  font-size: 0.75rem;
}

.rel-val.synergy { color: var(--success); }
.rel-val.competition { color: var(--danger); }
.rel-val.neutral { color: var(--text-muted); }

.rel-tag {
  font-size: 0.65rem;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  background: var(--bg-secondary);
  font-weight: 600;
  white-space: nowrap;
}

.rel-tag.synergy {
  background: var(--success);
  color: #fff;
}

.rel-tag.competition {
  background: var(--danger);
  color: #fff;
  animation: pulse-warning 2s infinite;
}

@keyframes pulse-warning {
  0%, 100% {
    box-shadow: 0 0 0 0 var(--danger-glow);
  }
  50% {
    box-shadow: 0 0 0 4px transparent;
  }
}
</style>
