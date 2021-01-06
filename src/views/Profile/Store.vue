<template>
  <v-card elevation="0">
    <v-row class="ma-5">
      <v-col>
        <v-jsoneditor
          :value="this.$store.getters.vault"
          :options="options"
          :plus="false"
          class="my-editor"
        ></v-jsoneditor>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// @ts-ignore
import VJsoneditor from "v-jsoneditor";

@Component({
  components: {
    VJsoneditor
  }
})
export default class ProfileStore extends Vue {
  private options = {
    mode: "code"
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
.my-editor {
  height: 650px;
}
</style>
