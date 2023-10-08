<script setup lang="ts">
const items = [
  "/src/assets/ad_wide.jpeg",
  "/src/assets/ad_wide.jpeg",
  "/src/assets/ad_wide.jpeg",
];
</script>

<template>
  <div class="ad-banner relative mb-16">
    <va-carousel
      :items="items"
      stateful
      infinite
      swipable
      autoscroll
      :autoscroll-interval="10000"
      :arrows="false"
      :ratio="21 / 9"
    />
  </div>
</template>

<style>
.ad-banner .va-carousel {
  overflow: unset;
}

.ad-banner .va-carousel__indicators {
  bottom: -42px;
}

.ad-banner .va-carousel__content {
  overflow: hidden;
  border-radius: 20px;
}

.ad-banner .va-button__content {
  display: none;
}

.ad-banner .va-button--normal {
  min-height: 1rem;
  min-width: 1rem;
}

.ad-banner .va-button--normal:after {
  background-color: #ff914f;
  opacity: 0.6;
}
</style>
