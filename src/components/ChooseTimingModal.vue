<script setup lang="ts">
import { ref, watch, type Ref, onMounted, defineEmits } from "vue";
import GenericButton from "./GenericButton.vue";

import { useVoteTimingsStore } from "@/stores/voteTimings";

import { useAuthStore } from "@/stores/auth";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone"

dayjs.extend(timezone)
dayjs.tz.setDefault("Asia/Singapore")

const emit = defineEmits(["closeChoseTiming"]);
const voteTimingsStore = useVoteTimingsStore();

const { username } = useAuthStore();

const dateValue = ref(new Date());

const hourButtons = ref([""]);

onMounted(async () => {
  hourButtons.value = generateHours();
});

function generateHours(): string[] {
  const result: any[] = [];

  for (let hour = 0; hour < 24; hour++) {
  // Convert the hour to a string, ensuring it has two digits.
    const hourStr = hour.toString().padStart(2, '0');
    result.push(hourStr + '00');
  }

  return result;
}

const choseTiming = (
  preferedDate: string,
  preferedTime: string,
) => {
  voteTimingsStore.addVoteTiming({
    userId: username,
    date: preferedDate,
    time: preferedTime,
  });

  emit("closeChoseTiming");
};
</script>

<template>
  <section class="mt-7 max-w-xl">
    <h3 class="pb-6 lg:text-3xl sm:text-2xl text-lg font-medium">Do you want to choose a desired timing?</h3>

    <div class="grid place-content-center text-center">
      <h1 class="text-xl pb-3">Choose A Date</h1>
        <va-date-picker
          v-model="dateValue"
          mode="single"
          statefuls
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
            @click="choseTiming(dayjs(dateValue).format('DD/MM/YYYY'), hour)"
          >
            {{ hour }}
          </generic-button>
      </div>
    </va-scroll-container>
    <generic-button 
      titleColor="text-primary"
      bgColor="bg-white"
      class="w-full mx-1 my-1 border-2 border-solid border-primary mt-5"
      @click="$emit('closeChoseTiming')"
    >
      Close
    </generic-button>
  </section>
</template>

<style></style>
