<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import HeaderBar from "./components/HeaderBar.vue";

const headerStyle = (routeName: string) => {
  switch (routeName) {
    case "home":
      return "pt-28";
    case "location":
      return "pt-0";
    case "group":
      return "pt-32";
    default:
      return "pt-24";
  }
};

const mainPaddingStyle = (routeName: string) => {
  switch (routeName) {
    case "location":
      return "";
    case "group":
      return "";
    default:
      return "p-5";
  }
};
</script>

<template>
  <div
    :class="`${headerStyle($route.name as string)} ${mainPaddingStyle(
      $route.name as string,
    )}`"
    class=""
  >
    <RouterView />
  </div>
</template>

