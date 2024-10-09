import { defineStore } from "pinia";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: [] as Job[],
    currentPage: 1,
    totalPages: null,
    totalPosts: null,
    filtered: null,
  }),
  actions: {
    async fetchPosts(filtered = {}, page = 1, limit = 2) {
      const response = await fetch("/api/posts/getPosts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...filtered, page, limit }),
      });

      const data = await response.json();

      this.filtered = filtered; //paginationda tekrar istek attığımızdan dolayı oluşan filter kaybolma durumu store kullanılarak çözüldü
      this.posts = data.posts;
      this.currentPage = data.currentPage;
      this.totalPages = data.totalPages;
      this.totalPosts = data.totalPosts;
    },
    createPost(post: Job) {
      const response = fetch("/api/posts/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      this.posts.push(post);
    },
    deletePost(postId: String) {
      const response = fetch("/api/posts/deletePost", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: postId }),
      });
    },
    updatePost(data: Object) {
      const response = fetch("/api/posts/updatePost", {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },
  },
});
