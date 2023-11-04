<script setup lang="ts">
import { ref, watch, type Ref, onMounted, defineEmits } from "vue";
import GenericButton from "./GenericButton.vue";
import ky from "ky";

import type { Review, RestaurantDetails } from "@/types/RestaurantDetails";
import type { Restaurant } from "@/types/Restaurant";
import ReviewForm from "@/components/ReviewForm.vue";
import ReviewItem from "@/components/ReviewItem.vue";
import dayjs from "dayjs";

const API_URL = import.meta.env.VITE_API_URL;

const props = defineProps({
  title: { type: String, required: true },
  placeId: { type: String, required: true },
  imgSrc: { type: String, required: true },
});

const emit = defineEmits<{
  (e: "closeModal"): void;
}>();

const modalValues: Ref<{
  description?: string;
  location: string;
  priceLevel: string;
  reviews: Review[];
  rating: RestaurantDetails["rating"];
  openingHours: RestaurantDetails["current_opening_hours"];
  reservable: RestaurantDetails["reservable"];
}> = ref({
  description: "",
  location: "",
  priceLevel: "",
  reviews: [],
  rating: 0,
  openingHours: {
    open_now: false,
    weekday_text: [],
    periods: [
      {
        close: {
          day: 0,
          time: "",
        },
        open: {
          day: 0,
          time: "",
        },
      },
    ],
    dine_in: false,
  },
  reservable: false,
});

const showReservationModalValues = ref({
  title: "",
  placeId: "",
  periods: [
    {
      close: { day: 0, time: "" },
      open: { day: 0, time: "" },
    },
  ],
  show: false,
});

const appReviews: Ref<
  Array<{
    place_id: string;
    rating: number;
    user_id: number;
    description: string;
  }>
> = ref([
  {
    place_id: "",
    rating: 0,
    user_id: 0,
    description: "",
  },
]);

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
  const URL = `${API_URL}/google/place-details?place_id=${props.placeId}`;
  const res = (await ky(URL).json()) as { result: RestaurantDetails };
  return res.result;
};

const imageUrl = ref("");

async function setImageURL(url: string) {
  try {
    const res = (await ky(url).json()) as { image_url: string };
    imageUrl.value = "https://" + res.image_url;
  } catch (error) {
    console.error(error);
  }
}

const fetchPlaceReviews = async () => {
  const URL = `https://ns6tzwwmuy.ap-southeast-1.awsapprunner.com/review/restaurant?place_id=${props.placeId}`;
  return (await ky(
    `https://corsproxy.syoongy.workers.dev/?apiurl=${encodeURIComponent(URL)}`,
  ).json()) as typeof appReviews.value;
};

const getClosingTime = () => {
  const timePeriods = modalValues.value.openingHours.periods;
  const currentDay = dayjs().day();

  if (modalValues.value.openingHours.open_now) {
    for (let i = timePeriods.length - 1; i >= 0; i--) {
      if (timePeriods[i].close.day === currentDay) {
        restaurantStatus.value = `Open till: ${timePeriods[i].close.time}`;
        break;
      }
    }
  } else {
    restaurantStatus.value = "Opening Hours (Closed)";
  }
};

onMounted(async () => {
  await setImageURL(props.imgSrc);
  const res = await fetchPlaceInfo();
  modalValues.value.description = res.editorial_summary?.overview;
  modalValues.value.location = res.formatted_address;
  modalValues.value.priceLevel = priceLevels[res.price_level];
  modalValues.value.reviews = res.reviews;
  modalValues.value.openingHours = res.current_opening_hours;
  modalValues.value.rating = res.rating;

  modalValues.value.reservable = "reservable" in res ? res.reservable : false;

  getClosingTime();
  updateReviews();
});

const updateReviews = async () => {
  appReviews.value = await fetchPlaceReviews();
};

const handleReservationModal = (
  placeId: Restaurant["place_id"],
  title: Restaurant["name"],
  openingHours: RestaurantDetails["current_opening_hours"]["periods"],
) => {
  showReservationModalValues.value.placeId = placeId;
  showReservationModalValues.value.title = title;
  showReservationModalValues.value.periods = openingHours;
  showReservationModalValues.value.show =
    !showReservationModalValues.value.show;
};
</script>

<template>
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
        handleReservationModal('', '', [
          {
            close: { day: 0, time: '' },
            open: { day: 0, time: '' },
          },
        ])
      "
    />
  </va-modal>

  <div style="background: black; width: 100%">
    <va-image
      :src="imageUrl"
      alt="Image not found"
      class="max-h-40 min-h-40 opacity-40 object-cover w-full"
    />
  </div>
  <va-card class="w-4/6 mx-auto p-4 mt-[-40px]">
    <va-card-content>
      <h3 class="pb-6 lg:text-3xl sm:text-2xl text-lg font-semibold">
        {{ title }}
      </h3>
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
        name="star"
        size="1.8rem"
        class="text-primary w-5 mr-2 float-left mb-3"
      />
      <p class="mt-1.5">{{ modalValues.rating }}/5</p>
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
          <ul
            v-for="(day, idx) in modalValues.openingHours.weekday_text"
            :key="idx"
            class="mb-2"
          >
            <li class="my-1">{{ day }}</li>
          </ul>
        </va-collapse>
      </div>

      <div class="clear-left"></div>
      <generic-button
        v-if="modalValues.reservable"
        class="inline-flex align-center gap-2 text-primary mt-3 p-2 border-2 border-current hover:bg-primary hover:text-white ease-in duration-300"
        padding="p-0"
        @click="
          handleReservationModal(
            placeId,
            title,
            modalValues.openingHours.periods,
          )
        "
      >
        <va-icon name="table_bar" size="2rem" />
        <span class="font-semibold"> Reservation </span>
      </generic-button>
    </va-card-content>
  </va-card>
  <section class="mt-7">
    <ReviewForm
      :place-id="placeId"
      :title="title"
      @submittedForm="updateReviews()"
    />

    <li
      v-for="(review, index) in appReviews"
      :key="index"
      class="list-none mt-7"
    >
      <ReviewItem
        :name="review.user_id.toString()"
        :rating="review.rating"
        :text="review.description"
      />
    </li>

    <div class="my-5" v-if="appReviews.length == 0">
      <h4 class="va-h4 text-center">There are no recent reviews</h4>
    </div>
    <h5 class="va-h5 text-center mt-7">
      Here's what Google reviewers are saying...
    </h5>
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
