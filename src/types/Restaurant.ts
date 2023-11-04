export type Photo = {
  width: number;
  height: number;
  html_attribution: string[];
  photo_reference: string;
};

export type Restaurant = {
  place_id: string;
  name: string;
  photos: Photo;
  rating: number;
  crowd: number;
  user_ratings: number;
  vicinity: string;
  geometry: {
    lat: number;
    lng: number;
  };
  category: string[];
  upvote_count?: number;
  price?: number;
};

export type FilterRestaurant = {
  id: number;
  name: string;
  location: string;
  details: string;
  imageUrl: string;
  owner: string;
  dateAdded: string;
  bookmark: boolean;
  category: string[];
  price: string;
};
