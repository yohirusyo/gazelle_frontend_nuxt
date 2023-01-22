<template>
  <div class="flex flex-col items-end mr-2">
    <span>{{ authStore.fullname }}</span>
    <span class="text-sm text-gray-400">{{ authStore.role }}</span>
  </div>
</template>

<script setup lang="ts" >
import { useAuthStore } from "~~/store/auth";

const authStore = useAuthStore();
</script>
