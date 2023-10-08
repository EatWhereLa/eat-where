import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Home",
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

export default router;
