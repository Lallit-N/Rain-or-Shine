import Vue from "vue";
import VueRouter from "vue-router";
import WeatherHomeView from "../views/WeatherHomeView.vue";
import SettingsView from "../views/SettingsView.vue";
import WeatherDetailView from "../views/WeatherDetailView";
import LoginView from "../views/LoginView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "weather-home",
    component: WeatherHomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsView,
  },
  {
    path: "/weather/:url",
    name: "weather-detail",
    component: WeatherDetailView,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
