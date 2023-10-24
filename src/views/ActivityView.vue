<script setup lang="ts">
import NavHeader from "@/components/NavHeader.vue";
import { Activity, ActivityType } from "@/types/Activity";
import { ref, watch } from "vue";

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

const filterValue = ref<string>("");
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
</script>

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
            <p class="font-medium">Filters</p>
            <select
              class="px-4 py-3 ml-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              v-model="filterValue"
            >
              <option value="">All Type</option>
              <option :value="ActivityType.BOOKINGS">Bookings</option>
              <option :value="ActivityType.GROUPVOTE">Group Votes</option>
            </select>
          </div>

          <button
            class="px-4 py-2 bg-orange-50 hover:bg-orange-100 hover:text-orange-500 text-orange-500 text-sm font-medium rounded-md mt-6"
            @click="resetFilter"
          >
            Reset Filter
          </button>
        </div>

        <br />

        <div class="wc qf pn xo zf iq">
          <!-- Previous bookings/group votes -->
          <div
            class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow  dark:border-gray-50"
            v-for="activity in activities"
          >
            <i class="fas fa-vote-yea"></i>
            <a href="#">
              <img
                class="object-full h-72 w-full p-8 rounded-t-lg"
                :src="activity.imgSrc"
                alt="product image"
              />
            </a>
            <div class="px-5 pb-5">
              <a href="#">
                <h5
                  class="text-xl font-semibold tracking-tight text-gray-900 "
                >
                  {{ activity.name }}
                </h5>
              </a>
              <div class="flex items-center mt-2.5 mb-5">
                <svg
                  class="w-4 h-4 text-yellow-300 mr-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                  />
                </svg>
                <svg
                  class="w-4 h-4 text-yellow-300 mr-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                  />
                </svg>
                <svg
                  class="w-4 h-4 text-yellow-300 mr-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                  />
                </svg>
                <svg
                  class="w-4 h-4 text-yellow-300 mr-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                  />
                </svg>
                <svg
                  class="w-4 h-4 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                  />
                </svg>
                <span
                  class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3"
                  >5.0</span
                >
              </div>
              <div class="flex items-center justify-between">
                <span class="font-bold text-gray-900 ">{{
                  activity.date
                }}</span>
                <!-- <a
                  href="#"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >Read more</a
                > -->
              </div>
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
