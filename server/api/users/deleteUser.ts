export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  await $fetch(`${useRuntimeConfig().public.apiBase}/users/${body.id}`, {
    method: "DELETE",
  });
});
