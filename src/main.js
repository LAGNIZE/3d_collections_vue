import { createApp } from "vue";
import App from "./App.vue";
import "materialize-css/dist/css/materialize.css";
import "materialize-css";
require("@/assets/styles/main.css");
import { Splide } from "@splidejs/splide";
import "@splidejs/splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

createApp(App).mount("#app");

const splide = new Splide(".splide", {
  type: "loop",
  arrows: false,
  pagination: false,
  drag: "free",
  focus: "center",
  perPage: 6,
  autoScroll: {
    speed: 2,
  },
});

setTimeout(() => {
  splide.mount({ AutoScroll });
}, 1000);
