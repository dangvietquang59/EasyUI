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
    <transition name="dropdown-fade">
      <ul
        v-if="isOpen"
        class="absolute top-[100%] z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
      >
        <li
          v-for="option in options"
          :key="option.value"
          @click.stop="selectOption(option.value)"
          class="px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-700"
          :class="{ 'relative font-semibold': option.value === modelValue }"
        >
          {{ option.label }}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2"
            viewBox="0 0 20 20"
            fill="currentColor"
            v-if="option.value === modelValue"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8.25 8.25a1 1 0 01-1.414 0l-4.25-4.25a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </li>
      </ul>
    </transition>
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
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  @apply transition-all duration-200;
}
.dropdown-fade-enter-from {
  @apply opacity-0 -translate-y-2;
}
.dropdown-fade-enter-to {
  @apply opacity-100 translate-y-0;
}
.dropdown-fade-leave-from {
  @apply opacity-100 translate-y-0;
}
.dropdown-fade-leave-to {
  @apply opacity-0 -translate-y-2;
}
</style>
