export default defineAppConfig({
  NUXT_BASE_URL: process.env.NUXT_BASE_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  AUTH_SECRET: process.env.AUTH_SECRET,

  firebaseApiKey: process.env.firebaseApiKey,
  firebaseAuthDomain: process.env.firebaseAuthDomain,
  firebaseProjectId: process.env.firebaseProjectId,
  firebaseStorageBucket: process.env.firebaseStorageBucket,
  firebaseMessagingSenderId: process.env.firebaseMessagingSenderId,
  firebaseAppId: process.env.firebaseAppId,
});
