import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";
import Profile from "@/views/Profile.vue";
import Scripts from "@/views/Scripts.vue";
import Settings from "@/views/Profile/Settings.vue";
import Authorize from "@/views/Authorize.vue";
import ViewScript from "@/views/Scripts/View.vue";
import EditScript from "@/views/Scripts/Edit.vue";
import ProfileData from "@/views/Profile/Data.vue";
import ProfileStore from "@/views/Profile/Store.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/stashes",
    name: "Stashes",
    component: () =>
      import(/* webpackChunkName: "stashes" */ "../views/Stashes.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    children: [
      {
        name: "ProfileData",
        path: "data",
        component: ProfileData,
      },
      {
        name: "ProfileStore",
        path: "store",
        component: ProfileStore,
      },
      {
        path: "settings",
        name: "Settings",
        component: Settings,
      },
    ],
  },
  {
    path: "/scripts",
    name: "Scripts",
    component: Scripts,
    children: [
      {
        name: "ViewScript",
        path: "view/:stashName",
        component: ViewScript,
      },
      {
        name: "EditScript",
        path: "edit/:stashName?",
        component: EditScript,
      },
    ],
  },
  {
    path: "/authorize/:serviceName",
    name: "ServiceAuthorize",
    component: Authorize,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
