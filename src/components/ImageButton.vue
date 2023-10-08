<script setup lang="ts">
const props = defineProps({
  // foo: { type: String, required: true },
  title: { type: String },
  imgSrc: { type: String },
});
</script>

<template>
  <div
    class="bg-white flex flex-col justify-center shadow-default rounded-3xl py-6 px-4 max-w-xs"
  >
    <img class="w-32 m-auto" :src="imgSrc" alt="" />
    <span class="text-primary text-center text-xl font-medium">{{
      title
    }}</span>
  </div>
</template>
