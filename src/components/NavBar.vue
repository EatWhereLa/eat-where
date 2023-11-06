<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useAuth } from "@/composables/auth";
import { storeToRefs } from "pinia";
import { useTimerStore } from "@/stores/timer";
import { useRoute } from "vue-router";

const { isAuthenticated } = storeToRefs(useAuthStore());
const { logout } = useAuth();
const logoUrl = new URL("/src/assets/logo.jpg", import.meta.url).href;
const { showSidebar } = defineProps<{ showSidebar: boolean }>();
const timerStore = useTimerStore();
const route = useRoute();
const { displayTime } = storeToRefs(timerStore);
defineEmits(["toggleSidebar"]);

function showMenuItem(itemName: string[]) {
  if (route.name && !itemName.includes(route.name.toString())) {
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
      <va-navbar-item v-if="$route.name === 'vote'">
        <h1 class="text-2xl text-dark text-center font-medium">
          <p class="text-primary">
            {{ displayTime }}
          </p>
          <!-- <p
            v-if="currentLocation.address === ''"
            class="text-xs text-gray-500"
          >
            <va-icon name="near_me" size="1rem" class="mr-2 text-primary" />
            {{ currPos.address }}
          </p>
          <p
            v-else-if="currentLocation.address !== ''"
            class="text-xs text-gray-500"
          >
            <va-icon name="near_me" size="1rem" class="mr-2 text-primary" />{{
              currentLocation.address
            }}
          </p> -->
        </h1>
      </va-navbar-item>
      <va-navbar-item class="!hidden md:!block" v-if="showMenuItem(['vote'])">
        <router-link to="/profile" active-class="text-primary">
          Profile
        </router-link>
      </va-navbar-item>
      <va-navbar-item class="!hidden md:!block" v-if="showMenuItem(['vote'])">
        <router-link to="/bookmarks" active-class="text-primary">
          Bookmarks
        </router-link>
      </va-navbar-item>
      <va-navbar-item class="!hidden md:!block" v-if="showMenuItem(['vote'])">
        <router-link to="/activity" active-class="text-primary">
          Activity
        </router-link>
      </va-navbar-item>
      <va-navbar-item class="!hidden md:!block" v-if="showMenuItem(['vote'])">
        <router-link to="/group" active-class="text-primary">
          Start Vote
        </router-link>
      </va-navbar-item>
      <va-navbar-item class="!hidden md:!block" v-if="showMenuItem(['vote'])">
        <router-link to="/results" active-class="text-primary">
          Pick For Me
        </router-link>
      </va-navbar-item>
    </template>
    <template #right>
      <div class="flex gap-2">
        <div v-if="!isAuthenticated" class="flex gap-2">
          <div class="hidden md:block">
            <va-navbar-item>
              <va-button to="/login" preset="secondary" border-color="primary">
                Login
              </va-button>
            </va-navbar-item>
          </div>
          <div class="hidden md:block">
            <va-navbar-item>
              <va-button to="/register" text-color="white">
                Register
              </va-button>
            </va-navbar-item>
          </div>
        </div>
        <div v-else class="hidden md:block">
          <va-navbar-item>
            <va-button text-color="white" @click="logout"> Logout </va-button>
          </va-navbar-item>
        </div>

        <div class="block md:hidden">
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
