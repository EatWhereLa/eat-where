<script setup lang="ts">
/* eslint-disable no-undef */
import GenericButton from "@/components/GenericButton.vue";
import NotificationMessage from "@/components/NotificationMessage.vue";
import { useGeolocation } from "../composables/useGeolocation";
import { Loader } from "@googlemaps/js-api-loader";
import { useCurrentLocationStore } from "@/stores/currentLocation";
import { computed, ref, type Ref, onMounted, onUnmounted, watch } from "vue";
import ky from "ky";

type Position = {
  coords: {
    latitude: number;
    longitude: number;
  };
};

const MAP_KEY = import.meta.env.VITE_MAPS_API_KEY;

const currentLocation = useCurrentLocationStore();

const { coords } = useGeolocation();
const currPos = computed(() => ({
  lat: coords.value.lat,
  lng: coords.value.lng,
}));

const locationSetCoords = ref({
  lat: currPos.value.lat,
  lng: currPos.value.lng,
});

const isNotificationVisible = ref(false);

const isDisabled = ref(false);
const loader = new Loader({ apiKey: MAP_KEY });
const mapRef: Ref<HTMLElement | null> = ref(null);
const map: Ref<google.maps.Map | null> = ref(null);
let clickListener: object | any = null;
const otherPosRef: Ref<{ lat: number; lng: number } | null> = ref(null);
let marker: google.maps.Marker | null = null;

const currentLocationRef = ref("");
const newCoords = ref({ lat: currPos.value.lat, lng: currPos.value.lng });

const fetchCurrentLocationAddress = async (pos: {
  lat: number;
  lng: number;
}) => {
  const res = (await ky(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&key=${MAP_KEY}`,
  ).json()) as google.maps.GeocoderResponse;
  const result = res.results[0];
  currentLocationRef.value = result.formatted_address;
  currentLocation.setLocationAddress(result.formatted_address);
  newCoords.value.lat = result.geometry.location.lat as any;
  newCoords.value.lng = result.geometry.location.lng as any;
};

const success = async (position: Position) => {
  const lat = currentLocation.latLng?.lat || position.coords.latitude;
  const lng = currentLocation.latLng?.lng || position.coords.longitude;

  currPos.value.lat = lat;
  currPos.value.lng = lng;

  if (mapRef.value == null) {
    return;
  }

  map.value = new google.maps.Map(mapRef.value, {
    center: { lat, lng },
    zoom: 15,
  });

  marker = new google.maps.Marker({
    position: { lat, lng },
    map: map.value,
  });

  await fetchCurrentLocationAddress(currPos.value);

  setTimeout(() => {
    if (marker !== null) {
      marker.setMap(map.value);
    }
  });

  clickListener = map.value.addListener(
    "click",
    async (e: google.maps.MapMouseEvent) => {
      otherPosRef.value = {
        lat: e.latLng?.lat() || currPos.value.lat,
        lng: e.latLng?.lng() || currPos.value.lng,
      };
      isNotificationVisible.value = false;
      currentLocation.setOldLocationAddress(currentLocation.address);
      currentLocation.setLocationLatLng({
        lat: otherPosRef.value.lat,
        lng: otherPosRef.value.lng,
      });
      await fetchCurrentLocationAddress(otherPosRef.value);
    },
  );

  clickListener = map.value.addListener(
    "mousedown",
    async (e: google.maps.MapMouseEvent) => {
      otherPosRef.value = {
        lat: e.latLng?.lat() || currPos.value.lat,
        lng: e.latLng?.lng() || currPos.value.lng,
      };
      isNotificationVisible.value = false;
      currentLocation.setOldLocationAddress(currentLocation.address);
      currentLocation.setLocationLatLng({
        lat: otherPosRef.value.lat,
        lng: otherPosRef.value.lng,
      });
      await fetchCurrentLocationAddress(otherPosRef.value);
    },
  );
};

const error = (err: any) => {
  console.log(err);
};

onMounted(async () => {
  await loader.importLibrary("maps");
  isDisabled.value = true;
  navigator.geolocation.getCurrentPosition(success, error);
});

onUnmounted(() => {
  if (clickListener) clickListener.remove();
});

watch([map, currPos, otherPosRef], () => {
  if (marker) marker.setMap(null);
  if (map.value && otherPosRef.value !== null) {
    marker = new google.maps.Marker({
      position: otherPosRef.value,
      map: map.value,
    });

    isDisabled.value = false;

    marker.setMap(map.value);
  }
});

const handleSubmit = () => {
  currentLocation.setLocationAddress(currentLocationRef.value);
  currentLocation.setLocationLatLng(newCoords.value);

  console.log("address: ", currentLocation.address);
  console.log("latlng: ", currentLocation.latLng);

  isDisabled.value = true;
  isNotificationVisible.value = true;
};

// watchEffect(() => {
//   console.log(currPos.value);
// });
</script>

<template>
  <main class="w-full h-full">
    <div class="w-full h-full relative">
      <!-- Map placeholder -->
      <div ref="mapRef" class="bg-gray-400 w-full h-full" />

      <div class="absolute bottom-0 w-full">
        {{ currPos.lat }}
        <div class="mb-3 mr-3 ml-3">
          <Transition name="fade">
            <NotificationMessage
              v-if="isNotificationVisible"
              message="Sucess"
              bgColor="bg-green-500"
            />
          </Transition>
        </div>
        <div
          class="bottom-0 w-5/6 md:w-2/5 m-auto p-5 py-[2rem] flex flex-col gap-2"
        >
          <div
            class="relative rounded-3xl w-full bg-white p-2.5 inline-flex align-center gap-2 shadow-default-sm"
          >
            <va-icon name="location_on" class="text-primary" size="2rem" />
            <input
              type="text"
              placeholder="Current Location"
              class="w-full bg-transparent"
              :value="currentLocation.address"
            />
          </div>
          <generic-button
            bgColor="bg-primary"
            titleColor="text-white"
            class="w-full max-w-full hover:cursor-pointer"
            @click="handleSubmit"
            :disabled="isDisabled"
          >
            Set Location
          </generic-button>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
