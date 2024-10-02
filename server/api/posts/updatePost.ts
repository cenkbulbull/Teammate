export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  await $fetch(
    `${useRuntimeConfig().public.apiBase}/posts/${JSON.parse(body).id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.parse(body),
    }
  );
});
