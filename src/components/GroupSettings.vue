<script setup lang="ts">
import { ref } from "vue";

const selectedDist = ref("500m");
const distances = ["500m", "1km", "2km", "5km"];
</script>
<template>
  <div class="max-h-56">
    <va-select v-model="selectedDist" class="mb-6 w-full" :options="distances">
      <template #prependInner>
        <va-icon name="location_on" />
      </template>
    </va-select>
  </div>
</template>

<style scoped></style>
