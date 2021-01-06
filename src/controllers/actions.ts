import { encode, stringify } from "querystring";
import axios from "axios";
import store from "@/store";
import { actions } from "@/remote";
import { get } from "lodash";
import { StashData } from "@/store/types";

export default {
  async generateAuthenticationURI($data: any, params: any) {
    const { authorize_uri, ...rest } = params;
    return `${authorize_uri}?${encode(rest)}`;
  },

  async log($data: any, params: any) {
    console.log($data, params);
  },

  async openBrowser($data: any, params: any) {
    window.open(params.url);
  },
  async redirect($data: any, params: any) {
    actions.createAuthWindow(params.url, $data.$$serviceName);
  },

  async updateStash($data: any, params: any) {
    await store.dispatch("updateStash", {
      name: $data.$$serviceName,
      data: params.data,
    });
  },

  async saveStashAuthCodes($data: any, params: any) {
    await store.dispatch("updateAuthCodes", {
      name: $data.$$serviceName,
      codes: params.data,
    });
  },

  async selectData($data: any, params: any) {
    return Object.entries(params.selectedData).reduce(
      (prev: any, [key, val]: any) => {
        const data = val.map(
          ({
            label,
            detail,
            important,
            matchers,
            collect,
            limit,
          }: StashData) => {
            const paths = get($data.$$parent, key);
            let selectedDetails: any = null;

            if (collect) {
              selectedDetails = paths.flatMap(
                (path: Record<string, any>) => path[detail]
              );
              if (limit) {
                selectedDetails = selectedDetails.slice(0, limit);
              }
              selectedDetails = selectedDetails.join(", ");
            } else {
              selectedDetails = get(paths, detail);
              if (matchers) {
                selectedDetails = get(matchers, selectedDetails);
              }
            }
            return {
              label,
              detail: selectedDetails,
              important,
              enabled: true,
            };
          }
        );
        return [...prev, ...data];
      },
      []
    );
  },

  async sendForm($data: any, params: any) {
    try {
      const req = await axios.post(params.url, stringify(params.body), {
        headers: {
          Authorization: params.authorization,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      return req.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  async sendGet($data: any, params: any) {
    try {
      const req = await axios.get(params.url, {
        headers: {
          Authorization: `${params.token_type} ${params.access_token}`,
        },
        responseType: "json",
      });

      return req.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  async sendGetPaths($data: any, params: any) {
    try {
      const data = {} as Record<string, any>;
      for await (const [key, val] of Object.entries(params.paths)) {
        console.log(
          `[${$data.$$serviceName}]: [${key}] Requesting data from: ${val}!`
        );

        const req = await axios.get(val as string, {
          headers: {
            Authorization: `${params.token_type} ${params.access_token}`,
          },
          responseType: "json",
        });

        data[key] = req.data;
      }

      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },
};
