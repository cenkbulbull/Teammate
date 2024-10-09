import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    activeUser: null as User | null, // Kullanıcı bilgisi için null başlangıç
  }),
  actions: {
    async initializeUser() {
      const { data } = useAuth();

      if (data.value?.user) {
        try {
          const response = await fetch("/api/users/getUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: data.value?.user?.email }),
          });

          if (!response.ok) {
            throw new Error("Ağ hatası");
          }

          const user = await response.json();

          // Gereksiz bilgileri temizle
          const { password, authMethod, _id, __v, ...cleanUser } = user;

          this.setActiveUser(cleanUser);
        } catch (error) {
          console.error("Kullanıcı bulma hatası:", error);
        }
      }
    },
    setActiveUser(user: User) {
      this.activeUser = user;
    },
  },
});
