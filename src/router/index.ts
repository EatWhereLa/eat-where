import { useAuth } from "@/composables/auth";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/app",
      name: "app",
      component: () => import("../views/HomeView.vue"),
      meta: {
        title: "Home",
        headerClass: "",
      },
    },
    {
      path: "/",
      name: "home",
      component: () => import("../views/LandingView.vue"),
      meta: {
        title: "Home",
        headerClass: "",
      },
    },
    {
      path: "/activity",
      name: "Activity",
      component: () => import("../views/ActivityView.vue"),
      meta: {
        title: "Activity",
        headerClass: "",
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
      meta: {
        title: "Profile",
        headerClass: "",
      },
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/LoginView.vue"),
      meta: {
        title: "Login",
        headerClass: "",
      },
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../views/RegisterView.vue"),
      meta: {
        title: "Register",
        headerClass: "",
      },
    },
    {
      path: "/restaurant/:id",
      name: "restaurantDetail",
      component: () => import("../views/RestaurantDetailView.vue"),
      meta: {
        headerClass: "headerNoBackgroundWithButtonClose",
        back: "/",
      },
    },
    {
      path: "/results",
      name: "results",
      component: () => import("../views/ResultsView.vue"),
      meta: {
        title: "Results",
        headerClass: "",
        back: "/",
      },
    },
    {
      path: "/group",
      name: "group",
      component: () => import("../views/GroupRoomView.vue"),
      meta: {
        title: "Lobby",
        headerClass: "headerWithButtonBack",
        back: "/",
      },
    },
    {
      path: "/vote",
      name: "vote",
      component: () => import("../views/RestaurantListView.vue"),
      meta: {
        title: "Restaurants",
        headerClass: "headerWithButtonBackAndUpvote",
        back: "/",
      },
    },
    {
      path: "/vote/upvotes",
      name: "upvotes",
      component: () => import("../views/UpvotedRestaurantsView.vue"),
      meta: {
        title: "Upvoted Restaurants",
        headerClass: "headerWithButtonBack",
        back: "/vote",
      },
    },
    {
      path: "/bookmarks",
      name: "bookmarks",
      component: () => import("../views/BookmarksView.vue"),
      meta: {
        title: "Bookmarks",
        headerClass: "headerWithTitleWithButtonClose",
        back: "/",
      },
    },
    {
      path: "/location",
      name: "location",
      component: () => import("../views/LocationView.vue"),
      meta: {
        title: "Bookmarks",
        headerClass: "headerNoBackgroundWithButtonClose",
        back: "/",
      },
    },
  ],
});

router.beforeEach(async (to) => {
  const { isAuthenticated } = storeToRefs(useAuthStore());
  const { isLoggedIn } = useAuth();
  if (to.name === "Login" || to.name === "Register") {
    if (!isAuthenticated.value) {
      // We try to check if there the user is authenticated
      await isLoggedIn();
    }
    if (isAuthenticated.value) {
      return { name: "home" };
    }
  }

  if (to.name === "bookmarks" || to.name === "profile") {
    if (!isAuthenticated.value) {
      // We try to check if there the user is authenticated
      await isLoggedIn();
    }
    if (!isAuthenticated.value) {
      return false;
    }
  }
});

export default router;
