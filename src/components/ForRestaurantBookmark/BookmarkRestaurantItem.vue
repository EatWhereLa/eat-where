<script setup lang="ts">
import type { FilterRestaurant } from "@/types/Restaurant";

const { restaurant } = defineProps<{ restaurant: FilterRestaurant }>();
defineEmits<{ "toggle-bookmark": [] }>();
const count = 4;
</script>

<template>
  <div
    class="relative flex w-full max-w-[48rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
    v-if="restaurant"
  >
    <div
      class="relative w-2/5 shrink-0 overflow-hidden bg-white bg-clip-border text-gray-700"
    >
      <img
        class="h-full w-full object-cover rounded-xl rounded-r-none"
        :src="restaurant.imageUrl"
        :alt="restaurant.name"
      />
    </div>
    <div class="p-4 w-3/5">
      <h6 class="mb-2 text-2xl font-semibold flex items-center justify-between">
        <span>{{ restaurant.name }}</span>
        <div @click="$emit('toggle-bookmark')">
          <va-icon
            name="bookmark"
            :color="restaurant.bookmark ? 'primary' : ''"
          />
        </div>
      </h6>
      <h4 class="mb-2 text-sm">
        {{ restaurant.category.join(", ") }}
      </h4>
      <span class="text-xs flex flex-wrap gap-2 justify-between items-center">
        <div>
          <span v-for="index in count" :key="index">
            <va-icon name="star" color="primary" />
          </span>
        </div>
        <div>
          <va-icon name="directions_walk" color="primary" />
          2.4km
        </div>
        <div>
          <va-icon name="schedule" color="primary" />
          30min
        </div>
      </span>
    </div>
  </div>
</template>

<style scoped></style>
