import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "./views/LandingPage.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: LandingPage,
    },
  ],
});
