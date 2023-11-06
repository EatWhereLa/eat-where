<script setup lang="ts">
import { useAuth } from "@/composables/auth";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
const { showSidebar } = defineProps<{ showSidebar: boolean }>();
const route = useRoute();
const { isAuthenticated } = storeToRefs(useAuthStore());
const { logout } = useAuth();
</script>
<template>
  <VaSidebar :minimized="!showSidebar" minimized-width="0" color="white">
    <VaSidebarItem :active="route.name === 'profile'" to="/profile">
      <VaSidebarItemContent>
        <VaSidebarItemTitle> Profile </VaSidebarItemTitle>
      </VaSidebarItemContent>
    </VaSidebarItem>
    <VaSidebarItem :active="route.name === 'bookmarks'" to="/bookmarks">
      <VaSidebarItemContent>
        <VaSidebarItemTitle> Bookmarks </VaSidebarItemTitle>
      </VaSidebarItemContent>
    </VaSidebarItem>
    <VaSidebarItem :active="route.name === 'activity'" to="/activity">
      <VaSidebarItemContent>
        <VaSidebarItemTitle> Activity </VaSidebarItemTitle>
      </VaSidebarItemContent>
    </VaSidebarItem>
    <VaSidebarItem :active="route.name === 'group'" to="/group">
      <VaSidebarItemContent>
        <VaSidebarItemTitle> Start Vote </VaSidebarItemTitle>
      </VaSidebarItemContent>
    </VaSidebarItem>
    <VaSidebarItem :active="route.name === 'results'" to="/results">
      <VaSidebarItemContent>
        <VaSidebarItemTitle> Pick For Me </VaSidebarItemTitle>
      </VaSidebarItemContent>
    </VaSidebarItem>
    <div v-if="!isAuthenticated">
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
    </div>
    <VaSidebarItem v-else @click="logout">
      <VaSidebarItemContent>
        <VaSidebarItemTitle> Logout </VaSidebarItemTitle>
      </VaSidebarItemContent>
    </VaSidebarItem>
  </VaSidebar>
</template>

<style scoped></style>
