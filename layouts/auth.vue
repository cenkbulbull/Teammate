<script lang="ts" setup>
const { locale, setLocale, t } = useI18n();
useHead({
  meta: [
    {
      name: "description",
      content: t("projectGlobalDescription"),
    },
    {
      name: "keywords",
      content: t("projectGlobalKeywords"),
    },
    { name: "author", content: "Cenk Bülbül" },
  ],
});
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
