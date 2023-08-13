<script lang="ts" setup name="virtual-list-index">
import { ref } from 'vue'
import VirtualListComp from './components/virtual-list-comp.vue'

const list = ref(new Array(3000).fill(0).map((item, index) => index))
</script>

<template>
  <div class="h-[800px] w-[400px] leading-[40px] text-center border border-solid border-black">
    <VirtualListComp :list="list">
      <template #item="{ item }">
        <div class="h-[40px]">
          {{ item }}
        </div>
      </template>
    </VirtualListComp>
  </div>
</template>
