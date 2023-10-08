<script setup lang="ts">
import RestaurantListItem from "@/components/RestaurantListItem.vue";

const bookmarks = [
  {
    title: `McDonald's`,
    imgSrc: "/src/assets/mcdonalds.jpg",
    tags: ["Burger", "Fastfood", "Halal"],
  },
  {
    title: `McDonald's`,
    imgSrc: "/src/assets/mcdonalds.jpg",
    tags: ["Burger", "Fastfood", "Halal"],
  },
];
</script>

<template>
  <main>
    <ul>
      <li v-for="(bookmark, index) in bookmarks" :key="index" class="mb-2.5">
        <RestaurantListItem
          :imgSrc="bookmark.imgSrc"
          :title="bookmark.title"
          :tags="bookmark.tags"
        />
      </li>
    </ul>
  </main>
</template>
