<script setup lang="ts">
import GenericButton from "@/components/GenericButton.vue";

const props = defineProps({
  name: { type: String },
  imgUrl: { type: String },
  rating: { type: Number },
  timeDescription: { type: String },
  text: { type: String },
  time: {type: Number }
});
</script>

<template>
  <div
    class="inline-flex gap-5 bg-white rounded-3xl shadow-default p-3 w-full mb-3"
  >
    <div
      class="relative rounded-3xl min-w-[115px] min-h-[115px] max-w-[115px] max-h-[115px] overflow-hidden"
    >
      <img
        :src="imgUrl"
        alt="Image not found"
        class="absolute object-cover m-auto w-full h-full aspect-square"
      />
    </div>

    <div class="w-full">
          <h5 class="font-semibold text-black">{{ name }}</h5>
          <p class="my-2">Rating: {{ rating }}</p>
          <p class="my-2">{{ text }}</p>
          <p class="italic">{{ timeDescription }}</p>
    </div>
  </div>
</template>
