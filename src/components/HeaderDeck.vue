<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useCountdownStore } from '../store/countdown'

const store = useCountdownStore()
const currentTime = ref('')
let clockTimer = null

function updateClock() {
  currentTime.value = new Date().toLocaleTimeString('zh-TW', {
    timeZone: 'Asia/Taipei',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

onMounted(() => { updateClock(); clockTimer = setInterval(updateClock, 1000) })
onUnmounted(() => clearInterval(clockTimer))
</script>

<template>
  <header class="relative z-10 w-full border-b border-[#1A1A1F]">
    <div class="max-w-5xl mx-auto px-6 sm:px-10 h-14 flex items-center justify-between gap-4">

      <!-- Left: Brand -->
      <div class="flex items-center gap-5">
        <span class="font-sans font-bold text-sm text-[#F2F2F5] tracking-tight">
          TM <span class="text-[#FF6B00]">達明</span>
        </span>

        <div class="h-4 w-px bg-[#222228]"></div>

        <!-- Status -->
        <div class="flex items-center gap-2">
          <span
            class="w-1.5 h-1.5 rounded-full"
            :class="{
              'dot-exam':   store.examStarted,
              'dot-local':  store.isLocalMode && !store.examStarted,
              'dot-online': !store.isLocalMode && !store.examStarted,
            }"
          ></span>
          <span class="font-mono text-[10px] tracking-widest"
            :class="{
              'text-[#F87171]': store.examStarted,
              'text-[#FBBF24]': store.isLocalMode && !store.examStarted,
              'text-[#4A4A5A]': !store.isLocalMode && !store.examStarted,
            }"
          >
            <template v-if="store.examStarted">EXAM ACTIVE</template>
            <template v-else-if="store.isLocalMode">LOCAL TIME MODE</template>
            <template v-else>SYSTEM ONLINE</template>
          </span>
        </div>

        <!-- Local mode warning -->
        <span
          v-if="store.isLocalMode && !store.examStarted"
          class="hidden sm:inline font-mono text-[10px] text-[#FBBF24] tracking-widest border border-[#FBBF24]/20 rounded px-2 py-0.5"
        >
          【 LOCAL_TIME_MODE 】
        </span>
      </div>

      <!-- Right: Clock -->
      <div class="flex items-center gap-4">
        <div v-if="store.isSyncing" class="font-mono text-[10px] text-[#4A4A5A] tracking-widest">
          SYNCING...
        </div>
        <span class="font-mono text-sm text-[#A8B4C8] tabular-nums tracking-wider">
          {{ currentTime }}
        </span>
        <span class="hidden sm:inline font-mono text-[10px] text-[#4A4A5A] tracking-widest">CST</span>
      </div>
    </div>
  </header>
</template>
