import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Bylaws from "@/components/info/Bylaws";
import Requirements from "@/components/info/Requirements";
import Login from "@/components/Login";
import Tutor from "@/components/tutoring/Tutor";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/tutoring",
      name: "tutor",
      component: Tutor
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
