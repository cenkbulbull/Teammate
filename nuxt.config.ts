// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  compatibilityDate: "2024-09-20",
  modules: [
    "nuxt-security",
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
    "@sidebase/nuxt-auth",
    "nuxt-mongoose",
    "nuxt-marquee",
    "nuxt-nodemailer",
  ],
  nodemailer: {
    from: process.env.NUXT_SMTP_USER,
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NUXT_SMTP_USER,
      pass: process.env.NUXT_SMTP_PASS,
    },
  },
  mongoose: {
    uri: process.env.MONGODB_URI,
    options: {},
    modelsDir: "models",
    devtools: true,
  },
  auth: {
    //globalAppMiddleware: true,
    // provider: {
    //   type: "authjs",
    //   defaultProvider: "credentials",
    // },
    baseURL: process.env.AUTH_ORIGIN,
    origin: process.env.AUTH_ORIGIN,
  },
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
    mongoURI: process.env.MONGODB_URI,
    smtpUser: process.env.NUXT_SMTP_USER,
    smtpPass: process.env.NUXT_SMTP_PASS,
    // Keys within public, will be also exposed to the client-side (PUBLIC --ALL)
    public: {
      // apiBase: process.env.NUXT_BASE_URL,
    },
  },
  // security: {
  //   rateLimiter: {
  //     tokensPerInterval: 150, //default 150
  //     interval: 300000, //default 300000
  //   },
  // },
  security: {
    headers: {
      contentSecurityPolicy: {
        "img-src": [
          "'self'",
          "data:",
          "https://firebasestorage.googleapis.com",
        ],
      },
    },
  },
  routeRules: {
    "/api/send-confirmation-email": {
      security: {
        rateLimiter: {
          tokensPerInterval: 8, // İzin verilen maksimum istek sayısı, başlangıçta 1 tane fazladan atıyor , yani şuan toplam yazılanın +1 fazlası tane istek atabilecek
          interval: 300000, // Zaman aralığı (milisaniye cinsinden) 5dk
        },
      },
    },
    "/api/upload": {
      security: {
        rateLimiter: {
          tokensPerInterval: 8,
          interval: 300000,
        },
      },
    },
  },
});
