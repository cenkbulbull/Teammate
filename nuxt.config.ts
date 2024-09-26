// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  compatibilityDate: "2024-09-20",
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/i18n",
    "@nuxt/icon",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          GMSans: true,
          Poppins: true,
          "Open Sans": true,
          Montserrat: true,
        },
      },
    ],
    "@nuxt/icon",
  ],
  css: ["@/assets/styles/index.scss"],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  i18n: {
    vueI18n: "./i18n.config.ts", // if you are using custom path, default
  },
});
