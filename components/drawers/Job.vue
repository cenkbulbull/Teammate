<script lang="ts" setup>
const props = defineProps<{
  job: Job;
  advertiser: Object;
}>();

import { useToast } from "@/components/ui/toast/use-toast";

const usersStore = useUsersStore();
const postsStore = usePostsStore();
const appStore = useAppStore();
const { toast } = useToast();
const { t } = useI18n();
const { status } = useAuth();
const loggedIn = computed(() => status.value === "authenticated");

const apply = async () => {
  const userID = appStore.activeUser?.id;
  const postID = props.job.id;

  if (!userID || !postID) {
    console.error("Kullanıcı ID'si veya Post ID'si bulunamadı.");
    return;
  }

  try {
    const { data: post } = useFetch("/api/posts/getPost", {
      method: "POST",
      body: JSON.stringify({ id: postID }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const applicants = post.value?.applicants || []; //Users

    if (!applicants.includes(userID)) {
      applicants.push(userID); // Kullanıcıyı applicants dizisine ekle
    }

    // Posts Store'da güncelleme yap
    await postsStore.updatePost({ id: postID, applicants });

    const { data: user } = useFetch("/api/users/getUser", {
      method: "POST",
      body: JSON.stringify({ id: userID }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const applied = user.value?.applied || [];

    if (!applied.includes(postID)) {
      applied.push(postID); // Postu applied dizisine ekle
    }

    // Users Store'da güncelleme yap
    await usersStore.updateUser({ id: userID, applied });

    toast({
      title: t("referenced"),
    });
  } catch (error) {
    console.error("Güncelleme sırasında hata oluştu:", error);
  }
};
</script>
<template>
  <DrawerContent>
    <DrawerHeader class="gap-4">
      <DrawerTitle class="flex gap-2"
        ><Icon name="mynaui:briefcase" /> {{ job.title }}</DrawerTitle
      >
      <div class="flex gap-1 flex-wrap">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge class="gap-1 font-normal" variant="secondary"
                ><Icon name="mynaui:user" />{{ advertiser.firstname }}
                {{ advertiser.lastname }}</Badge
              >
            </TooltipTrigger>
            <TooltipContent>
              <p>{{ $t("personWhoShares") }}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge class="gap-1 font-normal" variant="secondary"
                ><Icon name="mynaui:location" />{{ job.location }}</Badge
              >
            </TooltipTrigger>
            <TooltipContent>
              <p>{{ $t("locationToWork") }}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge class="gap-1 font-normal" variant="secondary"
                ><Icon name="mynaui:clock-three" />{{
                  job.estimatedJobTime + " " + $t("month")
                }}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>{{ $t("estimatedJobTime") }}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider v-for="requirement in job.requirements">
          <Tooltip>
            <TooltipTrigger>
              <Badge class="gap-1 font-normal"
                ><Icon name="mynaui:star" />{{ requirement }}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>{{ $t("requirements") }}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <DrawerDescription
        class="overflow-auto max-h-48 flex flex-col gap-2 text-xs leading-6"
      >
        {{ job.description }}
      </DrawerDescription>
    </DrawerHeader>

    <DrawerFooter class="flex-row">
      <div class="flex gap-2">
        <Button v-if="loggedIn" @click="apply" class="text-xs">{{
          $t("apply")
        }}</Button>

        <DrawerClose v-if="loggedIn">
          <Button class="text-xs" variant="outline">
            {{ $t("cancel") }}
          </Button>
        </DrawerClose>
      </div>
    </DrawerFooter>
  </DrawerContent>
</template>
