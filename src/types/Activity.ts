export enum ActivityType {
    BOOKINGS = "Booking",
    GROUPVOTE = "Group Vote"
}

export type Activity = {
    id: number;
    name: string;
    imgSrc: string;
    date: string;
    type: ActivityType;
}