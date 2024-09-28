export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  await $fetch(
    `${useRuntimeConfig().public.apiBase}/users/${JSON.parse(body).id}`,
    {
      method: "DELETE",
    }
  );
});
