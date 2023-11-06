export type VotedPlaces = {
    place_id: string,
    vote_count: number,
}

export type VoteHistory = {
    user_ids: string[],
    vote_timestamp: number,
    voted_places: VotedPlaces[]
};