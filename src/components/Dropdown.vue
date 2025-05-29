<template>
  <div class="flex flex-col gap-2 relative w-56" ref="dropdownRoot">
    <label class="text-sm font-medium mb-1">{{ label }}</label>
    <div
      @click="toggleDropdown"
      class="border border-gray-300 rounded-md p-2 flex items-center justify-between cursor-pointer bg-white min-h-10"
      :class="{ 'ring-2 ring-blue-500': isOpen }"
    >
      <span class="truncate text-gray-700">
        {{ selectedLabel || placeholder || "" }}
      </span>
      <svg
        class="w-4 h-4 ml-2 text-gray-400"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>

    <ul
      v-if="isOpen"
      class="absolute top-[100%] z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
    >
      <li
        v-for="option in options"
        :key="option.value"
        @click.stop="selectOption(option.value)"
        class="px-4 py-2 cursor-pointer hover:bg-blue-100 text-gray-700"
        :class="{ 'bg-blue-50 font-semibold': option.value === value }"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onBeforeUnmount } from "vue";

export default defineComponent({
  name: "VDropdown",
  props: {
    options: {
      type: Array as () => { label: string; value: string }[],
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const isOpen = ref(false);
    const dropdownRoot = ref<HTMLElement | null>(null);

    const selectedLabel = computed(() => {
      const found = props.options.find((opt) => opt.value === props.modelValue);
      return found ? found.label : "";
    });

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
    };

    const selectOption = (val: string) => {
      emit("update:modelValue", val);
      isOpen.value = false;
    };

    const onClickOutside = (e: MouseEvent) => {
      if (
        dropdownRoot.value &&
        !dropdownRoot.value.contains(e.target as Node)
      ) {
        isOpen.value = false;
      }
    };

    watch(isOpen, (open) => {
      if (open) {
        document.addEventListener("click", onClickOutside, true);
      } else {
        document.removeEventListener("click", onClickOutside, true);
      }
    });

    onBeforeUnmount(() => {
      document.removeEventListener("click", onClickOutside, true);
    });

    return {
      isOpen,
      toggleDropdown,
      selectOption,
      selectedLabel,
      dropdownRoot,
    };
  },
});
</script>

<style scoped>
/* optional style */
</style>
