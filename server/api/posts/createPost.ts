export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  await $fetch(`${useRuntimeConfig().public.apiBase}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
});
