<script setup lang="ts">
import { ref, watch, type Ref, onMounted, defineEmits } from "vue";
import GenericButton from "./GenericButton.vue";
import ky from "ky";

import type { Review, RestaurantDetails } from "@/types/RestaurantDetails";
import RestaurantListItem from "@/components/RestaurantListItem.vue";
import ReviewItem from "@/components/ReviewItem.vue";

const MAP_KEY = import.meta.env.VITE_MAPS_API_KEY;

const props = defineProps({
  title: { type: String, required: true },
  placeId: { type: String, required: true },
  imgSrc: { type: String, required: true },
});

const emit = defineEmits();

const showCustomContent = ref(false);

const modalValues: Ref<{
  description?: string;
  location: string;
  priceLevel: string;
  reviews: Review[];
  openingHours: RestaurantDetails["current_opening_hours"];
}> = ref({
  description: "",
  location: "",
  priceLevel: "",
  reviews: [],
  openingHours: {
    open_now: false,
    weekday_text: [],
    dine_in: false,
  },
});

const priceLevels = [
  "Free",
  "Inexpensive",
  "Moderate",
  "Expensive",
  "Very Expensive",
];

const restaurantMenuItems = [
  {
    title: "Big Mac® Upsized Meal",
    imgSrc: "/src/assets/restaurant_menu_item_1.webp",
    price: 7.5,
  },
  {
    title: "Big Mac® Upsized Meal",
    imgSrc: "/src/assets/restaurant_menu_item_1.webp",
    price: 7.5,
  },
  {
    title: "Big Mac® Upsized Meal",
    imgSrc: "/src/assets/restaurant_menu_item_1.webp",
    price: 7.5,
  },
];

const fetchPlaceInfo = async () => {
  const URL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${props.placeId}&key=${MAP_KEY}`;
  return (await ky(
    `https://corsproxy.syoongy.workers.dev/?apiurl=${encodeURIComponent(URL)}`,
  ).json()) as {
    result: RestaurantDetails;
  };
};

onMounted(async () => {
  const res = await fetchPlaceInfo();
  console.log(res);
  modalValues.value.description = res.result.editorial_summary?.overview;
  modalValues.value.location = res.result.formatted_address;
  modalValues.value.priceLevel = priceLevels[res.result.price_level];
  modalValues.value.reviews = res.result.reviews;
  modalValues.value.openingHours = res.result.current_opening_hours;
});
</script>

<template>
  <div class="p-6 min-h-[220px] min-w-40 flex flex-col justify-between">
    <div style="background: black; width: 100%">
      <va-image
        :src="imgSrc"
        alt="Image not found"
        class="max-h-40 min-h-40"
        style="opacity: 0.4; object-fit: cover"
      />
    </div>
    <va-card class="w-4/6 mx-auto p-4 mt-[-40px]">
      <h3 class="text-3xl pb-6">{{ title }}</h3>
      <va-card-content>
        <va-icon
          name="location_on"
          size="1.8rem"
          class="text-primary w-5 mr-2 float-left mb-3"
        />
        <p class="mt-1.5">{{ modalValues.location }}</p>
        <div class="clear-left"></div>

        <va-icon
          name="attach_money"
          size="1.8rem"
          class="text-primary w-4 mr-2 float-left mb-3"
        />
        <p class="mt-1.5">{{ modalValues.priceLevel }}</p>
        <div class="clear-left"></div>

        <va-icon
          name="alarm"
          size="1.8rem"
          class="text-primary w-4 mr-3 float-left mb-1"
        />
        <p class="mt-1.5">Opening Hours</p>
        <div class="clear-left"></div>

        <ul v-for="day in modalValues.openingHours.weekday_text" class="mb-2">
          <li class="my-1">{{ day }}</li>
        </ul>
        <div class="clear-left"></div>

        <va-icon
          name="edit"
          size="1.8rem"
          class="text-primary w-5 mr-2 float-left"
        />
        <p v-if="modalValues.description !== undefined">
          {{ modalValues.description }}
        </p>
        <p class="mt-2" v-else>No description found for location</p>
      </va-card-content>
    </va-card>
  </div>
  <section class="mt-7">
    <va-accordion class="max-w-full p-4">
      <va-collapse :header="'Menu'" body-color="white">
        <template #body>
          <li
            v-for="(menuItem, index) in restaurantMenuItems"
            :key="index"
            class="list-none"
          >
            <RestaurantListItem
              :title="menuItem.title"
              :imgSrc="menuItem.imgSrc"
              :price="menuItem.price"
            />
          </li>
        </template>
      </va-collapse>
      <va-collapse :header="'Google Reviews'" body-color="white">
        <template #body>
          <li
            v-for="(review, index) in modalValues.reviews.sort(
              (a, b) => b.time - a.time,
            )"
            :key="index"
            class="list-none"
          >
            <ReviewItem
              :name="review.author_name"
              :imgUrl="review.profile_photo_url"
              :rating="review.rating"
              :time-description="review.relative_time_description"
              :text="review.text"
              :time="review.time"
            />
          </li>
        </template>
      </va-collapse>
      <va-collapse :header="'WhereToEat Reviews'" body-color="white">
        <template #body>
          <li
            v-for="(review, index) in modalValues.reviews.sort(
              (a, b) => b.time - a.time,
            )"
            :key="index"
            class="list-none"
          >
            <ReviewItem
              :name="review.author_name"
              :imgUrl="review.profile_photo_url"
              :rating="review.rating"
              :time-description="review.relative_time_description"
              :text="review.text"
              :time="review.time"
            />
          </li>
        </template>
      </va-collapse>
    </va-accordion>
  </section>
  <div class="self-end flex align-end">
    <generic-button
      titleColor="text-white"
      bgColor="bg-primary"
      @click="emit('closeModal')"
    >
      Close
    </generic-button>
  </div>
</template>

<style></style>
