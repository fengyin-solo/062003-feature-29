<template>
  <div class="save-manager">
    <div class="save-header">
      <h1>✨ 偶像养成事务所</h1>
      <p class="subtitle">三年内培养 3 个出道组合，让事务所盈利为正！</p>
      <button class="theme-btn" @click="$emit('toggle-theme')">
        {{ theme === 'light' ? '🌙' : '☀️' }}
      </button>
    </div>

    <div class="slots">
      <div
        v-for="(slot, i) in slots"
        :key="i"
        class="slot-card"
        :class="{ empty: !slot }"
      >
        <div class="slot-num">存档 {{ i + 1 }}</div>
        <template v-if="slot">
          <div class="slot-info">
            <span>第 {{ slot.gameState.day }} 天</span>
            <span>¥{{ slot.gameState.money.toLocaleString() }}</span>
            <span>{{ slot.gameState.groups.length }} 个出道组合</span>
          </div>
          <div class="slot-actions">
            <button class="btn primary" @click="$emit('load', i, slot)">继续</button>
            <button class="btn danger" @click="$emit('delete', i)">删除</button>
          </div>
        </template>
        <template v-else>
          <p class="empty-text">空存档</p>
          <button class="btn primary" @click="$emit('new', i)">开始新游戏</button>
        </template>
      </div>
    </div>

    <div class="rules-panel card">
      <h3>游戏规则</h3>
      <ul>
        <li>初始 5 名练习生，安排每日日程提升五维属性</li>
        <li>每周末内部评级，达标者可组队出道</li>
        <li>出道后可发行单曲赚取收入，支撑事务所运营</li>
        <li>练习生间有默契/竞争关系，影响训练效果</li>
        <li>随机事件需及时应对：挖角、生病、负面新闻等</li>
        <li>目标：{{ config.victory.targetGroups }} 个出道组合 + 盈利为正</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { GAME_CONFIG } from '../config/gameConfig'

defineProps({
  slots: Array,
  theme: String,
})
defineEmits(['new', 'load', 'delete', 'toggle-theme'])

const config = GAME_CONFIG
</script>

<style scoped>
.save-manager {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.save-header {
  text-align: center;
  position: relative;
  margin-bottom: 2rem;
}

.save-header h1 {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--accent), var(--accent-strong));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 1rem;
}

.theme-btn {
  position: absolute;
  top: 0;
  right: 0;
  background: var(--bg-card);
  border: 2px solid var(--border);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--shadow);
}

.theme-btn:hover {
  border-color: var(--accent);
  background: var(--accent-soft);
  transform: rotate(15deg) scale(1.05);
}

.slots {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.slot-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.25rem;
  transition: all 0.2s ease;
  box-shadow: var(--shadow);
}

.slot-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: var(--border-strong);
}

.slot-card.empty {
  border-style: dashed;
  border-color: var(--border);
  opacity: 0.85;
}

.slot-card.empty:hover {
  border-color: var(--accent);
}

.slot-num {
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--accent);
  font-size: 1.05rem;
}

.slot-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: var(--bg-secondary);
  border-radius: 8px;
}

.slot-info span {
  display: flex;
  justify-content: space-between;
}

.slot-info span::before {
  content: attr(data-label);
  color: var(--text-muted);
  font-size: 0.8rem;
}

.slot-actions {
  display: flex;
  gap: 0.5rem;
}

.slot-actions .btn {
  flex: 1;
}

.empty-text {
  color: var(--text-muted);
  margin-bottom: 1rem;
  text-align: center;
  padding: 1rem;
}

.rules-panel {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
}

.rules-panel h3 {
  margin-bottom: 1rem;
  color: var(--accent);
  font-size: 1.2rem;
}

.rules-panel ul {
  padding-left: 1.5rem;
  line-height: 2;
  color: var(--text-secondary);
}

.rules-panel li {
  margin-bottom: 0.25rem;
  position: relative;
}

.rules-panel li::marker {
  color: var(--accent);
}
</style>
