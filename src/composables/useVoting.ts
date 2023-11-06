import type { VotingHistory, VotedPlace } from "@/types/Voting";
import ky from "ky";
import { type Ref, ref } from "vue";

const api = ky.create({ prefixUrl: import.meta.env.VITE_API_URL });
const voteHistory: Ref<VotingHistory[]> = ref([]);
export function useVoting() {
  async function getVotingHistory(user_id: string) {
    try {
      const res = (await api
        .get(`vote?user_id=${user_id}`)
        .json()) as VotingHistory[];
      voteHistory.value = res;
    } catch (error) {
      console.error(error);
    }
  }

  async function addVotingHistory(votingHistory: VotingHistory) {
    try {
      await api.post("vote", {
        json: votingHistory,
      });
    } catch (error) {
      console.error(error);
    }
  }
  return { voteHistory, getVotingHistory, addVotingHistory };
}
