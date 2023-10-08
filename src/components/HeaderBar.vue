<script setup lang="ts">
import { RouterLink } from "vue-router";
import GenericButton from "./GenericButton.vue";
import { useUpvoteRestaurantsStore } from "../stores/upvoteRestaurants";
import { useCurrentLocationStore } from "@/stores/currentLocation";
import { useGeolocation } from "@/composables/useGeolocation";
import { storeToRefs } from "pinia";
import { useTimerStore } from "@/stores/timer";

import { computed } from "vue";

const upvotedRestaurants = useUpvoteRestaurantsStore();
const currentLocation = useCurrentLocationStore();
const logoUrl = new URL("/src/assets/logo.jpg", import.meta.url).href;

const { coords, address } = useGeolocation();
const timerStore = useTimerStore();
const { displayTime } = storeToRefs(timerStore);
const currPos = computed(() => ({
  lat: coords.value.lat,
  lng: coords.value.lng,
  address: address.value,
}));
</script>

<template>
  <header
    v-if="$route.meta.headerClass === ''"
    :class="$route.meta.headerClass"
    class="bg-white fixed max-w-[42rem] w-full left-2/4 -translate-x-2/4 pr-0 h-20 flex justify-center align-center z-50"
  >
    <h1
      v-show="$route.name === 'home'"
      class="uppercase text-3xl text-primary text-center font-semibold flex justify-center items-center"
    >
      <img class="max-w-[52px]" :src="logoUrl" />
      EatWhere!?
    </h1>
    <h1
      v-show="$route.path !== '/'"
      class="text-2xl text-dark text-center font-medium"
    >
      {{ $route.meta.title }}
    </h1>
  </header>
  <header
    v-else-if="$route.meta.headerClass === 'headerNoBackgroundWithButtonClose'"
    :class="$route.meta.headerClass"
    class="fixed max-w-[42rem] w-full left-2/4 -translate-x-2/4 p-5 h-20 grid align-center z-50"
  >
    <RouterLink :to="$route.meta.back as string">
      <generic-button padding="p-2 px-0" shadow-color="shadow-default">
        <va-icon name="close" class="text-primary" />
      </generic-button>
    </RouterLink>
  </header>
  <header
    v-else-if="$route.meta.headerClass === 'headerWithButtonClose'"
    :class="$route.meta.headerClass"
    class="bg-white fixed max-w-[42rem] w-full left-2/4 -translate-x-2/4 pr-0 p-5 h-20 grid align-center z-50"
  >
    <RouterLink :to="$route.meta.back as string">
      <generic-button padding="p-2">
        <va-icon name="close" class="text-primary" />
      </generic-button>
    </RouterLink>
  </header>
  <header
    v-else-if="$route.meta.headerClass === 'headerWithButtonBack'"
    :class="$route.meta.headerClass"
    class="bg-white fixed max-w-[42rem] w-full left-2/4 -translate-x-2/4 p-2.5 h-20 flex justify-between align-center z-50"
  >
    <div class="inline-flex justify-start">
      <RouterLink :to="$route.meta.back as string">
        <generic-button padding="p-2">
          <va-icon name="arrow_back" size="2rem" class="text-primary" />
        </generic-button>
      </RouterLink>
    </div>
    <h1
      v-show="$route.path !== '/'"
      class="text-2xl text-dark text-center font-medium"
    >
      {{ $route.meta.title }}
    </h1>
    <div class="inline-flex justify-end"></div>
  </header>
  <header
    v-else-if="$route.meta.headerClass === 'headerWithButtonBackAndUpvote'"
    :class="$route.meta.headerClass"
    class="bg-white fixed max-w-[42rem] w-full left-2/4 -translate-x-2/4 p-2.5 pr-3 h-20 flex justify-between align-center z-50"
  >
    <div class="inline-flex justify-start">
      <RouterLink :to="$route.meta.back as string">
        <generic-button padding="p-2">
          <va-icon name="arrow_back" class="text-primary" size="2rem" />
        </generic-button>
      </RouterLink>
    </div>
    <h1
      v-show="$route.path !== '/'"
      class="text-2xl text-dark text-center font-medium"
    >
      <p class="text-primary">{{ displayTime }}</p>
      <p v-if="currentLocation.address === ''" class="text-xs text-gray-500">
        <va-icon name="near_me" size="1rem" class="mr-2 text-primary" />
        {{ currPos.address }}
      </p>
      <p
        v-else-if="currentLocation.address !== ''"
        class="text-xs text-gray-500"
      >
        <va-icon name="near_me" size="1rem" class="mr-2 text-primary" />{{
          currentLocation.address
        }}
      </p>
    </h1>
    <div class="inline-flex justify-end">
      <RouterLink to="/vote/upvotes">
        <generic-button
          padding="py-2 px-3"
          bgColor="bg-primary"
          titleColor="text-white"
        >
          <va-icon name="arrow_upward" class="font-medium" />
          {{ upvotedRestaurants.upvoteCount }}
        </generic-button>
      </RouterLink>
    </div>
  </header>
  <header
    v-else-if="$route.meta.headerClass === 'headerWithTitleWithButtonClose'"
    :class="$route.meta.headerClass"
    class="bg-white fixed max-w-[42rem] w-full left-2/4 -translate-x-2/4 p-2.5 h-20 flex justify-between align-center z-50"
  >
    <div class="inline-flex justify-start">
      <RouterLink :to="$route.meta.back as string">
        <generic-button padding="p-2">
          <va-icon name="close" class="text-primary" size="2rem" />
        </generic-button>
      </RouterLink>
    </div>
    <h1
      v-show="$route.path !== '/'"
      class="text-2xl text-dark text-center font-medium"
    >
      {{ $route.meta.title }}
    </h1>
    <div class="inline-flex justify-end"></div>
  </header>
  <!-- </div> -->
</template>
