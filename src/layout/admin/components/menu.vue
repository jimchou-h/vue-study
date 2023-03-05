<template>
  <el-scrollbar style="height: calc(100vh - 60px)">
    <el-menu
      :default-active="defaultActiveRef"
      class="el-menu-vertical-demo"
      text-color="#ffffff"
      background-color="#000000"
      :router="true"
      :collapse="isCollapse"
      :collapse-transition="false"
    >
      <el-menu-item v-for="menu of menus" :key="menu.path" :index="menu.path">
        <component :is="menu.iconCompName" class="w-[18px] h-[18px] mr-[8px]"></component>
        <span>{{ menu.name }}</span>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { MenuItem } from '@/types/config'
import { Ref, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
const props = defineProps<{
  isCollapse: boolean
  menus: MenuItem[]
}>()

const defaultActiveRef: Ref<string> = ref(props.menus[0]?.path)
const route = useRoute()
watchEffect(() => {
  defaultActiveRef.value = route.fullPath
  console.log(defaultActiveRef.value)
})
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  //   min-height: 100vh;
}
:deep(.el-menu) {
  border-right: none !important;
}
</style>
