<script setup>
import { computed } from 'vue'
import { useCountdownStore } from '../store/countdown'

const store = useCountdownStore()

const timeUnits = computed(() => {
  const ms = Math.max(0, store.timeLeftMs)
  const total = Math.floor(ms / 1000)
  const days    = Math.floor(total / 86400)
  const hours   = Math.floor((total % 86400) / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = total % 60
  return {
    days:    String(days).padStart(2, '0'),
    hours:   String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  }
})

const units = [
  { key: 'days',    en: 'Days',    zh: '天' },
  { key: 'hours',   en: 'Hours',   zh: '時' },
  { key: 'minutes', en: 'Minutes', zh: '分' },
  { key: 'seconds', en: 'Seconds', zh: '秒' },
]
</script>

<template>
  <div class="w-full">
    <div class="grid grid-cols-4 gap-6 sm:gap-10 md:gap-14">
      <div
        v-for="unit in units"
        :key="unit.key"
        class="flex flex-col items-center gap-3"
      >
        <!-- Flat digit: no card, no background, just the number -->
        <span
          class="digit-flat text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
          :class="store.examStarted ? 'text-[#3A3A42]' : 'text-[#FF6B00]'"
        >
          {{ store.examStarted ? '00' : timeUnits[unit.key] }}
        </span>

        <!-- Thin separator -->
        <div class="w-8 h-px bg-[#222228]"></div>

        <!-- Label: size contrast -->
        <div class="text-center">
          <div class="font-sans font-medium text-xs text-[#8A8A9A] tracking-wide">{{ unit.en }}</div>
          <div class="font-mono text-[10px] text-[#4A4A5A] tracking-widest mt-0.5">{{ unit.zh }}</div>
        </div>
      </div>
    </div>

    <!-- Colon separators (between items, decorative) -->
    <!-- Target date label -->
    <div class="flex items-center justify-center gap-3 mt-8">
      <div class="h-px flex-1 max-w-16 bg-[#1A1A1F]"></div>
      <span class="font-mono text-[10px] text-[#4A4A5A] tracking-[0.2em]">
        TARGET  ·  2026.08.19  ·  09:00 CST
      </span>
      <div class="h-px flex-1 max-w-16 bg-[#1A1A1F]"></div>
    </div>
  </div>
</template>
