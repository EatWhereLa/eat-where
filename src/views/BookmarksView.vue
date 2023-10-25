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
import ProfileTabs from "@/components/ProfileTabs.vue";
import BookmarkRestaurantItem from "@/components/ForRestaurantBookmark/BookmarkRestaurantItem.vue";
import restaurantsData from "@/data/restaurants.json"; // Adjust this path to where your data resides
import FilterButton from "@/components/ForRestaurantBookmark/FilterButton.vue";
import {
  ref,
  watch,
  computed,
  reactive,
  onBeforeMount,
  type Ref,
  watchEffect,
} from "vue";
import SortButtonOnSide from "@/components/ForRestaurantBookmark/SortButtonOnSide.vue";

import FilterButtonOnSide from "@/components/ForRestaurantBookmark/FilterButtonOnSide.vue";
import PriceButtonOnSide from "@/components/ForRestaurantBookmark/PriceButtonOnSide.vue";
import type { FilterRestaurant } from "@/types/Restaurant";

const restaurants: FilterRestaurant[] = restaurantsData.restaurants; // This should directly give you the array of restaurants
let restaurantCategories: string[] = [];
const selectedCategories: Ref<string[]> = ref([]);
const buttonNames = ref([]);

onBeforeMount(() => {
  //init the categories
  const categorySet = new Set<string>();
  for (const restaurant of restaurants) {
    restaurant.category.forEach((category) => categorySet.add(category));
  }
  restaurantCategories = Array.from(categorySet);
});

const search = ref("");

watch(search, (newSearch) => {
  console.log("Search value changed:", newSearch);
  // You can place your logic here or call your searchname function
  // searchname(newSearch);
});

//use this for method
// const searchname = (newSearch: string) => {
//   restaurantCategories1.length = 0;
//   restaurantCategories2.length = 0;
//   const newSearch1 = newSearch.toLowerCase();
//   console.log(restaurantCategories.length);
//   for (const cat of restaurantCategories) {
//     const cat1 = cat.toLowerCase();
//     // console.log(cat1.includes(newSearch1) == true);
//     if (cat1.includes(newSearch1) == true) {
//       if (restaurantCategories1.length < 8) {
//         restaurantCategories1.push(cat);
//       } else {
//         restaurantCategories2.push(cat);
//       }
//     } else if (newSearch1.length == 0) {
//       if (restaurantCategories1.length < 8) {
//         restaurantCategories1.push(cat);
//       } else {
//         restaurantCategories2.push(cat);
//       }
//     }
//   }
// };

const restaurantsFiltered = ref([{}]);
const filter = ref(true);
const categories = reactive([]);
//use this for method
// const myAction = (category: string) => {
//   if (category.toLowerCase() == "all") {
//     // console.log("HOIBNIOB")
//     // for (const cat in categories){
//     //   document.getElementById(cat).checked = false;
//     // }
//     categories.length = 0;
//     restaurantsFiltered.value.length = 0;
//     filter.value = true;
//   } else {
//     if (categories.includes(category) == true) {
//       var num = categories.indexOf(category);
//       categories.splice(num, 1);
//     } else {
//       categories.push(category);
//     }
//   }
//   if (categories.length != 0) {
//     filter.value = true;
//     filter.value = false;
//     restaurantsFiltered.value.length = 0;
//     for (const restaurant of restaurants) {
//       for (const cat of categories) {
//         if (restaurant.category.includes(cat) == true) {
//           var add = true;
//           for (const restaurantF of restaurantsFiltered.value) {
//             if (restaurantF.name == restaurant.name) {
//               add = false;
//             }
//           }
//           if (add == true) {
//             restaurantsFiltered.value.push(restaurant);
//           }
//         }
//       }
//     }
//   } else {
//     filter.value = true;
//   }
// };

const toggleButton = (value: boolean, category: string) => {
  // console.log(category);
  // categories.push(category);
  // console.log(categories);

  isButtonOn.value[category] = value;
  console.log(`Button ${category} is toggled to ${value ? "ON" : "OFF"}`);
  if (category.toLowerCase() == "all") {
    // console.log("HOIBNIOB")
    // for (const cat in categories){
    //   document.getElementById(cat).checked = false;
    // }
    categories.length = 0;
    restaurantsFiltered.value.length = 0;
    filter.value = true;
  } else {
    if (categories.includes(category) == true) {
      var num = categories.indexOf(category);
      categories.splice(num, 1);
    } else {
      categories.push(category);
    }
  }
  if (categories.length != 0) {
    filter.value = true;
    filter.value = false;
    restaurantsFiltered.value.length = 0;
    for (const restaurant of restaurants) {
      for (const cat of categories) {
        if (restaurant.category.includes(cat) == true) {
          var add = true;
          for (const restaurantF of restaurantsFiltered.value) {
            if (restaurantF.name == restaurant.name) {
              add = false;
            }
          }
          if (add == true) {
            restaurantsFiltered.value.push(restaurant);
          }
        }
      }
    }
  } else {
    filter.value = true;
  }
  console.log(categories);
};

watch(categories, (newSearch) => {
  for (const cat of newSearch) {
    isButtonOn.value[cat] = true;
    // console.log(isButtonOn.value[cat]);
  }
  buttonNames.value = Object.keys(isButtonOn.value);
});

const isCategoryExpanded = ref(false);
const viewAll = () => {
  if (isCategoryExpanded.value == false) {
    isCategoryExpanded.value = true;
  } else {
    isCategoryExpanded.value = false;
  }
};

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
</script>

<template>
  <main class="bg-white h-full flex flex-col">
    <!-- <ProfileTabs /> -->
    <section class="container mx-auto bg-white h-full">
      <div class="flex gap-4 px-8 justify-center items-center h-full">
        <div class="col-span-0 w-72 hidden lg:block lg:col-span-3 h-4/5">
          <div
            class="flex flex-col h-full border-solid border-2 border-orange-500 rounded-lg p-4 pl-7"
          >
            <div class="font-bold text-2xl pb-7">Filters</div>
            <div class="fold-black text-black pb-2">Sort By</div>
            <SortButtonOnSide class="h-2/6" />
            <div class="fold-black text-black pb-2">Categories</div>
            <div class="relative mb-3" data-te-input-wrapper-init>
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
            <div class="flex flex-col gap-4 h-2/6 overflow-y-scroll">
              <va-checkbox
                v-for="(category, idx) in restaurantCategories"
                :key="idx"
                v-model="selectedCategories"
                :label="category"
                :array-value="category"
              />
            </div>
            <div class="fold-black text-black pb-2">Sort By</div>
            <div class="h-2/6">
              <PriceButtonOnSide
                v-for="category in price"
                :key="category"
                :category="category"
              />
            </div>
          </div>
        </div>
        <div class="col-span-12 lg:col-span-9">
          <div class="text-bold lg:hidden pb-1">Categories</div>
          <div
            class="scrollable-content pr-1 pb-1 pt-1 overflow-x-scroll lg:hidden"
          >
            <span v-for="buttonName in buttonNames" :key="buttonName">
              <FilterButton
                :modelValue="isButtonOn[buttonName]"
                :buttonName="buttonName"
                @button-click="toggleButton"
                @update:modelValue="isButtonOn[buttonName] = $event"
              />
            </span>
          </div>
          <div class="flex" style="justify-content: end">
            <div class="p-1 lg:hidden">
              <div class="text-bold lg:hidden pb-1">Sort by</div>
              <div class="relative inline-flex" style="margin-bottom: 25px">
                <svg
                  class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 412 232"
                >
                  <path
                    d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                    fill="#648299"
                    fill-rule="nonzero"
                  />
                </svg>
                <select
                  class="border border-orange-500 rounded-full text-orange-500 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                >
                  <option value="Alphabet">Alphabet</option>
                  <option value="Distance">Distance</option>
                  <option value="Price">Price</option>
                </select>
              </div>
              <span
                :class="{ pressed: isAscending }"
                @click="toggleSortDirection(true)"
              >
                ▲</span
              >
              <span
                :class="{ pressed: isDescending }"
                @click="toggleSortDirection(false)"
                >▼</span
              >
            </div>
          </div>

          <!-- <FilterButton  v-for="category in restaurantCategories1" :key="category"
              :category="category" :onToggle="toggleButton" />
              // @filter-event="myAction"
            <FilterButton  v-for="category in restaurantCategories2" :key="category"
              :category="category" :onToggle="toggleButton" /> -->

          <div class="overflow-y-scroll">
            <div v-if="filter" class="wc zf iq my-grid pb-5 pt-5">
              <!-- <div class="flex flex-wrap"> -->
              <BookmarkRestaurantItem
                v-for="restaurant in restaurants"
                :key="restaurant.id"
                :restaurant="restaurant"
              />
              <!-- </div> -->
            </div>
            <div v-else class="wc zf iq my-grid pb-5 pt-5">
              <BookmarkRestaurantItem
                v-for="restaurant in restaurantsFiltered"
                :key="restaurant.id"
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

.scrollable-content {
  /* overflow-x: auto; */
  /* Enable horizontal scrolling */
  white-space: nowrap;
  /* Prevent buttons from wrapping to the next line */
  margin-bottom: 25px;
}

/* Remove scrollbar */
.scrollable-content::-webkit-scrollbar {
  width: 0;
  height: 0;
}

/* Remove scrollbar thumb */
.scrollable-content::-webkit-scrollbar-thumb {
  background: transparent;
}

/* Remove scrollbar track */
.scrollable-content::-webkit-scrollbar-track {
  background: transparent;
}

.pressed {
  color: orange;
  /* Change this to your desired color */
  cursor: pointer;
}
</style>
