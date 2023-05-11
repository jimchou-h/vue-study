<script setup lang="ts">
import { ref } from 'vue'
import screenfull from 'screenfull'
import ScreenContainer from '@/components/ScreenContainer.vue'
import MapChart from './components/map-chart.vue'
import LeftChart from './components/left-chart.vue'
import RightChart from './components/right-chart.vue'

import { useRouter } from 'vue-router'

const router = useRouter()

// 全屏
const isFullscreenRef = ref(false)
const toggleFullScreen = () => {
  isFullscreenRef.value = !isFullscreenRef.value
  screenfull.toggle()
}

const handleReturn = () => {
  router.push('/admin/index')
}
</script>

<template>
  <div>
    <ScreenContainer :options="{ width: 1920, height: 1080, screenFit: true }">
      <div class="bg-[#101a3b] w-full h-full">
        <div class="page-header relative w-full h-[106px]">
          <img
            class="absolute w-[273px] top-[9px] left-1/2 translate-x-[-50%]"
            src="@/views/big-screen/imgs/screen_title.png"
            alt=""
          />
          <div class="custom-button right-[110px]" @click="toggleFullScreen">
            <el-icon style="margin-right: 5px">
              <FullScreen />
            </el-icon>
            {{ isFullscreenRef ? '退出全屏' : '全屏' }}
          </div>
          <div class="custom-button right-[30px]" @click="handleReturn">
            <el-icon style="margin-right: 5px">
              <Upload />
            </el-icon>
            返回
          </div>
        </div>
        <div class="page-inner flex p-[10px] h-[calc(100%-106px)]">
          <div class="flex-[0_0_400px]">
            <LeftChart></LeftChart>
          </div>
          <div class="flex-1 mx-[10px]">
            <MapChart></MapChart>
          </div>
          <div class="flex-[0_0_400px]">
            <RightChart></RightChart>
          </div>
        </div>
      </div>
    </ScreenContainer>
  </div>
</template>

<style lang="scss" scoped>
.custom-button {
  @apply absolute top-[16px] h-[26px] px-[10px] rounded-[2px] border-[1px] flex justify-center items-center text-[12px] font-bold cursor-pointer z-10;
  color: #b9ddff;
  background: rgba(185, 221, 255, 0.1);
}

.page-header {
  background-image: url('./imgs/screen_top.svg');
}
</style>
