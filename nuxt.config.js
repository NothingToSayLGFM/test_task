export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "test_task",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  target: "static",

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~assets/global/main.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/interseptor"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/style-resources",
    "@nuxtjs/axios",
    "cookie-universal-nuxt",
  ],

  axios: {
    baseURL: "https://api.quwi.com/v2/",
  },

  styleResources: {
    scss: ["./assets/global/*.scss"],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
