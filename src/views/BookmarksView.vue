<script setup lang="ts">
import RestaurantListItem from "@/components/RestaurantListItem.vue";
import RestaurantModal from "@/components/RestaurantModal.vue";
import { ref, onBeforeMount, type Ref, computed } from "vue";
import type { Restaurant } from "@/types/Restaurant";
import { useCuisineCategories } from "@/composables/useCuisineCategories";
import { useBookmarks } from "@/composables/useBookmarks";
import { useAuthStore } from "@/stores/auth";
import ButtonUp from "@/components/ButtonUp.vue";

const API_URL = import.meta.env.VITE_API_URL;
const { username } = useAuthStore();
const { cuisineCategories, getRandomCuisineArr } = useCuisineCategories();
const { bookmarks: restaurants, getBookmarks } = useBookmarks();
const prices = ["$", "$$", "$$$", "$$$$", "$$$$$"];

const selectedCategories: Ref<string[]> = ref([]);
const selectOptions = ref(["Name", "Price", "Rating"]);
const selectedOption = ref("Name");
const priceFilters: Ref<string[]> = ref([]);

const showModalValues = ref({
  title: "",
  placeId: "",
  imgSrc: "",
  show: false,
});

const search = ref("");

const isAscending = ref(false);
const isDescending = ref(false);

const filteredList = computed(() => {
  // We return early if there are no things to filter
  if (
    priceFilters.value.length === 0 &&
    selectedCategories.value.length === 0
  ) {
    return getSortedRestaurants(restaurants.value);
  }

  const selectedCategoriesSet = new Set(selectedCategories.value);
  const priceFiltersSet = new Set(
    priceFilters.value.map((filter) => filter.length),
  );

  const restaurantsFiltered = restaurants.value.filter(
    (restaurant) =>
      (selectedCategoriesSet.size === 0 ||
        restaurant.category?.some((category) =>
          selectedCategoriesSet.has(category),
        )) &&
      (priceFiltersSet.size === 0 ||
        priceFiltersSet.has(restaurant.price ?? 1)),
  );
  return getSortedRestaurants(restaurantsFiltered);
});

function getSortedRestaurants(restaurantsFiltered: Restaurant[]) {
  switch (selectedOption.value) {
    case "Price":
      return restaurantsFiltered.sort(
        (a, b) => (a.price ?? 0) - (b.price ?? 0),
      );

    case "Rating":
      return restaurantsFiltered.sort((a, b) => b.rating - a.rating);

    default:
      return restaurantsFiltered.sort((a, b) => {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      });
  }
}

function generateRandomPrice() {
  return Math.round(Math.random() * 5) + 1;
}
onBeforeMount(async () => {
  await getBookmarks(username);
  //init the categories for restaurants
  for (const restaurant of restaurants.value) {
    restaurant.category = getRandomCuisineArr();
    restaurant.price = generateRandomPrice();
  }
});

const getRestaurantImageUrl = (restaurant: Restaurant) => {
  if (restaurant && restaurant.photos) {
    return `${API_URL}/google/photo?photo_reference=${restaurant?.photos?.photo_reference}`;
  } else {
    return "";
  }
};

const handleModal = (
  placeId: Restaurant["place_id"],
  title: Restaurant["name"],
  imgSrc: string,
) => {
  showModalValues.value.placeId = placeId;
  showModalValues.value.title = title;
  showModalValues.value.imgSrc = imgSrc;
  showModalValues.value.show = !showModalValues.value.show;
};

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
</script>

<template>
  <main class="p-4 h-full flex flex-col w-full">
    <va-modal
      v-model="showModalValues.show"
      hide-default-actions
      class="mx-auto"
      size="large"
      closeButton
      fullscreen
    >
      <RestaurantModal
        :title="showModalValues.title"
        :place-id="showModalValues.placeId"
        :img-src="showModalValues.imgSrc"
        @closeModal="handleModal('', '', '')"
      />
    </va-modal>
    <section class="mx-auto h-full w-full">
      <div
        class="flex gap-4 justify-center items-center h-full w-full overflow-y-auto"
      >
        <aside class="w-72 hidden xl:block h-4/5">
          <div
            class="flex flex-col gap-4 h-full shadow-md bg-white rounded-lg p-4 pl-7"
          >
            <h1 class="font-bold text-2xl">Filters</h1>
            <div>
              <div class="fold-black text-black">Sort By</div>
              <va-option-list
                v-model="selectedOption"
                type="radio"
                :options="selectOptions"
              />
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
                v-for="(category, idx) in cuisineCategories"
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
          <div class="flex flex-col xl:hidden gap-2 w-full pt-3">
            <div>
              <div class="text-bold pb-1">Categories</div>
              <div class="flex gap-2 overflow-x-scroll w-full py-1">
                <va-chip
                  size="large"
                  :outline="!selectedCategories.includes(category)"
                  :class="{
                    'chip-active': selectedCategories.includes(category),
                  }"
                  v-for="(category, idx) in cuisineCategories"
                  :key="idx"
                  @click="toggleSelected(category)"
                >
                  <span class="text-base">{{ category }}</span>
                </va-chip>
              </div>
            </div>
            <div class="flex w-full">
              <div class="p-1 lg:hidden w-full">
                <div class="text-bold lg:hidden pb-1">Sort by</div>
                <div class="relative flex items-center">
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

          <div class="overflow-y-auto grow h-full flex justify-center">
            <div class="grid grid-cols-1 h-1/5 lg:grid-cols-2 xl:gap-10 gap-1">
              <RestaurantListItem
                v-for="(restaurant, idx) in filteredList"
                :key="idx"
                :title="restaurant.name"
                :imgSrc="getRestaurantImageUrl(restaurant)"
                :place-id="restaurant.place_id"
                :tags="restaurant.category"
                :rating="restaurant.rating"
                :distance="restaurant.vicinity"
                :price="restaurant.price"
                @click="
                  handleModal(
                    restaurant.place_id,
                    restaurant.name,
                    getRestaurantImageUrl(restaurant),
                  )
                "
              />
            </div>
          </div>
        </div>
      </div>
      <ButtonUp></ButtonUp>
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
