export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  await $fetch(
    `${useRuntimeConfig().public.apiBase}/users/${JSON.parse(body).id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.parse(body),
    }
  );
});
