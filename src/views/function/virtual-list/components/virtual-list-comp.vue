<script lang="ts" setup name="virtual-list-comp">
import { onBeforeMount, ref, computed, nextTick, Ref, onMounted } from 'vue'
import { throttle } from '@/util/util'

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})

// 容器高度
const containerHeight = ref(0)
// item项高度（默认取第一个）
const itemHeight = ref(0)
const getHeight = computed(() => {
  return itemHeight.value > 0 ? props.list.length * itemHeight.value + 'px' : 'auto'
})

// 真正展示的列表
const showList: Ref<any[]> = ref([])
// 需要渲染的起始项
const startIndex = ref(0)
const itemNum = computed(() => {
  if (containerHeight.value && itemHeight.value) {
    return Math.ceil(containerHeight.value / itemHeight.value)
  }
  return 50
})
const translateY = ref(0)

const initShowList = () => {
  showList.value = props.list.slice(startIndex.value, startIndex.value + itemNum.value)
}
// 获取盒子高度和item项高度
const initHeight = () => {
  containerHeight.value = document.querySelector('.virtual-list')?.clientHeight || 0
  itemHeight.value = document.querySelector('.virtual-list__item')?.clientHeight || 0
}

const handleScroll = (e: any) => {
  const { scrollTop } = e.target

  // 获取 virtual-list__transform 这个展示视口的偏移值
  translateY.value = scrollTop - (scrollTop % itemHeight.value)

  startIndex.value = Math.floor(scrollTop / itemHeight.value)

  initShowList()
}

onBeforeMount(async () => {
  initShowList()
  await nextTick()
  initHeight()
})
onMounted(() => {
  document
    .querySelector('.virtual-list__container')
    ?.addEventListener('scroll', throttle(handleScroll, 10))
})
</script>

<template>
  <div class="virtual-list h-full">
    <div
      class="virtual-list__container overflow-y-scroll"
      :style="{
        height: containerHeight + 'px',
      }"
    >
      <div class="virtual-list__scroll" :style="{ height: getHeight }">
        <div class="virtual-list__transform" :style="{ transform: `translateY(${translateY}px)` }">
          <div v-for="(item, index) of showList" :key="index" class="virtual-list__item">
            <slot name="item" :item="item"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
