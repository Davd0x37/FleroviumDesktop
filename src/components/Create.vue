<template>
  <v-container fluid class="d-flex flex-column">
    <v-row>
      <v-col class="d-flex justify-center">
        <v-btn link icon width="160px" height="160px" @click="create = false">
          <v-icon size="128">la-lock</v-icon>
        </v-btn>
        <v-btn link icon width="160px" height="160px" @click="create = !create">
          <v-icon size="128">la-plus-circle</v-icon>
        </v-btn></v-col
      ></v-row
    >
    <v-row class="d-flex flex-column">
      <v-text-field
        v-if="create"
        v-model="vaultName"
        :error-messages="vaultNameErrors()"
        :label="$t('vault.name')"
        required
        class="input"
        :placeholder="$t('vault.name')"
        @input="$v.vaultName.$touch()"
        @blur="$v.vaultName.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :error-messages="passwordErrors()"
        :label="$t('vault.password')"
        required
        type="password"
        class="input"
        :placeholder="$t('vault.password')"
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      ></v-text-field>
      <v-btn x-large @click="openVault" v-if="!create">{{
        $t("selectVault")
      }}</v-btn>
      <v-btn x-large @click="createVault" v-if="create">{{
        $t("selectPath")
      }}</v-btn>
    </v-row>
  </v-container>
  <!-- 
  </div> -->
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { required, maxLength } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import { actions, DIALOGTYPE } from "@/remote";
import { hash } from "@/crypto/node";
import VLink from "@/components/VLink.vue";

@Component({
  components: {
    VLink,
  },
  mixins: [validationMixin],
  validations: {
    vaultName: { required },
    password: { required },
  },
})
export default class Header extends Vue {
  private vaultName = "";
  private password = "";
  private create = false;

  created() {
    this.$vuetify.theme.dark = true;
  }

  openVault() {
    if (this.passwordErrors().length === 0) {
      this.$store.dispatch("changePassword", this.password);
      actions.openDialog(DIALOGTYPE.READ);
    }
  }

  createVault() {
    if (
      this.vaultNameErrors().length === 0 &&
      this.passwordErrors().length === 0
    ) {
      this.$store.dispatch("changePassword", this.password);
      this.$store.dispatch("changeVaultName", this.vaultName);

      actions.openDialog(DIALOGTYPE.CREATE);
    }
  }

  vaultNameErrors() {
    const errors: string[] = [];
    if (!this.$v.vaultName.$dirty) return errors;
    !this.$v.vaultName.required &&
      errors.push(this.$tc("errors.edit.required"));
    return errors;
  }
  passwordErrors() {
    const errors: string[] = [];
    if (!this.$v.password.$dirty) return errors;
    !this.$v.password.required && errors.push(this.$tc("errors.edit.required"));
    return errors;
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.input {
  // background: red;
}
</style>
