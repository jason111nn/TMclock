<script setup>
import { computed } from 'vue'
import { useCountdownStore } from '../store/countdown'

const store = useCountdownStore()

const progressPercent = computed(() => {
  if (!store.initialTimeLeftMs || store.examStarted) return 100
  const elapsed = store.initialTimeLeftMs - store.timeLeftMs
  return Math.min(100, Math.max(0, (elapsed / store.initialTimeLeftMs) * 100))
})
</script>

<template>
  <div class="w-full">
    <div class="flex justify-between items-center mb-2.5">
      <span class="font-mono text-[10px] text-[#4A4A5A] tracking-widest uppercase">Progress</span>
      <span class="font-mono text-[10px] text-[#8A8A9A] tabular-nums">
        {{ progressPercent.toFixed(1) }}%
      </span>
    </div>

    <!-- Track: 2px, no border, no glow -->
    <div class="progress-track w-full">
      <div
        class="progress-fill"
        :style="{ width: progressPercent + '%' }"
      ></div>
    </div>
  </div>
</template>
