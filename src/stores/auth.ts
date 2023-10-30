import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("authStore", () => {
  const isAuthenticated = ref(false);
  const email = ref("");
  const username = ref("");

  function setAuth(authStatus: boolean) {
    isAuthenticated.value = authStatus;
  }

  function setEmail(newEmail: string) {
    email.value = newEmail;
  }

  function setUsername(newUsername: string) {
    username.value = newUsername;
  }

  return {
    isAuthenticated,
    email,
    username,
    setAuth,
    setEmail,
    setUsername,
  };
});
