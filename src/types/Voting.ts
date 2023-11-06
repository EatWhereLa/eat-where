export type VotingHistory = {
  user_ids: string[];
  vote_timestamp: number;
  voted_places: VotedPlace[];
};

export type VotedPlace = {
  place_id: string;
  vote_count: number;
};
