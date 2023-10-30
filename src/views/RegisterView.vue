<script setup lang="ts">
import { Vue3Lottie } from "vue3-lottie";
import FoodJSON from "@/assets/lottie/food.json";
import { ref } from "vue";
import { useAuth } from "@/composables/auth";
import { useRouter } from "vue-router";

const { signup, confirmSignup } = useAuth();
const router = useRouter();

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const code = ref("");
const isCodeErr = ref(false);

const showModal = ref(false);

async function handleRegister() {
  try {
    const res = await signup(username.value, password.value, email.value);
    if (res?.userConfirmed === false) {
      //launch dialog
      showModal.value = true;
    }
  } catch (error) {
    console.error(error);
  }
}

async function handleCode() {
  try {
    const res = await confirmSignup(username.value, code.value);
    if (res === "SUCCESS") {
      showModal.value = false;
      router.push("/login");
    } else {
      isCodeErr.value = true;
    }
  } catch (error) {
    isCodeErr.value = true;
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
        class="relative flex w-full flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
      >
        <div
          class="relative m-0 lg:w-3/5 hidden lg:block shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700"
        >
          <Vue3Lottie :animation-data="FoodJSON" />
        </div>
        <div class="p-6 lg:w-2/5 w-full flex flex-col gap-8">
          <div class="text-center">
            <h2 class="text-4xl font-medium text-primary">EATWHERE</h2>
            <p class="text-bold">Register for an account!</p>
          </div>

          <form class="flex flex-col gap-4" @submit.prevent="handleRegister">
            <va-input
              v-model="username"
              class="w-full"
              type="text"
              name="name"
              label="Full Name"
              placeholder="Enter Full Name"
            />

            <va-input
              v-model="email"
              class="w-full"
              type="email"
              name="email"
              label="Email"
              placeholder="Enter Email"
            />

            <va-input
              v-model="password"
              class="w-full"
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
            />

            <va-input
              v-model="confirmPassword"
              class="w-full"
              type="password"
              name="newpassword"
              label="Confirm Password"
              placeholder="Confirm Password"
            />
            <va-button text-color="white" type="submit">Sign Up</va-button>
          </form>
          <p class="text-center text-lg font-light">
            Already have an account?
            <a class="text-primary" href="signup.html"> Sign in </a>
          </p>
        </div>
      </div>
    </div>
    <!-- ===== SignIn Form End ===== -->
  </main>
  <va-modal v-model="showModal" hide-default-actions>
    <template #header>
      <h3 class="text-primary text-2xl font-medium">Enter Code</h3>
      <p class="text-gray-500/70 text-xs">Code sent to {{ email }}</p>
    </template>
    <div class="pt-4">
      <va-input
        v-model="code"
        type="text"
        input-class="text-center"
        :error="isCodeErr"
        error-messages="Please enter the correct code"
      />
    </div>
    <template #footer>
      <va-button class="w-full" text-color="white" @click="handleCode">
        Confirm
      </va-button>
    </template>
  </va-modal>
</template>
