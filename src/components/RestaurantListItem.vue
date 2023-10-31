<script setup lang="ts">
import GenericButton from "@/components/GenericButton.vue";
import ky from "ky";
import { onMounted, ref } from "vue";

const props = defineProps({
  // foo: { type: String, required: true },
  title: { type: String },
  imgSrc: { type: String, required: true },
  tags: { type: Array<String>, required: false },
  price: { type: Number, required: false },
  rating: { type: Number },
  distance: { type: String },
  time: { type: String },
});

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

onMounted(async () => {
  await setImageURL(props.imgSrc);
});
</script>

<template>
  <div
    class="inline-flex gap-5 bg-white rounded-3xl shadow-default p-3 w-full mb-3"
  >
    <div
      class="relative rounded-3xl min-w-[115px] min-h-[115px] overflow-hidden"
    >
      <img
        :src="imageUrl"
        alt="Image not found"
        class="absolute object-cover m-auto w-full h-full aspect-square"
      />
    </div>
    <div class="p-4 w-3/5">
        <div class="mb-2 text-3xl font-semibold flex items-center justify-between">
          <h5 class="font-semibold text-black text-xl">{{ title }}</h5>
          <va-icon
            name="bookmark_outline"
            v-if="$route.name !== 'restaurantDetail'"
            class="flex justify-end"
          />
        </div>

        <ul v-if="tags" class="text-gray-secondary text-xs">
          <li class="inline mr-2">Burger</li>
          <li class="inline before:content-['•'] before:mr-1 before:ml-1">
            Fastfood
          </li>
          <li class="inline before:content-['•'] before:mr-1 before:ml-1">
            Halal
          </li>
        </ul>
      <span class="grid grid-cols-1 mb-8 mygrid text-xs lg:grid-cols-3">
        <div class="col-span-1">
          <span v-for="index in rating" :key="index">
            <font-awesome-icon icon="fa-regular fa-star" style="color: orange" />
          </span>
        </div>
        <div class="col-span-1 ">
          <font-awesome-icon icon="fa-solid fa-person" style="color: orange" />
          2.4km
        </div>
        <div class="col-span-1 ">
          <font-awesome-icon icon="fa-regular fa-clock" style="color: orange;" />
          30min
        </div>
      </span>

        <span v-if="price">
          {{
            price.toLocaleString("en", {
              style: "currency",
              currency: "USD",
            })
          }}
        </span>
      </div>

      <div class="ml-auto">
        <slot />
      </div>
    </div>

</template>
