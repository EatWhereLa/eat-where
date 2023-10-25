<script setup lang="ts">
import NavHeader from "@/components/NavHeader.vue";
import ProfileTabs from "@/components/ProfileTabs.vue";
//to get json data
import FilterButtonOnSide from "@/components/ForRestaurantBookmark/FilterButtonOnSide.vue";
import restaurantsData from "@/data/restaurants.json";

import { reactive, ref, watch } from "vue";
const restaurants = restaurantsData.restaurants; // This should directly give you the array of restaurants
const restaurantCategories = reactive([]); // All of the Cat
const restaurantCategories1 = reactive([]);
const restaurantCategories2 = reactive([]);
for (const restaurant of restaurants) {
  for (const cat of restaurant.category) {
    if (
      restaurantCategories1.includes(cat) == false &&
      restaurantCategories1.length < 10
    ) {
      restaurantCategories1.push(cat);
      restaurantCategories.push(cat);
    } else if (
      restaurantCategories1.includes(cat) == false &&
      restaurantCategories1.length >= 10 &&
      restaurantCategories2.includes(cat) == false
    ) {
      restaurantCategories2.push(cat);
      restaurantCategories.push(cat);
    }
  }
}

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

const search = ref("");
const gotsearch = ref(true);

watch(search, (newSearch) => {
  console.log("Search value changed:", newSearch);
  // You can place your logic here or call your searchname function
  searchname(newSearch);

  if (newSearch.length == 0) {
    gotsearch.value = true;
  } else {
    gotsearch.value = false;
  }
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
      if (restaurantCategories1.length < 10) {
        restaurantCategories1.push(cat);
      } else {
        restaurantCategories2.push(cat);
      }
    } else if (newSearch1.length == 0) {
      if (restaurantCategories1.length < 10) {
        restaurantCategories1.push(cat);
      } else {
        restaurantCategories2.push(cat);
      }
    }
  }
  // console.log(restaurantCategories1.length);
  // console.log(restaurantCategories2.length);
  const totallength =
    restaurantCategories1.length + restaurantCategories2.length;
  if (totallength == 0 && newSearch.length != 0) {
    cat123.value = false;
  } else {
    cat123.value = true;
  }

  // console.log(cat123.value);
};

const seemore = ref(false);
const viewAll = () => {
  if (seemore.value == false) {
    seemore.value = true;
  } else {
    seemore.value = false;
  }
};
</script>

<template>
  <main>
    <NavHeader />
    <ProfileTabs />
    <div class="flex flex-wrap mt-20 justify-center" style="min-width: 650px">
      <div
        class="container !grow-0 lg:w-4/6 xl:w-4/7 sm:w-full md:w-2/3 bg-white shadow-lg transform duration-200 easy-in-out"
        style="min-width: 650px"
      >
        <div class="h-32 overflow-hidden">
          <img class="w-full" src="/src/assets/profile-banner.png" alt="" />
        </div>
        <div class="flex justify-center px-5 -mt-12">
          <img
            class="!grow-0 h-32 w-32 bg-white p-2 rounded-full"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt=""
          />
        </div>
        <div>
          <div class="text-center px-14">
            <h2 class="text-gray-800 text-3xl font-bold">Mohit Dhiman</h2>
            <a
              class="text-gray-400 mt-2 hover:text-blue-500"
              href="https://www.instagram.com/immohitdhiman/"
              target="BLANK()"
              >@immohitdhiman</a
            >
            <p class="mt-2 text-gray-500 text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s,
            </p>
          </div>
          <hr class="mt-6" />
          <div class="flex bg-gray-50">
            <div class="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
              <p><span class="font-semibold">2.5 k </span> Followers</p>
            </div>
            <div class="border"></div>
            <div class="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
              <p><span class="font-semibold">2.0 k </span> Following</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap mt-20 justify-center" style="min-width: 650px">
      <div
        class="container !grow-0 lg:w-4/6 xl:w-4/7 sm:w-full md:w-2/3 transform duration-200 easy-in-out"
        style="min-width: 650px"
      >
        <div
          class="col-span-12 overflow-hidden rounded-xl bg-gray-50 px-8 sm:shadow"
          style="min-width: 650px"
        >
          <div class="pt-4">
            <h1 class="py-2 text-2xl font-semibold">Account settings</h1>
            <!-- <p class="font- text-slate-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p> -->
          </div>
          <hr class="mt-4 mb-8" />
          <p class="py-2 text-xl font-semibold mb-2">Change Profile Picture</p>
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div class="flex items-center space-x-6">
              <div class="shrink-0">
                <img
                  class="h-16 w-16 object-cover rounded-full"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                  alt="Current profile photo"
                />
              </div>
              <label class="block">
                <span class="sr-only">Choose profile photo</span>
                <input
                  type="file"
                  class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-500 hover:file:bg-orange-100"
                />
              </label>
            </div>
            <div class="ml-auto mt-4">
              <button
                class="rounded-lg bg-orange-500 px-4 py-2 text-white inline-flex"
              >
                Change
              </button>
            </div>
          </div>
          <hr class="mt-4 mb-8" />

          <p class="py-2 text-xl font-semibold">Email Address</p>
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <p class="text-gray-600">
              Your email address is <strong>john.doe@company.com</strong>
            </p>
            <!-- <button class="inline-flex text-sm font-semibold text-orange-500 underline decoration-2">Change</button> -->
          </div>
          <hr class="mt-4 mb-8" />

          <div class="mb-10">
            <p class="py-2 text-xl font-semibold">Delete Account</p>
            <p
              class="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-2 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              Proceed with caution
            </p>
            <p class="mt-2">
              Make sure you have taken backup of your account in case you ever
              need to get access to your data. We will completely wipe your
              data. There is no way to access your account after this action.
            </p>
            <button
              class="ml-auto text-sm font-semibold text-rose-600 underline decoration-2"
            >
              Continue with deletion
            </button>
          </div>
        </div>
        <!-- </div> -->
      </div>
    </div>

    <div class="flex flex-wrap mt-20 justify-center" style="min-width: 650px">
      <div
        class="container !grow-0 lg:w-4/6 xl:w-4/7 sm:w-full md:w-2/3 transform duration-200 easy-in-out"
        style="min-width: 650px"
      >
        <div
          class="col-span-12 overflow-hidden rounded-xl bg-gray-50 px-8 sm:shadow"
          style="min-width: 650px"
        >
          <div class="pt-4">
            <h1 class="py-2 text-2xl font-semibold">Voting settings</h1>
            <!-- <p class="font- text-slate-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p> -->
          </div>
          <hr class="mt-4 mb-8" />
          <p class="py-2 text-xl font-semibold mb-2">
            Set Default Vote Duration
          </p>
          <div class="flex">
            <div class="relative inline-flex">
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
                class="border-none rounded-full text-orange-500 h-10 pl-5 pr-10 bg-orange-50 hover:bg-orange-100 focus:outline-none appearance-none font-semibold text-sm"
              >
                <option class="border-none" value="1">1:00 min</option>
                <option class="border-none" value="2">2:00 min</option>
                <option class="border-none" value="3">3:00 min</option>
                <option class="border-none" value="4">4:00 min</option>
                <option class="border-none" value="5">5:00 min</option>
              </select>
            </div>

            <div class="ml-auto">
              <button
                class="rounded-lg bg-orange-500 px-4 py-2 text-white inline-flex"
              >
                Change
              </button>
            </div>
          </div>

          <hr class="mt-4 mb-8" />
          <p class="py-2 text-xl font-semibold mb-2">
            Set Search Radius For Nearby Restaurants
          </p>
          <div class="flex">
            <div class="relative inline-flex">
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
                class="border-none rounded-full text-orange-500 h-10 pl-5 pr-10 bg-orange-50 hover:bg-orange-100 focus:outline-none appearance-none font-semibold text-sm"
              >
                <option class="border-none" value="500">500 m</option>
                <option class="border-none" value="1">1 km</option>
                <option class="border-none" value="2">2 km</option>
                <option class="border-none" value="3">5 km</option>
              </select>
            </div>

            <div class="ml-auto">
              <button
                class="rounded-lg bg-orange-500 px-4 py-2 text-white inline-flex"
              >
                Change
              </button>
            </div>
          </div>

          <hr class="mt-4 mb-8" />
          <div class="flex">
            <span class="py-2 text-xl font-semibold mb-2">
              Set Categories For Nearby Restaurants
            </span>
            <p class="ml-auto">
              <button
                class="rounded-lg bg-orange-500 px-4 py-2 text-white inline-flex"
              >
                Change
              </button>
            </p>
          </div>

          <div class="relative mb-3" data-te-input-wrapper-init>
            <input
              type="search"
              class="w-30 border-orange-500 relative m-0 block min-w-0 flex-auto rounded-full border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-orange-500 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              id="exampleSearch2"
              placeholder="Cuisine"
              v-model="search"
            />
          </div>
          <div v-if="cat123 == true">
            <div class="grid sm:grid-cols-5 grid-cols-2">
              <FilterButtonOnSide
                @filter-event="myAction"
                v-for="category in restaurantCategories1"
                :key="category"
                :category="category"
                class="px-4 cols-span-1"
              />
            </div>
            <span v-if="gotsearch">
              <button
                v-if="seemore == false"
                @click="viewAll"
                class="px-4 pb-5"
              >
                See more
              </button>
            </span>

            <span v-if="seemore == true">
              <div class="grid sm:grid-cols-5 grid-cols-2">
                <FilterButtonOnSide
                  @filter-event="myAction"
                  v-for="category in restaurantCategories2"
                  :key="category"
                  :category="category"
                  class="px-4 cols-span-1"
                />
              </div>
              <span v-if="gotsearch">
                <button
                  v-if="seemore == true"
                  class="px-4 pb-4"
                  @click="viewAll"
                >
                  See less
                </button>
              </span>
            </span>
          </div>
          <div v-else>
            <span class="px-4 pb-4">No Results</span>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- <Footer /> -->
</template>

<style scoped>
/* @import '../assets/base.css'; */
* {
  max-width: 100% !important;
}
</style>
