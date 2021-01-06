import Store from "electron-store";

declare module "vue/types/vue" {
  interface Vue {
    $elStore: Store;
  }
}
