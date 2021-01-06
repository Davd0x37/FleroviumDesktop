<template>
  <v-card flat elevation="0">
    <v-layout class="ml-3 mr-3 d-flex flex-wrap">
      <v-row
        cols="6"
        class="d-flex flex-wrap"
        v-for="stash of stashes"
        :key="stash.name"
      >
        <v-col>
          <h3>{{ stash.name }}</h3>
          <v-list-item two-line v-for="data of stash.data" :key="data.label">
            <v-switch
              v-model="data.enabled"
              :label="data.enabled ? $t('enabled') : $t('disabled')"
            ></v-switch>
            <v-list-item-content>
              <v-list-item-subtitle>{{ data.label }}</v-list-item-subtitle>
              <v-list-item-title style="width: 100px;">
                {{ data.detail }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-switch
            v-model="stash.enabled"
            :label="stash.enabled ? $t('enabledStash') : $t('disabledStash')"
            style="width: 150px;"
          ></v-switch>
        </v-col>
      </v-row>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { StashData } from "@/store/types";
import { validationMixin } from "vuelidate";

@Component({
  mixins: [validationMixin],
  validations: {
    checkbox: {},
  },
})
export default class ProfileData extends Vue {
  private stashes!: StashData[];

  created() {
    this.stashes = this.$store.getters.stashes;
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
</style>
