<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useAuth } from "@/composables/auth";
import { storeToRefs } from "pinia";

const { isAuthenticated } = storeToRefs(useAuthStore());
const { logout } = useAuth();
const logoUrl = new URL("/src/assets/logo.jpg", import.meta.url).href;
const { showSidebar } = defineProps<{ showSidebar: boolean }>();
defineEmits(["toggleSidebar"]);

function showMenuItem(itemName: string | undefined) {
  const menuItems = ["profile", "bookmarks", "home"];
  if (itemName && menuItems.includes(itemName)) {
    return true;
  }
  return false;
}
</script>
<template>
  <va-navbar color="white" class="xl:!px-64">
    <template #left>
      <va-navbar-item class="logo">
        <router-link to="/">
          <img class="max-w-[52px]" :src="logoUrl" />
        </router-link>
      </va-navbar-item>
    </template>
    <template #center>
      <va-navbar-item class="!hidden md:!block" v-if="$route.name === 'app'">
        <h1
          class="uppercase text-3xl text-primary text-center font-semibold flex justify-center items-center"
        >
          EatWhere!?
        </h1>
      </va-navbar-item>
      <va-navbar-item
        class="!hidden md:!block"
        v-if="showMenuItem($route.name?.toString())"
      >
        <router-link to="/profile" active-class="text-primary">
          Profile
        </router-link>
      </va-navbar-item>
      <va-navbar-item
        class="!hidden md:!block"
        v-if="showMenuItem($route.name?.toString())"
      >
        <router-link to="/bookmarks" active-class="text-primary">
          Bookmarks
        </router-link>
      </va-navbar-item>
      <va-navbar-item
        class="!hidden md:!block"
        v-if="showMenuItem($route.name?.toString())"
      >
        <router-link to="/app" active-class="text-primary"> App </router-link>
      </va-navbar-item>
    </template>
    <template #right>
      <div class="flex gap-2">
        <div v-if="!isAuthenticated" class="flex gap-2">
          <div class="hidden sm:block">
            <va-navbar-item class="hidden sm:block">
              <va-button to="/login" preset="secondary" border-color="primary">
                Login
              </va-button>
            </va-navbar-item>
          </div>
          <div class="hidden sm:block">
            <va-navbar-item>
              <va-button to="/register" text-color="white">
                Register
              </va-button>
            </va-navbar-item>
          </div>
        </div>
        <div v-else>
          <va-navbar-item>
            <va-button text-color="white" @click="logout"> Logout </va-button>
          </va-navbar-item>
        </div>

        <div class="block sm:hidden">
          <va-navbar-item>
            <va-button
              :icon="showSidebar ? 'menu_open' : 'menu'"
              preset="secondary"
              @click="$emit('toggleSidebar')"
            />
          </va-navbar-item>
        </div>
      </div>
    </template>
  </va-navbar>
</template>

<style scoped></style>
