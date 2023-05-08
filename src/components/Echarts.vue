<script setup lang="ts">
import { PropType, provide } from 'vue'
import { ECBasicOption } from 'echarts/types/dist/shared'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent])

provide(THEME_KEY, 'light')

const props = defineProps({
  option: {
    type: Object as PropType<ECBasicOption>,
    required: true,
  },
  width: {
    type: [String, Number],
    default: '100%',
  },
  height: {
    type: [String, Number],
    required: true,
  },
})
</script>

<template>
  <div class="chart-container" :style="{ width, height }">
    <VChart :option="props.option" :resize="true" />
  </div>
</template>
