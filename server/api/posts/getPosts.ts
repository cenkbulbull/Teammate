export default defineEventHandler(async () => {
  const posts = await $fetch(`${useRuntimeConfig().public.apiBase}/posts`);
  return posts;
});
