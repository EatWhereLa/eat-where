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
  <div
    class="button bg-white flex align-center gap-x-2.5 shadow-default rounded-3xl py-5 px-5 relative"
  >
  <div class="flex items-center">
    <va-icon
      class="text-primary"
      name="location_on"
      size="1.6rem"
    />
    <span class="text-[#7E7571] text-xl font-medium">
      {{ displayLocation }}
    </span>

  </div>
  
  
  <va-button
      to="/group"
      class="button-inside-div"
      text-color="white"
      style="
        position: absolute;
        right: 0;
        margin-right: 20px;
        border-radius: 10px;
      "
    >
      Create lobby
  </va-button>

  
    <br />
    
  </div>
  
  <br/>
  <va-button
      to="/group"
      class="button-outside-div"
      text-color="white"
      style="
        display: none;
        border-radius: 10px;
      "
    >
      <div class="mx-auto">Create lobby</div>
  </va-button>

</template>

<style scoped>

@media only screen and (max-width: 450px) {
  .button-outside-div {
    display: block!important;
    text-align: center;
  }

  .button-inside-div {
    display: none!important;
  }
}



</style>
