<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import RestaurantListItem from "@/components/RestaurantListItem.vue";
import GenericButton from "@/components/GenericButton.vue";
import RestaurantModal from "@/components/RestaurantModal.vue";
import { useGroupUpvoteRestaurantsStore } from "@/stores/groupUpvoteRestaurants";
import { computed, onBeforeMount, onBeforeUnmount, ref } from "vue";
import type { Restaurant } from "@/types/Restaurant";
import ky from "ky";
import type { LatLng } from "@/types/location";
import { useRestaurantsStore } from "@/stores/restaurants";
import { useCurrentLocationStore } from "@/stores/currentLocation";
import { channel, isLeader, users } from "@/apis/supabase";
import { useTimer } from "@/composables/useTimer";

const MAP_KEY = import.meta.env.VITE_MAPS_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;
const groupUpvoteRestaurantsStore = useGroupUpvoteRestaurantsStore();
const restaurants = useRestaurantsStore();
const currentLocation = useCurrentLocationStore();
const { milliseconds } = useTimer();
const router = useRouter();

const tabulatedResults = computed<Restaurant[]>(() => {
  const restaurantMap = new Map<string, Restaurant>();

  // We first add in all the group values
  for (const restaurant of groupUpvoteRestaurantsStore.restaurants) {
    let foundRestaurant = restaurantMap.get(restaurant.place_id);
    if (foundRestaurant && foundRestaurant.upvote_count) {
      foundRestaurant.upvote_count += restaurant.upvote_count
        ? restaurant.upvote_count
        : 1;
    } else {
      foundRestaurant = restaurant;
    }
    restaurantMap.set(restaurant.place_id, foundRestaurant);
  }

  const retArr: Restaurant[] = [...restaurantMap.values()];
  retArr.sort((a, b) => {
    if (b.upvote_count && a.upvote_count) {
      const retVal = b.upvote_count - a.upvote_count;
      if (retVal === 0) {
        if (b.name < a.name) {
          return -1;
        } else {
          return 0;
        }
      }
      return b.upvote_count - a.upvote_count;
    } else return 0;
  });

  return retArr;
});

const showModalValues = ref({
  title: "",
  placeId: "",
  imgSrc: "",
  show: false,
});

const expandedResults = computed<Restaurant[]>(() => {
  const retArr = [...tabulatedResults.value];
  if (retArr.length > 1) {
    retArr.splice(0, 1);
    return retArr;
  }
  return [];
});

const getRestaurants = async () => {
  if (currentLocation.latLng) {
    success({
      lat: currentLocation.latLng.lat,
      lng: currentLocation.latLng.lng,
    });
  } else {
    navigator.geolocation.getCurrentPosition(
      (positionData) =>
        success({
          lat: positionData.coords.latitude,
          lng: positionData.coords.longitude,
        }),
      (error) => console.log(error),
    );
  }
};

const getRestaurantImageUrl = (restaurant: Restaurant) => {
  if (restaurant && restaurant.photos) {
    return `${API_URL}/google/photo?photo_reference=${restaurant?.photos?.photo_reference}`;
  } else {
    return "";
  }
};

const success = async (position: LatLng) => {
  const latitude = position.lat;
  const longitude = position.lng;

  const query = `location=${latitude},${longitude}
  &radius=500&type=restaurant&minprice=1`;
  const URL = `${API_URL}/google?${query}`;

  const data = (await ky(URL).json()) as Restaurant[];

  console.log(data);

  restaurants.clearRestaurants();

  data.forEach((item: Restaurant) => {
    restaurants.addRestaurant({
      place_id: item.place_id,
      name: item.name,
      photos: item.photos,
      rating: item.rating,
      user_ratings: item.user_ratings,
      vicinity: item.vicinity,
      geometry: {
        lat: item.geometry.lat,
        lng: item.geometry.lng,
      },
      upvote_count: 0,
    });
  });
  const selectedRestaurant =
    restaurants.restaurants[
      Math.floor(Math.random() * restaurants.restaurants.length)
    ];

  groupUpvoteRestaurantsStore.clearRestaurants();
  groupUpvoteRestaurantsStore.addRestaurant(selectedRestaurant);
};

onBeforeMount(async () => {
  if (groupUpvoteRestaurantsStore.restaurants.length === 0)
    await getRestaurants();
});

onBeforeUnmount(() => {
  restaurants.clearRestaurants();
  groupUpvoteRestaurantsStore.clearRestaurants();
});

const handleTryAgain = async () => {
  if (users.value.size > 0) {
    //we are in a group setting
    try {
      await channel.value?.send({
        type: "broadcast",
        event: "start",
        payload: { time: milliseconds.value },
      });
      router.push("/vote");
    } catch (error) {
      console.log(error);
    }
  } else {
    await getRestaurants();
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
</script>

<template>
  <main>
    <h2 class="text-primary mb-2.5" v-if="tabulatedResults.length > 0">
      <span class="text-3xl font-semibold mr-2">1st</span>
      place
    </h2>

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
        @close="showModalValues.show = false"
      />
    </va-modal>

    <RestaurantListItem
      :title="tabulatedResults[0].name"
      :imgSrc="getRestaurantImageUrl(tabulatedResults[0])"
      :tags="['Burger', 'Fastfood', 'Halal']"
      v-if="tabulatedResults.length > 0"
      @click="
        handleModal(
          tabulatedResults[0].place_id,
          tabulatedResults[0].name,
          getRestaurantImageUrl(tabulatedResults[0]),
        )
      "
    >
      <generic-button
        class="inline-flex align-center gap-2 text-primary"
        padding="p-0"
      >
        <va-icon name="arrow_circle_up" size="2rem" />
        <span class="font-semibold">
          {{ tabulatedResults[0].upvote_count }}
        </span>
      </generic-button>
    </RestaurantListItem>

    <va-collapse
      header="Expand Results"
      text-color="textPrimary"
      color="#ff000000"
      flat
      v-if="expandedResults.length > 0"
    >
      <ul>
        <li
          class="my-2.5"
          v-for="restaurant in expandedResults"
          :key="restaurant.place_id"
        >
          <RestaurantListItem
            :title="restaurant.name"
            :imgSrc="`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant?.photos?.photo_reference}&key=${MAP_KEY}`"
            :tags="['Burger', 'Fastfood', 'Halal']"
            @click="
              handleModal(
                restaurant.place_id,
                restaurant.name,
                getRestaurantImageUrl(restaurant),
              )
            "
          />
        </li>
      </ul>
    </va-collapse>

    <div
      class="w-full fixed bottom-8 left-0 right-0 inline-flex justify-center gap-4"
    >
      <RouterLink to="/">
        <generic-button shadowColor="shadow-default">
          Back To Home
        </generic-button>
      </RouterLink>
      <generic-button
        bgColor="bg-primary"
        titleColor="text-white"
        shadowColor="shadow-custom-primary"
        @click="handleTryAgain"
        :disabled="users.size > 0 && !isLeader"
      >
        Try Again
      </generic-button>
    </div>
  </main>
</template>
