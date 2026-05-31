import { ref, computed } from 'vue'

// Module-level singleton so all components share the same locale
const locale = ref('zh-hant')

const messages = {
  'zh-hant': {
    eyebrow:  'TECHMAN ROBOT · 能力認證系統',
    title:    'TM達明-AI協作',
    subtitle: '機器人能力檢定',
    hrs: '時', min: '分', sec: '秒',
    start: '開始', pause: '暫停', reset: '重置',
    standby: '待機中', running: '計時中…', done: '計時結束',
    hint: '點擊編輯 · 輸滿自動跳欄 · ← → 切換 · ↑↓ 增減',
    progress: '進度',
  },
  'en': {
    eyebrow:  'TECHMAN ROBOT · CERTIFICATION SYSTEM',
    title:    'TM Cobot-AI Collab',
    subtitle: 'Robot Certification',
    hrs: 'HRS', min: 'MIN', sec: 'SEC',
    start: 'Start', pause: 'Pause', reset: 'Reset',
    standby: 'Standby', running: 'Running…', done: 'Time Up',
    hint: 'Click to edit · 2 digits auto-advance · ← → switch · ↑↓ adjust',
    progress: 'Progress',
  },
  'zh-hans': {
    eyebrow:  'TECHMAN ROBOT · 能力认证系统',
    title:    'TM达明-AI协作',
    subtitle: '机器人能力认证',
    hrs: '时', min: '分', sec: '秒',
    start: '开始', pause: '暂停', reset: '重置',
    standby: '待机中', running: '计时中…', done: '计时结束',
    hint: '点击编辑 · 输满自动跳栏 · ← → 切换 · ↑↓ 增减',
    progress: '进度',
  },
  'de': {
    eyebrow:  'TECHMAN ROBOT · ZERTIFIZIERUNGSSYSTEM',
    title:    'TM Cobot-KI Kooperation',
    subtitle: 'Roboter-Zertifizierung',
    hrs: 'STD', min: 'MIN', sec: 'SEK',
    start: 'Start', pause: 'Pause', reset: 'Reset',
    standby: 'Bereit', running: 'Läuft…', done: 'Zeit abgelaufen',
    hint: 'Klicken · 2 Ziffern → nächstes Feld · ← → wechseln · ↑↓ anpassen',
    progress: 'Fortschritt',
  },
  'ja': {
    eyebrow:  'テックマンロボット · 技能認定システム',
    title:    'TMコボット-AI協働',
    subtitle: 'ロボット技能認定',
    hrs: '時間', min: '分', sec: '秒',
    start: '開始', pause: '一時停止', reset: 'リセット',
    standby: '待機中', running: 'カウント中…', done: 'タイムアップ',
    hint: 'クリックして編集 · 2桁で自動移動 · ← → 切替 · ↑↓ 増減',
    progress: '進捗',
  },
  'ko': {
    eyebrow:  '테크맨 로봇 · 능력 인증 시스템',
    title:    'TM 코봇-AI 협업',
    subtitle: '로봇 능력 인증',
    hrs: '시간', min: '분', sec: '초',
    start: '시작', pause: '일시정지', reset: '초기화',
    standby: '대기 중', running: '카운트 중…', done: '시간 종료',
    hint: '클릭하여 편집 · 2자리 자동이동 · ← → 전환 · ↑↓ 조절',
    progress: '진행률',
  },
}

export function useI18n() {
  const t = computed(() => messages[locale.value] ?? messages['zh-hant'])
  function setLocale(lang) {
    if (messages[lang]) locale.value = lang
  }
  return { locale, t, setLocale }
}
