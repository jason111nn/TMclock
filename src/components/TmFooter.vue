<script setup>
const menuGroups = [
  {
    title: '產品',
    links: [
      { label: 'TM AI Cobot',   href: 'https://www.tm-robot.com/zh-hant/product/tm-ai-cobot-series' },
      { label: 'TM AI Cobot S', href: 'https://www.tm-robot.com/zh-hant/product/tm-ai-cobot-s-series' },
      { label: 'TMflow',        href: 'https://www.tm-robot.com/zh-hant/product/tmflow' },
      { label: 'AI 視覺',       href: 'https://www.tm-robot.com/zh-hant/product/ai-vision' },
      { label: '配件',          href: 'https://www.tm-robot.com/zh-hant/product/add-ons/tm-plug' },
    ],
  },
  {
    title: '支援',
    links: [
      { label: 'TM Academy',  href: 'https://www.academy.tm-robot.com/' },
      { label: '下載中心',    href: 'https://www.tm-robot.com/zh-hant/support/download-center' },
      { label: '技術文件',    href: 'https://www.tm-robot.com/zh-hant/support/technical-document' },
      { label: '聯絡我們',    href: 'https://www.tm-robot.com/zh-hant/support/contact-us' },
      { label: '開發者專區',  href: 'https://www.tm-robot.com/zh-hant/support/developer-area' },
    ],
  },
  {
    title: '公司',
    links: [
      { label: '全球活動',    href: 'https://www.tm-robot.com/zh-hant/company/events' },
      { label: '達明新聞',    href: 'https://www.tm-robot.com/zh-hant/company/news' },
      { label: '招募資訊',    href: 'https://www.tm-robot.com/zh-hant/company/about/careers' },
      { label: '尋找經銷商',  href: 'https://www.tm-robot.com/zh-hant/company/about/search-for-distributor' },
    ],
  },
]

const socials = [
  { href: 'https://www.facebook.com/tmrobot', label: 'Facebook', svg: `<path d="M20.9,2H3.1C2.8,2,2.5,2.1,2.3,2.3S2,2.8,2,3.1v17.8c0,0.3,0.1,0.6,0.3,0.8C2.5,21.9,2.8,22,3.1,22h9.6v-7.7h-2.6v-3h2.6V9c-0.1-0.5,0-1.1,0.2-1.6c0.2-0.5,0.5-1,0.8-1.3c0.4-0.4,0.8-0.7,1.3-0.9C15.5,5,16,5,16.6,5c0.8,0,1.6,0,2.3,0.1v2.7h-1.6c-1.3,0-1.5,0.6-1.5,1.5v1.9h3l-0.4,3h-2.6V22h5.1c0.1,0,0.3,0,0.4-0.1c0.1-0.1,0.3-0.1,0.4-0.2c0.1-0.1,0.2-0.2,0.2-0.4C22,21.2,22,21,22,20.9V3.1c0-0.1,0-0.3-0.1-0.4c-0.1-0.1-0.1-0.3-0.2-0.4c-0.1-0.1-0.2-0.2-0.4-0.2C21.2,2,21,2,20.9,2z"/>` },
  { href: 'https://www.linkedin.com/company/techmanrobot/', label: 'LinkedIn', svg: `<path d="M20.6,2H3.4C2.6,2,2,2.6,2,3.4v17.1C2,21.4,2.6,22,3.4,22h17.1c0.8,0,1.4-0.6,1.4-1.4V3.4C22,2.6,21.4,2,20.6,2z M8,19.1h-3V9.6h3V19.1z M6.6,8.3c-1,0-1.7-0.8-1.7-1.7s0.8-1.7,1.7-1.7c0.9,0,1.7,0.8,1.7,1.7C8.3,7.5,7.5,8.3,6.6,8.3z M19.2,19.1h-3v-4.6c0-1.1,0-2.5-1.5-2.5c-1.5,0-1.8,1.2-1.8,2.5v4.7h-3V9.6h2.8v1.3h0c0.4-0.8,1.4-1.5,2.8-1.5c3,0,3.6,2,3.6,4.5V19.1z"/>` },
  { href: 'https://x.com/techmanrobot', label: 'X (Twitter)', svg: `<polygon points="7.5,6.8 15.3,17.2 16.4,17.2 8.8,6.8"/><path d="M20.5,2h-17C2.7,2,2,2.7,2,3.5v17C2,21.3,2.7,22,3.5,22h17c0.8,0,1.5-0.7,1.5-1.5v-17C22,2.7,21.3,2,20.5,2z M14.7,18.5l-3.4-4.6l-3.9,4.6H5.2l5-5.9L5,5.5h4.5l3,4.2L16,5.5h2.2L13.5,11l5.5,7.5H14.7z"/>` },
  { href: 'https://www.instagram.com/techmanrobot/', label: 'Instagram', svg: `<path d="M3.5,2C2.7,2,2,2.7,2,3.5v17C2,21.3,2.7,22,3.5,22h17c0.8,0,1.5-0.7,1.5-1.5v-17C22,2.7,21.3,2,20.5,2H3.5z M5.9,5.9C6.4,5.3,7.2,5,8,5h8c0.8,0,1.6,0.3,2.1,0.9C18.7,6.4,19,7.2,19,8v8c0,0.8-0.3,1.6-0.9,2.1C17.6,18.7,16.8,19,16,19H8c-0.8,0-1.6-0.3-2.1-0.9C5.3,17.6,5,16.8,5,16V8C5,7.2,5.3,6.4,5.9,5.9z M16.6,8.6c0.2-0.2,0.3-0.4,0.3-0.6c0-0.2-0.1-0.4-0.3-0.6c-0.2-0.2-0.4-0.3-0.6-0.3c-0.2,0-0.4,0.1-0.6,0.3c-0.2,0.2-0.3,0.4-0.3,0.6c0,0.2,0.1,0.4,0.3,0.6c0.2,0.2,0.4,0.3,0.6,0.3C16.2,8.9,16.4,8.8,16.6,8.6z M10.3,10.3c0.4-0.4,1.1-0.7,1.7-0.7c0.6,0,1.2,0.3,1.7,0.7c0.4,0.4,0.7,1.1,0.7,1.7s-0.3,1.2-0.7,1.7c-0.4,0.4-1.1,0.7-1.7,0.7c-0.6,0-1.2-0.3-1.7-0.7c-0.4-0.4-0.7-1.1-0.7-1.7S9.9,10.8,10.3,10.3z M9.5,9.5c-0.7,0.7-1,1.6-1,2.5c0,0.9,0.4,1.8,1,2.5c0.7,0.7,1.6,1,2.5,1c0.9,0,1.8-0.4,2.5-1c0.7-0.7,1-1.6,1-2.5c0-0.9-0.4-1.8-1-2.5c-0.7-0.7-1.6-1-2.5-1C11.1,8.5,10.2,8.8,9.5,9.5z"/>` },
  { href: 'https://www.youtube.com/@TechmanRobot', label: 'YouTube', svg: `<path d="M3.5,2C2.7,2,2,2.7,2,3.5v17C2,21.3,2.7,22,3.5,22h17c0.8,0,1.5-0.7,1.5-1.5v-17C22,2.7,21.3,2,20.5,2H3.5z M14.8,6.1C13.7,6,12.6,6,12.2,6h-0.4c-0.9,0-4.7,0-5.9,0.4C5.2,6.6,4.6,7.1,4.4,7.9C4,9,4,11.3,4,11.9v0.2c0,0.6,0,2.8,0.4,4c0.2,0.7,0.8,1.3,1.6,1.5c1.2,0.3,5,0.4,5.9,0.4H12l0.2,0c0.4,0,1.5,0,2.6-0.1l0.4,0c1.1-0.1,2.3-0.1,2.9-0.3c0.8-0.2,1.3-0.8,1.6-1.5c0.3-1.2,0.4-3.5,0.4-4V12l0-0.1c0-0.6,0-2.8-0.4-4c-0.2-0.7-0.8-1.3-1.6-1.5c-0.6-0.1-1.7-0.2-2.9-0.3L14.8,6.1z M15.2,12l-4.8,2.6V9.4L15.2,12z"/>` },
]
</script>

<template>
  <footer class="tm-footer">
    <div class="tm-footer__inner">

      <!-- Top: left info + right menu -->
      <div class="tm-footer__top">

        <!-- Left: logo + social + address -->
        <div class="tm-footer__brand">
          <img
            src="https://www.tm-robot.com/images/footer/footer-logo.png"
            alt="Techman Robot"
            width="180"
            class="tm-footer-logo-img"
            loading="lazy"
          />

          <div class="tm-footer__socials">
            <a
              v-for="s in socials"
              :key="s.label"
              :href="s.href"
              :aria-label="s.label"
              target="_blank"
              rel="noopener noreferrer"
              class="tm-footer__social-link"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" v-html="s.svg"></svg>
            </a>
          </div>

          <ul class="tm-footer__contact">
            <li>+886-3-3288350</li>
            <li>333411 桃園市龜山區華亞二路 58-2 號 5 樓</li>
          </ul>
        </div>

        <!-- Right: menu columns -->
        <div class="tm-footer__menus">
          <div v-for="group in menuGroups" :key="group.title" class="tm-footer__menu-col">
            <p class="tm-footer__menu-title">{{ group.title }}</p>
            <ul>
              <li v-for="link in group.links" :key="link.label">
                <a :href="link.href" target="_blank" rel="noopener" class="tm-footer__menu-link">
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>

      <!-- Divider -->
      <div class="tm-footer__divider"></div>

      <!-- Bottom bar -->
      <div class="tm-footer__bottom">
        <div class="tm-footer__terms">
          <a href="https://www.tm-robot.com/zh-hant/privacy" target="_blank" class="tm-footer__term-link">隱私權政策</a>
          <a href="https://www.tm-robot.com/zh-hant/service" target="_blank" class="tm-footer__term-link">服務條款</a>
        </div>
        <p class="tm-footer__copyright">Copyright © 2026 TECHMAN ROBOT INC. All rights reserved</p>
      </div>

    </div>
  </footer>
</template>

<style scoped>
.tm-footer {
  background: var(--header-bg);
  border-top: 1px solid var(--header-border);
  position: relative;
  z-index: 10;
}

.tm-footer__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.25rem 2rem;
}

.tm-footer__top {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

@media (min-width: 768px) {
  .tm-footer__top {
    flex-direction: row;
    justify-content: space-between;
  }
}

.tm-footer__brand {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.tm-footer__logo {
  display: block;
  height: auto;
}

.tm-footer__socials {
  display: flex;
  gap: 0.625rem;
  flex-wrap: wrap;
}

.tm-footer__social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid var(--btn-reset-border);
  color: var(--text-muted);
  fill: var(--text-muted);
  transition: color 0.15s, border-color 0.15s, fill 0.15s;
}

.tm-footer__social-link:hover {
  color: var(--text-primary);
  fill: var(--text-primary);
  border-color: var(--text-primary);
}

.tm-footer__social-link svg { fill: inherit; }

.tm-footer__contact {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.tm-footer__contact li {
  font-size: 0.8125rem;
  color: var(--text-muted);
  line-height: 1.6;
}

.tm-footer__menus {
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
}

.tm-footer__menu-col {
  min-width: 100px;
}

.tm-footer__menu-title {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.875rem;
  letter-spacing: 0.02em;
}

.tm-footer__menu-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tm-footer__menu-link {
  font-size: 0.8125rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.15s;
  display: block;
}

.tm-footer__menu-link:hover { color: var(--text-secondary); }

.tm-footer__divider {
  height: 1px;
  background: var(--header-border);
  margin: 2rem 0 1.5rem;
}

.tm-footer__bottom {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

@media (min-width: 640px) {
  .tm-footer__bottom {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.tm-footer__terms {
  display: flex;
  gap: 2rem;
}

.tm-footer__term-link {
  font-size: 0.8125rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.15s;
}

.tm-footer__term-link:hover { color: var(--text-secondary); }

.tm-footer__copyright {
  font-size: 0.75rem;
  color: var(--text-muted);
  letter-spacing: 0.01em;
}
</style>
