import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

import {
  createVuesticEssential,
  VaCarousel,
  VaSelect,
  VaModal,
  VaImage,
  VaIcon,
  VaCard,
  VaCardContent,
  VaTabs,
  VaTab,
  VaChip,
  VaCollapse,
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
      VaCarousel,
      VaSelect,
      VaModal,
      VaImage,
      VaIcon,
      VaCard,
      VaCardContent,
      VaTabs,
      VaTab,
      VaChip,
      VaCollapse,
    },
    plugins: {
      VaDropdownPlugin,
      VaModalPlugin,
    },
    config,
  }),
);

app.mount("#app");
