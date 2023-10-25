<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import HeaderBar from "./components/HeaderBar.vue";
import NavBar from "./components/NavBar.vue";
import SideBar from "./components/SideBar.vue";
import { ref } from "vue";

const showSidebar = ref(false);

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
  <!-- <HeaderBar /> -->
  <va-layout :right="{ absolute: true }">
    <template #top>
      <NavBar
        @toggle-sidebar="showSidebar = !showSidebar"
        :show-sidebar="showSidebar"
      />
    </template>
    <template #right>
      <SideBar :show-sidebar="showSidebar" />
    </template>
    <template #content>
      <div
        :class="`${headerStyle($route.name as string)} ${mainPaddingStyle(
          $route.name as string,
        )}`"
        class=""
      >
        <RouterView />
      </div>
    </template>
  </va-layout>
</template>
