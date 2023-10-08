<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import HeaderBar from "./components/HeaderBar.vue";

const headerStyle = (routeName: string) => {
  switch (routeName) {
    case "home":
      return "pt-28";
    case "location":
      return "pt-0";
    case "group":
      return "pt-32";
    default:
      return "pt-24";
  }
};

const mainPaddingStyle = (routeName: string) => {
  switch (routeName) {
    case "location":
      return "";
    case "group":
      return "";
    default:
      return "p-5";
  }
};
</script>

<template>
  <HeaderBar />
  <div
    :class="`${headerStyle($route.name as string)} ${mainPaddingStyle(
      $route.name as string,
    )}`"
    class="max-w-2xl m-auto"
  >
    <RouterView />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
