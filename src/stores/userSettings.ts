import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import { useStorage, type RemovableRef } from "@vueuse/core";

export const useUserSettingsStore = defineStore("userSettings", () => {
  const selectedCategories: RemovableRef<string[]> = useStorage(
    "selectedCategories",
    [],
  );
  const selectedTime = useStorage("selectedTime", "1:00");
  const selectedDist = useStorage("selectedDist", "500m");
  const tempSelectedDist = ref("500m");

  function setCategories(categories: string[]) {
    selectedCategories.value = categories;
  }
  function setDistance(distance: string) {
    selectedDist.value = distance;
  }
  function setTime(time: string) {
    selectedTime.value = time;
  }
  function setTempSelectedDist(distance: string) {
    tempSelectedDist.value = distance;
  }

  return {
    selectedCategories,
    selectedTime,
    selectedDist,
    tempSelectedDist,
    setCategories,
    setDistance,
    setTime,
    setTempSelectedDist,
  };
});
