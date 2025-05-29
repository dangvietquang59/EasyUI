<template>
  <button
    :class="[
      'btn',
      `btn-${variant}`,
      `btn-${size}`,
      { 'btn-disabled': disabled },
      className,
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "VButton",
  props: {
    variant: {
      type: String,
      default: "primary",
      validator: (value: string) =>
        [
          "primary",
          "secondary",
          "danger",
          "success",
          "warning",
          "outline",
        ].includes(value),
    },
    size: {
      type: String,
      default: "md",
      validator: (value: string) => ["sm", "md", "lg"].includes(value),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: "",
    },
  },
});
</script>

<style>
.btn {
  @apply font-semibold rounded focus:outline-none hover:opacity-90 min-h-10 hover:border-transparent duration-300 transition-all;
}
.btn-primary {
  @apply bg-blue-600 text-white;
}
.btn-secondary {
  @apply bg-gray-600 text-white;
}
.btn-danger {
  @apply bg-red-600 text-white;
}
.btn-success {
  @apply bg-green-600 text-white;
}
.btn-warning {
  @apply bg-yellow-600 text-white;
}

.btn-outline {
  @apply border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white;
}
.btn-sm {
  @apply px-2 py-1 text-sm min-w-20;
}
.btn-md {
  @apply px-4 py-2 text-base min-w-24;
}
.btn-lg {
  @apply px-6 py-3 text-lg min-w-28;
}
.btn-disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style>
