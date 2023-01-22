<template>
  <div class="flex flex-col h-screen">
    <div class="h-12 bg-white border-b-black border-b flex">
      <div
        class="
          w-12
          h-12
          border-r-black border-r
          flex
          items-center
          justify-center
        "
      >
        <img src="favicon.ico" class="w-10 h-10" />
      </div>
      <div class="flex-1 flex items-center justify-between">
        <div class="text-2xl font-normal ml-2">Автотранспортное Управление</div>
        <HeaderUserData />
      </div>
    </div>
    <div class="flex flex-row flex-1">
      <div class="w-12 border-r-black border-r">
        <SideMenu />
      </div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from "~~/store/auth";

const authStore = useAuthStore();

authStore.requestCurrentUser();
</script>
