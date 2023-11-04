<script setup>
import { Vue3Lottie } from "vue3-lottie";
import LandingJSON from "@/assets/lottie/landing.json";
import LocationButton from "../components/LocationButton.vue";
import { RouterLink } from "vue-router";
</script>

<template>
  <section>
    <div class="flex flex-col-reverse md:flex-row pb-4">
      <div class="flex items-center justify-center grow basis-0">
        <RouterLink to="/location" id="router-link" class="w-4/5">
          <LocationButton />
        </RouterLink>

        <!-- </div> -->
      </div>
      <div class="grow basis-0">
        <Vue3Lottie :animation-data="LandingJSON" />
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@600;700&family=Poppins:wght@300;400;500;700&display=swap");
</style>
