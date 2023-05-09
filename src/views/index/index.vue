<script setup lang="ts">
import UsePinia from '@/components/UsePinia.vue'
import { localStorage } from '@/util/storage'
import { ref } from 'vue'

localStorage.set('name', '张三1')

const nameRef = ref(localStorage.get('name'))
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
