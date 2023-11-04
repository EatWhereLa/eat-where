<script setup lang="ts">
import NavHeader from "@/components/NavHeader.vue";
import SlideShow from "@/components/SlideshowHeader.vue";
import LandingHeader from "@/components/LandingHeader.vue";
import LocationButton from "../components/LocationButton.vue";
import { Vue3Lottie } from "vue3-lottie";
import LandingJSON from "@/assets/lottie/landing.json";
import { RouterLink } from "vue-router";
</script>

<template>
  <!-- <NavHeader /> -->

  <main class="m-auto">
    <!-- ===== Hero Start ===== -->
    <div class="flex flex-col-reverse md:flex-row pb-4">
      <div class="flex items-center justify-center grow basis-0">
        <RouterLink to="/location" id="router-link">
          <LocationButton />
        </RouterLink>

        <!-- </div> -->
      </div>
      <div class="grow basis-0">
        <Vue3Lottie :animation-data="LandingJSON" />
      </div>
    </div>

    <LandingHeader />
    <br />
    <!-- ===== Small Features End ===== -->

    <!-- ===== About Start ===== -->
    <section class="px-12 py-8">
      <div class="mx-auto p-4 lg:p-9">
        <div class="flex items-center gap-8 lg:gap-28">
          <!-- About Images -->
          <div class="relative none md:w-1/2 md:flex md:gap-8">
            <div>
              <img
                src="/src/assets/images/shape-05.svg"
                alt="Shape"
                class="top-5 -left-5 absolute"
              />
              <img
                src="/src/assets/images/about-01.png"
                alt="About"
                class="mb-8"
              />
              <img src="/src/assets/images/about-02.png" alt="About" />
            </div>
            <div>
              <img src="/src/assets/images/shape-06.svg" alt="Shape" />
              <img
                src="/src/assets/images/about-03.png"
                alt="About"
                class="mt-7 mb-5"
              />
              <img
                src="/src/assets/images/shape-07.svg"
                alt="Shape"
                class="mx-auto"
              />
            </div>
          </div>

          <!-- About Content -->
          <div class="w-1/2">
            <h4 class="text-primary font-medium text-xl leading-relaxed mb-5">
              Our Mission
            </h4>
            <h2
              class="mb-7 text-black font-semibold text-3xl leading-9 md:text-4xl md:leading-10 xl:text-5xl xl:leading-[2.75rem]"
            >
              Save Time, Eat Better
            </h2>
            <p>
              Our mission is simple – to help you decide where to eat and save
              you time while doing it. No more endless group chats or
              last-minute Google searches. With EatWhere, you'll make dining
              decisions in a snap.
            </p>

            <a
              href="https://www.youtube.com/watch?v=xcJtL7QggTI"
              class="inline-flex items-center gap-6 mt-10"
            >
              <span
                class="bg-primary rounded-full justify-center items-center w-12 h-12 flex z-10 relative"
              >
                <span
                  class="opacity-75 bg-primary rounded-full w-full h-full animate-ping inline-flex -z-10 absolute"
                ></span>
                <img src="/src/assets/images/icon-play.svg" alt="Play" />
              </span>
              <span>TRY IT OUT</span>
            </a>
          </div>
        </div>
      </div>
    </section>
    <!-- ===== About End ===== -->

    <!-- ===== Animations ===== -->
    <SlideShow />

    <section class="bg-blue-50 relative py-20 lg:py-24 rounded-xl">
      <img
        src="/src/assets/images/shape-11.svg"
        alt="Shape"
        class="animate-spin-slow w-14 bottom-[3%] left-[3%] absolute"
      />
      <img
        src="/src/assets/images/shape-07.svg"
        alt="Shape"
        class="rotate-90 w-20 top-[10%] right-[2%] absolute"
      />
      <img
        src="/src/assets/images/shape-14.svg"
        alt="Shape"
        class="top-[1%] left-[35%] absolute"
      />
      <img
        src="/src/assets/images/shape-15.svg"
        alt="Shape"
        class="right-0 bottom-0 absolute"
      />

      <div class="max-w-7xl px-4 mx-auto z-10 relative xl:px-36">
        <div
          class="flex flex-wrap justify-center gap-8 md:justify-between md:items-center md:flex-nowrap"
        >
          <div class="w-2/5 md:w-auto text-center">
            <h2
              class="mb-1 text-3xl leading-8 font-bold lg:text-4xl lg:leading-9 xl:text-5xl xl:leading-10"
            >
              785
            </h2>
            <p class="text-base leading-6 font-medium md:text-lg md:leading-9">
              Global Brands
            </p>
          </div>
          <div class="w-2/5 md:w-auto text-center">
            <h2
              class="mb-1 text-3xl leading-8 font-bold lg:text-4xl lg:leading-9 xl:text-5xl xl:leading-10"
            >
              533
            </h2>
            <p class="text-base leading-6 font-medium md:text-lg md:leading-9">
              Happy Clients
            </p>
          </div>
          <div class="w-2/5 md:w-auto text-center">
            <h2
              class="mb-1 text-3xl leading-8 font-bold lg:text-4xl lg:leading-9 xl:text-5xl xl:leading-10"
            >
              865
            </h2>
            <p class="text-base leading-6 font-medium md:text-lg md:leading-9">
              Winning Award
            </p>
          </div>
          <div class="w-2/5 md:w-auto text-center">
            <h2
              class="mb-1 text-3xl leading-8 font-bold lg:text-4xl lg:leading-9 xl:text-5xl xl:leading-10"
            >
              346
            </h2>
            <p class="text-base leading-6 font-medium md:text-lg md:leading-9">
              Happy Clients
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
@media screen and (min-width: 1445px) {
  div .content {
    padding: 5em 4.5em;
  }
}

#router-link {
  display: block;
  width: 80%;
}
</style>
