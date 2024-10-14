<script lang="ts" setup>
import { useAppStore } from "@/stores/app";
import { usePostsStore } from "@/stores/posts";
import { useUsersStore } from "@/stores/users";
const appStore = useAppStore();
const postsStore = usePostsStore();
const usersStore = useUsersStore();

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
  await usersStore.fetchUsers();
  await postsStore.fetchPosts();
  await postsStore.fetchAllPosts();
});
</script>

<template>
  <NuxtMarquee
    class="text-xs bg-green-400 tracking-widest py-3"
    :speed="20"
    :pauseOnHover="true"
  >
    <div class="flex gap-2 ms-20">
      {{ $t("githubSupportMessage") }}
      <a
        class="font-bold underline"
        href="https://github.com/cenkbulbull/Teammate"
        target="_blank"
        >Teammate
      </a>
    </div>
  </NuxtMarquee>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
