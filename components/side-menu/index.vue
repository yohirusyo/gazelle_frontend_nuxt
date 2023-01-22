<template>
  <div class="flex flex-col justify-between items-center h-full">
    <div id="top-menu" class="flex-1 flex-col items-center">
      <Button
        icon="las la-pen"
        iconSize="md"
        class="p-1 bg-white rounded-lg h-8 w-8"
        @click="auth"
      >
      </Button>
      <Button
        icon="las la-pen"
        iconSize="md"
        class="p-1 bg-white rounded-lg h-8 w-8"
        @click="authStore.requestCurrentUser"
      >
      </Button>
    </div>
    <div id="bottom-menu" class="flex-1 flex-col justify-end items-center">
      <Button
        icon="las la-pen"
        iconSize="md"
        class="p-1 bg-white rounded-lg h-8 w-8"
        @click="authStore.logout"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~~/store/auth";

const authStore = useAuthStore();

const auth = () => {
  authStore.login({
    login: "test",
    password: "test",
  });
};
</script>
