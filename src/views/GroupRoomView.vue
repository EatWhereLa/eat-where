<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import GenericButton from "@/components/GenericButton.vue";
import ChooseTimingModal from "@/components/ChooseTimingModal.vue";
import { useToast } from "vuestic-ui";
import {
  ref,
  onBeforeMount,
  onUnmounted,
  computed,
  defineAsyncComponent,
  type Ref,
  watch,
  onMounted,
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

import { useVoteTimingsStore } from "@/stores/voteTimings";

const voteTimingsStore = useVoteTimingsStore();
const authStore = useAuthStore();
const { init } = useToast();

import { useBookmarks } from "@/composables/useBookmarks";
import { storeToRefs } from "pinia";
import { useAuth } from "@/composables/auth";
import { useAuthStore } from "@/stores/auth";
import { useUserSettingsStore } from "@/stores/userSettings";

const { milliseconds } = useTimer();
const { getBookmarks } = useBookmarks();
const { isLoggedIn } = useAuth();
const { isAuthenticated, username } = storeToRefs(useAuthStore());
const userSettingsStore = useUserSettingsStore();
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

const showTimingModal = ref(true);

const getRandomUsername = () => {
  return `${randProductAdjective()} ${randAnimal()}`;
};
const getRoomId = () => {
  return `${randProductAdjective()}-${randAnimalType()}-${randNumber({
    min: 0,
    max: 999,
  })}`;
};

onBeforeMount(async () => {
  currUser.value = getRandomUsername();
  roomId.value = getRoomId();
  if (!isAuthenticated.value) {
    await isLoggedIn();
  }
  await getBookmarks(username.value);
  if (route.query.shareId) {
    roomId.value = route.query.shareId.toString();
  } else {
    isLeader.value = true;
  }
  openOrCreateChannel(roomId.value, currUser.value);
});

onMounted(() => {
  if (userSettingsStore.selectedTime) {
    const foundTiming = timings.find(
      (val) => val.displayTime === userSettingsStore.selectedTime,
    );
    if (foundTiming) {
      selectedTime.value = foundTiming.timeInMilliseconds;
    }
  }
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

const getUserTimingChosen = () => {
  const userval = voteTimingsStore.getVoteTiming(authStore.username);
  return userval;
};

watch(
  () => selectedTime.value,
  (newTime, oldTime) => {
    milliseconds.value = newTime;
  },
);
</script>

<template>
  <va-modal
    v-model="showTimingModal"
    hide-default-actions
    class="mx-auto"
    size="medium"
    closeButton
    v-if="authStore.username !== ''"
  >
    <ChooseTimingModal @closeChoseTiming="showTimingModal = !showTimingModal" />
  </va-modal>
  <main class="w-full md:w-3/5 h-full relative flex flex-col gap-8">
    <div class="text-center text-2xl text-primary px-3">
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
        <p v-if="getUserTimingChosen() !== undefined">
          Your Preferred Time: Date: {{ getUserTimingChosen().date }} Time:
          {{ getUserTimingChosen().time }}
        </p>
      </div>
    </div>
    <div class="flex w-full justify-center gap-3 px-3 flex-wrap">
      <generic-button
        bgColor="bg-white"
        titleColor="text-black"
        icon="content_copy"
        iconColour="primary"
        shadowColor="shadow-default"
        class="w-full md:w-2/5"
        @click="shareRoomLink"
      >
        Room Link
      </generic-button>
      <generic-button
        bgColor="bg-white"
        titleColor="text-black"
        icon="access_time"
        iconColour="primary"
        shadowColor="shadow-default"
        class="w-full md:w-2/5"
        @click="showTimingModal = !showTimingModal"
        v-if="authStore.username !== ''"
      >
        Preferred Time
      </generic-button>
      <generic-button
        bgColor="bg-primary"
        titleColor="text-white"
        icon="arrow_forward"
        iconRight
        class="w-full md:w-2/5"
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
