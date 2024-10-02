import { defineStore } from "pinia";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: [] as Job[],
  }),
  actions: {
    async fetchPosts() {
      const response = await fetch("/api/posts/getPosts");
      this.posts = await response.json();
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
