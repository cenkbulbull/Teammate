<script setup lang="ts">
const appStore = useAppStore();
const postStore = usePostsStore();
const userStore = useUsersStore();
const userId = computed(() => appStore.activeUser?.id);

watch(userId, async (newUserId) => {
  if (newUserId) {
    await postStore.fetchMyPosts(newUserId);
  }
});

//Delete Post
const deletePosts = async (id: string) => {
  await postStore.deletePost(id);
  await postStore.fetchMyPosts(userId.value);
};

const getApplicant = (applicantId: string) => {
  const user = userStore.users.find((user) => user.id === applicantId);
  return {
    firstname: user?.firstname,
    lastname: user?.lastname,
    profilePhoto: user?.profilePhoto,
    telephone: user?.telephone,
    email: user?.email,
  };
};

onMounted(async () => await postStore.fetchMyPosts(userId.value));
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
      class="flex flex-col gap-0 divide-y-2 divide-dashed py-4 overflow-scroll h-[100vh] pb-16"
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

        <div class="text-xs line-clamp-3 leading-5 break-words">
          {{ post.description }}
        </div>

        <div
          class="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-100 bg-opacity-95"
        >
          <div>
            <Sheet>
              <SheetTrigger
                ><Button variant="outline">
                  <Icon
                    name="mynaui:eye"
                    class="text-md cursor-pointer hover:bg-indigo-800 transition-all"
                  /> </Button
              ></SheetTrigger>
              <SheetContent class="overflow-scroll h-[100vh] w-full">
                <SheetHeader>
                  <SheetTitle>{{ $t("applicants") }}</SheetTitle>
                  <div class="flex flex-col">
                    <div
                      v-if="post.applicants.length > 0"
                      v-for="applicant in post.applicants"
                      :key="applicant"
                    >
                      <div class="relative flex flex-col gap-4 py-3 text-xs">
                        <div class="flex items-center gap-2">
                          <Avatar class="rounded-lg">
                            <AvatarImage
                              :src="getApplicant(applicant).profilePhoto"
                            />
                            <AvatarFallback>
                              {{
                                getApplicant(applicant).firstname.charAt(0) +
                                getApplicant(applicant).lastname.charAt(0)
                              }}</AvatarFallback
                            >
                          </Avatar>
                          <p
                            class="hover:text-indigo-800 break-words w-[70%] text-start"
                          >
                            <nuxt-link :to="'/user/profile/' + applicant">{{
                              getApplicant(applicant).firstname +
                              getApplicant(applicant).lastname
                            }}</nuxt-link>
                          </p>
                        </div>

                        <Accordion type="single" collapsible>
                          <AccordionItem value="item-1">
                            <AccordionTrigger
                              class="absolute top-1 right-0"
                            ></AccordionTrigger>
                            <AccordionContent
                              class="flex flex-col gap-3 text-xs"
                            >
                              <div
                                v-if="getApplicant(applicant).telephone"
                                class="flex items-center gap-2"
                              >
                                <Icon name="mynaui:telephone-call" />
                                <a
                                  :href="
                                    'tel:' + getApplicant(applicant).telephone
                                  "
                                  >{{ getApplicant(applicant).telephone }}</a
                                >
                              </div>

                              <div class="flex items-center gap-2">
                                <Icon name="mynaui:envelope-open" />
                                <a
                                  :href="
                                    'mailto:' + getApplicant(applicant).email
                                  "
                                  >{{ getApplicant(applicant).email }}</a
                                >
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </div>

                    <div v-else class="py-3">
                      <Alert variant="destructive">
                        <ExclamationTriangleIcon className="h-4 w-4" />
                        <AlertDescription>
                          {{ $t("noReferenceText") }}
                        </AlertDescription>
                      </Alert>
                    </div>
                  </div>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>

          <div>
            <AlertDialog>
              <AlertDialogTrigger as-child>
                <Button variant="outline"
                  ><Icon
                    @click=""
                    name="mynaui:edit-one"
                    class="text-md cursor-pointer hover:bg-blue-600 transition-all"
                /></Button>
              </AlertDialogTrigger>

              <DialogsUpdateJob :post />
            </AlertDialog>
          </div>

          <div>
            <AlertDialog>
              <AlertDialogTrigger as-child>
                <Button variant="outline">
                  <Icon
                    name="mynaui:trash-two"
                    class="text-md cursor-pointer hover:bg-red-600 transition-all"
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
    </div>
  </SheetContent>
</template>
