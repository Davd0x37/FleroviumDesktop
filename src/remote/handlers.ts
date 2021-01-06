import store from "@/store";
import { ipcRenderer } from "electron";
import { DIALOGTYPE } from "./enum";
import { join } from "path";

export const handlers = {
  selectPath(obj: any) {
    ipcRenderer.on("select-path", (e, { path, type }) => {
      if (path) {
        const password = store.getters.password;

        if (type === DIALOGTYPE.CREATE) {
          const vaultName = store.getters.vaultName;
          const database = store.getters.rawVault(vaultName);
          const newPath = join(path, vaultName + ".flerdb");
          obj.$elStore.set("vaultPath", newPath);

          ipcRenderer.invoke("save-vault", {
            path: newPath,
            data: database,
            type: DIALOGTYPE.CREATE,
            password,
          });
        } else if (type === DIALOGTYPE.READ) {
          // const path = obj.$elStore.get("vaultPath");
          obj.$elStore.set("vaultPath", path);
          ipcRenderer.invoke("read-vault", {
            path,
            password,
          });
        }
      }
    });
  },
  readVault(obj: any) {
    ipcRenderer.on("read-vault", (e, data) => {
      obj.$elStore.set("isInitialized", true);
      store.dispatch("setInitialized", true);
      store.dispatch("replaceState", data);
      store.dispatch("changeTheme", data.dark);
      store.dispatch("changeMiniVariant", data.miniVariant);
    });
  },
  serviceAuthorizationCode() {
    ipcRenderer.on("service-access-token", (e, data) => {
      const date = new Date();
      store.dispatch("updateAuthCodes", {
        name: data.serviceName,
        codes: {
          accessToken: data.accessToken,
          tokenType: data.tokenType,
          expiresIn: data.expiresIn,
          updateDate: date
        },
      });
    });
  },
};
