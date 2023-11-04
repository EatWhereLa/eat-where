<script setup lang="ts">
import { ref, watch, type Ref, onMounted, defineEmits } from "vue";
import GenericButton from "./GenericButton.vue";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone"

import type { Restaurant } from "@/types/Restaurant";

import BookingModal from "@/components/BookingModal.vue";

dayjs.extend(timezone)
dayjs.tz.setDefault("Asia/Singapore")

const props = defineProps({
  title: { type: String, required: true },
  placeId: { type: String, required: true },
  openingHours: {type: Array, required: true},
});

const showBookingModalValues = ref({
  title: "",
  placeId: "",
  bookingDate: "",
  bookingTime: "",
  show: false,
});


const emit = defineEmits<{
  (e: "closeModal"): void;
  (e: "closebookingmodal"): void;
}>();

const dateValue = ref(new Date());
const daysArr = new Array(7).fill(false);

const bookingValues = ref([{day: 0, hours: [""]}]);

const hourButtons = ref([""]);


onMounted(async () => {
  bookingValues.value = generateHours(props.openingHours as OpenClose[]);
  hourButtons.value = bookingValues.value.find(obj => obj.day === dateValue.value.getDay())!.hours;
});

type OpenClose = {
 open: { day: number; time: string };
 close: { day: number; time: string };
};

function generateHours(businessHours: OpenClose[]): any[] {
  const result: any[] = [];
  
  businessHours.forEach((hour) => {
    const { open, close } = hour;
    const day = open.day;

    daysArr[day] = true;

    let startTime = parseInt(open.time.slice(0, 2)) * 60 + parseInt(open.time.slice(2, 4));
    let endTime = parseInt(close.time.slice(0, 2)) * 60 + parseInt(close.time.slice(2, 4));

    if (startTime > endTime) {
      endTime += 24 * 60;
    }

    const hours: string[] = [];
    for (let time = startTime; time <= endTime; time += 60) {
      const hoursStr = ('0' + Math.floor(time / 60)).slice(-2) + ('0' + time % 60).slice(-2);
      hours.push(hoursStr);
    }

    const existingDay = result.find((item) => item.day === day);
    if (existingDay) {
      existingDay.hours = [...new Set([...existingDay.hours, ...hours])];
    } else {
      result.push({ day, hours });
    }
  });
  
  // Distribute hours greater than "2400" to the subsequent day
  result.forEach((day, index) => {
    const nextDayHours: string[] = [];
    day.hours = day.hours.filter((hour: string) => {
      if (parseInt(hour, 10) >= 2400) {
        nextDayHours.push((parseInt(hour, 10) - 2400).toString().padStart(4, '0'));
        return false;
      }
      return true;
    });

    if (nextDayHours.length) {
      const nextDayIndex = (day.day + 1) % 7;  // for wrapping Sunday back to Monday
      const nextDayEntry = result.find(item => item.day === nextDayIndex);
      if (nextDayEntry) {
        nextDayEntry.hours = [...new Set([...nextDayEntry.hours, ...nextDayHours])];
      } else {
        result.push({ day: nextDayIndex, hours: nextDayHours });
      }
    }
  });

  result.forEach((day) => {
    day.hours.sort((a: string, b: string) => parseInt(a, 10) - parseInt(b, 10));
  });

  return result.sort((a, b) => a.day - b.day); // Sorting by day for clarity
}

watch(dateValue, (newValue) => {
  hourButtons.value = bookingValues.value.find(obj => obj.day === newValue.getDay())!.hours;
})

/*
For generation of 7 days with dates
Currently not in use
*/
// const formatDates = (openingList: any[]) => {
//     const currentDay = dayjs().get("day");
    
//     const nextSevenDays: any[] = [];
    
//     let daysToAdd = 0;

//     while (nextSevenDays.length < 7) {
//         const potentialDay = currentDay + daysToAdd; // Day we're considering to add
//         const isOpen = openingList.find(day => day.day === potentialDay % 7);

//         if (isOpen) {
//             const openingDay = { ...isOpen }; // Clone to avoid mutating the original list
//             openingDay.day = dayjs().add(daysToAdd, 'day').format("DD/MM/YYYY");
//             nextSevenDays.push(openingDay);
//         }

//         daysToAdd++; // Always increment, even if the day was closed
//     }

//     return nextSevenDays;
// }


const handleBookingModal = (
  placeId: Restaurant["place_id"],
  title: Restaurant["name"],
  bookingDate: string,
  bookingTime: string,
) => {
  showBookingModalValues.value.placeId = placeId;
  showBookingModalValues.value.title = title;
  showBookingModalValues.value.bookingDate = bookingDate;
  showBookingModalValues.value.bookingTime = bookingTime;
  showBookingModalValues.value.show = !showBookingModalValues.value.show;
};
</script>

<template>
  <section class="mt-7 max-w-xl">
    <h3 class="pb-6 lg:text-3xl sm:text-2xl text-lg font-medium">Make A Reservation</h3>

    <va-modal
      v-model="showBookingModalValues.show"
      hide-default-actions
      class="mx-auto"
      size="small"
      closeButton
    >
      <BookingModal
        :title="showBookingModalValues.title"
        :place-id="showBookingModalValues.placeId"
        :bookingDate ="showBookingModalValues.bookingDate"
        :bookingTime="showBookingModalValues.bookingTime"
        @closebookingmodal="
          handleBookingModal(
            '', '', '', ''
          )
          emit('closeModal');
        "
      />
    </va-modal>

    <div class="grid place-content-center text-center">
      <h1 class="text-xl pb-3">Choose A Booking Date</h1>
        <va-date-picker
          v-model="dateValue"
          mode="single"
          statefuls
          :allowed-days="(date) => daysArr[date.getDay()]"
          :start-year="dayjs().year()"
        />
        <h1 class="text-xl pb-3">Choose Your Timing</h1>
    </div>  
    <va-scroll-container
      color="#262824"
      horizontal
      size="large"
    >
      <div class="flex my-2  px-2">
          <generic-button 
            v-for="hour in hourButtons"
            titleColor="text-white"
            bgColor="bg-primary"
            class="min-w-[100px] max-w-[100px] mx-1 my-1"
            @click="handleBookingModal(placeId, title, dayjs(dateValue).format('DD/MM/YYYY'), hour)"
          >
            {{ hour }}
          </generic-button>
      </div>
    </va-scroll-container>

  </section>
</template>

<style></style>
