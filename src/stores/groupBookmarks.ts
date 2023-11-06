import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { Restaurant } from "@/types/Restaurant";

export const useGroupBookmarksStore = defineStore("groupBookmarksStore", () => {
  const groupBookmarksMap = ref<Map<string, Restaurant>>(new Map());
  const groupBookmarks = computed(() => {
    return Array.from(groupBookmarksMap.value.values());
  });

  function addGroupBookmark(restaurant: Restaurant) {
    const retVal = groupBookmarksMap.value.get(restaurant.place_id);
    if (retVal) {
      return;
    }
    groupBookmarksMap.value.set(restaurant.place_id, restaurant);
    console.log(groupBookmarksMap);
  }

  function clearGroupBookmarks() {
    groupBookmarksMap.value.clear();
  }
  return { groupBookmarks, addGroupBookmark, clearGroupBookmarks };
});
