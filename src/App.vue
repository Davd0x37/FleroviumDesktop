<template>
  <v-app>
    <v-layout fill-height column v-if="initialized()">
      <v-row>
        <v-col class="pa-0">
          <Header />
        </v-col>
      </v-row>
      <v-row class="ma-0 flex-nowrap fill-height">
        <v-layout>
          <v-col class="pa-0" style="flex: 0;">
            <Sidebar />
          </v-col>
          <v-col class="pa-0">
            <router-view class="content" />
          </v-col>
        </v-layout>
      </v-row>
    </v-layout>
    <v-layout fill-height column v-if="!initialized()">
      <v-row class="d-flex justify-center align-center">
        <v-col cols="6" class="pa-0">
          <Create />
        </v-col>
      </v-row>
    </v-layout>

    <Snackbar></Snackbar>
    <!-- <v-snackbar
      v-model="snackbar"
      color="error"
      multi-line
      right
      timeout="6000"
      top
    >
      {{ this.$store.state.snackbarValue }}

      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="snackbar = false">
          {{ $t("close") }}
        </v-btn>
      </template>
    </v-snackbar> -->
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
import Snackbar from "@/components/Snackbar.vue";
import Create from "@/components/Create.vue";
import { handlers, actions } from "@/remote";

@Component({
  components: {
    Header,
    Sidebar,
    Create,
    Snackbar,
  },
})
export default class Home extends Vue {
  private snackbar!: any;
  initialized() {
    return this.$store.getters.isInitialized;
  }

  async created() {
    this.snackbar = this.$store.getters.snackbar;
    // const initialized = this.$elStore.get("isInitialized") as boolean;

    // if (initialized) {
    //   this.$store.dispatch("setInitialized", initialized);
    //   const path = this.$elStore.get("vaultPath") as string;

    //   actions.readVault(path, password);

    //   this.$vuetify.theme.dark = this.$store.getters.dark;
    // }

    Object.entries(handlers).forEach(([, fn]) => {
      fn(this);
    });
  }
}
</script>

<style lang="scss">
@import "@/assets/variables.scss";
.v-input__slot {
  flex-direction: row-reverse;
}

.v-application {
  background-color: var(--v-background-base) !important;
}

.app {
  font-family: Segoe UI, Frutiger, Frutiger Linotype, Dejavu Sans,
    Helvetica Neue, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // background: $header;
  background: var(--v-primary-base);
}

.flex {
  display: flex;
}

.important {
  color: $important;
}

.header,
.sidebar {
  // background-color: $header;
  background: var(--v-primary-base);
}

body {
  // padding: 0;
  // margin: 0;
  background-color: var(--v-primary-base);
}

.content {
  background-color: var(--v-secondary-base);
  border-top-left-radius: 35px;
  height: 100%;
}
</style>
