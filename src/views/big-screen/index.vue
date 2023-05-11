<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const handleNavToScreen = () => {
  router.push('/data-chart')
}
</script>

<template>
  <el-button @click="handleNavToScreen">跳转至可视化大屏</el-button>
</template>
