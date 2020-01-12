import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Bylaws from "@/components/info/Bylaws";
import Requirements from "@/components/info/Requirements";
import Login from "@/components/auth/Login";
import Forgot from "@/components/auth/Forgot";
import Reset from "@/components/auth/Reset";
import Tutoring from "@/components/tutoring/Tutoring";
import CommServe from "@/components/logging/CommServe";
import TutorHours from "@/components/logging/TutorHours";

Vue.use(Router);

export default new Router({
  // mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/forgot",
      name: "forgot",
      component: Forgot,
    },
    {
      path: "/reset/:token",
      name: "reset",
      component: Reset,
    },
    {
      path: "/tutoring",
      name: "tutoring",
      component: Tutoring,
    },
    {
      path: "/info/bylaws",
      name: "bylaws",
      component: Bylaws,
    },
    {
      path: "/info/requirements",
      name: "requirements",
      component: Requirements,
    },
    {
      path: "/logging/commserve",
      name: "logcommserve",
      component: CommServe,
    },
    {
      path: "/logging/tutor",
      name: "logtutor",
      component: TutorHours,
    },
  ],
});
