import type { Restaurant } from "./Restaurant";
import type { LatLng } from "./location";

export type TrackData = {
  upvoted: string[];
  bookmarked: Restaurant[];
  location?: LatLng;
  address?: string;
};
