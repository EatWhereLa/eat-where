import type { Restaurant } from "@/types/Restaurant";
import { rand } from "@ngneat/falso";
import { useCuisineCategories } from "@/composables/useCuisineCategories";
import ky from "ky";
import { type Ref, ref } from "vue";
import { useToast } from "vuestic-ui";

const api = ky.create({ prefixUrl: import.meta.env.VITE_API_URL });
const bookmarks: Ref<Restaurant[]> = ref([]);
const { getRandomCuisineArr } = useCuisineCategories();
export function useBookmarks() {
  const { init } = useToast();
  async function getBookmarks(user_id: string) {
    try {
      const res = (await api
        .get(`bookmark/restaurants?user_id=${user_id}`)
        .json()) as Restaurant[];
      for (const restaurant of res) {
        if (restaurant.category === undefined) {
          restaurant.category = getRandomCuisineArr();
        }
      }
      bookmarks.value = res;
    } catch (error) {
      console.error(error);
    }
  }
  async function addBookmark(user_id: string, place_id: string) {
    try {
      await api
        .post(`bookmark`, {
          json: {
            user_id,
            place_id,
          },
        })
        .text();
      await getBookmarks(user_id);
      init({
        message: "Successfully added bookmark!",
        color: "success",
      });
    } catch (error) {
      console.error(error);
      const err = error as Error;
      init({
        message: err.message,
        color: "danger",
      });
    }
  }

  async function deleteBookmark(user_id: string, place_id: string) {
    try {
      await api
        .delete(`bookmark/remove?user_id=${user_id}&place_id=${place_id}`)
        .text();  
      await getBookmarks(user_id);
      init({
        message: "Successfully deleted bookmark",
        color: "success",
      });
    } catch (error) {
      console.error(error);
      const err = error as Error;
      init({
        message: err.message,
        color: "danger",
      });
    }
  }
  return { bookmarks, getBookmarks, addBookmark, deleteBookmark };
}
