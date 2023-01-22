<template>
  <div class="flex flex-row p-2 flex-1">
    <div class="flex flex-col mr-2 gap-x-3">
      <Button
        icon="las la-chalkboard"
        iconSize="md"
        class="p-1 bg-white rounded-lg h-8 w-8"
        :class="{ 'text-blue-700': !isEditing }"
        @click="isEditing = false"
      >
      </Button>
      <Button
        icon="las la-pen"
        iconSize="md"
        class="p-1 bg-white rounded-lg h-8 w-8"
        :class="{ 'text-blue-700': isEditing }"
        @click="isEditing = true"
      >
      </Button>
    </div>
    <div class="flex-1 border-black border rounded-r-lg h-full overflow-hidden">
      <div v-show="!isEditing" class="flex flex-col h-full overflow-auto">
        <!-- <p>Showing {{ isEven ? "even" : "odd" }} items</p>
        <button @click="toggle">Toggle Even/Odd</button>
        <div class="flex-1" ref="container">
          <div v-bind="containerProps" :style="`height: ${vScrollHeight}px`">
            <div v-bind="wrapperProps">
              <div v-for="item in list" :key="item.index">
                Row: {{ item.data }}
              </div>
            </div>
          </div>
        </div> -->
        <slot name="main" />
      </div>
      <div v-show="isEditing">123</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isEditing = ref(false);
</script>
