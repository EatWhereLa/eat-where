<script setup lang="ts">
import NavHeader from "@/components/NavHeader.vue";
import SlideShow from "@/components/SlideshowHeader.vue";
import LandingHeader from "@/components/LandingHeader.vue";
import LocationButton from "../components/LocationButton.vue";
import LocationHeader from "../components/LocationHeader.vue";
import { Vue3Lottie } from "vue3-lottie";
import LandingJSON from "@/assets/lottie/landing.json";
import { RouterLink } from "vue-router";
</script>

<template>
  <!-- <NavHeader /> -->

  <main class="m-auto">
    <!-- ===== Hero Start ===== -->
    <!-- <div class="grid grid-cols-4">
      <div class="col-span-2 flex items-center justify-center">

        <RouterLink to="/location" id="router-link">
          <LocationButton />
        </RouterLink>

       
      </div>
      <div class="col-span-2">
        <Vue3Lottie :animation-data="LandingJSON" :height="600" />
      </div>
    </div> -->

    <LocationHeader />

    <LandingHeader />
    <br />

    <!-- ===== About Start ===== -->
    <section class="ji gp uq 2xl:ud-py-35 pg" style="padding: 3em 2em">
      <div class="bb ze ki xn wq">
        <div class="tc wf gg qq">
          <!-- About Images -->
          <div class="animate_left xc gn gg jn/2 i">
            <div>
              <img
                src="/src/assets/images/shape-05.svg"
                alt="Shape"
                class="h -ud-left-5 x"
              />
              <img
                src="/src/assets/images/landing/decide.jpg"
                alt="About"
                class="ib rounded-md h-15 w-auto"
              />
              <img
                src="/src/assets/images/landing/dining.jpg"
                alt="About"
                class="rounded-md"
              />
            </div>
            <div>
              <img src="/src/assets/images/shape-06.svg" alt="Shape" />
              <img
                src="/src/assets/images/landing/women.jpg"
                alt="About"
                class="ob gb rounded-md"
              />
              <img
                src="/src/assets/images/shape-07.svg"
                alt="Shape"
                class="bb"
              />
            </div>
          </div>

          <!-- About Content -->
          <div id="mission" class="animate_right jn/2">
            <h4 class="ek yj mk gb" style="color: #f59e0b">Our Mission</h4>
            <h2 class="fk vj zp pr kk wm qb">Save Time, Eat Better</h2>
            <p class="uo">
              Our mission is simple – to help you decide where to eat and save
              you time while doing it. No more endless group chats or
              last-minute Google searches. With EatWhere, you'll make dining
              decisions in a snap.
            </p>

            <a href="/group" data-fslightbox class="vc wf hg mb">
              <span class="tc wf xf be dd rg i gh ua">
                <span class="nf h vc yc vd rg gh qk -ud-z-1"></span>
                <img src="/src/assets/images/icon-play.svg" alt="Play" />
              </span>

              <span class="kk">TRY IT OUT</span>
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

