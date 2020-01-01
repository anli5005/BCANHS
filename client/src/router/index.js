import Vue from "vue";
import Router from "vue-router";
import MainPage from "@/components/MainPage";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "BCA NHS",
      component: MainPage
    }
    // {
    //   path: "/",
    //   name: "HelloWorld",
    //   component: HelloWorld
    // }
  ]
});
