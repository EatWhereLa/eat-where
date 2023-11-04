import { type Ref } from "vue";
import { defineStore } from "pinia";
import { useStorage, type RemovableRef } from "@vueuse/core";

export const useUserSettingsStore = defineStore("userSettings", () => {
  const selectedCategories: RemovableRef<string[]> = useStorage(
    "selectedCategories",
    [],
  );
  const selectedTime = useStorage("selectedTime", "1:00");
  const selectedDist = useStorage("selectedDist", "500m");

  function setCategories(categories: string[]) {
    selectedCategories.value = categories;
  }
  function setDistance(distance: string) {
    selectedDist.value = distance;
  }
  function setTime(time: string) {
    selectedTime.value = time;
  }

  return {
    selectedCategories,
    selectedTime,
    selectedDist,
    setCategories,
    setDistance,
    setTime,
  };
});
