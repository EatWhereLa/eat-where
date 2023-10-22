<script setup lang="ts">
import { ref, watch, type Ref, onMounted, defineEmits } from "vue";
import GenericButton from "./GenericButton.vue";
import ky from "ky";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone"

dayjs.extend(timezone)
dayjs.tz.setDefault("Asia/Singapore")

const props = defineProps({
  title: { type: String, required: true },
  placeId: { type: String, required: true },
  openingHours: {type: Array, required: true},
  });

const emit = defineEmits();

const tab = ref(0);

const showCustomContent = ref(false);

let bookingValues = ref([{day: 0, hours: [""]}]);

onMounted(async () => {
  bookingValues.value = generateHours(props.openingHours as OpenClose[])
  bookingValues.value = formatDates(bookingValues.value);
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

const formatDates = (openingList: any[]) => {

    const currentDay = dayjs().get("day");
    if (currentDay !== 0) {
      const movingList = openingList.splice(0,currentDay);
      const daysToAdd = 7 - openingList.length;

      if (daysToAdd !== 0) {
        movingList.forEach(openingDay => {
          openingDay.day += daysToAdd;
        });
      }
      openingList.push(movingList);
    }
    
    for (let i = 0; i < openingList.length; i++) {
      openingList[i].day = dayjs().add(openingList[i].day, 'day').format("DD/MM/YYYY");
    }

    return openingList;
}
</script>

<template>
  <section class="mt-7">
    <h3 class="pb-6 lg:text-3xl sm:text-2xl text-lg">Make A Reservation</h3>

    <va-tabs v-model="tab" class="mb-4">
      <template #tabs>
        <va-tab>Next 7 Days</va-tab>
        <va-tab>Choose another date</va-tab>
      </template>
    </va-tabs>

    <div v-for="bookValue in bookingValues">
      <h2> {{ bookValue.day }}</h2>
      <div class="flex flex-wrap justify-evenly my-2">
        <generic-button 
          v-for="hour in bookValue.hours"
          titleColor="text-white"
          bgColor="bg-primary"
          class="min-w-[130px] max-w-[100px] mx-1 my-1"
        >
          {{ hour }}
        </generic-button>
      </div>
    </div>

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
