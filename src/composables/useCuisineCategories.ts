import { rand } from "@ngneat/falso";

const cuisineCategories: string[] = [
  "Italian",
  "Mexican",
  "Chinese",
  "Japanese",
  "Indian",
  "French",
  "Thai",
  "Greek",
  "American",
  "Mediterranean",
  "Korean",
  "Vietnamese",
  "Spanish",
  "Brazilian",
  "Lebanese",
  "Ethiopian",
  "Cajun",
  "Fusion",
  "Vegetarian",
  "Vegan",
  "Fast Food",
];

export function useCuisineCategories() {
  function getRandomCuisineArr() {
    const noCuisines = Math.round(Math.random() * 3) + 1;
    return rand(cuisineCategories, { length: noCuisines });
  }
  return { cuisineCategories, getRandomCuisineArr };
}
