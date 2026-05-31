<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useCountdownStore } from './store/countdown'
import { useI18n } from './i18n.js'
import TmHeader from './components/TmHeader.vue'
import TmFooter from './components/TmFooter.vue'

const store = useCountdownStore()
const { t } = useI18n()

// ─────────────────────────────────────────────────────────────────────
// 0. STATIC THEME (Dark Only) & BROWSER NOTIFICATIONS
// ─────────────────────────────────────────────────────────────────────
const isDark = ref(true)

function initTheme() {
  document.documentElement.classList.remove('light-mode')
}

function requestNotificationPermission() {
  if ('Notification' in window) {
    if (Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }
}

function sendDoneNotification() {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(`${t.value.title || 'TM達明'} | ${t.value.done || '計時結束'}`, {
      body: `${t.value.eyebrow || 'Techman Robot'} - ${t.value.subtitle || '能力檢定'}`,
      icon: 'https://www.tm-robot.com/images/favicon.ico',
      silent: false
    })
  }
}

watch(() => store.isDone, (done) => {
  if (done) {
    sendDoneNotification()
  }
})

// ─────────────────────────────────────────────────────────────────────
// 1. FULLSCREEN
// ─────────────────────────────────────────────────────────────────────
const isFullscreen = ref(false)

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {})
  } else {
    document.exitFullscreen().catch(() => {})
  }
}

function onFullscreenChange() {
  isFullscreen.value = !!document.fullscreenElement
}

// ─────────────────────────────────────────────────────────────────────
// 2. CANVAS — dense animated dot-matrix background
// ─────────────────────────────────────────────────────────────────────
const canvasRef = ref(null)
let rafId = null

function initCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  const GAP    = 16
  const SZ_MIN = 0.3
  const SZ_MAX = 0.9

  let squares = []

  function rebuild() {
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
    squares = []
    const cols = Math.ceil(canvas.width  / GAP) + 1
    const rows = Math.ceil(canvas.height / GAP) + 1
    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        squares.push({
          x:     c * GAP,
          y:     r * GAP,
          phase: Math.random() * Math.PI * 2,
          freq:  0.08 + Math.random() * 0.35,
        })
      }
    }
  }

  const onResize = () => rebuild()
  window.addEventListener('resize', onResize)
  rebuild()

  let tick = 0
  function draw() {
    tick += 0.005

    const style   = getComputedStyle(document.documentElement)
    const dotR    = style.getPropertyValue('--dot-r').trim()    || (isDark.value ? '255' : '27')
    const dotG    = style.getPropertyValue('--dot-g').trim()    || (isDark.value ? '255' : '60')
    const dotB    = style.getPropertyValue('--dot-b').trim()    || (isDark.value ? '255' : '120')

    // html owns the background colour — canvas is transparent with dots only
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const baseAlpha  = isDark.value ? 0.04 : 0.12
    const alphaRange = isDark.value ? 0.05 : 0.10

    for (const sq of squares) {
      const wave  = 0.5 + 0.5 * Math.sin(tick * sq.freq + sq.phase)
      const alpha = baseAlpha + alphaRange * wave
      const s     = SZ_MIN + (SZ_MAX - SZ_MIN) * wave
      ctx.fillStyle = `rgba(${dotR}, ${dotG}, ${dotB}, ${alpha.toFixed(3)})`
      ctx.fillRect(sq.x - s, sq.y - s, s * 2, s * 2)
    }
    rafId = requestAnimationFrame(draw)
  }
  draw()

  return () => {
    window.removeEventListener('resize', onResize)
    cancelAnimationFrame(rafId)
  }
}

// ─────────────────────────────────────────────────────────────────────
// 3. EDITABLE TIMER FIELDS
// ─────────────────────────────────────────────────────────────────────
const vHours   = ref(0)
const vMinutes = ref(0)
const vSeconds = ref(0)

const displayTexts = ref({
  hours: '00',
  minutes: '00',
  seconds: '00'
})

const fields = computed(() => [
  { key: 'hours',   label: t.value.hrs, vref: vHours,   min: 0, max: 99 },
  { key: 'minutes', label: t.value.min, vref: vMinutes, min: 0, max: 59 },
  { key: 'seconds', label: t.value.sec, vref: vSeconds, min: 0, max: 59 },
])

const inputRefs = ref([null, null, null])
const setRef = (el, idx) => { inputRefs.value[idx] = el || null }

watch(() => store.timeLeftMs, (ms) => {
  const total = Math.floor(Math.max(0, ms) / 1000)
  vHours.value   = Math.floor(total / 3600)
  vMinutes.value = Math.floor((total % 3600) / 60)
  vSeconds.value = total % 60
  
  const keys = ['hours', 'minutes', 'seconds']
  keys.forEach((key, i) => {
    const el = inputRefs.value[i]
    if (!el || el !== document.activeElement) {
      displayTexts.value[key] = pad(fields.value[i].vref.value)
    }
  })
}, { immediate: true })

function pad(n) { return String(Math.max(0, n)).padStart(2, '0') }

function commitEdit() {
  store.setTime(vHours.value, vMinutes.value, vSeconds.value)
}

function focusPrev(idx) {
  if (idx <= 0) return
  const el = inputRefs.value[idx - 1]
  if (!el) return
  el.focus()
  el.setSelectionRange(el.value.length, el.value.length)
}

function focusNext(idx) {
  if (idx >= fields.value.length - 1) return
  const el = inputRefs.value[idx + 1]
  if (!el) return
  el.focus()
  el.select()
}

function onFocus(e) { e.target.select() }

function onInput(e, field, idx) {
  let val = e.target.value.replace(/\D/g, '').slice(0, 2)
  e.target.value = val
  displayTexts.value[field.key] = val
  
  field.vref.value = Math.min(field.max, parseInt(val) || 0)
  commitEdit()
  if (val.length === 2) focusNext(idx)
}

function onKeydown(e, field, idx) {
  const el    = e.target
  const caret = el.selectionStart
  const len   = el.value.length

  switch (e.key) {
    case 'Backspace':
      if (caret === 0 && el.selectionEnd === 0 && idx > 0) {
        e.preventDefault()
        focusPrev(idx)
      }
      break
    case 'ArrowLeft':
      if (caret === 0 && idx > 0) { e.preventDefault(); focusPrev(idx) }
      break
    case 'ArrowRight':
      if (caret === len && idx < fields.value.length - 1) {
        e.preventDefault()
        const next = inputRefs.value[idx + 1]
        if (next) { next.focus(); next.setSelectionRange(0, 0) }
      }
      break
    case 'ArrowUp':
      e.preventDefault()
      field.vref.value = Math.min(field.max, (field.vref.value || 0) + 1)
      displayTexts.value[field.key] = pad(field.vref.value)
      commitEdit()
      break
    case 'ArrowDown':
      e.preventDefault()
      field.vref.value = Math.max(field.min, (field.vref.value || 0) - 1)
      displayTexts.value[field.key] = pad(field.vref.value)
      commitEdit()
      break
    case 'Enter':
      el.blur()
      break
    default:
      if (e.key.length === 1 && !/[0-9]/.test(e.key) && !e.ctrlKey && !e.metaKey) {
        e.preventDefault()
      }
  }
}

function onBlur(e, field) {
  const val = Math.min(field.max, Math.max(field.min, parseInt(e.target.value) || 0))
  field.vref.value = val
  displayTexts.value[field.key] = pad(val)
  commitEdit()
}

function handleStart() {
  requestNotificationPermission()
  store.start()
}
function handlePause() { store.pause() }
function handleReset() {
  store.reset()
  const total = Math.floor(Math.max(0, store.timeLeftMs) / 1000)
  vHours.value   = Math.floor(total / 3600)
  vMinutes.value = Math.floor((total % 3600) / 60)
  vSeconds.value = total % 60
  fields.value.forEach((field) => {
    displayTexts.value[field.key] = pad(field.vref.value)
  })
}

// ─────────────────────────────────────────────────────────────────────
// 4. GLOBAL KEY SHORTCUTS
// ─────────────────────────────────────────────────────────────────────
function onGlobalKey(e) {
  // Only fire if not typing inside an input
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return
  if (e.key === 'f' || e.key === 'F') toggleFullscreen()
}

// ── Lifecycle ─────────────────────────────────────────────────────────
let canvasCleanup = null
onMounted(() => {
  initTheme()
  requestNotificationPermission()
  canvasCleanup = initCanvas()
  document.addEventListener('fullscreenchange', onFullscreenChange)
  window.addEventListener('keydown', onGlobalKey)
})
onUnmounted(() => {
  if (canvasCleanup) canvasCleanup()
  document.removeEventListener('fullscreenchange', onFullscreenChange)
  window.removeEventListener('keydown', onGlobalKey)
})
</script>

<template>
  <div class="page-shell">

    <!-- Full-page canvas background (owns background colour) -->
    <canvas ref="canvasRef" style="position:fixed; inset:0; z-index:0; pointer-events:none;" />

    <!-- ══ 100vh: header + main ══════════════════════════════════════ -->
    <div class="viewport-block">

      <TmHeader />

      <!-- Background Watermark at main/footer boundary -->
      <img
        src="https://www.tm-robot.com/images/deco/green-shadow.png"
        class="bg-watermark"
        alt=""
        aria-hidden="true"
      />

      <main class="main-area">

        <!-- Title -->
        <div class="title-block">
          <p class="eyebrow">{{ t.eyebrow }}</p>
          <h1 class="main-title">
            {{ t.title.split('-')[0] }}<span style="color:var(--accent-color);">{{ t.title.includes('-') ? '-' + t.title.split('-').slice(1).join('-') : '' }}</span>
          </h1>
          <p class="main-subtitle">{{ t.subtitle }}</p>
          <img src="https://www.tm-robot.com/images/deco/vector-row.png" alt="" aria-hidden="true" class="title-underline" />
        </div>

        <!-- Timer digits -->
        <div class="timer-row">
          <template v-for="(field, i) in fields" :key="field.key">
            <div class="digit-group">
              <input
                :ref="el => setRef(el, i)"
                type="text"
                inputmode="numeric"
                maxlength="2"
                class="digit-input"
                :value="displayTexts[field.key]"
                :aria-label="field.label"
                :disabled="store.isRunning"
                @focus="onFocus"
                @input="onInput($event, field, i)"
                @keydown="onKeydown($event, field, i)"
                @blur="onBlur($event, field)"
              />
              <span class="unit-label">{{ field.label }}</span>
            </div>
            <span v-if="i < fields.length - 1" class="colon" aria-hidden="true">:</span>
          </template>
        </div>

        <!-- Progress bar -->
        <div class="prog-wrap">
          <div class="prog-track">
            <div class="prog-fill" :style="{ width: store.progress + '%' }"></div>
          </div>
          <div class="prog-labels">
            <span class="prog-label">
              {{ store.isDone ? t.done : store.isRunning ? t.running : t.standby }}
            </span>
            <span class="prog-label">{{ t.progress }}: {{ store.progress.toFixed(1) }}%</span>
          </div>
        </div>

        <!-- Controls -->
        <div class="controls">

          <button
            id="btn-start"
            class="ctrl-btn ctrl-btn--start"
            :disabled="store.isRunning || store.timeLeftMs <= 0"
            @click="handleStart"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
            {{ t.start }}
          </button>

          <button
            id="btn-pause"
            class="ctrl-btn ctrl-btn--pause"
            :disabled="!store.isRunning"
            @click="handlePause"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="6"  y="4" width="4" height="16"/>
              <rect x="14" y="4" width="4" height="16"/>
            </svg>
            {{ t.pause }}
          </button>

          <button
            id="btn-reset"
            class="ctrl-btn ctrl-btn--reset"
            :disabled="store.isRunning"
            @click="handleReset"
          >
            {{ t.reset }}
          </button>

        </div>

        <!-- Hint -->
        <p v-if="!store.isRunning && !store.isDone" class="edit-hint">
          {{ t.hint }}
        </p>

      </main>
    </div>
    <!-- ══ end 100vh ══════════════════════════════════════════════════ -->

    <TmFooter />

    <!-- Fixed action buttons: Fullscreen -->
    <div class="fab-group">
      <!-- Fullscreen toggle -->
      <button
        id="btn-fullscreen"
        class="theme-toggle"
        @click="toggleFullscreen"
        :aria-label="isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen (F)'"
        :title="isFullscreen ? 'Exit Fullscreen (Esc)' : 'Fullscreen (F)'"
      >
        <!-- Enter fullscreen icon -->
        <svg v-if="!isFullscreen" viewBox="0 0 24 24">
          <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
        </svg>
        <!-- Exit fullscreen icon -->
        <svg v-else viewBox="0 0 24 24">
          <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
        </svg>
      </button>
    </div>

  </div>
</template>

<style scoped>
.page-shell {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: transparent; /* Canvas handles background — no bleed-through */
}

.viewport-block {
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.25rem;
  padding: 2rem 1.5rem;
  position: relative;
  z-index: 1;
}

/* ── Watermark ─────────────────────────────────────────────────────── */
.bg-watermark {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.12;
  width: 300px;
  height: auto;
}
:global(html.light-mode) .bg-watermark {
  opacity: 0.20;
}

/* ── Title underline ───────────────────────────────────────────────── */
.title-underline {
  display: block;
  margin: 0.6rem auto 0;
  width: 124px;
  height: 4px;
  pointer-events: none;
}

/* ── Title ─────────────────────────────────────────────────────────── */
.title-block { text-align: center; }

.eyebrow {
  font-size: 0.6rem;
  letter-spacing: 0.25em;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-bottom: 0.6rem;
}

.main-title {
  font-size: clamp(1.75rem, 4.5vw, 3rem);
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 0.25rem;
}

.main-subtitle {
  font-size: clamp(0.875rem, 2vw, 1.25rem);
  font-weight: 300;
  color: var(--text-secondary);
  letter-spacing: 0.1em;
}

/* ── Timer row ─────────────────────────────────────────────────────── */
.timer-row {
  display: flex;
  align-items: flex-end;
}

.digit-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

/* ── Progress ──────────────────────────────────────────────────────── */
.prog-wrap {
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.prog-labels {
  display: flex;
  justify-content: space-between;
}

.prog-label {
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
}

/* ── Controls ──────────────────────────────────────────────────────── */
.controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}

/* ── Hint ──────────────────────────────────────────────────────────── */
.edit-hint {
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-muted);
  text-align: center;
}

/* ── FAB group (bottom-right fixed buttons) ────────────────────────── */
.fab-group {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  z-index: 100;
}
</style>
