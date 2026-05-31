<script setup>
import { useI18n } from '../i18n.js'

const { locale, setLocale } = useI18n()

const langOptions = [
  { value: 'zh-hant', label: '繁體中文' },
  { value: 'en',      label: 'English'  },
  { value: 'zh-hans', label: '简体中文' },
  { value: 'de',      label: 'Deutsch'  },
  { value: 'ja',      label: '日本語'   },
  { value: 'ko',      label: '한국어'   },
]

const loginLabels = {
  'zh-hant': '登入', 'zh-hans': '登录', 'en': 'Login',
  'de': 'Anmelden', 'ja': 'ログイン', 'ko': '로그인',
}
const contactLabels = {
  'zh-hant': '聯絡方式', 'zh-hans': '联系我们', 'en': 'Contact',
  'de': 'Kontakt', 'ja': 'お問い合わせ', 'ko': '문의하기',
}

function onLangChange(e) { setLocale(e.target.value) }
</script>

<template>
  <header class="tm-header">
    <div class="tm-header__inner">

      <!-- Logo — links to official site -->
      <a
        href="https://www.tm-robot.com/zh-hant"
        target="_blank"
        rel="noopener noreferrer"
        class="tm-header__logo"
        aria-label="Techman Robot 官方網站"
      >
        <img
          src="https://www.tm-robot.com/images/logo.png"
          alt="Techman Robot"
          width="53"
          loading="eager"
          class="tm-logo-img"
        />
      </a>

      <!-- Spacer -->
      <div style="flex:1;"></div>

      <!-- Right: language selector + Login + Contact -->
      <div class="tm-header__right">

        <!-- Language selector (functional) -->
        <select
          id="lang-select"
          class="tm-header__lang"
          :value="locale"
          @change="onLangChange"
          aria-label="Language / 語言"
        >
          <option v-for="opt in langOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>

        <!-- Login — links to TM official login -->
        <a
          id="btn-login"
          href="https://www.tm-robot.com/zh-hant/login"
          target="_blank"
          rel="noopener noreferrer"
          class="tm-btn tm-btn--outline"
        >
          {{ loginLabels[locale] || '登入' }}
        </a>

        <!-- Contact — links to TM support page -->
        <a
          id="btn-contact"
          href="https://www.tm-robot.com/zh-hant/support/contact-us"
          target="_blank"
          rel="noopener noreferrer"
          class="tm-btn tm-btn--solid"
        >
          {{ contactLabels[locale] || '聯絡方式' }}
        </a>

      </div>
    </div>
  </header>
</template>

<style scoped>
.tm-header {
  width: 100%;
  background: var(--header-bg);
  border-bottom: 1px solid var(--header-border);
  flex-shrink: 0;
  position: relative;
  z-index: 50;
}

.tm-header__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 64px;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.tm-header__logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  text-decoration: none;
}

.tm-header__logo img {
  height: 28px;
  width: auto;
  display: block;
}

.tm-header__right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.tm-header__lang {
  background: transparent;
  border: 1px solid var(--header-border);
  border-radius: 4px;
  color: var(--text-primary);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  font-family: inherit;
  padding: 0.3rem 0.5rem;
  transition: border-color 0.15s;
}
.tm-header__lang:hover { border-color: var(--text-muted); }
.tm-header__lang option { background: var(--bg-color); color: var(--text-primary); }

.tm-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 1rem;
  border-radius: 4px;
  font-size: 0.8125rem;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  font-family: inherit;
  cursor: pointer;
}

.tm-btn--outline {
  border: 1px solid var(--btn-outline-border);
  color: var(--btn-outline-text);
  background: transparent;
}
.tm-btn--outline:hover {
  background: var(--btn-outline-hover);
  border-color: var(--btn-outline-hover);
  color: var(--btn-solid-text);
}

.tm-btn--solid {
  background: var(--btn-solid-bg);
  color: var(--btn-solid-text);
  border: 1px solid var(--btn-solid-bg);
}
.tm-btn--solid:hover {
  background: var(--btn-solid-hover);
  border-color: var(--btn-solid-hover);
}
</style>
