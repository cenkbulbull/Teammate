import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const appConfig = useAppConfig();

export default NuxtAuthHandler({
  secret: appConfig.AUTH_SECRET,
  pages: {
    signIn: "/auth/Login",
  },
  // A secret string you define, to ensure correct encryption
  // secret: "your-secret-here",
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GoogleProvider.default({
      clientId: appConfig.GOOGLE_CLIENT_ID,
      clientSecret: appConfig.GOOGLE_CLIENT_SECRET,
    }),
    // @ts-expect-error Use .default here for it to work during SSR.
    CredentialsProvider.default({
      name: "Credentials",
      async authorize(credentials: any) {
        let users = null;
        try {
          const response = await fetch(
            `${appConfig.NUXT_BASE_URL}/api/users/getUsers`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch users");
          }
          users = await response.json();

          const user = users.find(
            (user: any) =>
              user.email === credentials.email &&
              bcrypt.compareSync(credentials.password, user.password)
          );

          if (user) {
            return user; // Eşleşen kullanıcı döndürülüyor
          } else {
            console.error(
              "Warning: Malicious login attempt registered, bad credentials provided"
            );
            return null; // Hatalı giriş
          }
        } catch (error) {
          console.error(error);
          return null; // Hata durumunda null döndür
        }
      },
    }),
  ],
  callbacks: {
    /* on before signin */
    async signIn({ user, account, profile, email, credentials }) {
      //console.log({ user, account, profile, email, credentials });
      if (account?.provider === "google") {
        let users = null;
        try {
          const response = await fetch(
            `${appConfig.NUXT_BASE_URL}/api/users/getUsers`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch users");
          }
          users = await response.json();

          const user = users.find((user: any) => user.email === profile?.email);

          //kullanıcı yoksa kayıt işlemi yap
          if (!user) {
            const user = {
              id: uuidv4(),
              email: profile?.email,
              firstname: profile?.given_name,
              lastname: profile?.family_name,
              profilePhoto: profile?.picture,
            };

            // console.error("böyle bir email gmail yok");
            // return null;
            const response = await fetch(
              `${appConfig.NUXT_BASE_URL}/api/users/createUser`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
              }
            );
          }
        } catch (error) {
          console.error(error);
          return null; // Hata durumunda null döndür
        }
      } else if (account?.provider === "credentials") {
        console.log("credentials");
      } else {
        console.log("No account info available.");
      }
      return true;
    },
    /* on redirect to another url */
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    /* on session retrival */
    async session({ session, user, token }) {
      //console.log("session", session);
      return session;
    },
    /* on JWT token creation or mutation */
    async jwt({ token, user, account, profile, isNewUser }) {
      //console.log("token jwt", token);
      return token;
    },
  },
});
