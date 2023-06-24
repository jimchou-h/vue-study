<script setup lang="ts">
import { onMounted, ref } from 'vue'

const mapRef = ref({})
const initMap = () => {
  mapRef.value = new (window as any).AMap.Map('map', {
    center: [116.397428, 39.90923],
    zoom: 13,
  })
}
onMounted(() => {
  initMap()
})
</script>

<template>
  <div id="map" class="h-full"></div>
</template>
