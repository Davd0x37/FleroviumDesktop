<template>
  <v-card flat elevation="0">
    <form class="ma-4">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="stash.name"
            :error-messages="nameErrors()"
            :counter="50"
            :label="$t('labels.name')"
            required
            @input="$v.stash.name.$touch()"
            @blur="$v.stash.name.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="stash.logoIcon"
            :error-messages="
              $v.stash.logoIcon.$dirty && !$v.stash.logoIcon.required
                ? $t('errors.edit.required')
                : []
            "
            :label="$t('labels.logoIcon')"
            required
            @input="$v.stash.logoIcon.$touch()"
            @blur="$v.stash.logoIcon.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="stash.importantColor"
            :error-messages="
              $v.stash.importantColor.$dirty &&
              !$v.stash.importantColor.required
                ? $t('errors.edit.required')
                : []
            "
            :label="$t('labels.importantColor')"
            required
            @input="$v.stash.importantColor.$touch()"
            @blur="$v.stash.importantColor.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="stash.vars.client_id"
            :error-messages="
              $v.stash.vars.client_id.$dirty &&
              !$v.stash.vars.client_id.required
                ? $t('errors.edit.required')
                : []
            "
            :label="$t('labels.client_id')"
            required
            @input="$v.stash.vars.client_id.$touch()"
            @blur="$v.stash.vars.client_id.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="stash.vars.client_secret"
            :error-messages="
              $v.stash.vars.client_secret.$dirty &&
              !$v.stash.vars.client_secret.required
                ? $t('errors.edit.required')
                : []
            "
            :label="$t('labels.client_secret')"
            required
            @input="$v.stash.vars.client_secret.$touch()"
            @blur="$v.stash.vars.client_secret.$touch()"
          ></v-text-field>
          <v-btn class="mr-4" @click="submit" v-if="!isParamsSet()">{{
            $t("save")
          }}</v-btn>
          <v-btn @click="clear" v-if="!isParamsSet()">{{ $t("clear") }}</v-btn>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="stash.vars.authorize_uri"
            :error-messages="
              $v.stash.vars.authorize_uri.$dirty &&
              !$v.stash.vars.authorize_uri.required
                ? $t('errors.edit.required')
                : []
            "
            :label="$t('labels.authorize_uri')"
            required
            @input="$v.stash.vars.authorize_uri.$touch()"
            @blur="$v.stash.vars.authorize_uri.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="stash.vars.redirect_uri"
            :error-messages="
              $v.stash.vars.redirect_uri.$dirty &&
              !$v.stash.vars.redirect_uri.required
                ? $t('errors.edit.required')
                : []
            "
            :label="$t('labels.redirect_uri')"
            required
            @input="$v.stash.vars.redirect_uri.$touch()"
            @blur="$v.stash.vars.redirect_uri.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="stash.vars.token_endpoint_uri"
            :error-messages="
              $v.stash.vars.token_endpoint_uri.$dirty &&
              !$v.stash.vars.token_endpoint_uri.required
                ? $t('errors.edit.required')
                : []
            "
            :label="$t('labels.token_endpoint_uri')"
            required
            @input="$v.stash.vars.token_endpoint_uri.$touch()"
            @blur="$v.stash.vars.token_endpoint_uri.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="stash.vars.scope"
            :error-messages="
              $v.stash.vars.scope.$dirty && !$v.stash.vars.scope.required
                ? $t('errors.edit.required')
                : []
            "
            :label="$t('labels.scope')"
            required
            @input="$v.stash.vars.scope.$touch()"
            @blur="$v.stash.vars.scope.$touch()"
          ></v-text-field>
          <v-switch
            v-model="stash.enabled"
            :label="stash.enabled ? $t('enabledStash') : $t('disabledStash')"
          ></v-switch>
          <v-switch
            v-model="stash.globalScript"
            :label="
              stash.globalScript
                ? $t('enabledGlobalScript')
                : $t('disabledGlobalScript')
            "
          ></v-switch>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <h4>{{ $t("selectedData") }}</h4>
          <v-jsoneditor
            v-model="stash.selectedData"
            :options="options"
            :plus="false"
            height="400px"
            @error="onError"
            class="my-editor"
          ></v-jsoneditor>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <h4>{{ $t("dataPaths") }}</h4>
          <v-jsoneditor
            v-model="stash.vars.data_paths"
            :options="options"
            :plus="false"
            height="400px"
            @error="onError"
            class="my-editor"
          ></v-jsoneditor>
        </v-col>
      </v-row>
      <v-row v-if="!stash.globalScript">
        <v-col cols="12" sm="12">
          <h4>{{ $t("script") }}</h4>
          <v-jsoneditor
            v-model="stash.script"
            :options="options"
            :plus="false"
            height="400px"
            @error="onError"
            class="my-editor"
          ></v-jsoneditor>
        </v-col>
      </v-row>
    </form>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// @ts-ignore
import VJsoneditor from "v-jsoneditor";
import { required, maxLength } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import exampleScript from "@/exampleScript.json";
import exampleSelectedData from "@/exampleSelectedData.json";
import exampleDataPaths from "@/exampleDataPaths.json";
import { Stash } from "@/store/types";

@Component({
  components: {
    VJsoneditor,
  },
  mixins: [validationMixin],
  validations: {
    stash: {
      name: { required, maxLength: maxLength(50) },
      logoIcon: { required },
      importantColor: { required },
      vars: {
        client_id: { required },
        client_secret: { required },
        authorize_uri: { required },
        redirect_uri: { required },
        token_endpoint_uri: { required },
        scope: { required },
      },
      script: {},
      selectedData: {},
    },
  },
})
export default class ScriptEdit extends Vue {
  private stash: Stash = {
    name: "",
    logoIcon: "",
    importantColor: "",
    globalScript: false,
    enabled: true,
    vars: {
      client_id: "",
      client_secret: "",
      authorize_uri: "",
      redirect_uri: "",
      token_endpoint_uri: "",
      scope: "",
      data_paths: exampleDataPaths,
    },
    data: [],
    script: exampleScript,
    selectedData: exampleSelectedData,
    authCodes: {},
  };

  private options = { mode: "code" };

  created() {
    if (this.$route.params?.stashName) {
      const stashName = this.$route.params.stashName;
      const stash = this.$store.getters.getStashByName(stashName);
      this.stash = stash;
    }
  }

  isParamsSet() {
    return !!this.$route.params?.stashName;
  }

  onError() {
    console.error("Error in json editor");
  }

  getStash() {
    const stashName = this.$route.params.stashName;
    return this.$store.getters.getStashByName(stashName);
  }

  submit() {
    this.$v.$touch();
    if (!this.$v.$anyError) {
      if (this.isParamsSet()) {
        this.$store.dispatch("updateStash", this.stash);
      } else {
        this.$store.dispatch("addStash", this.stash);
      }
    }
  }

  clear() {
    this.$v.$reset();
    this.stash = {
      name: "",
      logoIcon: "",
      importantColor: "",
      globalScript: false,
      enabled: true,
      vars: {
        client_id: "",
        client_secret: "",
        authorize_uri: "",
        redirect_uri: "",
        token_endpoint_uri: "",
        scope: "",
        data_paths: exampleDataPaths,
      },
      data: [],
      script: exampleScript,
      selectedData: exampleSelectedData,
      authCodes: {},
    };
  }

  nameErrors() {
    const errors: string[] = [];
    if (!this.$v.stash.name?.$dirty) return errors;
    !this.$v.stash.name.maxLength &&
      errors.push(this.$tc("errors.edit.maxLength", 10, { count: 50 }));
    !this.$v.stash.name.required &&
      errors.push(this.$tc("errors.edit.required"));
    return errors;
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
</style>
