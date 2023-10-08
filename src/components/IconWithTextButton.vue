<script setup lang="ts">
const props = defineProps({
  // foo: { type: String, required: true },
  title: { type: String },
  icon: { type: String },
});
</script>

<template>
  <div
    class="bg-primary flex flex-col justify-center shadow-default rounded-3xl py-6 px-6 max-w-xs gap-y-2"
  >
    <va-icon class="text-white" :name="icon" size="2.5rem" />
    <span class="text-white text-xl font-medium">{{ title }}</span>
  </div>
</template>
