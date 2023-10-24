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
// import Header from '@/components/Header.vue';
// import Footer from '@/components/Footer.vue';
// import BookmarkRestaurantItem from '@/components/BookmarkRestaurantItem.vue';
// import restaurantsData from '@/data/restaurants.json'; // Adjust this path to where your data resides
// import FilterButton from '@/components/FilterButton.vue';
// import { ref, computed } from 'vue';
// import SortButtonOnSide from '@/components/SortButtonOnSide.vue';


// import FilterButtonOnSide from '@/components/FilterButtonOnSide.vue';
import NavHeader from "@/components/NavHeader.vue";
import ProfileTabs from "@/components/ProfileTabs.vue";
import BookmarkRestaurantItem from '@/components/ForRestaurantBookmark/BookmarkRestaurantItem.vue';
import restaurantsData from '@/data/restaurants.json'; // Adjust this path to where your data resides
import FilterButton from '@/components/ForRestaurantBookmark/FilterButton.vue';
import { ref, watch, computed, reactive } from 'vue';
import SortButtonOnSide from '@/components/ForRestaurantBookmark/SortButtonOnSide.vue';

import FilterButtonOnSide from '@/components/ForRestaurantBookmark/FilterButtonOnSide.vue';
import PriceButtonOnSide from '@/components/ForRestaurantBookmark/PriceButtonOnSide.vue';



const restaurants = restaurantsData.restaurants;  // This should directly give you the array of restaurants

const restaurantCategories: string[] = []; // All of the Cat
// this two below is for the see more
const restaurantCategories1 = reactive([]);
const restaurantCategories2 = reactive([]);
// restaurantCategories.push("All");
// restaurantCategories1.push("All");

// var categories: string[] = [];
for (const restaurant of restaurants) {
  for (const cat of restaurant.category) {
    if ( restaurantCategories1.includes(cat) == false && restaurantCategories1.length < 8) {
      restaurantCategories1.push(cat);
      restaurantCategories.push(cat);
    } else if (restaurantCategories1.includes(cat) == false && restaurantCategories1.length >= 8 && restaurantCategories2.includes(cat) == false) {
      restaurantCategories2.push(cat);
      restaurantCategories.push(cat);
    }
  }
}

const isButtonOn = ref({});
for (const cat of restaurantCategories) {
  isButtonOn.value[cat] = false;
}


// const buttonNames = computed(() => Object.keys(isButtonOn.value));
const buttonNames = ref(Object.keys(isButtonOn.value));
console.log(buttonNames.value);

const search = ref('');
// const catName = computed(() => {
//   return search;

// });
// for (const cat of categories){
//     isButtonOn.value[cat] = true;
//   }

watch(search, (newSearch) => {
  console.log('Search value changed:', newSearch);
  // You can place your logic here or call your searchname function
  searchname(newSearch);
});

const cat123 = ref(true);

//use this for method
const searchname = (newSearch: string) => {
  restaurantCategories1.length = 0;
  restaurantCategories2.length = 0;
  const newSearch1 = newSearch.toLowerCase();
  console.log(restaurantCategories.length);
  for (const cat of restaurantCategories) {
    const cat1 = cat.toLowerCase();
    // console.log(cat1.includes(newSearch1) == true);
    if (cat1.includes(newSearch1) == true) {
      if (restaurantCategories1.length < 8) {
        restaurantCategories1.push(cat);
      } else {
        restaurantCategories2.push(cat);
      }
    } else if (newSearch1.length == 0) {
      if (restaurantCategories1.length < 8) {
        restaurantCategories1.push(cat);
      } else {
        restaurantCategories2.push(cat);
      }
    }
  }
  // console.log(restaurantCategories1.length);
  // console.log(restaurantCategories2.length);
  const totallength = restaurantCategories1.length + restaurantCategories2.length;
  if (totallength == 0 && newSearch.length != 0) {
    cat123.value = false;
  } else {
    cat123.value = true;
  }

  // console.log(cat123.value);
};

const restaurantsFiltered = ref([{}]);
const filter = ref(true);
const categories = reactive([]);
//use this for method
const myAction = (category: string) => {
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
  
};


// watch(search, (newSearch) => {
//   console.log('Search value changed:', newSearch);
//   // You can place your logic here or call your searchname function
//   searchname(newSearch);
// });


const toggleButton = (value: boolean, category: string) => {
  // console.log(category);
  // categories.push(category);
  // console.log(categories);

  isButtonOn.value[category] = value;
  console.log(`Button ${category} is toggled to ${value ? 'ON' : 'OFF'}`);
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
  for (const cat of newSearch){
    isButtonOn.value[cat] = true;
    // console.log(isButtonOn.value[cat]);
    
  }
  buttonNames.value = Object.keys(isButtonOn.value);

});

const seemore = ref(false);
const viewAll = () => {
  if (seemore.value == false) {
    seemore.value = true;
  } else {
    seemore.value = false;
  }
};

const price = ['$', '$$', '$$$', '$$$$', '$$$$$'];


const sortbyabc = () => {
  // filter.value = false;
  // for (const restaurant of restaurants) {
  //         console.log(restaurant.category.includes(category));
  //         if (restaurant.category.includes(category) == true) {
  //             console.log("hello");
  //             restaurantsFiltered.push(restaurant);
  //         }
  //     }

};
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
  <main class="bg-white">
    <NavHeader />
    <ProfileTabs />
    <!-- <section class="ji gp uq">
            <div>
                <input type="button" id="btn" value="By Order" />
                <input type="button" id="btn" value="Nearest" />
            </div>
        </section> -->
    <section class="bb ki vq jb jo bg-white">
      <!-- <div>
                <input type="button" id="btn" value="By ABC" style="background: pink; border-color: black;"
                    @click="sortbyabc" />
                <input type="button" id="btn" value="By Price" style="background-color: pink; border-color: black;"
                    @click="sortbyprice" />
                {{ catName }}
                <input type="text" v-model="search" />
                <span>{{ search }}</span>
            </div> -->
      <div class="grid grid-cols-12 px-8">
        <div class="col-span-0 mr-20 hidden lg:block lg:col-span-3">
          <div
            class="sticky overflow-y-scroll gap-24 max-h-[calc(100vh-168px)] border-solid border-2 border-orange-500 rounded-lg p-4 pl-7"
            style="position: sticky; top: 125px; z-index: 1;">
            <div class="font-bold text-2xl pb-7">Filters</div>
            <div class="fold-black text-black pb-2">Sort By</div>
            <SortButtonOnSide />
            <div class="fold-black text-black pb-2">Categories</div>
            <div class="relative mb-3" data-te-input-wrapper-init>
              <input type="search"
                class="border-orange-500 relative m-0 block w-full min-w-0 flex-auto rounded-full border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem]  leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-orange-500 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                id="exampleSearch2" placeholder="Cuisine" v-model="search" />
              <!-- <label for="exampleSearch2"
                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Cusince</label> -->
            </div>
            <div v-if="cat123 == true">
              <FilterButtonOnSide @filter-event="myAction" v-for="category in restaurantCategories1"  :key="category"  @update:modelValue="isButtonOn[buttonName] = $event" 
                :category="category"   :modalValue="isButtonOn[category]"  class="px-4" />
              <button v-if="seemore == false" @click="viewAll" class="px-4">See more</button>
              <span v-else>
                <FilterButtonOnSide @filter-event="myAction" v-for="category in restaurantCategories2"  :key="category"  @update:modelValue="isButtonOn[buttonName] = $event" 
                  :category="category" :modalValue="isButtonOn[category]" class="px-4" />
                <button class="px-4 pb-4" @click="viewAll">See less</button>
              </span>
            </div>
            <div v-else>
              <span class="px-4 pb-4">No Results</span>
            </div>

            <div class="fold-black text-black pb-2">Sort By</div>
            <div>
              <PriceButtonOnSide v-for="category in price" :key="category" :category="category" />
            </div>


          </div>
        </div>
        <div class="col-span-12 lg:col-span-9">
          <div class="text-bold lg:hidden pb-1">
            Categories
          </div>
          <div class="scrollable-content pr-1 pb-1 pt-1 overflow-x-scroll lg:hidden  ">

            <span v-for="buttonName in buttonNames" :key="buttonName">
              <FilterButton :modelValue="isButtonOn[buttonName]" :buttonName="buttonName" @button-click="toggleButton"  @update:modelValue="isButtonOn[buttonName] = $event"   />
            </span>

          </div>
          <div class="flex" style="justify-content: end;">
            <div class="p-1 lg:hidden">
              <div class="text-bold lg:hidden pb-1">
                Sort by
              </div>
              <div class="relative inline-flex" style="margin-bottom: 25px;">
                <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 412 232">
                  <path
                    d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                    fill="#648299" fill-rule="nonzero" />
                </svg>
                <select
                  class="border border-orange-500 rounded-full text-orange-500 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                  <option value="Alphabet">Alphabet</option>
                  <option value="Distance">Distance</option>
                  <option value="Price">Price</option>

                </select>
              </div>
              <span :class="{ 'pressed': isAscending }" @click="toggleSortDirection(true)"> ▲</span>
              <span :class="{ 'pressed': isDescending }" @click="toggleSortDirection(false)">▼</span>
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
              <BookmarkRestaurantItem v-for="restaurant in restaurants" :key="restaurant.id" :restaurant="restaurant" />
              <!-- </div> -->
            </div>
            <div v-else class="wc zf iq my-grid pb-5 pt-5">
              <BookmarkRestaurantItem v-for="restaurant in restaurantsFiltered" :key="restaurant.id"
                :restaurant="restaurant" />
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
