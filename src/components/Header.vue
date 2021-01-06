<template>
  <div class="header">
    <div class="menu">
      <i class="las la-2x la-ellipsis-h"></i>
    </div>
    <div class="logo">{{ vaultName }}</div>
    <div class="search">
      <input
        class="box clickable"
        @keyup="type"
        v-model="search"
        type="search"
        name="search"
        id="search"
        :placeholder="$t('header.search')"
      />
    </div>
    <div class="buttons d-flex flex-row">
      <v-col>
        <v-menu
          v-model="menu"
          open-on-hover
          close-on-click
          close-on-content-click
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="success" class="clickable" v-bind="attrs" v-on="on">{{
              $t("header.actions")
            }}</v-btn>
          </template>
          <v-list>
            <v-list-item @click="changeTheme">
              <v-list-item-title>{{
                $t("header.changeTheme")
              }}</v-list-item-title>
            </v-list-item>
            <v-list-item
              v-for="link in paths"
              :key="link.name"
              @click="link.action"
            >
              <v-list-item-title>{{ link.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
      <v-col>
        <v-menu
          v-model="langSelect"
          open-on-hover
          close-on-click
          close-on-content-click
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="success" class="clickable" v-bind="attrs" v-on="on">{{
              $t("header.changeLanguage")
            }}</v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="lang in languages"
              :key="lang.name"
              @click="changeLang(lang.lang)"
            >
              <v-list-item-title>{{ lang.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu></v-col
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VButton from "@/components/VButton.vue";
import { actions, DIALOGTYPE } from "@/remote";
import { runTask, TaskNames } from "@/controllers";
import { isExpired } from "@/utils";

@Component({
  components: {
    VButton,
  },
  watch: {
    "$store.state.dark": {
      handler(newValue) {
        this.$vuetify.theme.dark = newValue;
      },
      deep: true,
    },
  },
})
export default class Header extends Vue {
  private search = "";
  private menu = false;
  private langSelect = false;
  private darkEnabled = false;
  private vaultName!: string;
  private paths = [
    { name: this.$t("refresh"), action: this.refresh },
    { name: this.$t("save"), action: this.saveFile },
    { name: this.$t("open"), action: this.openFile },
  ];
  private languages = [
    { name: this.$t("languages.pl"), lang: "pl" },
    { name: this.$t("languages.en"), lang: "en" },
  ];

  created() {
    this.vaultName = this.$store.getters.vaultName;
    this.darkEnabled = this.$store.state.dark;
    this.$vuetify.theme.dark = this.darkEnabled;
  }

  type() {
    this.$store.state.search = this.search;
  }

  async refresh() {
    const stashes = this.$store.getters.stashes;
    const globalScript = this.$store.getters.globalScript;
    const expired = [];

    for await (const stash of stashes) {
      if (stash.enabled) {
        if (
          !isExpired(
            new Date(stash.authCodes.updateDate),
            stash.authCodes.expiresIn
          )
        ) {
          await runTask({
            stash,
            globalScript,
            taskName: TaskNames.REQUEST_DATA,
          });
        } else {
          expired.push(stash.name);
        }
      }
    }
    if (expired.length > 0) {
      this.$store.commit("showMessage", {
        content: this.$tc("errors.expired", 10, {
          services: expired.join(", "),
        }),
        color: "error",
      });
    }
  }

  saveFile() {
    const path = this.$elStore.get("vaultPath") as string;
    const vault = this.$store.getters.vault;
    const password = this.$store.getters.password;
    actions.saveVault(path, vault, password);
  }

  openFile() {
    // actions.openDialog(DIALOGTYPE.READ);
    // this.$router.push({ name: "Create" });
    this.$store.dispatch("setInitialized", false);
  }

  changeTheme() {
    this.darkEnabled = !this.darkEnabled;
    this.$store.state.dark = this.darkEnabled;
  }

  changeLang(lang: string) {
    this.$root.$i18n.locale = lang;
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.header {
  grid-area: header;
  display: grid;
  grid-template-areas: "menu logo search buttons";
  grid-template-columns: 100px 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  height: 100px;

  // background-color: $header;
  // background: var(--v-accent-base);

  .menu {
    padding-top: 10px;
    grid-area: menu;
    // color: $primary;
  }

  .logo {
    justify-self: left;
    font-size: 2.5rem;
    font-weight: bold;
    grid-area: logo;
    // color: $primary;
  }

  .search {
    grid-area: search;
    justify-self: stretch;

    .box {
      width: 100%;

      &::placeholder {
        padding-left: 15px;
        color: $important;
        font-weight: bold;
      }
    }
  }

  .clickable {
    background: var(--v-secondary-base);
    border: 1px solid var(--v-secondary-darken1);
    border-radius: 4px;
    padding: 10px;
  }

  .buttons {
    grid-area: buttons;

    .box {
      text-transform: uppercase;
      color: $important;
      font-weight: bold;
      padding-right: 25px;
      padding-left: 25px;
    }

    .gray {
      color: var(--v-accent-lighten5);
    }
  }
}
</style>
