<script setup lang="ts">
import RestaurantModal from "@/components/RestaurantModal.vue";
import GenericButton from "@/components/GenericButton.vue";
import { ref, onBeforeMount, type Ref } from "vue";
import type { Restaurant } from "@/types/Restaurant";
import type { RestaurantDetails } from "@/types/RestaurantDetails";
import { useToast } from "vuestic-ui";

import { useAuthStore } from "@/stores/auth";
import ky from "ky";

import dayjs from "dayjs";

const API_URL = import.meta.env.VITE_API_URL;
const { username } = useAuthStore();

const { init } = useToast();

const showModalValues = ref({
  title: "",
  placeId: "",
  imgSrc: "",
  show: false,
});

const bookingItems: Ref<
  Array<{
    place_id: string;
    reservation_pax: number;
    reservation_timestamp: number;
    user_id: string;
  }>
> = ref([
  {
    place_id: "",
    reservation_pax: 0,
    reservation_timestamp: 0,
    user_id: "",
  },
]);

const bookingItemValues: Ref<Array<RestaurantDetails>> = ref([
  {
    name: "",
    current_opening_hours: {
      open_now: false,
      weekday_text: [],
      periods: [
        {
          close: {
            day: 0,
            time: "",
          },
          open: {
            day: 0,
            time: "",
          },
        },
      ],
      dine_in: false,
    },
    business_status: "",
    formatted_address: "",
    formatted_phone_number: "",
    photos: [
      {
        width: 0,
        height: 0,
        html_attribution: [""],
        photo_reference: "",
      },
    ],
    price_level: 0,
    place_id: "",
    rating: 0,
    reviews: [
      {
        author_name: "",
        author_url: "",
        rating: 0,
        profile_photo_url: "",
        relative_time_description: "",
        text: "",
        time: 0,
      },
    ],
    geometry: {
      location: {
        lat: 0,
        lng: 0,
      },
    },
    reservable: false,
    types: [""],
    website: "",
  },
]);

const imageUrl = ref<string[]>([]);
const imageUrlToModal = ref<string[]>([]);

// Add a loading state
const isLoading = ref(true);

onBeforeMount(async () => {
  isLoading.value = true;
  await initValues();
});

const initValues = async () => {
  try {
    await fetchBookings();
    imageUrl.value = new Array(bookingItems.value.length).fill("");
    bookingItemValues.value = await fetchPlaceInfos();
  } catch (error) {
    // Handle error, e.g., show an error message to the user
    console.error("Error during initialization:", error);
  } finally {
    isLoading.value = false; // Set loading to false regardless of the outcome
  }
};

const getRestaurantImageUrl = async (
  restaurant: RestaurantDetails,
  index: number,
) => {
  if (restaurant && restaurant.photos && restaurant.photos.length > 0) {
    try {
      const URL = `${API_URL}/google/photo?photo_reference=${restaurant.photos[0].photo_reference}`;
      const res = (await ky(URL).json()) as { image_url: string };
      // Set the image URL directly at the correct index
      imageUrl.value[index] = `https://${res.image_url}`;
      imageUrlToModal.value[index] = URL;
    } catch (error) {
      console.error(error);
      imageUrl.value[index] = ""; // set default or error image
      imageUrlToModal.value[index] = ``;
    }
  } else {
    imageUrl.value[index] = ""; // set default or error image
    imageUrlToModal.value[index] = ``;
  }
};

const fetchBookings = async () => {
  const URL = `${API_URL}/reservation?user_id=${username}`;
  bookingItems.value = (await ky(URL).json()) as typeof bookingItems.value;
};

const fetchPlaceInfos = async (): Promise<RestaurantDetails[]> => {
  const fetchPromises = bookingItems.value.map(async (booking, index) => {
    const URL = `${API_URL}/google/place-details?place_id=${booking.place_id}`;
    try {
      const response: any = await ky.get(URL).json();
      // Use the index to store the image URL correctly
      await getRestaurantImageUrl(response.result, index);
      return response.result as RestaurantDetails;
    } catch (error) {
      console.error("Error fetching place info:", error);
      return null; // or some fallback value for RestaurantDetails
    }
  });

  const results = await Promise.allSettled(fetchPromises);
  return results.map((result, index) =>
    result.status === "fulfilled" && result.value
      ? result.value
      : bookingItemValues.value[index],
  );
};

const cancelBooking = async (
  event: { stopPropagation: () => void },
  placeId: string,
) => {
  event.stopPropagation();

  const URL = `${API_URL}/reservation?user_id=${username}&place_id=${placeId}`;
  console.log(URL);
  try {
    await ky.delete(URL);

    // Update the bookingItems to remove the cancelled booking
    const bookingIndex = bookingItems.value.findIndex(
      (item) => item.place_id === placeId,
    );
    if (bookingIndex !== -1) {
      // Remove from bookingItems
      bookingItems.value.splice(bookingIndex, 1);
      // Remove from bookingItemValues
      bookingItemValues.value.splice(bookingIndex, 1);
      // Remove the corresponding imageUrl
      imageUrl.value.splice(bookingIndex, 1);
      imageUrlToModal.value.splice(bookingIndex, 1);
    }

    init({
      message: "Booking Cancelled",
      color: "success",
    });

    // await initValues();
  } catch (error) {
    console.error(error);

    init({
      message: "Error Cancelling Booking",
      color: "danger",
    });
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
  <main class="h-full flex flex-col w-full">
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

    <section class="container mx-auto h-full w-full flex flex-col">
      <h3 class="py-7 mt-7 lg:text-4xl sm:text-3xl text-xl font-semibold">
        Booking History
      </h3>
      <div v-if="isLoading">Loading...</div>
      <div
        v-else
        class="flex gap-4 px-8 justify-center items-center h-full w-full flex-wrap"
      >
        <va-card
          class="w-full sm:w-1/2 lg:w-1/4 mx-auto"
          v-for="(booking, idx) in bookingItems"
          :key="idx"
          @click="
            handleModal(
              booking.place_id,
              bookingItemValues[idx].name,
              imageUrlToModal[idx],
            )
          "
        >
          <va-image :src="imageUrl[idx]" class="h-52" />

          <va-card-content>
            <h3 class="pb-6 lg:text-3xl sm:text-2xl text-lg font-semibold">
              {{ bookingItemValues[idx].name }}
            </h3>
            <p>Place booked for: {{ booking.reservation_pax }}</p>
            <p>
              Time booked:
              {{
                dayjs(booking.reservation_timestamp * 1000).format(
                  "DD/MM/YYYY HH:mm:ss",
                )
              }}
            </p>
            <div class="self-end flex justify-center">
              <generic-button
                titleColor="text-white"
                bgColor="bg-primary"
                @click="cancelBooking($event, booking.place_id)"
              >
                Cancel Booking
              </generic-button>
            </div>
          </va-card-content>
        </va-card>
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
