import type { Restaurant } from "@/types/Restaurant";
import { rand } from "@ngneat/falso";
import ky from "ky";
import { type Ref, ref } from "vue";

const api = ky.create({ prefixUrl: import.meta.env.VITE_API_URL });
const bookmarks: Ref<Restaurant[]> = ref([]);
export function useBookmarks() {
  async function getBookmarks(user_id: string) {
    try {
      const res = (await api
        .get(`bookmark/restaurants?user_id=${user_id}`)
        .json()) as Restaurant[];
      bookmarks.value = res;
    } catch (error) {
      console.error(error);
    }
  }
  return { bookmarks, getBookmarks };
}
