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
                src="/src/assets/images/about-01.png"
                alt="About"
                class="ib"
              />
              <img src="/src/assets/images/about-02.png" alt="About" />
            </div>
            <div>
              <img src="/src/assets/images/shape-06.svg" alt="Shape" />
              <img
                src="/src/assets/images/about-03.png"
                alt="About"
                class="ob gb"
              />
              <img
                src="/src/assets/images/shape-07.svg"
                alt="Shape"
                class="bb"
              />
            </div>
          </div>

          <!-- About Content -->
          <div class="animate_right jn/2">
            <h4 class="ek yj mk gb" style="color: #f59e0b">Our Mission</h4>
            <h2 class="fk vj zp pr kk wm qb">Save Time, Eat Better</h2>
            <p class="uo">
              Our mission is simple – to help you decide where to eat and save
              you time while doing it. No more endless group chats or
              last-minute Google searches. With EatWhere, you'll make dining
              decisions in a snap.
            </p>

            <a
              href="https://www.youtube.com/watch?v=xcJtL7QggTI"
              data-fslightbox
              class="vc wf hg mb"
            >
              <!-- <svg fill="#f59e0b" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="71px" height="71px" viewBox="0 0 408.221 408.221" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.816442"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M204.11,0C91.388,0,0,91.388,0,204.111c0,112.725,91.388,204.11,204.11,204.11c112.729,0,204.11-91.385,204.11-204.11 C408.221,91.388,316.839,0,204.11,0z M286.547,229.971l-126.368,72.471c-17.003,9.75-30.781,1.763-30.781-17.834V140.012 c0-19.602,13.777-27.575,30.781-17.827l126.368,72.466C303.551,204.403,303.551,220.217,286.547,229.971z"></path> </g> </g> </g></svg>             -->

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

    <section class="i pg qh rm ji hp">
      <img
        src="/src/assets/images/shape-11.svg"
        alt="Shape"
        class="of h ga ha ke"
      />
      <img
        src="/src/assets/images/shape-07.svg"
        alt="Shape"
        class="h ia o ae jf"
      />
      <img src="/src/assets/images/shape-14.svg" alt="Shape" class="h ja ka" />
      <img src="/src/assets/images/shape-15.svg" alt="Shape" class="h q p" />

      <div class="bb ze i va ki xn br">
        <div class="tc uf sn tn xf un gg">
          <div class="animate_top me/5 ln rj">
            <h2 class="gk vj zp or kk wm hc">785</h2>
            <p class="ek bk aq">Global Brands</p>
          </div>
          <div class="animate_top me/5 ln rj">
            <h2 class="gk vj zp or kk wm hc">533</h2>
            <p class="ek bk aq">Happy Clients</p>
          </div>
          <div class="animate_top me/5 ln rj">
            <h2 class="gk vj zp or kk wm hc">865</h2>
            <p class="ek bk aq">Winning Award</p>
          </div>
          <div class="animate_top me/5 ln rj">
            <h2 class="gk vj zp or kk wm hc">346</h2>
            <p class="ek bk aq">Happy Clients</p>
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
