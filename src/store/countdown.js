import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCountdownStore = defineStore('countdown', () => {
  const totalMs    = ref(0)   // 使用者設定的總時間
  const timeLeftMs = ref(0)   // 剩餘時間
  const isRunning  = ref(false)
  const isDone     = ref(false)

  let tickTimer = null

  // 進度百分比 (已消耗 / 總計)
  const progress = computed(() => {
    if (!totalMs.value) return 0
    const elapsed = totalMs.value - timeLeftMs.value
    return Math.min(100, (elapsed / totalMs.value) * 100)
  })

  function _stopTick() {
    clearInterval(tickTimer)
    tickTimer = null
  }

  // 從編輯欄位設定時間（不自動啟動）
  function setTime(hours, minutes, seconds) {
    _stopTick()
    isRunning.value = false
    isDone.value    = false
    const ms = ((hours * 3600) + (minutes * 60) + seconds) * 1000
    totalMs.value    = ms
    timeLeftMs.value = ms
  }

  function start() {
    if (timeLeftMs.value <= 0 || isRunning.value) return
    isDone.value    = false
    isRunning.value = true
    _stopTick()
    tickTimer = setInterval(() => {
      timeLeftMs.value = Math.max(0, timeLeftMs.value - 1000)
      if (timeLeftMs.value <= 0) {
        _stopTick()
        isRunning.value = false
        isDone.value    = true
      }
    }, 1000)
  }

  function pause() {
    _stopTick()
    isRunning.value = false
  }

  function reset() {
    _stopTick()
    isRunning.value  = false
    isDone.value     = false
    timeLeftMs.value = totalMs.value
  }

  return {
    totalMs, timeLeftMs, isRunning, isDone, progress,
    setTime, start, pause, reset,
  }
})
