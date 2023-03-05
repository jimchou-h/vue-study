<template>
  <div class="common-layout">
    <el-container class="min-h-screen">
      <el-aside class="bg-primary text-white w-full" :width="asideWidthRef">
        <div class="logo w-full h-[60px]"></div>
        <Menu v-model:isCollapse="isCollapseRef" :menus="menus"></Menu>
      </el-aside>
      <el-container>
        <el-header class="bg-primary leading-[60px]">
          <div>
            <el-icon class="align-middle" color="#ffffff" size="24px" @click="handleCollapse">
              <Fold style="fill: red"></Fold>
            </el-icon>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { MenuItem } from '@/types/config'
import { Ref, ref, nextTick, reactive } from 'vue'
import Menu from './components/menu.vue'

const isCollapseRef: Ref<boolean> = ref(false)
const asideWidthRef: Ref<string> = ref('200px')

const menus: MenuItem[] = reactive([
  {
    name: '首页',
    path: '/admin/index',
    iconCompName: 'Edit',
  },
  {
    name: '可视化拖拽',
    path: '/admin/logic-flow',
    iconCompName: 'Edit',
  },
])

const handleCollapse = () => {
  isCollapseRef.value = !isCollapseRef.value
  nextTick((_: void) => {
    asideWidthRef.value = isCollapseRef.value ? '64px' : '200px'
  })
}
</script>

<style lang="scss" scoped>
:deep(.el-aside) {
  transition: width 0.1s;
  transform: translate3d(0, 0, 0);
}
</style>
