import Vue from "vue";
import Router from "vue-router";
import Main from "@/components/Main";
import Bylaws from "@/components/info/Bylaws";
import Requirements from "@/components/info/Requirements";
import Login from "@/components/Login";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "main",
      component: Main
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/info/bylaws",
      name: "bylaws",
      component: Bylaws
    },
    {
      path: "/info/requirements",
      name: "requirements",
      component: Requirements
    }
  ]
});
