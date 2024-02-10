<script setup lang="ts">
import { PropType, provide } from 'vue'
import type { ECBasicOption } from 'echarts/types/dist/shared'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, LineChart, FunnelChart, CustomChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  LineChart,
  ToolboxComponent,
  FunnelChart,
  CustomChart,
])

provide(THEME_KEY, 'light')

const props = defineProps({
  option: {
    type: Object as PropType<ECBasicOption>,
    required: true,
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '400px',
  },
})
</script>

<template>
  <div class="chart-container" :style="{ width, height }">
    <VChart class="w-full h-full" :option="props.option" autoresize />
  </div>
</template>
