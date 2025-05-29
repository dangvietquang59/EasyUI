<script setup lang="ts">
import { ref } from "vue";
import { VButton, VDropdown } from ".";

const options = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

const selectedOption = ref("");
</script>

<template>
  <div class="flex flex-col gap-2">
    <h1 class="text-2xl font-bold">Button</h1>
    <div class="flex items-center gap-2">
      <VButton variant="primary" size="sm">Demo button</VButton>
      <VButton variant="secondary" size="sm">Demo button</VButton>
      <VButton variant="danger" size="sm">Demo button</VButton>
      <VButton variant="success" size="sm">Demo button</VButton>
      <VButton variant="warning" size="sm">Demo button</VButton>
      <VButton variant="outline" size="sm">Demo button</VButton>
    </div>
  </div>
  <div class="flex flex-col gap-2">
    <h1 class="text-2xl font-bold">Dropdown</h1>
    <div class="flex items-center gap-2">
      <VDropdown
        v-model="selectedOption"
        :options="options"
        label="Select an option"
        placeholder="Choose"
      />
    </div>
  </div>
</template>
