// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import VueParticles from "vue-particles";
import { sync } from "vuex-router-sync";
import store from "@/store/store";

import Navbar from "./components/Navbar";

Vue.use(BootstrapVue);
Vue.use(VueParticles);

sync(store, router);

Vue.component("navbar", Navbar);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
