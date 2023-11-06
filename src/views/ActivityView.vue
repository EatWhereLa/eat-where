<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from "vue";


const tabValue = ref("Booking Activity");

const tabs = [
  {
    title: "Booking Activity",
    icon: "eventseat",
    content: defineAsyncComponent(
      () => import("@/components/ActivityCard.vue"),
    ),
  },
  {
    title: "Group Vote History",
    icon: "group",
    content: defineAsyncComponent(
      () => import("@/components/GroupVotes.vue"),
    ),
  },
];


const currentTab = computed(() => {
  return tabs.find(({ title }) => title === tabValue.value);
});

</script>

<template>
  <main class="h-full flex flex-col w-full">
    <va-tabs v-model="tabValue" grow>
      <template #tabs>
        <va-tab v-for="tab in tabs" :key="tab.title" :name="tab.title">
          <va-icon :name="tab.icon" class="mr-2" />
          {{ tab.title }}
        </va-tab>
      </template>
    </va-tabs>
    <component :is="currentTab?.content" />

  </main>
</template>

<style scoped>
.chip-active {
  @apply bg-primary !important;
  @apply text-white !important;
  @apply shadow-custom-primary-sm;
}
</style>
