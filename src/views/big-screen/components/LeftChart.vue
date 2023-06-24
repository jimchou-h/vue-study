<script setup lang="ts" name="left-chart">
import { ref } from 'vue'
import CommonChartWrap from './CommonChartWrap.vue'
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

// 定义漏斗图的数据
const funnelData = [
  { value: 100, name: 'Step 1' },
  { value: 80, name: 'Step 2' },
  { value: 60, name: 'Step 3' },
  { value: 40, name: 'Step 4' },
  { value: 20, name: 'Step 5' },
]

// 在漏斗图旁边绘制线段连接的自定义系列
const funnelOptionRef = ref({
  xAxis: {},
  yAxis: {},
  series: [
    // 自定义系列（线段连接）
    {
      z: 5,
      type: 'custom',
      data: [{}, {}], // 空数组，用于占位，不需要绘制任何元素
      // coordinateSystem: null,
      renderItem: function (params, api: any) {
        const dataIndex = [0, 3] // 需要连接的数据索引

        // 获取需要连接的数据点的坐标
        const startPoint = api.coord([dataIndex[0], 0])
        const endPoint = api.coord([dataIndex[1], 0])

        console.log(startPoint, endPoint)

        // 绘制线段连接
        return {
          type: 'line',
          shape: {
            x1: startPoint[0],
            y1: startPoint[1],
            x2: endPoint[0],
            y2: endPoint[1],
          },
          style: {
            stroke: 'red',
            lineWidth: 1,
          },
          z: 5, // 设置 z 轴数值较高，使线段在图形上层显示
        }
      },
    },
    // 漏斗图系列
    {
      type: 'funnel',
      data: funnelData,
      z: 1, // 设置 z 轴数值较低，使漏斗图在线段下层显示
    },
  ],
})
</script>

<template>
  <CommonChartWrap>
    <Echarts :option="optionRef" :height="heightRef"></Echarts>
  </CommonChartWrap>
  <CommonChartWrap>
    <Echarts :option="funnelOptionRef" :height="heightRef"></Echarts>
  </CommonChartWrap>
  <CommonChartWrap>
    <Echarts :option="optionRef" :height="heightRef"></Echarts>
  </CommonChartWrap>
</template>
