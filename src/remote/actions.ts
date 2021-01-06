import { ipcRenderer } from "electron";
import { DIALOGTYPE } from "./enum";

export const actions = {
  openDialog: (type: DIALOGTYPE) => {
    ipcRenderer.invoke("open-dialog", { type });
  },
  readVault(path: string, password: string) {
    ipcRenderer.invoke("read-vault", {
      path,
      password,
    });
  },
  saveVault(path: string, data: any, password: string) {
    ipcRenderer.invoke("save-vault", {
      data,
      path,
      password,
    });
  },
  createAuthWindow(path: string, serviceName: string) {
    ipcRenderer.invoke("create-auth-window", {
      path,
      serviceName,
    });
  },
  async hashPass(password: string): Promise<string> {
    const req = await ipcRenderer.invoke("hash-pass", password);
    return req;
  },
};
