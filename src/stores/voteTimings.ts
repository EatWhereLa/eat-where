import { ref } from "vue";
import { defineStore } from "pinia";
import type { VoteTiming } from "@/types/VoteTiming";

export const useVoteTimingsStore = defineStore(
  "voteTimings",
  () => {
    const voteTimings = ref<VoteTiming[]>([]);
    function addVoteTiming(vote: VoteTiming) {
      const foundVoteIdx = voteTimings.value.findIndex(
        (result) => result.userId === vote.userId,
      );

      if (foundVoteIdx === -1) {
        voteTimings.value.push(vote);
      } else {
        voteTimings.value[foundVoteIdx].date = vote.date;
        voteTimings.value[foundVoteIdx].time = vote.time;
      }
    }

    function getVoteTiming(userId: string) {
      const foundVoteIdx = voteTimings.value.findIndex(
        (result) => result.userId === userId,
      );
      
      return voteTimings.value[foundVoteIdx];
    }

    function removeVoteTiming(userId: string) {
      const foundVoteIdx = voteTimings.value.findIndex(
        (result) => result.userId === userId,
      );
      voteTimings.value.splice(foundVoteIdx,1);
    }

    function clearVoteTimings() {
      voteTimings.value = [];
    }
    return {voteTimings, addVoteTiming, getVoteTiming, removeVoteTiming, clearVoteTimings };
  },
);
