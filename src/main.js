import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "lib-flexible";//全局px转rem适配

createApp(App).use(store).use(router).mount("#app");
