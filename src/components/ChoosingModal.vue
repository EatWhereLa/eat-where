<script setup lang="ts">
import { ref, watch, type Ref, onMounted, defineEmits } from "vue";
import GenericButton from "./GenericButton.vue";

import type { Restaurant } from "@/types/Restaurant";

import BookingModal from "@/components/BookingModal.vue";
import ReservationModal from "@/components/ReservationModal.vue";

import { useVoteTimingsStore } from "@/stores/voteTimings";
import type { RestaurantDetails, Review } from "@/types/RestaurantDetails";

const voteTimingsStore = useVoteTimingsStore();

const props = defineProps({
  title: { type: String, required: true },
  placeId: { type: String, required: true },
  openingHours: {type: Array, required: true},
  choosingModal: {type: Object, required: true},
  clashes: {type: Boolean, required: false},
});

const modalValues: Ref<{
  description?: string;
  location: string;
  priceLevel: string;
  reviews: Review[];
  rating: RestaurantDetails["rating"];
  openingHours: RestaurantDetails["current_opening_hours"];
  reservable: RestaurantDetails["reservable"];
}> = ref({
  description: props.choosingModal.description,
  location: props.choosingModal.location,
  priceLevel: props.choosingModal.description,
  reviews: props.choosingModal.reviews,
  rating: props.choosingModal.reviews,
  openingHours: {
    open_now: props.choosingModal.openingHours['open_now'],
    weekday_text: props.choosingModal.openingHours['weekday_text'],
    periods: props.choosingModal.openingHours['periods'],
    dine_in: props.choosingModal.openingHours['dine_in'],
  },
  reservable: props.choosingModal.reservable  ,
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
  type: 1,
});


const emit = defineEmits<{
  (e: "closeModal"): void;
  (e: "closebookingmodal"): void;
  (e: "chooseAnotherClose"): void;
}>();

onMounted(async () => {
  if (voteTimingsStore.voteTimings.length !== 0) {
    getCommonTimeSlot();
  }
});

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
      const [date, time] = key.split("-");
      mostFrequentDateTime = { date, time };
    }
  }

  showModalValues.value.mostFreqDate = mostFrequentDateTime.date;
  showModalValues.value.mostFreqTime = mostFrequentDateTime.time;
};  

const handleModal = (
  placeId: Restaurant["place_id"],
  title: Restaurant["name"],
  openingHours: RestaurantDetails["current_opening_hours"]["periods"],
  show: boolean,
  type: number
) => {
  showModalValues.value.placeId = placeId;
  showModalValues.value.title = title;
  showModalValues.value.periods = openingHours;
  showModalValues.value.show = show;
  showModalValues.value.type = type

};
</script>

<template>
  <section class="mt-7 max-w-xl">
    <h3 class="pb-6 lg:text-3xl sm:text-2xl text-lg font-medium">Do you wish to change the timing?</h3>

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
      v-if="showModalValues.type !== 1"
      @closeModal="
        handleModal(
          '',
          '',
          [
            {
              close: { day: 0, time: '' },
              open: { day: 0, time: '' },
            },
          ],
          false, 1
        )
      "
    />
    <BookingModal
      :title="showModalValues.title"
      :place-id="showModalValues.placeId"
      :opening-hours="showModalValues.periods"
      :booking-date="showModalValues.mostFreqDate"
      :booking-time="showModalValues.mostFreqTime"
      v-else
      @closeFreqModal="
        handleModal(
          '',
          '',
          [
            {
              close: { day: 0, time: '' },
              open: { day: 0, time: '' },
            },
          ],
          false, 1
        )
      "
      @closebookingmodal="
        handleModal(
          '',
          '',
          [
            {
              close: { day: 0, time: '' },
              open: { day: 0, time: '' },
            },
          ],
          false, 1
        )
      "
    />
  </va-modal>
  
  <p>Most Popular: Date: {{ showModalValues.mostFreqDate }} Time: {{ showModalValues.mostFreqTime }}</p>
  <p v-if="!clashes">(Restaurant is not opened in most popular timing)</p>
  <div class="flex flex-wrap justify-center mt-2"> 
  <generic-button 
      v-if="clashes"
      titleColor="text-white"
      bgColor="bg-primary"
      class="min-w-1/2 max-w-1/2 mx-1 my-1"
      @click="handleModal(placeId, title, modalValues.openingHours.periods, true, 1)"
    >
     Choose Most Popular Timing
    </generic-button>
    <generic-button 
      titleColor="text-white"
      bgColor="bg-primary"
      class="min-w-1/2 max-w-1/2 mx-1 my-1"
      @click="handleModal(placeId, title, modalValues.openingHours.periods, true, 2)"
    >
     Choose Another Timing
    </generic-button>
  </div> 
  </section>
</template>

<style></style>
