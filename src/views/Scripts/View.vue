<template>
  <v-card flat elevation="0">
    <v-layout row class="ml-3 mr-3">
      <v-row class="d-flex flex-wrap" cols="12" sm="4">
        <v-col>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle>{{
                $t("labels.name")
              }}</v-list-item-subtitle>
              <v-list-item-title>{{ stash.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle>{{
                $t("labels.logoIcon")
              }}</v-list-item-subtitle>
              <v-list-item-title>{{ stash.logoIcon }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle>{{
                $t("labels.importantColor")
              }}</v-list-item-subtitle>
              <v-list-item-title>{{ stash.importantColor }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-switch
                v-model="stash.enabled"
                :label="
                  stash.enabled ? $t('enabledStash') : $t('disabledStash')
                "
              ></v-switch>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle>{{
                $t("labels.client_id")
              }}</v-list-item-subtitle>
              <v-list-item-title>{{ stash.vars.client_id }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle>{{
                $t("labels.client_secret")
              }}</v-list-item-subtitle>
              <v-list-item-title>
                {{ stash.vars.client_secret }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle>{{
                $t("labels.authorize_uri")
              }}</v-list-item-subtitle>
              <v-list-item-title>
                {{ stash.vars.authorize_uri }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle>{{
                $t("labels.redirect_uri")
              }}</v-list-item-subtitle>
              <v-list-item-title>{{
                stash.vars.redirect_uri
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle>{{
                $t("labels.token_endpoint_uri")
              }}</v-list-item-subtitle>
              <v-list-item-title>
                {{ stash.vars.token_endpoint_uri }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle>{{
                $t("labels.scope")
              }}</v-list-item-subtitle>
              <v-list-item-title>{{ stash.vars.scope }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle>{{
                $t("useGlobalScript")
              }}</v-list-item-subtitle>
              <v-list-item-title>
                {{ stash.globalScript ? $t("yes") : $t("no") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-btn class="mr-4" @click="remove(stash.name)">{{
                  $t("delete")
                }}</v-btn>
                <v-btn
                  class="mr-4"
                  :to="{
                    name: 'EditScript',
                    params: {
                      stashName: stash.name,
                    },
                  }"
                  >{{ $t("edit") }}</v-btn
                >
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-btn class="mr-4" @click="authenticate(stash.name)">{{
                  $t("authenticate")
                }}</v-btn>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-btn class="mr-4" @click="requestData(stash.name)">{{
                  $t("requestData")
                }}</v-btn>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
      <v-row cols="12" sm="8">
        <v-col>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle>{{ $t("dataPaths") }}</v-list-item-subtitle>
              <div v-highlight>
                <pre class="language-javascript">
                <code>
                  {{ stash.vars.data_paths }}
                </code>
              </pre>
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-subtitle>{{
                $t("selectedData")
              }}</v-list-item-subtitle>
              <div v-highlight>
                <pre class="language-javascript">
                <code>
                  {{ stash.selectedData }}
                </code>
              </pre>
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line v-if="!stash.globalScript">
            <v-list-item-content>
              <v-list-item-subtitle>{{ $t("script") }}</v-list-item-subtitle>
              <div v-highlight>
                <pre class="language-javascript">
                <code>
                  {{ stash.script }}
                </code>
              </pre>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { runTask, TaskNames } from "@/controllers";

@Component
export default class ScriptView extends Vue {
  private stash = {};

  created() {
    const stashName = this.$route.params.stashName;
    this.stash = this.$store.getters.getStashByName(stashName);
  }

  getStash() {
    const stashName = this.$route.params.stashName;
    return this.$store.getters.getStashByName(stashName);
  }

  remove(name: string) {
    this.$store.dispatch("deleteStash", name);
  }

  async authenticate() {
    const stash = this.stash;
    const globalScript = this.$store.getters.globalScript;
    console.log(globalScript);
    await runTask({
      stash,
      globalScript,
      taskName: TaskNames.AUTHENTICATE_SERVICE,
    });
  }

  async requestData() {
    const stash = this.stash;
    const globalScript = this.$store.getters.globalScript;
    await runTask({
      stash,
      globalScript,
      taskName: TaskNames.REQUEST_DATA,
    });
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
</style>
