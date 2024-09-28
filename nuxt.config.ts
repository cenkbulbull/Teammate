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
    "@pinia/nuxt",
    [
      "@vee-validate/nuxt",
      {
        // disable or enable auto imports
        autoImports: true,
        // Use different names for components
        componentNames: {
          Form: "VeeForm",
          Field: "VeeField",
          FieldArray: "VeeFieldArray",
          ErrorMessage: "VeeErrorMessage",
        },
      },
    ],
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
    //vueI18n: "./i18n.config.ts", // if you are using custom path, default
    lazy: true,
    langDir: "locales",
    //strategy: "prefix_except_default", //varsayılan dil (örneğin en-US) için URL'de bir dil prefix'i eklemez, ancak diğer diller için (örneğin tr-TR) prefix ekler.
    strategy: "no_prefix", //prefix yok
    defaultLocale: "en-US", // Default Language
    locales: [
      { code: "tr-TR", iso: "tr-TR", file: "tr.json" },
      { code: "en-US", iso: "en-US", file: "en.json" },
      { code: "az-AZ", iso: "az-AZ", file: "az.json" },
    ],
  },
  app: {
    head: {
      title: "Teammate",
      meta: [
        {
          name: "description",
          content:
            "Find your project teammate now! Share your skills, meet suitable team members, and complete your projects successfully. Sign up for quick and easy connections!",
        },
        {
          name: "keywords",
          content:
            "Finding Team Members,Project Collaboration,Remote Work Opportunities,Project Management,Job Listings,Team Building,Entrepreneur Support,Networking Opportunities,Work Environment,Creative Projects,Career Opportunities,Online Job Platform",
        },
        { name: "author", content: "Cenk Bülbül" },
      ],
    },
  },
  runtimeConfig: {
    // The private keys which are only available within server-side (PRIVATE --SERVER)
    //apiSecret: "", //example
    // Keys within public, will be also exposed to the client-side (PUBLIC --ALL)
    public: {
      apiBase: process.env.NUXT_BASE_URL,
    },
  },
});
