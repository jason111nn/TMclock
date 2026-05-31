<script setup>
const stations = [
  {
    id: 1,
    code: 'Station 01',
    title: 'TMflow 軌跡規劃',
    titleEn: 'Trajectory Planning',
    desc: '機器人手臂動作路徑規劃、點位設定與流程程式編撰',
    tags: ['TMflow', 'Path Planning', 'TCP'],
  },
  {
    id: 2,
    code: 'Station 02',
    title: '視覺辨識與 I/O 整合',
    titleEn: 'Vision & I/O Integration',
    desc: '影像辨識模型部署、數位 I/O 訊號整合與協作任務執行',
    tags: ['TM AI+', 'Computer Vision', 'DIO'],
  },
]
</script>

<template>
  <div class="w-full">
    <!-- Section label -->
    <div class="flex items-center gap-4 mb-5">
      <span class="font-mono text-[10px] text-[#4A4A5A] tracking-[0.2em] uppercase">
        Examination Stations
      </span>
      <div class="h-px flex-1 bg-[#1A1A1F]"></div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div
        v-for="station in stations"
        :key="station.id"
        class="station-card p-5"
      >
        <!-- Top row -->
        <div class="flex items-center justify-between mb-4">
          <span class="font-mono text-[10px] text-[#4A4A5A] tracking-widest uppercase">
            {{ station.code }}
          </span>
          <span class="font-mono text-[10px] text-[#4A4A5A] tracking-widest border border-[#222228] rounded px-2 py-0.5">
            READY
          </span>
        </div>

        <!-- Title block: size contrast -->
        <h3 class="font-sans font-semibold text-[#F2F2F5] text-base leading-snug mb-0.5">
          {{ station.title }}
        </h3>
        <p class="font-sans text-xs text-[#8A8A9A] mb-4">{{ station.titleEn }}</p>

        <!-- Description -->
        <p class="font-sans text-xs text-[#4A4A5A] leading-relaxed mb-4">
          {{ station.desc }}
        </p>

        <!-- Tags: plain text chips, no glow -->
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in station.tags"
            :key="tag"
            class="font-mono text-[10px] text-[#4A4A5A] border border-[#222228] rounded px-2 py-0.5 tracking-wide"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
