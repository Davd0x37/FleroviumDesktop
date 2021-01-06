import { get } from "lodash";
import store from "@/store";

export const isBrowser = typeof window !== "undefined";
export const isNode = typeof process === "object";

const range = (size: number) =>
  Array(size)
    .fill(1)
    .map((_, index) => index + 1);

const random = (size: number) => (chars: string) =>
  range(size)
    .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
    .join("");

export default {
  randomWord(size: number, numbersOnly = false) {
    const words =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const numbers = "0123456789";
    const rnd = random(size);
    return numbersOnly ? rnd(numbers) : rnd(words);
  },
  createBasicToken(clientId: string, clientSecret: string) {
    if (isBrowser) {
      return `Basic ${btoa(clientId + ":" + clientSecret)}`;
    } else if (isNode) {
      return `Basic ${Buffer.from(clientId + ":" + clientSecret).toString(
        "base64"
      )}`;
    }
    return `Basic ${btoa(clientId + ":" + clientSecret)}`;
  },
  decodeURI(value: string) {
    return decodeURI(value);
  },
  encodeURI(value: string) {
    return encodeURI(value);
  },

  dateNow() {
    return Date.now();
  },

  readStashAuthCodes(serviceName: string, type: string) {
    const stash = store.getters.getStashCodesByName(serviceName);
    return get(stash, type);
  },

  readStash(serviceName: string, type: string) {
    const stash = store.getters.getStashByName(serviceName);
    return get(stash, type);
  },

  // saveStashAuthCodes(serviceName: string, type: string, code: string) {
  //   const stash = store.getters.getStashCodesByName(serviceName);
  //   return get(stash, type);
  // },


};
