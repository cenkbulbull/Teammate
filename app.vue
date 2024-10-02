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

import { usePostsStore } from "@/stores/posts.js";

const postStore = usePostsStore();

onMounted(async () => {
  await postStore.fetchPosts();
  console.log(postStore.posts);
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
