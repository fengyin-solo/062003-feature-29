import { ref, watch, onMounted, onUnmounted } from 'vue'
import { loadTheme, saveTheme } from '../utils/storage'

export function useTheme() {
  const theme = ref(loadTheme())
  const prefersDarkQuery = window.matchMedia('(prefers-color-scheme: dark)')

  function handleSystemThemeChange(e) {
    if (!localStorage.getItem('idol-agency-theme')) {
      theme.value = e.matches ? 'dark' : 'light'
    }
  }

  onMounted(() => {
    prefersDarkQuery.addEventListener('change', handleSystemThemeChange)
  })

  onUnmounted(() => {
    prefersDarkQuery.removeEventListener('change', handleSystemThemeChange)
  })

  watch(theme, (val) => {
    saveTheme(val)
    document.documentElement.setAttribute('data-theme', val)
  }, { immediate: true })

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  return { theme, toggleTheme }
}
