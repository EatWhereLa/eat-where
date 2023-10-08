<script setup lang="ts">
import GenericButton from "../components/GenericButton.vue";
import RestaurantListItem from "@/components/RestaurantListItem.vue";

const restaurantMenuItems = [
  {
    title: "Big Mac® Upsized Meal",
    imgSrc: "/src/assets/restaurant_menu_item_1.webp",
    price: 7.5,
  },
  {
    title: "Big Mac® Upsized Meal",
    imgSrc: "/src/assets/restaurant_menu_item_1.webp",
    price: 7.5,
  },
  {
    title: "Big Mac® Upsized Meal",
    imgSrc: "/src/assets/restaurant_menu_item_1.webp",
    price: 7.5,
  },
];
</script>

<template>
  <main class="p-0 -mt-[80px]">
    <div class="relative overflow-hidden">
      <div class="absolute w-full h-full z-10 bg-black opacity-75"></div>
      <div
        class="bg-cover w-full h-52 blur-[3px]"
        :style="{ backgroundImage: `url(/src/assets/mcdonalds_bg.jpg)` }"
      ></div>
    </div>

    <div class="p-5 -mt-20 z-20">
      <section>
        <div class="bg-white p-5 rounded-3xl shadow-default">
          <h1 class="mb-3 font-semibold text-black text-2xl">McDonald's</h1>
          <ul class="text-gray-secondary text-sm">
            <li class="font-medium inline mr-2">Burger</li>
            <li
              class="font-medium inline before:content-['•'] before:mr-1 before:ml-1"
            >
              Fastfood
            </li>
            <li
              class="font-medium inline before:content-['•'] before:mr-1 before:ml-1"
            >
              Halal
            </li>
          </ul>

          <hr class="my-2.5" />

          <div class="inline-flex gap-10">
            <div class="inline-flex align-center gap-1.5">
              <va-icon name="location_on" size="1.8rem" class="text-primary" />
              <span class="text-black">500m</span>
            </div>
            <div class="inline-flex align-center gap-1">
              <va-icon name="attach_money" size="1.8rem" class="text-primary" />
              <span class="text-black">Inexpensive</span>
            </div>
          </div>

          <hr class="my-2.5" />

          <div>
            <div class="inline-flex align-center gap-2 mb-3">
              <va-icon name="draw" size="1.8rem" class="text-primary" />
              <span class="text-black">Personal Note</span>
              <generic-button
                titleColor="text-primary"
                bgColor="bg-white"
                padding="px-2"
              >
                Edit
              </generic-button>
            </div>
            <div class="text-black text-sm">
              Cheap and affordable meals. Always go there every Monday for
              breakfast.
            </div>
          </div>
        </div>
      </section>

      <section class="mt-7">
        <h1 class="text-xl text-black mb-3.5">Menu</h1>

        <li
          v-for="(menuItem, index) in restaurantMenuItems"
          :key="index"
          class="list-none"
        >
          <RestaurantListItem
            :title="menuItem.title"
            :imgSrc="menuItem.imgSrc"
            :price="menuItem.price"
          />
        </li>
      </section>
    </div>
  </main>
</template>
