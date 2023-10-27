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
import { ref, onBeforeMount, type Ref, computed } from "vue";
import SortButtonOnSide from "@/components/ForRestaurantBookmark/SortButtonOnSide.vue";
import type { FilterRestaurant } from "@/types/Restaurant";

const restaurants: Ref<FilterRestaurant[]> = ref(restaurantsData.restaurants); // This should directly give you the array of restaurants
let restaurantCategories: string[] = [];
const prices = ["$", "$$", "$$$", "$$$$", "$$$$$"];

const selectedCategories: Ref<string[]> = ref([]);
const selectOptions = ref(["Name", "Distance", "Price"]);
const selectedOption = ref("");
const priceFilters: Ref<string[]> = ref([]);

const search = ref("");

const isAscending = ref(false);
const isDescending = ref(false);

const filteredList = computed(() => {
  // We return early if there are no things to filter
  if (
    priceFilters.value.length === 0 &&
    selectedCategories.value.length === 0
  ) {
    return restaurants.value;
  }

  const selectedCategoriesSet = new Set(selectedCategories.value);
  const priceFiltersSet = new Set(priceFilters.value);

  const restaurantsFiltered = restaurants.value.filter(
    (restaurant) =>
      (selectedCategoriesSet.size === 0 ||
        restaurant.category.some((category) =>
          selectedCategoriesSet.has(category),
        )) &&
      (priceFiltersSet.size === 0 || priceFiltersSet.has(restaurant.price)),
  );

  return restaurantsFiltered;
});
onBeforeMount(() => {
  //init the categories
  const categorySet = new Set<string>();
  for (const restaurant of restaurants.value) {
    restaurant.category.forEach((category) => categorySet.add(category));
  }
  restaurantCategories = Array.from(categorySet);
});

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

const toggleSelectedPrice = (price: string) => {
  const res = priceFilters.value.findIndex((item) => item === price);
  if (res >= 0) {
    // The item is already in the list, we want to remove it
    priceFilters.value.splice(res, 1);
  } else {
    priceFilters.value.push(price);
  }
};

const handleBookmarkToggle = (id: number) => {
  const res = restaurants.value.find((restaurant) => restaurant.id === id);
  if (res) {
    res.bookmark = !res.bookmark;
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
        <aside class="w-72 hidden lg:block h-4/5">
          <div
            class="flex flex-col gap-4 h-full border-solid border border-primary rounded-lg p-4 pl-7"
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
            <div>
              <div class="fold-black text-black">Price</div>
              <div class="pt-2 flex flex-wrap gap-2">
                <va-chip
                  size="medium"
                  v-for="(price, idx) in prices"
                  :key="idx"
                  :outline="!priceFilters.includes(price)"
                  :class="{
                    'chip-active': priceFilters.includes(price),
                  }"
                  @click="toggleSelectedPrice(price)"
                >
                  <span class="text-base">{{ price }}</span>
                </va-chip>
              </div>
            </div>
          </div>
        </aside>
        <div
          class="h-full sm:h-4/5 w-full flex flex-col justify-center items-center gap-4"
        >
          <div class="lg:hidden flex flex-col gap-2 w-full pt-3">
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
            class="overflow-y-auto grow h-full flex justify-center items-center"
          >
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:gap-10 h-full">
              <BookmarkRestaurantItem
                v-for="(restaurant, idx) in filteredList"
                :key="idx"
                :restaurant="restaurant"
                @toggle-bookmark="handleBookmarkToggle(restaurant.id)"
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
</style>
