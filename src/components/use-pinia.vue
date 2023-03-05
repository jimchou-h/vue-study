<template>
  <div>
    {{ userStore.name }}
    {{ $attrs }}
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()

userStore.updateNameLate('李四')
</script>
