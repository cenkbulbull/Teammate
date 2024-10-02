import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [] as User[],
  }),
  actions: {
    async fetchUsers() {
      const response = await fetch("/api/users/getUsers");
      this.users = await response.json();
    },
    addUser(user: User) {
      const response = fetch("/api/users/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      this.users.push(user);
    },
    deleteUser(id: String) {
      const response = fetch("/api/users/deleteUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
    },
    updateUser(data: Object) {
      const response = fetch("/api/users/updateUser", {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },
  },
});
