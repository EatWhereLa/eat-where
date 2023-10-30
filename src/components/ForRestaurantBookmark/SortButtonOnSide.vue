<script setup lang="ts">
import { ref, watch } from "vue";
const emits = defineEmits<{ selectSort: [sort: string] }>();
const sortList = ref(["Default", "Name", "Distance", "Price"]);
const selectedOption = ref("Default");

watch(selectedOption, (newSort) => {
  emits("selectSort", newSort);
});
</script>
<template>
  <va-option-list v-model="selectedOption" type="radio" :options="sortList" />
</template>

<style scoped></style>
