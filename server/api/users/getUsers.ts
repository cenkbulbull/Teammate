export default defineEventHandler(async () => {
  const users = await $fetch(`${useRuntimeConfig().public.apiBase}/users`);
  return users;
});
