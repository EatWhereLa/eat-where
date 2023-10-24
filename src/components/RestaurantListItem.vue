<script setup lang="ts">
import GenericButton from "@/components/GenericButton.vue";

const props = defineProps({
  // foo: { type: String, required: true },
  title: { type: String },
  imgSrc: { type: String },
  tags: { type: Array<String>, required: false },
  price: { type: Number, required: false },
  rating: { type: Number },
  distance: { type: String },
  time: { type: String },
});
</script>

<template>
    <div class="relative flex w-full max-w-[48rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md" style="max-height: 200px;">
    <div class="relative w-2/5 shrink-0 overflow-hidden bg-white bg-clip-border text-gray-700">
      <img :src="imgSrc" alt="Image not found" class="h-full w-full object-cover rounded-xl rounded-r-none" />
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
