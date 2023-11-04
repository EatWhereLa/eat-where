<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import anime from "animejs/lib/anime.es.js";
import type { AnimeInstance } from "animejs";
import chicken from "@/assets/images/landing/chicken.png";
import korean from "@/assets/images/landing/korean.jpg";
import max from "@/assets/images/landing/max.jpg";
import western from "@/assets/images/landing/western.jpeg";
import friends from "@/assets/images/landing/friends.jpg";
import table from "@/assets/images/landing/table.jpg";
import round from "@/assets/images/landing/round.jpg";
import dine from "@/assets/images/landing/dine.jpg";
import dintaifeng from "@/assets/images/landing/dintaifeng.jpeg";
import ajisan from "@/assets/images/landing/ajisan.jpeg";
import collins from "@/assets/images/landing/collins.jpg";
import thw from "@/assets/images/landing/thw.jpg";

const sliderRef: Ref<HTMLDivElement | undefined> = ref();
const nextRef: Ref<HTMLDivElement | undefined> = ref();
const prevRef: Ref<HTMLDivElement | undefined> = ref();
const itemsRef: Ref<HTMLDivElement[]> = ref([]);
const isPlaying = ref(false);
const current = ref(0);

const itemValues = [
  {
    displayText: "Discover",
    images: [chicken, korean, max, western],
  },
  {
    displayText: "Collaborate",
    images: [friends, table, round, dine],
  },
  {
    displayText: "New Places",
    images: [dintaifeng, collins, ajisan, thw],
  },
];

function anim(
  current: HTMLDivElement,
  next: HTMLDivElement,
  callback: (anim: AnimeInstance) => void,
) {
  const currentImgs = current.querySelectorAll(".img");
  const currentText = current.querySelectorAll(".content .letter");
  const nextImgs = next.querySelectorAll(".img");
  const nextText = next.querySelectorAll(".content .letter");

  const t = 400;
  const offset = "-=" + t * 0.4;
  const imgOffset = t * 0.8;

  const tl = anime.timeline({
    easing: "easeInOutQuint",
    duration: t,
    complete: callback,
  });

  // Add children
  tl.add({
    targets: currentText,
    translateY: [0, "-.75em"],
    /*clipPath: ['polygon(0 0, 100% 0, 100% 100%, 0% 100%)', 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)'],*/
    opacity: [1, 0],
    easing: "easeInQuint",
    duration: t,
    delay: (el, i) => 10 * (i + 1),
  })
    .add(
      {
        targets: currentImgs[0],
        translateY: -600,
        translateZ: 0,
        rotate: [0, "-15deg"],
        opacity: [1, 0],
        easing: "easeInCubic",
      },
      offset,
    )
    .add(
      {
        targets: currentImgs[1],
        translateY: -600,
        translateZ: 0,
        rotate: [0, "15deg"],
        opacity: [1, 0],
        easing: "easeInCubic",
      },
      "-=" + imgOffset,
    )
    .add(
      {
        targets: currentImgs[2],
        translateY: -600,
        translateZ: 0,
        rotate: [0, "-15deg"],
        opacity: [1, 0],
        easing: "easeInCubic",
      },
      "-=" + imgOffset,
    )
    .add(
      {
        targets: currentImgs[3],
        translateY: -600,
        translateZ: 0,
        rotate: [0, "15deg"],
        opacity: [1, 0],
        easing: "easeInCubic",
      },
      "-=" + imgOffset,
    )
    .add({
      targets: current,
      opacity: 0,
      visibility: "hidden",
      duration: 10,
      easing: "easeInCubic",
    })
    .add(
      {
        targets: next,
        opacity: 1,
        visibility: "visible",
        duration: 10,
      },
      offset,
    )
    .add(
      {
        targets: nextImgs[0],
        translateY: [600, 0],
        translateZ: 0,
        rotate: ["15deg", 0],
        opacity: [0, 1],
        easing: "easeOutCubic",
      },
      offset,
    )
    .add(
      {
        targets: nextImgs[1],
        translateY: [600, 0],
        translateZ: 0,
        rotate: ["-15deg", 0],
        opacity: [0, 1],
        easing: "easeOutCubic",
      },
      "-=" + imgOffset,
    )
    .add(
      {
        targets: nextImgs[2],
        translateY: [600, 0],
        translateZ: 0,
        rotate: ["15deg", 0],
        opacity: [0, 1],
        easing: "easeOutCubic",
      },
      "-=" + imgOffset,
    )
    .add(
      {
        targets: nextImgs[3],
        translateY: [600, 0],
        translateZ: 0,
        rotate: ["-15deg", 0],
        opacity: [0, 1],
        easing: "easeOutCubic",
      },
      "-=" + imgOffset,
    )
    .add(
      {
        targets: nextText,
        translateY: [".75em", 0],
        translateZ: 0,
        /*clipPath: ['polygon(0 0, 100% 0, 100% 0, 0 0)','polygon(0 0, 100% 0, 100% 100%, 0% 100%)'],*/
        opacity: [0, 1],
        easing: "easeOutQuint",
        duration: t * 1.5,
        delay: (el, i) => 10 * (i + 1),
      },
      offset,
    );
}

function updateSlider(newIndex: number) {
  const currentItem = itemsRef.value[current.value];
  const newItem = itemsRef.value[newIndex];

  function callback() {
    currentItem.classList.remove("is-active");
    newItem.classList.add("is-active");
    current.value = newIndex;
    isPlaying.value = false;
  }

  anim(currentItem, newItem, callback);
}

function next() {
  if (isPlaying.value) return;
  isPlaying.value = true;
  const newIndex =
    current.value === itemsRef.value.length - 1 ? 0 : current.value + 1;
  updateSlider(newIndex);
}

function prev() {
  if (isPlaying.value) return;
  isPlaying.value = true;
  const newIndex =
    current.value === 0 ? itemsRef.value.length - 1 : current.value - 1;
  updateSlider(newIndex);
}

function init() {
  const slider = sliderRef.value;
  const nextBtn = nextRef.value;
  const prevBtn = prevRef.value;
  const items = itemsRef.value;
  if (slider && nextBtn && prevBtn && items) {
    items[0].classList.add("is-active");
    nextBtn.onclick = next;
    prevBtn.onclick = prev;
  }
}

onMounted(() => {
  init();
});
</script>

<template>
  <div ref="sliderRef" class="slider rounded-xl mb-8">
    <div class="nav">
      <div ref="nextRef" class="next"></div>
      <div ref="prevRef" class="prev"></div>
    </div>
    <div
      class="item"
      v-for="(item, idx) in itemValues"
      :key="idx"
      ref="itemsRef"
    >
      <div class="content">
        <div class="wrap text-xs">{{ item.displayText }}</div>
      </div>
      <div class="imgs">
        <div class="grid">
          <div
            class="img"
            :class="`img-${idx + 1}`"
            v-for="(displayImage, idx) in item.images"
            :key="idx"
          >
            <img :src="`${displayImage}`" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slider {
  height: 100vh;
  width: 100%;
  background-color: #f6e3e5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fb923c;
  position: relative;
  overflow: hidden;
  transition: background-color 2s;
}

.slider .credits {
  position: absolute;
  top: 2rem;
  left: 2rem;
  line-height: 1.65;
  z-index: 10;
  max-width: 320px;
}

.slider .item .imgs {
  position: relative;
  width: 60%;
  padding-top: 60%;
  left: 0;
}

.slider .item .imgs .grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  grid-column-gap: 32px;
  grid-row-gap: 32px;
  transform: rotate(-20deg);
  opacity: 0.65;
}

.slider .item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slider .item .img {
  width: 100%;
  height: 100%;
  position: relative;
  will-change: transform;
  will-change: opacity;
}

.slider .item .img img {
  /* position: absolute; */
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  -webkit-filter: contrast(110%) brightness(110%) saturate(130%);
  filter: contrast(110%) brightness(110%) saturate(130%);
}

.slider .item .img img::before {
  content: "";
  display: block;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  pointer-events: none;
  mix-blend-mode: screen;
  background: rgba(243, 106, 188, 0.3);
}

.slider .item .img-1 {
  grid-area: 1/1/7/5;
}

.slider .item .img-2 {
  grid-area: 2/5/7/13;
}

.slider .item .img-3 {
  grid-area: 7/1/12/9;
}

.slider .item .img-4 {
  grid-area: 7/9/13/13;
}

.slider .item .content {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.15;
  font-size: 8rem;
  font-weight: 700;
}

.slider .item .content .wrap {
  /* font-size: 1em; */
  text-align: center;
  text-shadow: 1px 1px 4px rgba(10, 9, 8, 0.2);
  width: 100%;
  max-width: 600px;
  line-height: 1;
}

.slider .item .content .wrap .letter {
  display: inline-block;
}

.wrap {
  font-size: 1em;
}

@media screen and (min-width: 899px) {
  .wrap,
  .slider .nav .next,
  .slider .nav .prev {
    font-size: 1em;
  }
}

@media screen and (max-width: 900px) {
  .wrap {
    font-size: 0.45em;
  }
}

@media screen and (max-width: 600px) {
  .slider .item .imgs {
    width: 40%; /* Reduce the width for smaller screens */
    position: absolute;
    margin: 80px;
  }

  .slider .item .imgs .grid {
    width: 100%; /* Adjust the width of the grid for smaller screens */
    height: 100%; /* Adjust the height of the grid for smaller screens */
  }

  .slider .item .img {
    width: 100%; /* Adjust the width of individual images for smaller screens */
    height: 100%; /* Adjust the height of individual images for smaller screens */
  }
}

@media screen and (max-width: 475px) {
  .slider .item .imgs {
    width: 20%; /* Reduce the width for smaller screens */
    position: absolute;
    margin: 0px;
  }

  .slider .item .imgs .grid {
    width: 100%; /* Adjust the width of the grid for smaller screens */
    height: 100%; /* Adjust the height of the grid for smaller screens */
  }

  .slider .item .img {
    width: 100%; /* Adjust the width of individual images for smaller screens */
    height: 100%; /* Adjust the height of individual images for smaller screens */
  }
}

.slider .nav .next,
.slider .nav .prev {
  height: 1.8rem;
  width: 1.8rem;
  position: absolute;
  top: calc(50% - 1rem);
  cursor: pointer;
  z-index: 3;
  transition: transform 0.3s;
}

.slider .nav .next {
  right: 2rem;
  background-image: url("data:image/svg+xml,%3C?xml version='1.0' encoding='utf-8'?%3E %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M 19 8 L 19 11 L 1 11 L 1 13 L 19 13 L 19 16 L 23 12 L 19 8 z' fill='orange'/%3E%3C/svg%3E");
}

.slider .nav .next:hover {
  transform: translateX(0.5rem);
}

.slider .nav .prev {
  left: 2rem;
  background-image: url("data:image/svg+xml,%3C?xml version='1.0' encoding='utf-8'?%3E %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M 5 8 L 1 12 L 5 16 L 5 13 L 23 13 L 23 11 L 5 11 L 5 8 z' fill='orange'/%3E%3C/svg%3E");
}

.slider .nav .prev:hover {
  transform: translateX(-0.5rem);
}

.slider .nav .explore-btn {
  z-index: 4;
  position: absolute;
  bottom: 2rem;
  left: calc(50% - 4rem);
  width: 8em;
  text-align: center;
  padding: 1rem 0;
  border: solid 2px white;
  background: transparent;
  color: white;
  transition: background-color 0.3s;
  cursor: pointer;
}

.slider .nav .explore-btn:hover {
  color: #0a0908;
  background: white;
}

.slider .item:not(.is-active) {
  opacity: 0;
  pointer-events: none;
}
</style>
