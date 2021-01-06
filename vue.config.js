module.exports = {
  pluginOptions: {
    electronBuilder: {
      // preload: "src/preload.ts",
      nodeIntegration: true,
      // customFileProtocol: "flerovium://./",
      // removeElectronJunk: false,
      // noAppProtocol: true,
      chainWebpackRendererProcess(config) {
        config.plugins.delete("workbox");
        config.plugins.delete("pwa");
      },
    },
  },
  transpileDependencies: ["vuetify"],
};
