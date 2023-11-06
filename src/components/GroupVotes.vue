<script setup lang="ts">
import { onMounted, ref, onBeforeMount, nextTick, watch, type Ref } from 'vue';
import * as d3 from 'd3';
import ky from 'ky';

const API_URL = import.meta.env.VITE_API_URL;

import { useAuthStore } from '@/stores/auth';
import type { VoteHistory } from '@/types/VoteHistory';

import dayjs from "dayjs";

import "billboard.js/dist/billboard.css";
import bb, {bar} from "billboard.js";

const authStore = useAuthStore();

const voteHistories = ref<VoteHistory[]>([]);

const chartsContainer = ref(null);

const items: Ref<SVGAElement[]> = ref([]); 

onMounted(async () => {
    await getActivities();
    createCharts();
});

async function getActivities() {
  try {
    const url = `${API_URL}/vote?user_id=${authStore.username}`;
    let voteHistoryRes = await ky(url).json<VoteHistory[]>();

    // Use map to create an array of promises
    const voteHistoryPromises = voteHistoryRes.map(async (voteHistory) => {
      const placesPromises = voteHistory.voted_places.map(async (places) => {
        const placeDetailsUrl = `${API_URL}/google/place-details?place_id=${places.place_id}`;
        const placeDetail = await ky(placeDetailsUrl).json<any>();
        places.place_id = placeDetail.result.name; // Update place_id with place name
      });

      // Wait for all the places within a voteHistory to be updated
      await Promise.all(placesPromises);
      return voteHistory; // Return the updated voteHistory
    });

    // Wait for all voteHistories to be updated
    voteHistories.value = await Promise.all(voteHistoryPromises);
  } catch (error) {
    console.error(error);
  }
}


function createCharts() {
  voteHistories.value.forEach((voteHistory, index) => {
    createChart(voteHistory, index)
  });
}

function createChart(voteHistory: VoteHistory, index: number) {
    const columns = voteHistory.voted_places.map(element => {
      return [element.place_id,element.vote_count]
    });
    bb.generate({
    data: {
      columns,
      type: bar(), // for ESM specify as: bar()
    },
    bar: {
      width: {
        ratio: 0.5
      }
    },
    bindto: `#chart-${index}`
  });
}

</script>

<template>
  <div ref="chartsContainer" class="flex flex-wrap gap-2 justify-center overflow-y-auto h-full">
    
    <!-- Iterate over voteHistories to create multiple cards -->
    <va-card
      v-for="(voteHistory, index) in voteHistories"
      :key="index"
      class="lg:w-1/3 w-full"
      outlined
    >
      <va-card-content>
        <p class="text-center font-bold">Voting Result</p>
        <!-- The SVG charts will be appended here -->
        <div class="flex justify-center">
          <div :id="`chart-${index}`"></div>
        </div>
        <div class="voting-details">
          <p class="font-bold">Voting Date/Time: {{ dayjs(voteHistory.vote_timestamp * 1000).format("DD/MM/YYYY HH:mm:ss") }}</p>
          <p class="font-thin italic">Participants: {{ voteHistory.user_ids.join(", ") }}</p>
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>
