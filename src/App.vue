<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import HeaderBar from "./components/HeaderBar.vue";
import NavBar from "./components/NavBar.vue";
import SideBar from "./components/SideBar.vue";
import { ref } from "vue";

const showSidebar = ref(false);
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
      <div class="flex justify-center items-center h-full p-4">
        <RouterView />
      </div>
    </template>
  </va-layout>
</template>
