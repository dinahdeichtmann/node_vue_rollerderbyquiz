// Vue.router
import { createRouter, createWebHistory } from "vue-router";

const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("/src/components/page_home.vue"),
    },
    {
      path: "/quizz",
      name: "Quizz",
      component: () => import("/src/components/page_question.vue"),
    },
    {
      path: "/filters",
      name: "Filters",
      component: () => import("/src/components/page_filters.vue"),
    },
    {
      path: "/rules",
      name: "Rules",
      component: () => import("/src/components/page_rules.vue"),
    },
    {
      path: "/bilan",
      name: "Bilan",
      component: () => import("/src/components/page_bilan.vue"),
    },
    {
      path: "/mst",
      name: "MinimumSkills",
      component: () => import("/src/components/page_minimumskills.vue"),
    },
  ],
});

export default router;
