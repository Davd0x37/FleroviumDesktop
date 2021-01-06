import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify";
import vuetify from "./plugins/vuetify";
import elstore from "./plugins/electronStore";
import Vuelidate from "vuelidate";
// @ts-ignore
import VueCodeHighlight from "vue-code-highlight";
import "vuetify/dist/vuetify.min.css";
import "vue-code-highlight/themes/duotone-sea.css";
import VueI18n from "vue-i18n";
import locales from "@/i18n";

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(Vuelidate);
Vue.use(VueCodeHighlight);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "pl",
  messages: locales,
});

new Vue({
  router,
  store,
  vuetify,
  i18n,
  provide() {
    return {
      elstore,
    };
  },
  render: (h) => h(App),
}).$mount("#app");
