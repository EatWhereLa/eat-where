<script setup lang="ts">
import { RouterLink } from "vue-router";
import AdBanner from "../components/AdBanner.vue";

import LocationButton from "../components/LocationButton.vue";

import ImageButton from "../components/ImageButton.vue";
import PickForMeImage from "../assets/pick_for_me.png";
import GroupVoteImage from "../assets/group_vote.png";

import IconWithTextButton from "@/components/IconWithTextButton.vue";

import GenericModal from "../components/GenericModal.vue";
</script>

<template>
  <main>
    <!-- <h2 class="capitalize text-3xl text-primary font-semibold mb-6">
      Don't Miss Out!
    </h2>
    <AdBanner /> -->

    <RouterLink to="/location">
      <LocationButton />
    </RouterLink>

    <div class="grid grid-cols-2 gap-6 py-6">
      <RouterLink to="/results">
        <ImageButton
          :imgSrc="PickForMeImage"
          title="Pick For Me"
          titleColor="text-primary"
        />
      </RouterLink>
      <RouterLink to="/group">
        <ImageButton
          :imgSrc="GroupVoteImage"
          title="Group Vote"
          titleColor="text-primary"
        />
      </RouterLink>
    </div>

    <hr class="h-px my-2 bg-primary w-2/5 m-auto" />

    <div class="grid grid-cols-2 gap-6 py-6">
      <RouterLink to="/profile">
        <IconWithTextButton title="Bookmarks" icon="bookmark_outline" />
      </RouterLink>
      <RouterLink to="/profile">
        <IconWithTextButton title="Settings" icon="settings" />
      </RouterLink>
    </div>
  </main>

  <!-- <Modal
    title="Close Room?"
    description="Are you sure you want to close this room?"
  />
  <hr class="h-px my-2 bg-primary w-2/5 m-auto" />
  <li v-for="(restaurant, index) in restaurants" :key="index">
    <RestaurantListItem
      :imgSrc="restaurant.imgSrc"
      :title="restaurant.title"
      :tags="restaurant.tags"
    />
  </li> -->
</template>
