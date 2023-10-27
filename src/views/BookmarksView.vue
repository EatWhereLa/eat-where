<!-- <script setup lang="ts">
import RestaurantListItem from "@/components/RestaurantListItem.vue";

const bookmarks = [
  {
    title: `McDonald's`,
    imgSrc: "/src/assets/mcdonalds.jpg",
    tags: ["Burger", "Fastfood", "Halal"],
    rating: 4,
    distance: "2.5km",
    time: "30min",

  },
  {
    title: `McDonald's`,
    imgSrc: "/src/assets/mcdonalds.jpg",
    tags: ["Burger", "Fastfood", "Halal"],
    rating: 5,
    distance: "2.6km",
    time: "30min",
  },
];
</script>

<template>
  <main>
    <ul>
      <li v-for="(bookmark, index) in bookmarks" :key="index" class="mb-2.5">
        <RestaurantListItem
          :imgSrc="bookmark.imgSrc"
          :title="bookmark.title"
          :tags="bookmark.tags"
          :rating="bookmark.rating"
          :distance="bookmark.distance"
          :time="bookmark.time"
        />
      </li>
    </ul>
  </main>
</template> -->

<script setup lang="ts">
import BookmarkRestaurantItem from "@/components/ForRestaurantBookmark/BookmarkRestaurantItem.vue";
import restaurantsData from "@/data/restaurants.json"; // Adjust this path to where your data resides
import { ref, onBeforeMount, type Ref } from "vue";
import SortButtonOnSide from "@/components/ForRestaurantBookmark/SortButtonOnSide.vue";
import PriceButtonOnSide from "@/components/ForRestaurantBookmark/PriceButtonOnSide.vue";
import type { FilterRestaurant } from "@/types/Restaurant";

const restaurants: FilterRestaurant[] = restaurantsData.restaurants; // This should directly give you the array of restaurants
let restaurantCategories: string[] = [];
const selectedCategories: Ref<string[]> = ref([]);
const selectOptions = ref(["Name", "Distance", "Price"]);
const selectedOption = ref("");

onBeforeMount(() => {
  //init the categories
  const categorySet = new Set<string>();
  for (const restaurant of restaurants) {
    restaurant.category.forEach((category) => categorySet.add(category));
  }
  restaurantCategories = Array.from(categorySet);
});

const search = ref("");

const restaurantsFiltered = ref([{}]);
const filter = ref(true);

const price = ["$", "$$", "$$$", "$$$$", "$$$$$"];

const isAscending = ref(false);
const isDescending = ref(false);

const toggleSortDirection = (ascending: boolean) => {
  if (ascending) {
    isAscending.value = true;
    isDescending.value = false;
  } else {
    isAscending.value = false;
    isDescending.value = true;
  }
};

const toggleSelected = (category: string) => {
  const res = selectedCategories.value.findIndex((item) => item === category);
  if (res >= 0) {
    // The item is already in the list, we want to remove it
    selectedCategories.value.splice(res, 1);
  } else {
    selectedCategories.value.push(category);
  }
};
</script>

<template>
  <main class="bg-white h-full flex flex-col w-full">
    <!-- <ProfileTabs /> -->
    <section class="container mx-auto bg-white h-full w-full">
      <div
        class="flex gap-4 px-8 justify-center items-center h-full w-full overflow-y-auto"
      >
        <div class="w-72 hidden lg:block h-4/5">
          <div
            class="flex flex-col gap-4 h-full border-solid border-2 border-orange-500 rounded-lg p-4 pl-7"
          >
            <h1 class="font-bold text-2xl">Filters</h1>
            <div>
              <div class="fold-black text-black">Sort By</div>
              <SortButtonOnSide />
            </div>
            <div>
              <div class="fold-black text-black">Categories</div>
              <div class="relative">
                <input
                  type="search"
                  class="border-orange-500 relative m-0 block w-full min-w-0 flex-auto rounded-full border border-solid bg-transparent bg-clip-padding px-3 py-[0.25rem] leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-orange-500 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                  id="exampleSearch2"
                  placeholder="Cuisine"
                  v-model="search"
                />
                <!-- <label for="exampleSearch2"
                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Cusince</label> -->
              </div>
            </div>
            <div class="flex flex-col gap-4 grow overflow-y-scroll">
              <va-checkbox
                v-for="(category, idx) in restaurantCategories"
                :key="idx"
                v-model="selectedCategories"
                :label="category"
                :array-value="category"
              />
            </div>
            <div class="fold-black text-black pb-2">Sort By</div>
            <div>
              <PriceButtonOnSide
                v-for="category in price"
                :key="category"
                :category="category"
              />
            </div>
          </div>
        </div>
        <div
          class="h-full sm:h-4/5 w-full flex flex-col justify-center items-center gap-4"
        >
          <div class="h-1/5 lg:hidden flex flex-col gap-2 w-full pt-3">
            <div>
              <div class="text-bold pb-1">Categories</div>
              <div class="flex gap-2 overflow-x-scroll w-full py-1">
                <va-chip
                  size="large"
                  :outline="!selectedCategories.includes(category)"
                  :class="{
                    'chip-active': selectedCategories.includes(category),
                  }"
                  v-for="(category, idx) in restaurantCategories"
                  :key="idx"
                  @click="toggleSelected(category)"
                >
                  <span class="text-base">{{ category }}</span>
                </va-chip>
              </div>
            </div>
            <div class="flex">
              <div class="p-1 lg:hidden">
                <div class="text-bold lg:hidden pb-1">Sort by</div>
                <div class="relative inline-flex items-center">
                  <!-- <select
                    class="border border-orange-500 rounded-full text-orange-500 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                  >
                    <option value="Alphabet">Alphabet</option>
                    <option value="Distance">Distance</option>
                    <option value="Price">Price</option>
                  </select> -->

                  <va-select
                    v-model="selectedOption"
                    class="!rounded-md"
                    :options="selectOptions"
                  />
                  <span
                    :class="{ pressed: isAscending }"
                    @click="toggleSortDirection(true)"
                  >
                    ▲
                  </span>
                  <span
                    :class="{ pressed: isDescending }"
                    @click="toggleSortDirection(false)"
                  >
                    ▼
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            class="overflow-y-auto sm:h-4/5 flex justify-center items-center"
          >
            <div v-if="filter" class="grid xl:gap-10 my-grid">
              <!-- <div class="flex flex-wrap"> -->
              <BookmarkRestaurantItem
                v-for="(restaurant, idx) in restaurants"
                :key="idx"
                :restaurant="restaurant"
              />
              <!-- </div> -->
            </div>
            <div v-else class="grid xl:gap-10 my-grid">
              <BookmarkRestaurantItem
                v-for="(restaurant, idx) in restaurantsFiltered"
                :key="idx"
                :restaurant="restaurant"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.chip-active {
  @apply bg-primary !important;
  @apply text-white !important;
  @apply shadow-custom-primary-sm;
}

@media (min-width: 640px) {
  .my-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 641px) {
  my-grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

.pressed {
  color: orange;
  /* Change this to your desired color */
  cursor: pointer;
}
</style>
