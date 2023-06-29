<script setup lang="ts" name="menu">
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
})
</script>

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
      <template v-for="menu of menus" :key="menu.path">
        <el-menu-item v-if="!menu.children" :index="menu.path">
          <component :is="menu.iconCompName" class="w-[18px] h-[18px] mr-[8px]"></component>
          <span>{{ menu.name }}</span>
        </el-menu-item>
        <el-sub-menu v-else :index="menu.path">
          <template #title>
            <component :is="menu.iconCompName" class="w-[18px] h-[18px] mr-[8px]"></component>
            <span>{{ menu.name }}</span>
          </template>
          <el-menu-item v-for="subMenu of menu.children" :key="subMenu.path" :index="subMenu.path">
            <component :is="subMenu.iconCompName" class="w-[18px] h-[18px] mr-[8px]"></component>
            <span>{{ subMenu.name }}</span>
          </el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  //   min-height: 100vh;
}
:deep(.el-menu) {
  border-right: none !important;
}
</style>
