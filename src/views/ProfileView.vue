<script setup lang="ts">
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import { computed, onBeforeMount, ref, type Ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import restaurantsData from "@/data/restaurants.json"; // Adjust this path to where your data resides

const { username, email } = storeToRefs(useAuthStore());

const categories: Ref<string[]> = ref([]);
const selectedCategories: Ref<string[]> = ref([]);
const selectedTime = ref("1:00");
const timings = ["1:00", "2:00", "3:00", "5:00"];
const selectedDist = ref("500m");
const distances = ["500m", "1km", "2km", "5km"];

const avatar = computed(() => {
  if (username.value === "") {
    return "";
  } else {
    return createAvatar(adventurer, {
      size: 128,
      seed: username.value,
    }).toDataUriSync();
  }
});

function deleteCategory(category: string) {
  const categoryIdx = selectedCategories.value.findIndex(
    (val) => val === category,
  );
  console.log(categoryIdx);
  if (categoryIdx >= 0) {
    selectedCategories.value = selectedCategories.value.filter(
      (val) => val !== category,
    );
  }
}

onBeforeMount(() => {
  //init the categories
  const categorySet = new Set<string>();
  for (const restaurant of restaurantsData.restaurants) {
    restaurant.category.forEach((category) => categorySet.add(category));
  }
  categories.value = Array.from(categorySet);
});
</script>

<template>
  <main class="h-full flex flex-col gap-12 p-6 overflow-x-auto">
    <div class="flex flex-wrap justify-center">
      <div
        class="container lg:w-4/6 xl:w-4/7 sm:w-full md:w-2/3 bg-white rounded-xl shadow-lg transform duration-200 easy-in-out"
      >
        <div class="h-32 overflow-hidden">
          <img class="w-full" src="/src/assets/profile-banner.png" alt="" />
        </div>
        <div class="flex justify-center px-5 -mt-12">
          <img
            class="h-32 w-32 bg-white p-2 rounded-full"
            :src="avatar"
            alt="Avatar"
          />
        </div>
        <div class="text-center px-14 pb-6">
          <h2 class="text-gray-800 text-3xl font-bold">{{ username }}</h2>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap justify-center">
      <div
        class="container lg:w-4/6 xl:w-4/7 sm:w-full md:w-2/3 transform duration-200 easy-in-out"
      >
        <div
          class="col-span-12 overflow-hidden rounded-xl bg-white p-8 sm:shadow"
        >
          <h1 class="py-2 text-2xl font-semibold">Account settings</h1>

          <hr class="mt-4 mb-8" />

          <p class="py-2 text-xl font-semibold">Email Address</p>
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <p class="text-gray-600">
              Your email address is <strong>{{ email }}</strong>
            </p>
          </div>
          <hr class="mt-4 mb-8" />

          <div>
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
      </div>
    </div>

    <div class="flex flex-wrap justify-center">
      <div
        class="container lg:w-4/6 xl:w-4/7 sm:w-full md:w-2/3 transform duration-200 easy-in-out"
      >
        <div
          class="overflow-hidden rounded-xl bg-white p-8 sm:shadow flex flex-col gap-8"
        >
          <div>
            <h1 class="py-2 text-2xl font-semibold">Voting settings</h1>
            <hr class="mt-4" />
          </div>

          <div>
            <p class="py-2 text-xl font-semibold mb-2">
              Set Default Vote Duration
            </p>
            <div class="flex">
              <va-select
                v-model="selectedTime"
                class="w-full text-primary !border-0"
                :options="timings"
              >
                <template #prependInner>
                  <va-icon name="schedule" />
                </template>
              </va-select>
            </div>

            <hr class="mt-4" />
          </div>

          <div>
            <p class="py-2 text-xl font-semibold mb-2">
              Set Search Radius For Nearby Restaurants
            </p>
            <div class="flex">
              <va-select
                v-model="selectedDist"
                class="w-full text-primary !border-0"
                :options="distances"
              >
                <template #prependInner>
                  <va-icon name="location_on" />
                </template>
              </va-select>
            </div>
            <hr class="mt-4" />
          </div>

          <div>
            <p class="py-2 text-xl font-semibold mb-2">
              Set Categories For Nearby Restaurants
            </p>
            <div class="flex">
              <va-select
                v-model="selectedCategories"
                :options="categories"
                multiple
                searchable
                highlight-matched-text
                selected-top-shown
              >
                <template #content="{ value }">
                  <va-chip
                    v-for="category in value"
                    :key="category"
                    size="small"
                    class="mr-1 my-1 !text-white"
                    closeable
                    @update:modelValue="deleteCategory(category)"
                  >
                    {{ category }}
                  </va-chip>
                </template>
              </va-select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
