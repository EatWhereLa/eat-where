<script setup lang="ts">
import SlideShow from "@/components/SlideshowHeader.vue";
import LandingHeader from "@/components/LandingHeader.vue";
import LocationHeader from "../components/LocationHeader.vue";
</script>

<template>
  <!-- <NavHeader /> -->

  <main class="m-auto">
    <!-- ===== Hero Start ===== -->

    <LocationHeader />

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
                src="/src/assets/images/landing/decide.jpg"
                alt="About"
                class="mb-8 rounded-md h-15 w-auto"
              />
              <img
                src="/src/assets/images/landing/dining.jpg"
                class="rounded-md"
                alt="About"
              />
            </div>
            <div>
              <img src="/src/assets/images/shape-06.svg" alt="Shape" />
              <img
                src="/src/assets/images/landing/women.jpg"
                alt="About"
                class="mt-7 mb-5 rounded-md"
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
  </main>
</template>
