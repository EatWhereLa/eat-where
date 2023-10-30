<script setup lang="ts">
import RestaurantListItem from "@/components/RestaurantListItem.vue";

import { useRestaurantsStore } from "@/stores/restaurants";
import { useUpvoteRestaurantsStore } from "@/stores/upvoteRestaurants";
import { useGroupUpvoteRestaurantsStore } from "@/stores/groupUpvoteRestaurants";

import GenericButton from "@/components/GenericButton.vue";
import EmptyListImage from "../assets/empty_list_no_bg.png";
import type { Restaurant } from "@/types/Restaurant";
import { storeToRefs } from "pinia";

const API_URL = import.meta.env.VITE_API_URL;

const restaurants = useRestaurantsStore();
const upvotedRestaurants = useUpvoteRestaurantsStore();
const groupUpvotedRestaurants = useGroupUpvoteRestaurantsStore();

const { restaurants: upvotedRestaurantsVal } = storeToRefs(upvotedRestaurants);

const handleDownvote = (id: string) => {
  const foundRestaurant = restaurants.restaurants.find(
    (restaurant) => restaurant.place_id === id,
  );

  if (foundRestaurant == undefined) return;

  const foundUpvotedRestaurant = upvotedRestaurants.restaurants.find(
    (restaurant) => restaurant.place_id === id,
  );

  console.log(foundUpvotedRestaurant);

  if (foundUpvotedRestaurant != undefined) {
    upvotedRestaurants.removeRestaurant(foundRestaurant.place_id);
    handleGroupDownvote(foundRestaurant);
  }
};

const getRestaurantImageUrl = (restaurant: Restaurant) => {
  if (restaurant && restaurant.photos) {
    return `${API_URL}/google/photo?photo_reference=${restaurant?.photos?.photo_reference}`;
  } else {
    return "";
  }
};

const handleGroupDownvote = (restaurant: Restaurant) => {
  if (restaurant == undefined) return;
  groupUpvotedRestaurants.removeRestaurant(restaurant.place_id);
};
</script>

<template>
  <main>
    <ul v-if="upvotedRestaurantsVal.length > 0">
      <li
        v-for="(restaurant, index) in upvotedRestaurantsVal"
        :key="index"
        class="mb-2.5"
      >
        <RestaurantListItem
          :imgSrc="getRestaurantImageUrl(restaurant)"
          :title="restaurant.name"
        >
          <generic-button
            title-color="text-white"
            :bg-color="'bg-primary'"
            class="inline-flex align-center gap-2"
            padding="py-2 px-3"
            @click="handleDownvote(restaurant.place_id)"
          >
            <va-icon name="delete" size="1.5rem" />

            <span class="font-semibold uppercase tracking-widest text-xs">
              Remove
            </span>
          </generic-button>
        </RestaurantListItem>
      </li>
    </ul>
    <div v-else class="flex flex-col justify-center align-center">
      <div class="my-5">
        <img :src="EmptyListImage" />
      </div>
      <h3 class="text-lg">You do not have any upvoted restaurants so far</h3>
    </div>
  </main>
</template>
