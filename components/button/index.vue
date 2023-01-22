<template>
  <button class="button-4" @click="click">
    <i
      :class="{ [props.icon]: props.icon, [props.iconSize]: props.iconSize }"
      v-if="props.icon"
    ></i>
    <slot />
  </button>
</template>

<script setup lang="ts">
export interface IButtonProps {
  icon: string | null;
  iconSize: "xs" | "sm" | "md" | "xl";
}

const emit = defineEmits<{
  (e: "click"): void;
}>();

const props = withDefaults(defineProps<IButtonProps>(), {
  iconSize: "md",
  icon: null,
});

const click = () => emit("click");
</script>

<style scoped>
.xs {
  width: 6px;
  height: 6px;
  font-size: 6px;
}

.sm {
  width: 12px;
  height: 12px;
  font-size: 12px;
}

.md {
  width: 24px;
  height: 24px;
  font-size: 24px;
}

.lg {
  width: 48px;
  height: 48px;
  font-size: 48px;
}

.button-4 {
  appearance: none;

  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  position: relative;
  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-4:hover {
  filter: brightness(85%);
  transition-duration: 0.1s;
}

/* .button-4:disabled {
  background-color: #fafbfc;
  color: #959da5;
  cursor: default;
} */

.button-4:active {
  filter: brightness(75%);
  transition: none 0s;
}

.button-4:focus {
  outline: 1px transparent;
}

.button-4:before {
  display: none;
}

.button-4:-webkit-details-marker {
  display: none;
}
</style>
