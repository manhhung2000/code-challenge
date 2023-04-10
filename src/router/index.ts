import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Admin from "../components/Admin.vue";
import Consumer from "../components/Consumer.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: Home,
  },
  {
    path: "/admin",
    name: "AdminPage",
    component: Admin,
  },
  {
    path: "/consumer",
    name: "ConsumerPage",
    component: Consumer,
  },
];

const router = createRouter({ history: createWebHistory(), routes });
export default router;
