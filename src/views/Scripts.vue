<template>
  <v-container fluid>
    <v-card class="ma-7" flat elevation="0">
      <v-tabs center-active>
        <v-tab :to="{ name: 'EditScript' }">
          <v-icon left>mdi-plus</v-icon>{{$t('add')}}
        </v-tab>
        <v-tab
          v-for="item of stashes()"
          :key="item.name"
          :to="{ name: 'ViewScript', params: { stashName: item.name } }"
        >{{ item.name }}</v-tab>

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
export default class Scripts extends Vue {
  stashes() {
    return this.$store.getters.stashes;
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
</style>
