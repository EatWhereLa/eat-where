<script setup lang="ts">
import { ref, watch, type Ref, onMounted, defineEmits } from "vue";
import GenericButton from "./GenericButton.vue";
import ky from "ky";

import type { Review, RestaurantDetails } from "@/types/RestaurantDetails";
import type { Restaurant } from "@/types/Restaurant";
import RestaurantListItem from "@/components/RestaurantListItem.vue";
import ReviewForm from "@/components/ReviewForm.vue";
import ReviewItem from "@/components/ReviewItem.vue";
import dayjs from "dayjs";

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
  reservable: RestaurantDetails["reservable"];
}> = ref({
  description: "",
  location: "",
  priceLevel: "",
  reviews: [],
  openingHours: {
    open_now: false,
    weekday_text: [],
    periods: [{
        close: {
          day: 0,
          time: "",
        },
        open: {
          day: 0,
          time: "",
        },
    }],
    dine_in: false,
  },
});

const appReviews: Ref<Array<{
  place_id: string,
  rating: number,
  user_id: number,
  description: string,
}>> = ref([{
  place_id: "",
  rating: 0,
  user_id: 0,
  description: "",
}])

const restaurantStatus = ref("");

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

const fetchPlaceReviews = async () => {
  const URL = `https://ns6tzwwmuy.ap-southeast-1.awsapprunner.com/review/restaurant?place_id=${props.placeId}`;
  return (await ky(
    `https://corsproxy.syoongy.workers.dev/?apiurl=${encodeURIComponent(URL)}`,
  ).json()) as typeof appReviews.value;
};

const getClosingTime = () => {
  const timePeriods =  modalValues.value.openingHours.periods;
  const currentDay = dayjs().day();

  if (modalValues.value.openingHours.open_now) {
    for (let i = timePeriods.length - 1; i >= 0; i--) {
      if (timePeriods[i].close.day === currentDay) {
        restaurantStatus.value = `Open till: ${timePeriods[i].close.time}`;
        break;
      }
    }
  } else {
    restaurantStatus.value = "Opening Hours (Closed)"
  }
}

onMounted(async () => {
  const res = await fetchPlaceInfo();
  modalValues.value.description = res.result.editorial_summary?.overview;
  modalValues.value.location = res.result.formatted_address;
  modalValues.value.priceLevel = priceLevels[res.result.price_level];
  modalValues.value.reviews = res.result.reviews;
  modalValues.value.openingHours = res.result.current_opening_hours;
  
  getClosingTime();
  appReviews.value = await fetchPlaceReviews();
});
</script>

<template>
  <div class="p-6 min-h-[220px] min-w-40 flex flex-col justify-between">
    <va-modal
      v-model="showReservationModalValues.show"
      hide-default-actions
      class="mx-auto"
      size="large"
      closeButton
    >
      <ReservationModal
        :title="showReservationModalValues.title"
        :place-id="showReservationModalValues.placeId"
        :opening-hours="showReservationModalValues.periods"
        @closeModal="
          handleReservationModal(
            '', '', [{
              close: { day : 0, time: '' },
              open: { day : 0, time: '' },
            }]
          )
        "
      />
    </va-modal>

    <div style="background: black; width: 100%">
      <va-image
        :src="imgSrc"
        alt="Image not found"
        class="max-h-40 min-h-40"
        style="opacity: 0.4; object-fit: cover"
      />
    </div>
    <va-card class="w-4/6 mx-auto p-4 mt-[-40px]">
      <va-card-title><h3 class="lg:va-h3 sm:text-2xl va-h3">{{ title }}</h3></va-card-title>
      <va-card-content>
        <h3 class="pb-6 lg:text-3xl sm:text-2xl text-lg">{{ title }}</h3>
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
          name="edit"
          size="1.8rem"
          class="text-primary w-5 mr-2 float-left"
        />
        <p v-if="modalValues.description !== undefined">
          {{ modalValues.description }}
        </p>
        <p class="mt-2" v-else>No description found for location</p>

        <div class="clear-left"></div>

        <div v-if="modalValues.openingHours" class="mt-2">
          <va-collapse
            :header="restaurantStatus"
            icon="alarm"
            textColor="primary"
          >
            <ul v-for="day in modalValues.openingHours.weekday_text" class="mb-2">
                    <li class="my-1">{{ day }}</li>
            </ul>
          </va-collapse>
        </div>
      </va-card-content>
    </va-card>
  </div>
  <section class="mt-7">
    <ReviewForm 
      :place-id="placeId"
      :title="title"
    />

    <li v-for="(review, index) in appReviews"
    :key="index"
    class="list-none mt-7">
      <ReviewItem
        :name="review.user_id.toString()"
        :rating="review.rating"
        :text="review.description"
      />
    </li>

    <div class="my-5" v-if="!appReviews">
      <h4 class="va-h4 text-center">There are no current reviews</h4>
    </div>
    <h5 class="va-h5 text-center">Here's what Google reviewers are saying...</h5>
    <li
      v-for="(review, index) in modalValues.reviews.sort(
        (a, b) => b.time - a.time,
      )"
      :key="index"
      class="list-none mt-7"
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
