<script setup lang="ts">
import { useRouter } from "vue-router";
import RestaurantListItem from "@/components/RestaurantListItem.vue";
import GenericButton from "@/components/GenericButton.vue";
import { type Ref, ref, computed, watch, onMounted } from "vue";
import { useGeolocation } from "../composables/useGeolocation";
import { useTimer } from "@/composables/useTimer";
import RestaurantModal from "@/components/RestaurantModal.vue";

import { useRestaurantsStore } from "@/stores/restaurants";
import { useUpvoteRestaurantsStore } from "@/stores/upvoteRestaurants";
import { useGroupUpvoteRestaurantsStore } from "@/stores/groupUpvoteRestaurants";
import { storeToRefs } from "pinia";

import { useSelectFilterStore } from "@/stores/selectFilter";
import { useCurrentLocationStore } from "@/stores/currentLocation";

import { channel, isLeader } from "@/apis/supabase";
import type { Restaurant } from "@/types/Restaurant";
import type { LatLng } from "@/types/location";
import ky from "ky";
import { useBookmarks } from "@/composables/useBookmarks";

const API_URL = import.meta.env.VITE_API_URL;
const router = useRouter();

const selectFilter = useSelectFilterStore();
const currentLocation = useCurrentLocationStore();
const restaurants = useRestaurantsStore();
const upvotedRestaurants = useUpvoteRestaurantsStore();
const groupUpvotedRestaurants = useGroupUpvoteRestaurantsStore();
const { bookmarks, getBookmarks } = useBookmarks();

const { restaurants: upvotedRestaurantsVal } = storeToRefs(upvotedRestaurants);
const { restaurants: groupUpvotedRestaurantsVal } = storeToRefs(
  groupUpvotedRestaurants,
);

const filterTags = ["All", "Fastfood", "Halal", "Japanese", "Korean"];
const prices = [
  "All",
  "Inexpensive",
  "Moderate",
  "Expensive",
  "Very Expensive",
];
const distances = ["500m", "1km", "2km", "5km"];

const { killTimers, init } = useTimer();

const isLoadingRestaurants = ref(true);

const calcPriceValue = (selectedPrice: string) => {
  // index 0 is 'Free', we don't want to include 'Free' option
  // That is why we add '+ 1'
  return prices.indexOf(selectedPrice) + 1;
};

const calcDistanceValue = (selectedValue: string) => {
  console.log(selectedValue);

  // const [value, unit]: [string, string] | null =
  //   selectedValue.match(/\D+|\d+/g);

  const selectedValueArray: string[] | null =
    selectedValue.match(/\D+|\d+/g) || null;

  const value: string | null =
    selectedValueArray === null ? null : selectedValueArray[0];

  const unit: string | null =
    selectedValueArray === null ? null : selectedValueArray[1];

  let distanceVal: number = Number(value);

  if (unit === "m") {
    distanceVal = distanceVal / 1000;
  }

  return distanceVal;
};

const toggleTag = (tag: string) => (selectFilter.selectedTag = tag);

const isUpvoted = (id: string) =>
  upvotedRestaurants.restaurants.find((result) => result.place_id === id);

const isLocationChanged = () =>
  currentLocation.address !== currentLocation.oldAddress;

const isPriceChanged = () =>
  selectFilter.selectedPrice !== selectFilter.oldSelectedPrice;

const isDistanceChanged = () =>
  selectFilter.selectedDistance !== selectFilter.oldSelectedDistance;

const isTagChanged = () =>
  selectFilter.selectedTag !== selectFilter.oldSelectedTag;

const { coords, address } = useGeolocation();
const currPos = computed(() => ({
  lat: coords.value.lat,
  lng: coords.value.lng,
  address: address.value,
}));

const locationSetCoords = ref({
  lat: currPos.value.lat,
  lng: currPos.value.lng,
});

const showModalValues = ref({
  title: "",
  placeId: "",
  imgSrc: "",
  show: false,
});

function generateCrowd(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const success = async (position: LatLng) => {
  isLoadingRestaurants.value = true;

  const latitude = position.lat;
  const longitude = position.lng;

  locationSetCoords.value.lat = currentLocation.latLng?.lat || latitude;
  locationSetCoords.value.lng = currentLocation.latLng?.lng || longitude;
  let priceQuery = "";
  if (selectFilter.selectedPrice !== "All") {
    priceQuery = `&minprice=${calcPriceValue(
      selectFilter.selectedPrice,
    )}&maxprice=${calcPriceValue(selectFilter.selectedPrice)}`;
  }

  const query = `location=${locationSetCoords.value.lat},${
    locationSetCoords.value.lng
  }
  &radius=${
    calcDistanceValue(selectFilter.selectedDistance) * 1000
  }&type=restaurant${priceQuery}${
    selectFilter.selectedTag !== "All"
      ? `&keyword=${selectFilter.selectedTag.toLowerCase()}`
      : ""
  }`;
  const URL = `${API_URL}/google?${query}`;

  // if (
  //   sessionStorage.getItem("restaurants") === null ||
  //   isLocationChanged() ||
  //   isPriceChanged() ||
  //   isDistanceChanged() ||
  //   isTagChanged()
  // ) {
  const data = (await ky(URL).json()) as Restaurant[];

  currentLocation.setLocationAddress(currentLocation.address);
  currentLocation.setOldLocationAddress(currentLocation.address);

  selectFilter.setSelectedPrice(selectFilter.selectedPrice);
  selectFilter.setOldSelectedPrice(selectFilter.selectedPrice);

  selectFilter.setSelectedDistance(selectFilter.selectedDistance);
  selectFilter.setOldSelectedDistance(selectFilter.selectedDistance);

  selectFilter.setSelectedTag(selectFilter.selectedTag);
  selectFilter.setOldSelectedTag(selectFilter.selectedTag);

  restaurants.restaurants = [];

  data.forEach((item: Restaurant) => {
    restaurants.addRestaurant({
      place_id: item.place_id,
      name: item.name,
      photos: item.photos,
      rating: item.rating,
      crowd: generateCrowd(1, 5),
      user_ratings: item.user_ratings,
      vicinity: item.vicinity,
      geometry: {
        lat: item.geometry.lat,
        lng: item.geometry.lng,
      },
      category: [],
      upvote_count: 0,
    });
  });

  sessionStorage.setItem(
    "restaurants",
    JSON.stringify(restaurants.restaurants),
  );

  isLoadingRestaurants.value = false;
};

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

onMounted(async () => {
  getRestaurants();
  init();
});

watch(
  () => selectFilter.selectedPrice,
  (newPrice, oldPrice) => {
    selectFilter.setSelectedPrice(newPrice);
    selectFilter.setOldSelectedPrice(oldPrice);
    getRestaurants();
  },
);
watch(
  () => selectFilter.selectedDistance,
  (newDistance, oldDistance) => {
    selectFilter.setSelectedDistance(newDistance);
    selectFilter.setOldSelectedDistance(oldDistance);
    getRestaurants();
  },
);
watch(
  () => selectFilter.selectedTag,
  (newTag, oldTag) => {
    selectFilter.setSelectedTag(newTag);
    selectFilter.setOldSelectedTag(oldTag);
    getRestaurants();
  },
);

const handleUpvote = (event: { stopPropagation: () => void }, id: string) => {
  event.stopPropagation();
  const foundRestaurant: Restaurant | undefined = restaurants.restaurants.find(
    (restaurant) => restaurant.place_id === id,
  );

  if (foundRestaurant == undefined) return;

  const foundUpvotedRestaurant = upvotedRestaurants.restaurants.find(
    (restaurant) => restaurant.place_id === id,
  );

  if (foundUpvotedRestaurant == undefined) {
    upvotedRestaurants.addRestaurant(foundRestaurant);
    handleGroupUpvote(foundRestaurant);
    channel.value?.send({
      type: "broadcast",
      event: "upvote",
      payload: foundRestaurant,
    });
  } else {
    channel.value?.send({
      type: "broadcast",
      event: "downvote",
      payload: id,
    });
    upvotedRestaurants.removeRestaurant(id);
    handleGroupDownvote(foundRestaurant);
  }
};

const handleGroupUpvote = (restaurant: Restaurant) => {
  if (restaurant == undefined) return;
  groupUpvotedRestaurants.addRestaurant(restaurant);
};

const handleGroupDownvote = (restaurant: Restaurant) => {
  if (restaurant == undefined) return;
  groupUpvotedRestaurants.removeRestaurant(restaurant.place_id);
};

const getRestaurantImageUrl = (restaurant: Restaurant) => {
  if (restaurant && restaurant.photos) {
    return `${API_URL}/google/photo?photo_reference=${restaurant?.photos?.photo_reference}`;
  } else {
    return "";
  }
};

const handleGoToResults = async () => {
  // we first want to send out a broadcast
  await channel.value?.send({
    type: "broadcast",
    event: "endVote",
  });

  killTimers();
  router.push("/results");
};

const getRemainingList = () => {
  return restaurants.restaurants.slice(1);
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
  <main class="overflow-y-auto h-full">
    <div class="max-w-xl min-w-full overflow-x-auto scrollbar-hide">
      <div class="inline-flex gap-3 pb-8 pt-2 px-1">
        <va-chip
          v-for="filter in filterTags"
          :key="filter"
          color="white"
          :class="{ 'chip-active': selectFilter.selectedTag === filter }"
          size="large"
          class="shadow-default-sm"
          @click="toggleTag(filter)"
        >
          <span class="text-base px-2">{{ filter }}</span>
        </va-chip>
      </div>
    </div>

    <div class="flex gap-4">
      <va-select
        v-model="selectFilter.selectedPrice"
        class="mb-6"
        :options="prices"
        :placeholder="selectFilter.selectedPrice"
      >
        <template #prependInner>
          <va-icon name="attach_money" />
        </template>
      </va-select>

      <va-select
        v-model="selectFilter.selectedDistance"
        class="mb-6 rounded-2xl"
        :placeholder="selectFilter.selectedDistance"
        :options="distances"
      >
        <template #prependInner>
          <va-icon name="location_on" />
        </template>
      </va-select>
    </div>

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

    <div>
      <div class="flex items-center gap-2 mb-3">
        <hr class="h-px my-2 bg-primary w-2/5 m-auto" />
        <p class="text-primary font-semibold text-sm">Bookmarked</p>
        <hr class="h-px my-2 bg-primary w-2/5 m-auto" />
      </div>
      <div v-if="restaurants.restaurants.length > 0">
        <RestaurantListItem
          :title="restaurants.restaurants[0].name"
          :imgSrc="getRestaurantImageUrl(restaurants.restaurants[0])"
          :tags="['Burger', 'Fastfood', 'Halal']"
          :rating="restaurants.restaurants[0].rating"
          :distance="restaurants.restaurants[0].vicinity"
          @click="
            handleModal(
              restaurants.restaurants[0].place_id,
              restaurants.restaurants[0].name,
              getRestaurantImageUrl(restaurants.restaurants[0]),
            )
          "
        >
          <generic-button
            title-color="text-gray-500"
            :bg-color="
              !isUpvoted(restaurants.restaurants[0].place_id)
                ? 'bg-neutral-400/30'
                : 'bg-primary'
            "
            padding="py-2 px-3"
            @click="handleUpvote($event, restaurants.restaurants[0].place_id)"
          >
            <va-icon
              v-if="!isUpvoted(restaurants.restaurants[0].place_id)"
              name="arrow_upward"
              size="1.5rem"
            />
            <va-icon
              v-else
              class="text-white"
              name="arrow_downward"
              size="1.5rem"
            />

            <!-- <span class="font-semibold">100</span> -->
            <span
              v-if="!isUpvoted(restaurants.restaurants[0].place_id)"
              class="font-semibold uppercase tracking-widest text-xs"
            >
              Upvote
            </span>
            <span
              v-else
              class="font-semibold uppercase tracking-widest text-xs text-white"
            >
              Downvote
            </span>
          </generic-button>
        </RestaurantListItem>
      </div>
      <hr class="h-px my-2 mb-3 bg-primary w-full m-auto" />
    </div>
    <ul
      class="flex flex-col gap-4 mb-16"
      v-if="restaurants.restaurants.length > 1"
    >
      <div v-if="isLoadingRestaurants">Loading...</div>
      <li
        v-else
        v-for="restaurant in getRemainingList()"
        :key="restaurant.place_id"
      >
        <RestaurantListItem
          :title="restaurant.name"
          :imgSrc="getRestaurantImageUrl(restaurant)"
          :tags="['Burger', 'Fastfood', 'Halal']"
          :rating="restaurant.rating"
          :distance="restaurant.vicinity"
          @click="
            handleModal(
              restaurant.place_id,
              restaurant.name,
              getRestaurantImageUrl(restaurant),
            )
          "
        >
          <generic-button
            title-color="text-gray-500"
            :bg-color="
              !isUpvoted(restaurant.place_id)
                ? 'bg-neutral-400/30'
                : 'bg-primary'
            "
            padding="py-2 px-3"
            @click="handleUpvote($event, restaurant.place_id)"
          >
            <va-icon
              v-if="!isUpvoted(restaurant.place_id)"
              name="arrow_upward"
              size="1.5rem"
            />
            <va-icon
              v-else
              class="text-white"
              name="arrow_downward"
              size="1.5rem"
            />

            <!-- <span class="font-semibold">100</span> -->
            <span
              v-if="!isUpvoted(restaurant.place_id)"
              class="font-semibold uppercase tracking-widest text-xs"
            >
              Upvote
            </span>
            <span
              v-else
              class="font-semibold uppercase tracking-widest text-xs text-white"
            >
              Downvote
            </span>
          </generic-button>
        </RestaurantListItem>
      </li>
    </ul>

    <div
      class="w-full fixed bottom-8 left-0 right-0 inline-flex justify-center gap-4"
      v-if="isLeader"
    >
      <generic-button
        bgColor="bg-primary"
        titleColor="text-white"
        shadowColor="shadow-custom-primary"
        icon="arrow_forward"
        icon-right
        @click="handleGoToResults"
      >
        See Results Now
      </generic-button>
    </div>
  </main>
</template>

<style>
.chip-active {
  @apply bg-primary !important;
  @apply text-white !important;
  @apply shadow-custom-primary-sm;
}
/* For Webkit-based browsers (Chrome, Safari and Opera) */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* For IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.va-input-wrapper__append-inner i.va-icon.material-icons {
  @apply text-black !important;
}
</style>
