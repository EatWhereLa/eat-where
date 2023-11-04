<script setup>
import { Vue3Lottie } from "vue3-lottie";
import LandingJSON from "@/assets/lottie/landing.json";
import LocationButton from "../components/LocationButton.vue";
import { RouterLink } from "vue-router";
</script>

<template>
  <section>
    <div>
      <div class="content">
        <h1>Vote Together, Eat Better!</h1>
        <RouterLink to="/location" id="router-link">
          <LocationButton />
        </RouterLink>
        
      </div>
      <div class="img-container">
        <!-- <img src="../assets/images/landing/banner.gif" alt="" /> -->
        <Vue3Lottie :animation-data="LandingJSON" :height="600" />
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@600;700&family=Poppins:wght@300;400;500;700&display=swap");

* {

  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.content {
  max-width: 600px;
}

.content h1 {
  text-transform: capitalize;
  font-size: clamp(1.5rem, 5vw, 4rem);
  font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    "Noto Sans",
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji";
  /* 4 */
  font-weight: 500;
  margin: 0.2em 0 4rem 0;
}

body {
  background: #ddd6f3;
  background: -webkit--webkit-linear-gradient(left, #ff9b9b, #ffd6d5);
  background: -webkit--moz-linear-gradient(left, #ff9b9b, #ffd6d5);
  background: -webkit--o-linear-gradient(left, #ff9b9b, #ffd6d5);
  background: -webkit--ms-linear-gradient(left, #ff9b9b, #ffd6d5);
  background: -webkit-linear-gradient(to right, #ff9b9b, #ffd6d5);
  background: -webkit-linear-gradient(left, #ff9b9b, #ffd6d5);
  background: -moz-linear-gradient(left, #ff9b9b, #ffd6d5);
  background: -o-linear-gradient(left, #ff9b9b, #ffd6d5);
  background: -ms-linear-gradient(left, #ff9b9b, #ffd6d5);
  background: linear-gradient(to right, #ff9b9b, #ffd6d5);
  width: calc(min(1440px, 90%));
  margin: 0 auto;
  display: grid;
  min-height: 100vh;
  padding-block: 2em;
  font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    "Noto Sans",
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji";
  /* 4 */
  font-weight: 300;
}

div {
  overflow: hidden;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-direction: reverse;
  -moz-box-direction: reverse;
  -o-box-direction: reverse;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -o-box-orient: vertical;
  -webkit-flex-direction: column-reverse;
  -ms-flex-direction: column-reverse;
  flex-direction: column-reverse;
}

@media screen and (min-width: 1445px) {
  div {
    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
    -o-box-orient: horizontal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
  }
}

div .content {
  padding: 3em 2em;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -o-box-orient: vertical;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -o-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  color: black;
}

@media screen and (min-width: 1445px) {
  div .content {
    padding: 5em 4.5em;
  }
}

/* div .content a {
  text-decoration: none;
  color: #838383;
  font-size: 0.9rem;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
} */

div .content a:hover {
  color: #eb8a88;
}

div .content span {
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 0.125rem;
  color: #f59e0b;
  font-weight: 500;
}

div .content h1 {
  text-transform: capitalize;
  font-size: clamp(1.5rem, 5vw, 4rem);
  font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    "Noto Sans",
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji";
  /* 4 */
  font-weight: 500;
  margin: 0.2em 0 0.6rem 0;
}

div .content p {
  max-width: 350px;
}

div .content svg {
  width: 26px;
  margin-right: 10px;
}

div .img-container {
  width: 100%;
  position: relative;
  min-height: 380px;
  height: 30vh;
}

@media screen and (min-width: 1445px) {
  div .img-container {
    height: auto;
  }
}

div img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

div .order {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 2em 2em;
  -webkit-box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.161);
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.161);
  height: min-content;
}

@media screen and (min-width: 600px) {
  div .order {
    width: 80%;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }
}

@media screen and (min-width: 1445px) {
  div .order {
    min-width: 360px;
    width: auto;
    top: 50%;
    left: 75%;
    -webkit-transform: translate(-75%, -50%);
    -moz-transform: translate(-75%, -50%);
    -o-transform: translate(-75%, -50%);
    -ms-transform: translate(-75%, -50%);
    transform: translate(-75%, -50%);
    padding: 3em 2.8em;
    display: block;
  }
}

div .order p {
  color: #6b6b6b;
  max-width: 200px;
}

div .order a {
  display: inline-block;
  background: #000;
  color: #fff;
  display: inline-block;
  padding: 0.7em 2.2em;
  border-radius: 60px;
  text-transform: capitalize;
  text-decoration: none;
  margin-top: 2em;
  font-size: 0.9rem;
}

div .order a:hover {
  background: #cd7786;
}

@media screen and (min-width: 1445px) {
  div .order a {
    font-size: 1rem;
  }
}

div .order span {
  font-size: 1.3rem;
}

@media screen and (min-width: 1445px) {
  div .order span {
    font-size: 1.5rem;
  }
}

div .order .price {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: end;
  -moz-box-align: end;
  -o-box-align: end;
  -ms-flex-align: end;
  -webkit-align-items: flex-end;
  align-items: flex-end;
  font-size: 1rem;
}

div .order .price span {
  font-size: 1.5rem;
  margin-bottom: -3px;
  font-weight: 300;
}

@media screen and (min-width: 1445px) {
  div .order .price span {
    font-size: 2.5rem;
    margin-bottom: -10px;
  }
}

div .order .price h2 {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: -10px;
  margin-inline: 5px;
}

@media screen and (min-width: 1445px) {
  div .order .price h2 {
    font-size: 3rem;
    margin-bottom: -15px;
  }
}

div hr {
  background: #cecece;
  width: 30%;
  height: 1px;
  border: none;
  display: block;
  margin: 4em 0 1em 0;
}

@media screen and (min-width: 600px) {
  div hr {
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
  }
}

@media screen and (min-width: 1445px) {
  div hr {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
}

ol {
  list-style: none;
  margin: 0;
  padding: 0;
  counter-reset: section;
  margin: 2em 0 2.5em 0;
}

li {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  position: relative;
}

li + li {
  margin-top: 1em;
}

li::before {
  counter-increment: section;
  content: counters(section, ".") " ";
  background: #f59e0b;
  color: #fff;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -o-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  min-width: 26px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  font-size: 0.9rem;
  font-weight: 200;
  margin-right: 1em;
  position: relative;
  z-index: 66;
}

li:not(:last-child):after {
  content: "";
  width: 1px;
  height: 200%;
  background: #f59e0b;
  position: absolute;
  left: 12.5px;
  top: 50%;
}
</style>
