<script setup lang="ts" name="common-chart-wrap">
const props = defineProps({
  height: {
    type: [String, Number],
    default: '300px',
  },
})
</script>

<template>
  <div class="chart-wrapper">
    <div class="chart-title pl-[30px] text-[16px] text-[#ffffff]">测试图表</div>
    <div class="chart-inner" :style="{ height: props.height }">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chart-wrapper {
  .chart-title {
    background-image: url('../imgs/screen_card_large.svg');
  }
}
</style>
