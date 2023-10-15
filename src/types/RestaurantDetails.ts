export type Photo = {
    width: number;
    height: number;
    html_attribution: string[];
    photo_reference: string;
};

export type Review = {
    author_name: string;
    author_url: string;
    rating: number;
    profile_photo_url: string,
    relative_time_description: string;
    text: string;
    time: number
};

export type RestaurantDetails = {
    name: string;
    current_opening_hours: {
        open_now: boolean;
        weekday_text: string[];
        dine_in: boolean
    };
    business_status: string;
    editorial_summary?: {
        overview?: string
    };
    formatted_address: string;
    formatted_phone_number: string;
    photos: Photo[];
    price_level: number;
    rating: number;
    reviews: Review[];
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
    types: string[],
    website: string
  };