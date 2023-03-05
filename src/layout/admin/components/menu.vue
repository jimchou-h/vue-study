<template>
  <el-scrollbar style="height: calc(100vh - 60px)">
    <el-menu
      :default-active="menus[0]?.path"
      class="el-menu-vertical-demo"
      text-color="#ffffff"
      background-color="#000000"
      :router="true"
      :collapse="isCollapse"
      :collapse-transition="false"
    >
      <!-- <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>测试1</span>
        </template>
      </el-sub-menu> -->
      <el-menu-item v-for="menu of menus" :key="menu.path" :index="menu.path">
        <component :is="menu.iconCompName" class="w-[18px] h-[18px] mr-[8px]"></component>
        <!-- <el-icon><fold /></el-icon> -->
        <i class="iconfont"></i>
        <span>{{ menu.name }}</span>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { MenuItem } from '@/types/config'
const props = defineProps<{
  isCollapse: boolean
  menus: MenuItem[]
}>()
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
