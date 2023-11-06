<script setup lang="ts">
import { Vue3Lottie } from "vue3-lottie";
import FoodScrollJSON from "@/assets/lottie/food_scroll.json";
import { useAuth } from "@/composables/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const { login } = useAuth();
const router = useRouter();

const username = ref("");
const password = ref("");

async function handleLogin() {
  try {
    await login(username.value, password.value);
    router.push("/");
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <main class="bg-white rounded-md">
    <!-- ===== SignIn Form Start ===== -->
    <div class="flex items-center justify-center">
      <!-- Bg Border -->
      <div
        class="relative flex w-full rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
      >
        <div
          class="relative m-0 lg:w-3/5 hidden lg:block shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700"
        >
          <Vue3Lottie :animation-data="FoodScrollJSON" :height="600" />
        </div>
        <div class="p-6 lg:w-2/5 w-full flex flex-col gap-8 justify-evenly">
          <div class="text-center">
            <h2 class="text-4xl font-medium text-orange-500">EATWHERE</h2>
            <p class="text-bold">Nice to see you again</p>
          </div>

          <form class="flex flex-col gap-4" @submit.prevent="handleLogin">
            <va-input
              v-model="username"
              class="w-full"
              type="text"
              name="name"
              label="Full Name"
              placeholder="Enter Full Name"
            />

            <va-input
              v-model="password"
              class="w-full"
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
            />
            <va-button text-color="white" type="submit">Login</va-button>
          </form>
          <p class="text-center text-lg font-light">
            Don't have an account?
            <router-link to="/register">
              <a class="text-primary"> Sign up </a>
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <!-- ===== SignIn Form End ===== -->
  </main>
</template>
