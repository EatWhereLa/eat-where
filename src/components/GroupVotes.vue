<script setup lang="ts">
import { onMounted, ref, onBeforeMount, nextTick } from 'vue';
import * as d3 from 'd3';
import ky from 'ky';

const API_URL = import.meta.env.VITE_API_URL;

import { useAuthStore } from '@/stores/auth';
import type { VoteHistory } from '@/types/VoteHistory';

const authStore = useAuthStore();

const voteHistories = ref<any[]>([]);

const chartsContainer = ref(null);

onMounted(async () => {
  await getActivities();
  nextTick(() => {
    createCharts(); // Now create the charts
  });

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
    createCharts();
  } catch (error) {
    console.error(error);
  }
}


function createCharts() {
  // Cleanup existing SVG elements before creating new charts
  d3.select(chartsContainer.value).selectAll("*").remove();

  voteHistories.value.forEach((voteHistory, index) => {
    createChart(voteHistory, index) 
  });
}

function createChart(voteHistory: VoteHistory, index: number) {
  const margin = { top: 20, right: 30, bottom: 40, left: 90 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

  const svg = d3.select(`#chart-${index}`)
                .append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .attr("class", `chart-${index}`) // Add a class for styling if necessary
                .append("g")
                  .attr("transform", `translate(${margin.left},${margin.top})`);

  // Process data for the specific voteHistory
  const votedPlaces = voteHistory.voted_places;
  const x = d3.scaleLinear()
              .domain([0, d3.max(votedPlaces, d => d.vote_count)!])
              .range([0, width]);
  
  const xAxis = d3.axisBottom(x)
      .ticks(d3.max(votedPlaces, d => d.vote_count)) // Set the number of ticks to the maximum vote count
      .tickFormat(d3.format('d')); // Use 'd' for decimal formatting which omits the fractional part

  svg.append("g")
     .attr("transform", `translate(0,${height})`)
     .call(xAxis) // Use the xAxis variable here
     .selectAll("text")
     .style("text-anchor", "end");

  const y = d3.scaleBand()
              .range([0, height])
              .domain(votedPlaces.map(d => d.place_id))
              .padding(.1);

  svg.append("g").call(d3.axisLeft(y));

  svg.selectAll("rect")
     .data(votedPlaces)
     .join("rect")
     .attr("x", x(0))
     .attr("y", d => y(d.place_id)!)
     .attr("width", d => x(d.vote_count))
     .attr("height", y.bandwidth())
     .attr("fill", "#ff914f");


     console.log(svg);
}
</script>

<template>
  <div ref="chartsContainer">
    
    <!-- Iterate over voteHistories to create multiple cards -->
    <va-card
      v-for="(voteHistory, index) in voteHistories"
      :key="index"
      class="ma-2"
      outlined
    >
    <va-card-content>
        <p>{{index}}</p>
        <!-- The SVG charts will be appended here -->
        <p :id="`chart-${index}`"></p>
        <div class="voting-details">
        </div>
    </va-card-content>
  </va-card>
  </div>
</template>
