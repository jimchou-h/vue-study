<script setup lang="ts" name="index">
import UsePinia from '@/components/UsePinia.vue'
import { localStorage } from '@/util/storage'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { debounce, showNotification } from '@/util/util'

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

// 发送通知
// const handleSendNotice = () => {
//   showNotification('这是一个通知', '这是通知的正文内容', '')
// }
</script>

<template>
  <div>
    <el-icon color="red">
      <Fold style="fill: red"></Fold>
    </el-icon>
  </div>
  {{ nameRef }}
  <UsePinia color="red"></UsePinia>
  <!-- <el-button @click="handleSendNotice">发送通知</el-button> -->
</template>

<style lang="scss" scoped></style>
