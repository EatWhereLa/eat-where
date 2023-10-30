import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

import Vue3Lottie from "vue3-lottie";
import {
  createVuesticEssential,
  VaButton,
  VaAccordion,
  VaCarousel,
  VaSelect,
  VaCheckbox,
  VaInput,
  VaModal,
  VaImage,
  VaIcon,
  VaCard,
  VaCardContent,
  VaForm,
  VaInput,
  VaDatePicker,
  VaTabs, 
  VaTab,
  VaChip,
  VaCollapse,
  VaNavbar,
  VaNavbarItem,
  VaSidebar,
  VaSidebarItem,
  VaSidebarItemContent,
  VaSidebarItemTitle,
  VaLayout,
  VaOptionList,
  VaScrollContainer,
  VaRating,
  VaTextarea,
  VaDropdownPlugin,
  VaModalPlugin,
} from "vuestic-ui";
import "vuestic-ui/styles/essential.css";
import config from "../vuestic.config";

import "./assets/overrides.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(
  createVuesticEssential({
    components: {
      VaButton,
      VaAccordion,
      VaCarousel,
      VaSelect,
      VaCheckbox,
      VaInput,
      VaModal,
      VaImage,
      VaIcon,
      VaCard,
      VaCardContent,
      VaForm,
      VaInput,
      VaDatePicker,
      VaTabs,
      VaTab,
      VaChip,
      VaCollapse,
      VaNavbar,
      VaNavbarItem,
      VaSidebar,
      VaSidebarItem,
      VaSidebarItemContent,
      VaSidebarItemTitle,
      VaLayout,
      VaOptionList,
      VaScrollContainer,
      VaRating,
      VaTextarea,
    },
    plugins: {
      VaDropdownPlugin,
      VaModalPlugin,
    },
    config,
  }),
);
app.use(Vue3Lottie);

app.mount("#app");
