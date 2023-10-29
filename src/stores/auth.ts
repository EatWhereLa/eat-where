import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("authStore", () => {
  const isAuthenticated = ref(false);

  function setAuth(authStatus: boolean) {
    isAuthenticated.value = authStatus;
  }

  return {
    isAuthenticated,
    setAuth,
  };
});
