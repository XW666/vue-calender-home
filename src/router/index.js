import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Days from '../views/Days.vue'
import Upload from '../views/Upload.vue'
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import("../views/About.vue")
  },
  {
    path: "/Days",
    name: "Days",
    component: Days
  },
  {
    path: "/Upload",
    name: "Upload",
    component: Upload
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
