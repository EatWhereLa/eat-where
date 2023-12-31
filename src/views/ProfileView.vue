<script setup lang="ts">
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useCuisineCategories } from "@/composables/useCuisineCategories";
import { useUserSettingsStore } from "@/stores/userSettings";

const { username, email } = storeToRefs(useAuthStore());

const { cuisineCategories: categories } = useCuisineCategories();
const { selectedCategories, selectedTime, selectedDist } = storeToRefs(
  useUserSettingsStore(),
);
const { setCategories } = useUserSettingsStore();
const timings = ["1:00", "2:00", "3:00", "5:00"];
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
  if (categoryIdx >= 0) {
    const newArray = selectedCategories.value.filter((val) => val !== category);
    setCategories(newArray);
  }
}
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
          <br />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
