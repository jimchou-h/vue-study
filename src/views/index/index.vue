<script setup lang="ts">
import UsePinia from '@/components/UsePinia.vue'
import { localStorage } from '@/util/storage'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { debounce } from '@/util/util'

localStorage.set('name', '张三1')
const nameRef = ref(localStorage.get('name'))

const handleScroll = debounce(() => {
  console.log('触发')
}, 1000)
onMounted(() => {
  window.addEventListener('resize', handleScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleScroll)
})
</script>

<template>
  <div>
    <el-icon color="red">
      <Fold style="fill: red"></Fold>
    </el-icon>
  </div>
  {{ nameRef }}
  <UsePinia color="red"></UsePinia>
</template>

<style lang="scss" scoped></style>
