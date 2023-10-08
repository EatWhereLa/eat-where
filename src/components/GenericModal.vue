<script setup lang="ts">
import { ref } from "vue";
import GenericButton from "./GenericButton.vue";

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
});
const showCustomContent = ref(false);
</script>

<template>
  <!-- <va-button @click="showCustomContent = !showCustomContent"> -->
  <Button
    titleColor="text-white"
    bgColor="bg-primary"
    @click="showCustomContent = !showCustomContent"
  >
    Modal
  </Button>
  <!-- </va-button> -->
  <va-modal v-model="showCustomContent" no-padding>
    <template #content="{ ok }">
      <div class="p-6 min-h-[220px] flex flex-col justify-between">
        <div>
          <h3 class="text-3xl pb-6">{{ title }}</h3>
          <div class="text-gray-500 text-medium leading-normal">
            {{ description }}
          </div>
        </div>
        <div class="self-end flex align-end">
          <generic-button
            titleColor="text-primary"
            bgColor="bg-white"
            @click="ok"
          >
            Cancel
          </generic-button>
          <generic-button
            titleColor="text-white"
            bgColor="bg-primary"
            @click="ok"
          >
            Close
          </generic-button>
        </div>
      </div>
    </template>
  </va-modal>
</template>

<style></style>
