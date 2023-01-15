<template>
    <div class="flex flex-row p-2  flex-1">
        <div class="flex flex-col mr-2">
            <i class="las la-list la-lg p-3 rounded-md hover:bg-blue-200 transition-all" :class="{'text-blue-700' : !isEditing}" @click="isEditing = false"></i>
            <i class="las la-edit la-lg p-3 rounded-md hover:bg-blue-200 transition-all" :class="{'text-blue-700' : isEditing}" @click="isEditing = true"></i>
        </div>
        <div class="flex-1  border-black border rounded-r-lg h-full">
            <div v-if="!isEditing">
                content 1
            </div>
            <div v-else>
                content 2
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const isEditing = ref(false);
</script>