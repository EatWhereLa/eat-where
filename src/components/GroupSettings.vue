<script setup lang="ts">
import { useUserSettingsStore } from "@/stores/userSettings";
import { onMounted, ref } from "vue";

const userSettingsStore = useUserSettingsStore();
const selectedDist = ref("500m");
const distances = ["500m", "1km", "2km", "5km"];
onMounted(() => {
  if (userSettingsStore.selectedDist) {
    selectedDist.value = userSettingsStore.selectedDist;
    userSettingsStore.setTempSelectedDist(userSettingsStore.selectedDist);
  }
});
</script>
<template>
  <div class="max-h-56">
    <va-select
      v-model="selectedDist"
      @update:modelValue="userSettingsStore.setTempSelectedDist($event)"
      class="mb-6 w-full"
      :options="distances"
    >
      <template #prependInner>
        <va-icon name="location_on" />
      </template>
    </va-select>
  </div>
</template>

<style scoped></style>
