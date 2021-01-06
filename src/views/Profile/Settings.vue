<template>
  <v-card flat elevation="0">
    <v-row class="ma-5">
      <VButton @click="theme">{{ $t("header.changeTheme") }}</VButton>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VButton from "@/components/VButton.vue";

@Component({
  components: {
    VButton,
  },
})
export default class Settings extends Vue {
  theme() {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
</style>
