export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  await $fetch(`${useRuntimeConfig().public.apiBase}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
});
