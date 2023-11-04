<script setup lang="ts">
import GenericButton from "@/components/GenericButton.vue";
import ky from "ky";
import { onMounted, ref } from "vue";

const props = defineProps<{
  title: string;
  imgSrc: string;
  tags: string[];
  price?: number;
  rating: number;
  distance: string;
  time?: string;
}>();

const crowd = ref(0);

onMounted(async () => {
  await setImageURL(props.imgSrc);
});

const imageUrl = ref("");

async function setImageURL(url: string) {
  try {
    const res = (await ky(url).json()) as { image_url: string };
    imageUrl.value = "https://" + res.image_url;
  } catch (error) {
    console.error(error);
  }
}

function generateCrowd(min: number, max: number) {
  crowd.value = Math.floor(Math.random() * (max - min + 1)) + min;
}

onMounted(async () => {
  await setImageURL(props.imgSrc);
  generateCrowd(1, 5);
});
</script>

<template>
  <div
    class="flex gap-5 bg-white rounded-3xl shadow-sm p-3 w-full md:max-w-xl mb-3"
  >
    <div class="flex items-center">
      <div class="w-32 h-32 overflow-hidden justify-center hidden md:flex">
        <img
          :src="imageUrl"
          alt="Image not found"
          class="object-cover m-auto aspect-square rounded-xl"
        />
      </div>
    </div>
    <div class="p-4 w-3/5 flex flex-col justify-center gap-2">
      <div
        class="mb-2 text-3xl font-semibold flex items-center justify-between"
      >
        <h5 class="font-semibold text-black text-xl">{{ title }}</h5>
      </div>

      <ul v-if="tags" class="text-gray-secondary text-xs flex gap-2">
        <li v-for="tag in tags" :key="tag">{{ tag }}</li>
      </ul>
      <span class="grid grid-cols-1 text-xs lg:grid-cols-3 gap-2">
        <div class="col-span-1">
          <va-icon name="location_on" color="primary" />
          {{ distance }}
        </div>
        <div class="col-span-1">
          <span v-for="index in Math.round(rating)" :key="index">
            <va-icon name="star" color="primary" />
          </span>
        </div>
        <div class="col-span-1">
          <span v-for="index in Math.round(crowd)" :key="index">
            <va-icon name="person" color="primary" />
          </span>
        </div>
      </span>

      <span v-if="price">
        {{
          price.toLocaleString("en", {
            style: "currency",
            currency: "SGD",
          })
        }}
      </span>
    </div>

    <div class="flex items-center">
      <div class="ml-auto flex flex-col justify-between h-full">
        <va-icon
          name="bookmark_outline"
          v-if="$route.name !== 'restaurantDetail'"
          class="flex justify-end"
        />
        <slot />
      </div>
    </div>
  </div>
</template>
