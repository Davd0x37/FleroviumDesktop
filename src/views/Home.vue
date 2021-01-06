<template>
  <v-container fluid>
    <!-- <v-card flat elevation="0" tile> -->
    <v-row dense>
      <!-- <v-layout row wrap> -->
      <v-col v-if="!isStoreEmpty()" class="d-flex flex-wrap flex-row">
        <Service
          v-for="stash in getStashes()"
          :key="stash.name"
          :title="stash.name"
          :logo_icon="stash.logoIcon"
          :importantColor="stash.importantColor"
          :avatar="stash.avatar"
          :data="stash.data"
        />
      </v-col>
      <!-- </v-layout> -->
    </v-row>
    <!-- </v-card> -->
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Service from "@/components/Service.vue";
import { Stash } from "@/store/types";

@Component({
  components: {
    Service
  }
})
export default class Home extends Vue {
  isStoreEmpty() {
    return this.$store.getters.stashes.length === 0;
  }

  getStashes() {
    const search = this.$store.getters.search;
    if (search !== "") {
      const reg = new RegExp(search, "gmi");
      return this.$store.getters.stashes.filter(
        (stash: Stash) => stash.enabled && stash.name.match(reg)
      );
    } else {
      return this.$store.getters.stashes.filter(
        (stash: Stash) => stash.enabled
      );
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
</style>
