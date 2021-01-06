import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#FFFFFF", // #E53935
        secondary: "#F0F4F7", // #FFCDD2
        accent: "#000000", // #3F51B5
        anchor: "#6C748D",
        success: "#1db954",
        "v-tab--active": "#1db954",
        // "v-tabs-items": "#393e46",
        // "v-card": "#393e46",
      },
      dark: {
        primary: "#232931", // #E53935
        secondary: "#393e46", // #FFCDD2
        accent: "#393e46", // #3F51B5
        background: "#232931",
        anchor: "#6C748D",
        success: "#1db954",
        // "primary--text": "#232931",
        "v-tab--active": "#1db954",
        // "v-tabs-items": "#393e46",
        // "v-card": "#393e46",
      },
    },
  },
});
