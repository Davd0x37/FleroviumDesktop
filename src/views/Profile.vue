<template>
  <v-container fluid>
    <v-card class="ma-7" flat elevation="0">
      <v-tabs center-active>
        <v-tab :to="{ name: 'ProfileData' }">{{ $t("profile.data") }}</v-tab>
        <v-tab :to="{ name: 'ProfileStore' }">{{ $t("profile.store") }}</v-tab>

        <v-tabs-items>
          <router-view :key="$route.fullPath"></router-view>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Profile extends Vue {
  stashes() {
    return this.$store.getters.stashes;
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
</style>
