<script setup lang="ts">
import { ScreenContainerOptions } from '@/types/config'
import { PropType, nextTick, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  options: {
    type: Object as PropType<ScreenContainerOptions>,
    default: () => ({}),
  },
})

const refName = ref(null)
const refNameParent = ref(null)
// 容器宽高
const widthRef = ref(0)
const heightRef = ref(0)
// 视口宽高
const screenWidthRef = ref(0)
const screenHeightRef = ref(0)

const isReady = ref(false)

let dom: any, parentDom: any, observer
// 初始化宽高
const initSize = () => {
  return new Promise((resolve) => {
    nextTick(() => {
      dom = refName.value
      parentDom = refNameParent.value

      // 获取大屏的真实尺寸（不传值就是dom元素的宽高）
      widthRef.value = props.options?.width || dom.clientWidth
      heightRef.value = props.options?.height || dom.clientHeight

      // 获取屏幕尺寸，避免重复计算
      if (!screenWidthRef.value || !screenHeightRef.value) {
        screenWidthRef.value = window.screen.width
        screenHeightRef.value = window.screen.height
      }

      resolve(true)
    })
  })
}
// 更新宽高
const updateSize = () => {
  dom.style.width = `${widthRef.value || screenWidthRef.value}px`
  dom.style.height = `${heightRef.value || screenHeightRef.value}px`
}
// 更新缩放比例
const updateScale = () => {
  // window.innerWidth 获取当前展示区域的宽度
  const currentWidth = window.innerWidth

  // 获取大屏最终真实的宽度
  const realWidth = widthRef.value || screenWidthRef.value

  // 是否开启屏幕适配，不会按照比例
  const { screenFit } = props.options
  // 如果不想屏幕留白，而是自适应宽高的话
  let heightScale = 1
  // window.innerWidth 获取当前展示区域的宽度
  const currentHeight = window.innerHeight
  // 获取大屏最终真实的宽度
  const realHeight = heightRef.value || heightRef.value
  if (screenFit) {
    heightScale = currentHeight / realHeight
    // if (parentDom) {
    //   parentDom.style.height = dom.style.height = `${window.innerHeight}px` // 父容器宽度设置为原屏幕的宽度
    // }
  }

  // 算出缩放比例并赋值
  // 只需要根据宽度计算即可
  const scale = currentWidth / realWidth
  dom && (dom.style.transform = `scale(${scale}, ${screenFit ? heightScale : scale})`)
  if (parentDom) {
    parentDom.style.width = `${window.innerWidth}px` // 父容器宽度设置为原屏幕的宽度
    screenFit && (parentDom.style.height = `${window.innerHeight}px`) // 父容器宽度设置为原屏幕的宽度
  }
}
// 浏览器resize事件触发回调
const onResize = async () => {
  await initSize()
  await nextTick()
  updateScale()
}

onMounted(async () => {
  await initSize()
  updateSize()
  updateScale()
  window.addEventListener('resize', onResize)
  isReady.value = true
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <div
    id="screen-container-parent"
    ref="refNameParent"
    class="overflow-hidden"
    :style="{ 'overflow-y': props.options.screenFit ? 'hidden' : 'auto' }"
  >
    <div id="screen-container" ref="refName" class="origin-[0%_0%]">
      <template v-if="isReady">
        <slot></slot>
      </template>
    </div>
  </div>
</template>
