<template>
  <div class="sidebar">
    <v-navigation-drawer
      v-model="drawer"
      color="primary"
      stateless
      floating
      :mini-variant="miniVariant"
    >
      <v-list dense nav class="py-0">
        <v-list-item
          v-for="item in paths()"
          color="success"
          link
          :key="item.title"
          :to="item.path"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-list-item-icon @click="toggle" class="collapse">
          <v-icon v-if="miniVariant">la-arrow-right</v-icon>
          <v-icon v-if="!miniVariant">la-arrow-left</v-icon>
        </v-list-item-icon>
        <v-list-item color="info" link @click="logout">
          <v-list-item-icon>
            <v-icon>la-sign-out-alt</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{ $t("sidebar.logout") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VLink from "@/components/VLink.vue";

@Component({
  components: {
    VLink,
  },
})
export default class Sidebar extends Vue {
  private drawer = true;
  private bg = "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg";
  private miniVariant = false;

  toggle() {
    this.miniVariant = !this.miniVariant;
    this.$store.state.miniVariant = this.miniVariant;
  }

  created() {
    this.miniVariant = this.$store.state.miniVariant;
  }

  paths() {
    return [
      {
        title: this.$t("sidebar.stashes"),
        icon: "la-id-card",
        path: "/",
      },
      {
        title: this.$t("sidebar.profile"),
        icon: "la-user",
        path: "/profile",
      },
      {
        title: this.$t("sidebar.scripts"),
        icon: "la-scroll",
        path: "/scripts",
      },
    ];
  }

  logout() {
    this.$store.dispatch("setInitialized", false);
    this.$elStore.set("isInitialized", false);
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.highlighted {
  color: var(--v-success-base) !important;
}

.sidebar {
  height: 100%;
}

.link {
  text-decoration: none;
  padding: 15px 0 15px 0;
  font-weight: bold;
  color: var(--v-anchor-base);
}

.collapse {
  height: 50px;
  color: var(--v-anchor-base);
  width: 100%;

  .v-icon {
    margin: auto auto;
  }
}
</style>
