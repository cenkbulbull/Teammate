export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  await $fetch(`${useRuntimeConfig().public.apiBase}/posts/${body.id}`, {
    method: "DELETE",
  });
});
