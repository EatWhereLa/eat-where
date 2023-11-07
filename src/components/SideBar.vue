<script setup lang="ts">
import { useAuth } from "@/composables/auth";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
const { showSidebar } = defineProps<{ showSidebar: boolean }>();
const route = useRoute();
const { isAuthenticated } = storeToRefs(useAuthStore());
const { logout } = useAuth();

defineEmits(["close-sidebar"]);
</script>
<template>
  <VaSidebar :minimized="!showSidebar" minimized-width="0" color="white">
    <VaSidebarItem
      :active="route.name === 'profile'"
      to="/profile"
      @click="$emit('close-sidebar')"
    >
      <VaSidebarItemContent>
        <VaSidebarItemTitle> Profile </VaSidebarItemTitle>
      </VaSidebarItemContent>
    </VaSidebarItem>
    <VaSidebarItem
      :active="route.name === 'bookmarks'"
      to="/bookmarks"
      @click="$emit('close-sidebar')"
    >
      <VaSidebarItemContent>
        <VaSidebarItemTitle> Bookmarks </VaSidebarItemTitle>
      </VaSidebarItemContent>
    </VaSidebarItem>
    <VaSidebarItem
      :active="route.name === 'activity'"
      to="/activity"
      @click="$emit('close-sidebar')"
    >
      <VaSidebarItemContent>
        <VaSidebarItemTitle> Activity </VaSidebarItemTitle>
      </VaSidebarItemContent>
    </VaSidebarItem>
    <VaSidebarItem
      :active="route.name === 'group'"
      to="/group"
      @click="$emit('close-sidebar')"
    >
      <VaSidebarItemContent>
        <VaSidebarItemTitle> Start Vote </VaSidebarItemTitle>
      </VaSidebarItemContent>
    </VaSidebarItem>
    <VaSidebarItem
      :active="route.name === 'results'"
      to="/results"
      @click="$emit('close-sidebar')"
    >
      <VaSidebarItemContent>
        <VaSidebarItemTitle> Pick For Me </VaSidebarItemTitle>
      </VaSidebarItemContent>
    </VaSidebarItem>
    <div v-if="!isAuthenticated">
      <VaSidebarItem
        :active="route.name === 'Login'"
        to="/login"
        @click="$emit('close-sidebar')"
      >
        <VaSidebarItemContent>
          <VaSidebarItemTitle> Login </VaSidebarItemTitle>
        </VaSidebarItemContent>
      </VaSidebarItem>
      <VaSidebarItem
        :active="route.name === 'Register'"
        to="/register"
        @click="$emit('close-sidebar')"
      >
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
