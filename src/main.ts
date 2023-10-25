import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

import {
  createVuesticEssential,
  VaButton,
  VaCarousel,
  VaSelect,
  VaModal,
  VaIcon,
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
  VaDropdownPlugin,
  VaModalPlugin,
} from "vuestic-ui";
import "vuestic-ui/css";
import config from "../vuestic.config";

import "./assets/overrides.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(
  createVuesticEssential({
    components: {
      VaButton,
      VaCarousel,
      VaSelect,
      VaModal,
      VaIcon,
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
    },
    plugins: {
      VaDropdownPlugin,
      VaModalPlugin,
    },
    config,
  }),
);

app.mount("#app");
