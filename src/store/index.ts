import Vue from "vue";
import Vuex from "vuex";
import { Store, Stash } from "./types";
import globalScript from "@/globalScript.json";
import exampleStashes from "@/exampleStashes";

Vue.use(Vuex);

export default new Vuex.Store<Store>({
  state: {
    vaultName: "Haven",
    search: "",
    initialized: false,
    password: "",
    dark: true,
    miniVariant: false,
    snackbarContent:"",
    snackbarColor:"",
    stashes: [],
    globalScript,
  },
  getters: {
    stashes(state) {
      return state.stashes;
    },
    search(state) {
      return state.search;
    },
    password(state) {
      return state.password;
    },
    dark(state) {
      return state.dark;
    },
    isInitialized(state) {
      return state.initialized;
    },
    globalScript(state) {
      return state.globalScript;
    },
    vaultName(state) {
      return state.vaultName;
    },
    vault(state) {
      return state;
    },
    rawVault: () => (name: string) => {
      return {
        vaultName: name,
        dark: true,
        stashes: exampleStashes,
        globalScript,
      };
    },
    getStashByName: (state) => (name: string) => {
      return state.stashes.filter((st: Stash) => st.name == name)[0];
    },
    getStashCodesByName: (state) => (name: string) => {
      return state.stashes.filter((st: Stash) => st.name == name)[0].authCodes;
    },
  },
  mutations: {
    changeVaultName(state, name: string) {
      state.vaultName = name;
    },
    changePassword(state, password: string) {
      state.password = password;
    },
    setInitialized(state, init: boolean) {
      state.initialized = init;
    },
    changeMiniVariant(state, variant: boolean) {
      state.miniVariant = variant;
    },
    changeTheme(state, dark: boolean) {
      state.dark = dark;
    },
    changeStashes(state, stashes: Stash[]) {
      state.stashes = stashes;
    },
    addStash(state, data: Stash) {
      state.stashes.push(data);
    },
    deleteStash(state, name: string) {
      const temp = state.stashes.filter((st) => st.name !== name);
      state.stashes = temp;
    },
    updateStash(state, data: Stash) {
      state.stashes = state.stashes.map((stash) => {
        if (stash.name === data.name) {
          return {
            ...stash,
            ...data,
          };
        }
        return stash;
      });
    },
    updateStashes(state, stashes: Stash[]) {
      state.stashes = stashes;
    },
    showMessage (state, payload) {
      state.snackbarContent = payload.content
      state.snackbarColor = payload.color
    }
  },
  actions: {
    changeVaultName({ commit }, name: string) {
      commit("changeVaultName", name);
    },
    changePassword({ commit }, password: string) {
      commit("changePassword", password);
    },
    changeMiniVariant({ commit }, variant: boolean) {
      commit("changeMiniVariant", variant);
    },
    addStash({ commit }, data: Stash) {
      commit("addStash", data);
    },
    replaceState({ commit }, data: Store) {
      commit("changeVaultName", data.vaultName);
      commit("changeStashes", data.stashes);
    },
    deleteStash({ commit }, name: string) {
      commit("deleteStash", name);
    },
    updateStash({ commit }, data: Stash) {
      commit("updateStash", data);
    },
    setInitialized({ commit }, data: boolean) {
      commit("setInitialized", data);
    },
    changeTheme({ commit }, data: boolean) {
      commit("changeTheme", data);
    },
    updateStashes({ commit }, stashes: Stash[]) {
      commit("updateStash", stashes);
    },
    updateAuthCodes(
      { commit },
      { name, codes }: { name: string; codes: Record<string, string> }
    ) {
      const authCodes = this.getters.getStashCodesByName(name);
      commit("updateStash", {
        name,
        authCodes: {
          ...authCodes,
          ...codes,
        },
      });
    },
  },
  modules: {},
});
