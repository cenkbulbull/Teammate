<script setup lang="ts">
const { t } = useI18n();
const appStore = useAppStore();
const usersStore = useUsersStore();
const activeUser = ref();
const baseUrl = ref("");
const notifications = ref({
  emailNotification: "",
  jobPostingNotification: "",
});

const user = computed(() => appStore.activeUser);
const url = computed(() => {
  return user.value ? `${baseUrl.value}/user/profile/${user.value.id}` : "";
});

watch(
  () => appStore.activeUser,
  (newUser) => {
    activeUser.value = newUser;
  }
);

const savePreferences = async () => {
  await usersStore.updateUser({
    id: activeUser.value.id,
    ...notifications.value,
  });
};

const shareOnLinkedIn = () => {
  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
    url.value
  )}`;

  window.open(
    linkedinUrl,
    "_blank",
    "left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
  );
};

const shareOnTwitter = () => {
  const text = `${t("ImHereToo")} 💻`; // Tweet içeriği
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}&url=${encodeURIComponent(url.value)}`;

  window.open(tweetUrl, "_blank", "width=600,height=400");
};

const shareOnTelegram = () => {
  const text = `${t("ImHereToo")} 💻`;
  const telegramUrl = `https://telegram.me/share/url?url=${url.value}&text=${text}`;

  window.open(telegramUrl, "_blank", "width=600,height=400");
};

onMounted(async () => {
  baseUrl.value = window.location.origin;
  await appStore.initializeUser();
  activeUser.value = appStore.activeUser;

  if (activeUser) {
    notifications.value.emailNotification =
      activeUser.value.emailNotification || false;
    notifications.value.jobPostingNotification =
      activeUser.value.jobPostingNotification || false;
  }
});
</script>

<template>
  <SheetContent class="w-full">
    <SheetHeader>
      <SheetTitle class="flex items-center gap-1"
        ><Icon name="la:cog" class="text-xl" />
        {{ $t("applicationSettings") }}</SheetTitle
      >
    </SheetHeader>

    <div class="flex flex-col justify-between h-full">
      <div class="grid gap-6 mt-5">
        <div class="flex items-center justify-between space-x-2">
          <Label for="emailnotification" class="flex flex-col space-y-1">
            <span>{{ $t("TurnOnEmailNotifications") }}</span>
            <span class="font-normal leading-snug text-muted-foreground">
              {{ $t("TurnOnEmailNotificationsDescription") }}
            </span>
          </Label>
          <Switch
            id="emailnotification"
            :default-checked="activeUser?.emailNotification || false"
            v-model:checked="notifications.emailNotification"
          />
        </div>
        <div class="flex items-center justify-between space-x-2">
          <Label for="postnotification" class="flex flex-col space-y-1">
            <span>{{ $t("TurnOnJobPostingNotifications") }}</span>
            <span class="font-normal leading-snug text-muted-foreground">
              {{ $t("TurnOnJobPostingNotificationsDescription") }}
            </span>
          </Label>
          <Switch
            id="postnotification"
            :default-checked="activeUser?.jobPostingNotification || false"
            v-model:checked="notifications.jobPostingNotification"
          />
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <Button @click="shareOnTwitter" class="w-full flex gap-1"
          ><Icon name="mynaui:brand-x" class="text-xl" />
          <span>{{ $t("ShareYourProfile") }}</span></Button
        >
        <Button @click="shareOnLinkedIn" class="w-full flex gap-1"
          ><Icon name="mynaui:brand-linkedin" class="text-xl" />
          <span>{{ $t("ShareYourProfile") }}</span></Button
        >
        <Button @click="shareOnTelegram" class="w-full flex gap-1"
          ><Icon name="cbi:telegram" class="text-xl" />
          <span>{{ $t("ShareYourProfile") }}</span></Button
        >
        <Button @click="savePreferences" variant="outline" class="w-full mb-5">
          {{ $t("SavePreferences") }}
        </Button>
      </div>
    </div>
  </SheetContent>
</template>
