<script lang="ts" setup>
import { useAppStore } from "@/stores/app";
import { usePostsStore } from "@/stores/posts";
const appStore = useAppStore();
const postsStore = usePostsStore();

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

onMounted(async () => {
  await appStore.initializeUser();
  await postsStore.fetchPosts();
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
