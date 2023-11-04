<script setup lang="ts">
import { ref, watch, type Ref, onMounted, defineEmits } from "vue";
import { useToast } from "vuestic-ui";
import GenericButton from "./GenericButton.vue";
import ky from "ky";

import type { Review, RestaurantDetails } from "@/types/RestaurantDetails";
import type { Restaurant } from "@/types/Restaurant";
import ReviewForm from "@/components/ReviewForm.vue";
import ReviewItem from "@/components/ReviewItem.vue";
import ReservationModal from "@/components/ReservationModal.vue";
import BookingModal from "@/components/BookingModal.vue";
import dayjs from "dayjs";

import { useRoute } from "vue-router";
const route = useRoute();

import { useVoteTimingsStore } from "@/stores/voteTimings";
import { useAuthStore } from "@/stores/auth";

const voteTimingsStore = useVoteTimingsStore();
const authStore = useAuthStore();

const { init } = useToast();

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

const showModalValues = ref({
  title: "",
  placeId: "",
  periods: [
    {
      close: { day: 0, time: "" },
      open: { day: 0, time: "" },
    },
  ],
  show: false,
  mostFreqDate: "",
  mostFreqTime: "",
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
  const URL = `${API_URL}/review/restaurant?place_id=${props.placeId}`;
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
  
  if (authStore.username !== "") {
    const clashes = userTimingClash();
    if (clashes) {
      init({
                message: 'Yay this fits your preference!',
                color: 'success',
            });
    } else {
      init({
          message: 'Oops this doesnt fit your preference!',
          color: 'danger',
        });
    }
  }
});

const updateReviews = async () => {
  appReviews.value = await fetchPlaceReviews();
};

const showForm = () => {
  return route.path === '/activity';
}

const showReservation = () => {
  if (authStore.username === "") {
    return false;
  }
  return route.path === '/results';
}

const userTimingClash = (): boolean => {
  const userTiming = voteTimingsStore.getVoteTiming(authStore.username);
  const newTiming = userTiming.date.split('/').reverse().join('-');
  const dayOfWeek = dayjs(newTiming).day();

  // Convert current time to a number for easier comparison
  const currentTimeNumber = parseInt(userTiming.time, 10);

  // Iterate over each opening hour period
  for (const period of modalValues.value.openingHours.periods) {
    // Check if the current day matches the opening day
    if (dayOfWeek === period.open.day) {
      // Convert times to numbers for easier comparison
      const openTimeNumber = parseInt(period.open.time, 10);
      const closeTimeNumber = parseInt(period.close.time, 10);

      // Check if the current time is within the open and close times
      if (currentTimeNumber >= openTimeNumber && currentTimeNumber <= closeTimeNumber) {
        return true; // The place is open
      }
    }
  }

  return false;
}

const getCommonTimeSlot = () => {
  
  const dateTimeFrequency: { [key: string]: number } = {};

  // Populate the frequency map
  voteTimingsStore.voteTimings.forEach((activity) => {
    const dateTimeKey = `${activity.date}-${activity.time}`;
    if (!dateTimeFrequency[dateTimeKey]) {
      dateTimeFrequency[dateTimeKey] = 1;
    } else {
      dateTimeFrequency[dateTimeKey]++;
    }
  });

  // Find the most frequent date-time combination
  let mostFrequentDateTime = {
    date: "",
    time: "",
  };
  let maxFrequency = 0;

  for (const [key, frequency] of Object.entries(dateTimeFrequency)) {
    if (frequency >= maxFrequency) {
      maxFrequency = frequency;
      const [date, time] = key.split('-');
      mostFrequentDateTime = { date, time };
    }
  }

  showModalValues.value.mostFreqDate = mostFrequentDateTime.date;
  showModalValues.value.mostFreqTime = mostFrequentDateTime.time;

}


const handleModal = (
  placeId: Restaurant["place_id"],
  title: Restaurant["name"],
  openingHours: RestaurantDetails["current_opening_hours"]["periods"],
  show: boolean
) => {
  showModalValues.value.placeId = placeId;
  showModalValues.value.title = title;
  showModalValues.value.periods = openingHours;
  showModalValues.value.show = show;

  if(placeId !== "" && voteTimingsStore.voteTimings.length !== 0) {
    getCommonTimeSlot()
  }
};
</script>

<template>
    <va-modal
      v-model="showModalValues.show"
      hide-default-actions
      class="mx-auto"
      size="large"
      closeButton
    >
      <ReservationModal
        :title="showModalValues.title"
        :place-id="showModalValues.placeId"
        :opening-hours="showModalValues.periods"
        v-if="voteTimingsStore.voteTimings.length === 0"
        @closeModal="
          handleModal('', '', [
            {
              close: { day: 0, time: '' },
              open: { day: 0, time: '' },
            },
          ], false)
        "
      />
      <BookingModal
        :title="showModalValues.title"
        :place-id="showModalValues.placeId"
        :opening-hours="showModalValues.periods"
        :booking-date="showModalValues.mostFreqDate"
        :booking-time="showModalValues.mostFreqTime"
        v-else
        @closeFreqModal=" handleModal('', '', [
            {
              close: { day: 0, time: '' },
              open: { day: 0, time: '' },
            },
          ], false)"
        @closebookingmodal=" handleModal('', '', [
            {
              close: { day: 0, time: '' },
              open: { day: 0, time: '' },
            },
          ], false)"
      />
    </va-modal>

      <va-icon
        name="attach_money"
        size="1.8rem"
        class="text-primary w-4 mr-2 float-left mb-3"
      />
    </div>
    <va-card class="w-4/6 mx-auto p-4 mt-[-40px]">
      <va-card-content>
        <h3 class="pb-6 lg:text-3xl sm:text-2xl text-lg font-semibold">{{ title }}</h3>
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
        <p class="mt-1.5"> {{ modalValues.rating }}/5</p>
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
        <generic-button v-if="showReservation() && modalValues.reservable"
          class="inline-flex align-center gap-2 text-primary mt-3 p-2 border-2 border-current hover:bg-primary hover:text-white ease-in duration-300"
          padding="p-0"
          @click="
            handleModal(
              placeId,
              title,
              modalValues.openingHours.periods,
              true,
            )
          "
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
    <ReviewForm :place-id="placeId" :title="title"
    @submittedForm="updateReviews()"
    v-if="showForm()"
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
