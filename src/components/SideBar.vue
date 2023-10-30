<script setup lang="ts">
import { useRoute } from "vue-router";
const { showSidebar } = defineProps<{ showSidebar: boolean }>();
const route = useRoute();
</script>
<template>
  <VaSidebar :minimized="!showSidebar" minimized-width="0" color="white">
    <VaSidebarItem :active="route.name === 'Login'" to="/login">
      <VaSidebarItemContent>
        <VaSidebarItemTitle> Login </VaSidebarItemTitle>
      </VaSidebarItemContent>
    </VaSidebarItem>
    <VaSidebarItem :active="route.name === 'Register'" to="/register">
      <VaSidebarItemContent>
        <VaSidebarItemTitle> Register </VaSidebarItemTitle>
      </VaSidebarItemContent>
    </VaSidebarItem>
  </VaSidebar>
</template>

<style scoped></style>
