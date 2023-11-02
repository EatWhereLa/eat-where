<script setup lang="ts">
import { useCurrentLocationStore } from "@/stores/currentLocation";
import { storeToRefs } from "pinia";
import { computed } from "vue";
const currentLocationStore = useCurrentLocationStore();
const { address } = storeToRefs(currentLocationStore);

const displayLocation = computed(() => {
  let retVal = "Current Location";
  if (address.value !== "") retVal = address.value;
  return retVal;
});
</script>

<template>

  <h1>Vote Together, Eat Better!</h1>
  <div
    class="bg-white flex align-center gap-x-2.5 shadow-default rounded-3xl py-5 px-5 relative" 
  >
    <va-icon
      class="text-primary"
      name="location_on"
      style="display: contents"
      size="1.8rem"
    />
    <span class="text-[#7E7571] text-xl font-medium">
      {{ displayLocation }}
    </span>

    <va-button to="/group" text-color="white" style="position: absolute; right: 0; margin-right: 20px; border-radius: 10px;">
        Create lobby
    </va-button>
    <br>
  </div>

</template>

<style scoped>
h1 {
  text-transform: capitalize;
  font-size: clamp(1.5rem, 5vw, 4rem);
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  /* 4 */
  font-weight: 500;
  margin: 0.2em 0 4rem 0;
}
</style>
