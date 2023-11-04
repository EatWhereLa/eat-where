<script setup lang="ts">
import NavHeader from "@/components/NavHeader.vue";
import { type Activity, ActivityType } from "@/types/Activity";
import { ref, watch, onMounted, nextTick, onUpdated } from "vue";
import * as d3 from "d3";

onUpdated(() => {
  renderCharts(pastVotingResults);
});

// Sample Data
const previousActivities: Activity[] = [
  {
    id: 1,
    name: "Macdonalds",
    imgSrc: "../src/assets/images/restaurants/mcdonalds.jpg",
    date: "21/10/2023",
    type: ActivityType.GROUPVOTE,
  },
  {
    id: 2,
    name: "Monster Curry",
    imgSrc: "../src/assets/images/restaurants/monster.jpeg",
    date: "21/09/2023",
    type: ActivityType.BOOKINGS,
  },
  {
    id: 3,
    name: "Macdonalds",
    imgSrc: "../src/assets/images/restaurants/mcdonalds.jpg",
    date: "21/08/2023",
    type: ActivityType.GROUPVOTE,
  },
  {
    id: 4,
    name: "KFC",
    imgSrc: "../src/assets/images/restaurants/kfc.jpg",
    date: "21/10/2023",
    type: ActivityType.GROUPVOTE,
  },
  {
    id: 5,
    name: "Hai Di Lao",
    imgSrc: "../src/assets/images/restaurants/hdl.jpeg",
    date: "21/10/2023",
    type: ActivityType.BOOKINGS,
  },
  {
    id: 6,
    name: "Macdonalds",
    imgSrc: "../src/assets/images/restaurants/mcdonalds.jpg",
    date: "21/10/2023",
    type: ActivityType.BOOKINGS,
  },
  {
    id: 7,
    name: "Macdonalds",
    imgSrc: "../src/assets/images/restaurants/mcdonalds.jpg",
    date: "21/10/2023",
    type: ActivityType.BOOKINGS,
  },
  {
    id: 8,
    name: "Macdonalds",
    imgSrc: "../src/assets/images/restaurants/mcdonalds.jpg",
    date: "21/10/2023",
    type: ActivityType.BOOKINGS,
  },
  {
    id: 9,
    name: "Macdonalds",
    imgSrc: "../src/assets/images/restaurants/mcdonalds.jpg",
    date: "21/10/2023",
    type: ActivityType.BOOKINGS,
  },
];

// const filterValue = ref<string>("");
const filterValue = ref(ActivityType.BOOKINGS);
const activities = ref(previousActivities);

// Reset filterValue
const resetFilter = () => {
  filterValue.value = "";
};

// set filterValue when the filters are toggled
watch(filterValue, () => {
  if (filterValue.value !== "") {
    activities.value = previousActivities.filter(
      (activity) => activity.type === filterValue.value,
    );
  } else {
    activities.value = previousActivities;
  }
});

const pastVotingResults = [
  {
    timestamp: "2023-10-25T12:00:00Z",
    participants: ["Alice", "Bob", "Charlie", "David", "Eve"],
    results: [
      { name: "Macdonalds", upvotes: 5 },
      { name: "Mos burger", upvotes: 2 },
      { name: "Burger king", upvotes: 1 },
    ],
  },
  {
    timestamp: "2023-10-24T15:00:00Z",
    participants: ["Alice", "Frank", "Grace"],
    results: [
      { name: "Macdonalds", upvotes: 4 },
      { name: "Mos burger", upvotes: 3 },
      { name: "Burger king", upvotes: 6 },
    ],
  },
  {
    timestamp: "2023-10-23T16:30:00Z",
    participants: ["Charlie", "David", "Eve"],
    results: [
      { name: "Macdonalds", upvotes: 7 },
      { name: "Mos burger", upvotes: 5 },
      { name: "Burger king", upvotes: 2 },
    ],
  },
  {
    timestamp: "2023-10-22T13:45:00Z",
    participants: ["Alice", "Frank", "Grace", "Eve"],
    results: [
      { name: "Macdonalds", upvotes: 2 },
      { name: "Mos burger", upvotes: 4 },
      { name: "Burger king", upvotes: 3 },
    ],
  },
  {
    timestamp: "2023-10-21T14:10:00Z",
    participants: ["Bob", "Charlie", "David"],
    results: [
      { name: "Macdonalds", upvotes: 6 },
      { name: "Mos burger", upvotes: 3 },
      { name: "Burger king", upvotes: 7 },
    ],
  },
];

onMounted(() => {
  nextTick().then(() => {
    renderCharts(pastVotingResults);
  });
});
const renderCharts = (votingSessions) => {
  votingSessions.forEach((session, index) => {
    const data = session.results; // Access the results from the session
    data.sort((a, b) => b.upvotes - a.upvotes);

    const container = d3.select(`#d3-container-${index}`);

    if (container.empty()) {
      console.error(`Container #d3-container-${index} is not found`);
      return; // Skip this iteration if container isn't found
    }

    const margin = { top: 20, right: 70, bottom: 40, left: 80 };
    const width = 380 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    const y = d3.scaleBand().range([height, 0]).padding(0.3); // Increase padding value for thinner bars
    const x = d3.scaleLinear().range([0, width]);

    const svg = container
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    y.domain(data.map((d) => d.name));
    x.domain([0, d3.max(data, (d) => d.upvotes)]);

    svg.append("g").call(d3.axisLeft(y));

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format(".0f")));

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("y", (d) => y(d.name))
      .attr("height", y.bandwidth())
      .attr("x", 0)
      .attr("width", (d) => x(d.upvotes))
      .attr("rx", 5)
      .attr("ry", 5)
      .attr("fill", "#ffa500")
      .on("mouseover", (event, d) => {
        const tooltip = d3.select("#tooltip");
        tooltip.style("display", "block");
        tooltip
          .html(`Amount: ${d.upvotes}`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 20 + "px");
      })
      .on("mouseout", () => {
        d3.select("#tooltip").style("display", "none");
      });

    // Find the maximum upvotes
    const maxUpvotes = d3.max(data, (d) => d.upvotes);

    // Add the "Winner" text label next to the winning bar
    svg
      .selectAll(".winnerLabel")
      .data(data)
      .enter()
      .filter((d) => d.upvotes === maxUpvotes)
      .append("text")
      .attr("class", "winnerLabel")
      .attr("y", (d) => y(d.name) + y.bandwidth() / 2) // Center the text in the bar
      .attr("x", (d) => x(d.upvotes) + 10) // Position it slightly to the right of the bar
      .attr("text-anchor", "start")
      .attr("font-size", "10px")
      .attr("fill", "black")
      .text("Winner");
  });
};
</script>

<style>
.tooltip {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 5px;
  font-size: 12px;
  z-index: 1;
  pointer-events: none;
}

.bar {
  fill: #f97316;
}
</style>

<template>
  <main>
    <NavHeader />
    <section>
      <div class="bb ye ki xn vq jb jo">
        <h1
          class="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black"
        >
          Activity History
        </h1>
        <div class="flex items-center justify-between">
          <div class="flex mt-8 items-center">
            <p class="font-medium pr-4">Filters</p>
            <select
              class="border-none rounded-full text-orange-500 h-10 pl-5 pr-10 bg-orange-50 hover:bg-orange-100 appearance-none focus:outline-none font-semibold text-sm"
              v-model="filterValue"
            >
              <option class="border-none" :value="ActivityType.BOOKINGS">
                Bookings
              </option>
              <option class="border-none" :value="ActivityType.GROUPVOTE">
                Group Votes
              </option>
            </select>
          </div>

          <!-- <button
            class="px-4 py-2 bg-orange-50 hover:bg-orange-100 hover:text-orange-500 text-orange-500 text-sm font-medium rounded-md mt-6"
            @click="resetFilter">
            Reset Filter
          </button> -->
        </div>

        <br />

        <!-- <div class="wc qf pn xo zf iq"> -->
        <!-- Previous bookings/group votes -->
        <div v-if="filterValue == ActivityType.BOOKINGS">
          <div class="wc qf pn xo zf iq">
            <div
              v-for="activity in activities"
              class="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg"
            >
              <div
                class="h-full relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40"
              >
                <img
                  :src="activity.imgSrc"
                  class="h-full object-cover w-full"
                  alt="ui/ux review check"
                />
                <div
                  class="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60"
                ></div>
                <!-- <button
                  class="!absolute top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button" data-ripple-dark="true">
                  <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                      class="w-6 h-6">
                      <path
                        d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z">
                      </path>
                    </svg>
                  </span>
                </button> -->
              </div>
              <div class="p-6">
                <div class="flex items-center justify-between mb-3">
                  <h5
                    class="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900"
                  >
                    {{ activity.name }}
                  </h5>
                  <!-- <p
                    class="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                      class="-mt-0.5 h-5 w-5 text-yellow-700">
                      <path fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clip-rule="evenodd"></path>
                    </svg>
                    5.0
                  </p> -->
                </div>
                <div
                  class="block font-sans text-base antialiased font-light leading-relaxed text-gray-700"
                >
                  <p>Reservation pax : 5</p>
                  <p>Date/Time : {{ activity.date }}</p>
                </div>
              </div>
              <div class="p-6 pt-3">
                <button
                  class="block w-full select-none rounded-lg bg-pink-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  data-ripple-light="true"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="filterValue == ActivityType.GROUPVOTE">
          <div class="wc qf pn xo zf iq">
            <div
              v-for="(session, index) in pastVotingResults"
              :key="index"
              class="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg"
            >
              <div class="text-center pt-4 pd-2 font-medium text-xl">
                Voting Result
              </div>
              <div
                class="h-full relative mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40"
              >
                <div id="tooltip" class="tooltip" style="display: none"></div>
                <div
                  :id="'d3-container-' + index"
                  class="h-full object-cover w-full chart-container"
                ></div>
                <div
                  class="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent"
                ></div>
              </div>
              <div class="p-6">
                <div class="flex items-center justify-between mb-3">
                  <h5
                    class="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900"
                  >
                    Timestamp: {{ session.timestamp }}
                  </h5>
                  <!-- <p
                    class="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                      class="-mt-0.5 h-5 w-5 text-yellow-700">
                      <path fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clip-rule="evenodd"></path>
                    </svg>
                    5.0
                  </p> -->
                </div>
                <div
                  class="block font-sans text-base antialiased font-light leading-relaxed text-gray-700"
                >
                  Participants: {{ session.participants.join(", ") }}
                </div>
              </div>

              <!-- This is the card container -->
              <!-- <div class="chart-card"> -->
              <!-- This is where the D3 chart will be appended -->
              <!-- <div :id="'d3-container-' + index" class="chart-container"></div> -->
              <!-- </div> -->
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="mb lo bq i ua">
          <nav>
            <ul class="tc wf xf bg">
              <li>
                <a
                  class="hover:bg-orange-500 c tc wf xf wd in zc hn rg uj fo wk xm ml il hh rm tl zm yl an"
                  href="#"
                >
                  <svg
                    class="th lm ml il"
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.93884 6.99999L7.88884 11.95L6.47484 13.364L0.11084 6.99999L6.47484 0.635986L7.88884 2.04999L2.93884 6.99999Z"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  class="hover:bg-orange-500 c tc wf xf wd in zc hn rg uj fo wk xm ml il hh rm tl zm yl an"
                  href="#"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  class="hover:bg-orange-500 c tc wf xf wd in zc hn rg uj fo wk xm ml il hh rm tl zm yl an"
                  href="#"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  class="hover:bg-orange-500 c tc wf xf wd in zc hn rg uj fo wk xm ml il hh rm tl zm yl an"
                  href="#"
                >
                  4
                </a>
              </li>
              <li>
                <a
                  class="hover:bg-orange-500 c tc wf xf wd in zc hn rg uj fo wk xm ml il hh rm tl zm yl an"
                  href="#"
                >
                  ...
                </a>
              </li>
              <li>
                <a
                  class="hover:bg-orange-500 c tc wf xf wd in zc hn rg uj fo wk xm ml il hh rm tl zm yl an"
                  href="#"
                >
                  12
                </a>
              </li>
              <li>
                <a
                  class="hover:bg-orange-500 c tc wf xf wd in zc hn rg uj fo wk xm ml il hh rm tl zm yl an"
                  href="#"
                >
                  <svg
                    class="th lm ml il"
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.06067 7.00001L0.110671 2.05001L1.52467 0.636014L7.88867 7.00001L1.52467 13.364L0.110672 11.95L5.06067 7.00001Z"
                      fill="#fefdfo"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <!-- Pagination -->
      </div>
    </section>
  </main>
</template>
