<script setup lang="ts">
const appStore = useAppStore();
const postStore = usePostsStore();
const userId = computed(() => appStore.activeUser?.id);

watch(userId, async (newUserId) => {
  if (newUserId) {
    await postStore.fetchMyPosts(newUserId);
  }
});

onMounted(async () => await postStore.fetchMyPosts(userId.value));

//Delete Post
const deletePosts = async (id: String) => {
  await postStore.deletePost(id);
  await postStore.fetchMyPosts(userId.value);
};
//Delete Post
</script>

<template>
  <SheetContent class="px-0 w-full md:max-w-xl">
    <SheetHeader class="px-4">
      <SheetTitle class="flex items-center gap-1"
        ><Icon name="mynaui:briefcase" class="text-xl" />
        {{ $t("myJobs") }}</SheetTitle
      >
    </SheetHeader>

    <div
      class="flex flex-col gap-4 divide-y-2 divide-dashed py-4 overflow-scroll h-[100vh] pb-16"
    >
      <div
        v-for="post in postStore.myPosts"
        class="relative flex flex-col gap-3 p-4 group"
      >
        <div class="flex justify-between items-center">
          <CardTitle class="text-sm">{{ post.title }}</CardTitle>
        </div>

        <div class="flex justify-between items-center">
          <div class="flex gap-1 flex-wrap">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div class="flex items-center gap-1 text-xs">
                    <Icon name="mynaui:location" />{{ post.location }}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{{ $t("locationToWork") }}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div class="flex items-center gap-1 text-xs">
                    <Icon name="mynaui:clock-three" />{{
                      post.estimatedJobTime + " " + $t("month")
                    }}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{{ $t("estimatedJobTime") }}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div class="text-xs line-clamp-3 leading-5">
          {{ post.description }}
        </div>

        <div
          class="absolute inset-0 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-100 bg-opacity-95"
        >
          <Button variant="outline">
            <Icon
              @click=""
              name="mynaui:eye"
              class="text-2xl cursor-pointer hover:bg-indigo-800 transition-all"
            />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger as-child>
              <Button variant="outline"
                ><Icon
                  @click=""
                  name="mynaui:edit-one"
                  class="text-2xl cursor-pointer hover:bg-blue-600 transition-all"
              /></Button>
            </AlertDialogTrigger>

            <DialogsUpdateJob :post />
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger as-child>
              <Button variant="outline">
                <Icon
                  name="mynaui:trash-two"
                  class="text-2xl cursor-pointer hover:bg-red-600 transition-all"
              /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{{ $t("delete") }}</AlertDialogTitle>
                <AlertDialogDescription>
                  {{ $t("deleteMessage") }}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{{ $t("cancel") }}</AlertDialogCancel>
                <AlertDialogAction @click="deletePosts(post.id)">{{
                  $t("continue")
                }}</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  </SheetContent>
</template>
