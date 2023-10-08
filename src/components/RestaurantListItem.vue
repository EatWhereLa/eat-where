<script setup lang="ts">
import GenericButton from "@/components/GenericButton.vue";

const props = defineProps({
  // foo: { type: String, required: true },
  title: { type: String },
  imgSrc: { type: String },
  tags: { type: Array<String>, required: false },
  price: { type: Number, required: false },
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
        :src="imgSrc"
        alt="Image not found"
        class="absolute object-cover m-auto w-full h-full aspect-square"
      />
    </div>

    <div class="inline-flex flex-col justify-between w-full">
      <div class="inline-flex flex-col">
        <div class="inline-flex align-center justify-between mb-1">
          <h5 class="font-semibold text-black">{{ title }}</h5>
          <!-- <va-icon
            name="bookmark_outline"
            v-if="$route.name !== 'restaurantDetail'"
          /> -->
        </div>

        <!-- <ul v-if="tags" class="text-gray-secondary text-xs">
          <li class="inline mr-2">Burger</li>
          <li class="inline before:content-['•'] before:mr-1 before:ml-1">
            Fastfood
          </li>
          <li class="inline before:content-['•'] before:mr-1 before:ml-1">
            Halal
          </li>
        </ul> -->

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
  </div>
</template>
