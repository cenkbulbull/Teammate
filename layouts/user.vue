<script setup lang="ts">
const appStore = useAppStore();
const postStore = usePostsStore();

const userId = computed(() => appStore.activeUser?.id);

// userId değiştiğinde fetchPosts'i çağır
watch(userId, async (newUserId) => {
  if (newUserId) {
    postStore.fetchMyPosts(newUserId);
  }
});

onMounted(() => {
  postStore.fetchMyPosts(userId.value);
});
</script>

<template>
  <div class="tracking-wide">
    <div>
      <AppNavbar />
    </div>
    <NuxtPage />
    <!-- MyJobs Sheet -->
    <Sheet>
      <SheetTrigger>
        <div
          class="flex p-1 cursor-pointer text-2xl bg-indigo-800 text-white fixed top-[50%] -right-[8px] rounded transition-all hover:-right-[3px]"
        >
          <div class="relative flex">
            <Icon name="mynaui:chevron-left" />
            <Badge
              v-if="postStore.myPosts.length > 0"
              class="bg-red-500 absolute -left-[20px] -top-[15px] rounded-full hover:bg-red-500"
              >{{ postStore.myPosts.length }}</Badge
            >
          </div>
        </div>
      </SheetTrigger>
      <SheetsMyJobs />
    </Sheet>
    <!-- MyJobs Sheet -->
  </div>
</template>
