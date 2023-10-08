<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import GenericButton from "@/components/GenericButton.vue";
import {
  ref,
  onBeforeMount,
  onUnmounted,
  computed,
  defineAsyncComponent,
  type Ref,
  watch,
} from "vue";
import {
  openOrCreateChannel,
  isLeader,
  currUser,
  channel,
} from "@/apis/supabase";
import {
  randProductAdjective,
  randAnimal,
  randAnimalType,
  randNumber,
} from "@ngneat/falso";
import { useShare, useBrowserLocation } from "@vueuse/core";
import { useTimer } from "@/composables/useTimer";

const getRandomUsername = () => {
  return `${randProductAdjective()} ${randAnimal()}`;
};
const gerRoomId = () => {
  return `${randProductAdjective()}-${randAnimalType()}-${randNumber({
    min: 0,
    max: 999,
  })}`;
};
const { milliseconds } = useTimer();
const { share } = useShare();
const time = ref(60);
const minutes = ref(0);
const seconds = ref(0);
const selectedTime = ref(60000);
const tabValue = ref("Players");
const intervalInstance: Ref<number | null> = ref(null);
const roomId = ref("");
const route = useRoute();
const router = useRouter();
const tabs = [
  {
    title: "Players",
    icon: "group",
    content: defineAsyncComponent(
      () => import("@/components/GroupUserList.vue"),
    ),
  },
  {
    title: "Settings",
    icon: "settings",
    content: defineAsyncComponent(
      () => import("@/components/GroupSettings.vue"),
    ),
  },
];

const timings = [
  { timeInMilliseconds: 60000, displayTime: "1:00" },
  { timeInMilliseconds: 120000, displayTime: "2:00" },
  { timeInMilliseconds: 180000, displayTime: "3:00" },
  { timeInMilliseconds: 300000, displayTime: "5:00" },
];

onBeforeMount(() => {
  currUser.value = getRandomUsername();
  roomId.value = gerRoomId();
  if (route.query.shareId) {
    roomId.value = route.query.shareId.toString();
  } else {
    isLeader.value = true;
  }
  openOrCreateChannel(roomId.value, currUser.value);
});

onUnmounted(() => {
  if (intervalInstance.value) window.clearInterval(intervalInstance.value);
});

const currentTab = computed(() => {
  return tabs.find(({ title }) => title === tabValue.value);
});

const shareRoomLink = async () => {
  try {
    await share({
      url: `${useBrowserLocation().value.origin}/group?shareId=${roomId.value}`,
    });
  } catch (error) {
    console.log(error);
  }
};

const startVoting = async () => {
  try {
    await channel.value?.send({
      type: "broadcast",
      event: "start",
      payload: { time: milliseconds.value },
    });
    router.push("/vote");
  } catch (error) {
    console.log(error);
  }
};

watch(
  () => selectedTime.value,
  (newTime, oldTime) => {
    milliseconds.value = newTime;
  },
);
</script>

<template>
  <main class="w-full -mt-20 h-screen relative">
    <div class="text-center text-2xl text-primary pt-20 mb-44 max-h-14 px-3">
      <div class="bg-white p-2 rounded-2xl shadow-default">
        <p>Room ID:</p>
        <p>{{ roomId }}</p>

        <va-select
          v-model="selectedTime"
          class="w-full"
          :options="timings"
          value-by="timeInMilliseconds"
          text-by="displayTime"
          :disabled="!isLeader"
        >
          <template #prependInner>
            <va-icon name="schedule" />
          </template>
        </va-select>
      </div>
    </div>
    <div class="inline-flex w-full justify-center gap-5 px-3">
      <generic-button
        bgColor="bg-white"
        titleColor="text-black"
        icon="content_copy"
        iconColour="primary"
        shadowColor="shadow-default"
        class="w-1/2"
        @click="shareRoomLink"
      >
        Room Link
      </generic-button>
      <generic-button
        bgColor="bg-primary"
        titleColor="text-white"
        icon="arrow_forward"
        iconRight
        class="w-1/2"
        shadowColor="shadow-custom-primary"
        :disabled="!isLeader"
        @click="startVoting"
      >
        Start Now
      </generic-button>
    </div>
    <div class="bg-white rounded-t-[30px] w-full p-5 absolute bottom-0">
      <va-tabs v-model="tabValue" grow>
        <template #tabs>
          <va-tab v-for="tab in tabs" :key="tab.title" :name="tab.title">
            <va-icon :name="tab.icon" class="mr-2" />
            {{ tab.title }}
          </va-tab>
        </template>
      </va-tabs>
      <div class="h-64">
        <div class="mt-3">
          <component :is="currentTab?.content" />
        </div>
      </div>
    </div>
  </main>
</template>
