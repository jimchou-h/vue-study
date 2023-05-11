<script setup lang="ts">
import { ref } from 'vue'
import CommonChartWrap from './common-chart-wrap.vue'
import Echarts from '@/components/Echarts.vue'

const heightRef = ref('300px')
const optionRef = ref({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
    },
  ],
})
</script>

<template>
  <CommonChartWrap>
    <Echarts :option="optionRef" :height="heightRef"></Echarts>
  </CommonChartWrap>
  <CommonChartWrap>
    <Echarts :option="optionRef" :height="heightRef"></Echarts>
  </CommonChartWrap>
  <CommonChartWrap>
    <Echarts :option="optionRef" :height="heightRef"></Echarts>
  </CommonChartWrap>
</template>
