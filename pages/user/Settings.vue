<script lang="ts" setup>
definePageMeta({
  layout: "user",
  middleware: "auth",
});

import { useAppStore } from "@/stores/app";
import { useUsersStore } from "@/stores/users";

import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();

const { t } = useI18n();

const appStore = useAppStore();

const user = computed(() => appStore.activeUser);

const personalSettings = ref({
  id: "",
  firstname: "",
  lastname: "",
  telephone: "",
  job: "",
  biography: "",
  abilities: ref(),
  emailNotification: ref(),
  social: {
    linkedin: "",
    github: "",
    web: "",
  },
});

const initializeUser = async () => {
  await appStore.initializeUser();

  if (user.value) {
    personalSettings.value.id = user.value.id;
    personalSettings.value.firstname = user.value.firstname;
    personalSettings.value.lastname = user.value.lastname;
    personalSettings.value.telephone = user.value.telephone || "";
    personalSettings.value.job = user.value.job || "";
    personalSettings.value.biography = user.value.biography || "";
    personalSettings.value.abilities = user.value.abilities || [];
    personalSettings.value.emailNotification =
      user.value.emailNotification || false;

    personalSettings.value.id = user.value.id;
    personalSettings.value.social.linkedin = user.value.social?.linkedin || "";
    personalSettings.value.social.github = user.value.social?.github || "";
    personalSettings.value.social.web = user.value.social?.web || "";
  }
};

// Sayfa yüklendiğinde kullanıcıyı başlat
onMounted(() => {
  initializeUser();
});

const handleChangeEmailSwitch = (value: Boolean) => {
  personalSettings.value.emailNotification = value;
};

const usersStore = useUsersStore();

const avatarFallback = computed(() => {
  const firstInitial = user.value?.firstname.charAt(0).toUpperCase();
  const lastInitial = user.value?.lastname.charAt(0).toUpperCase();
  return `${firstInitial}${lastInitial}`;
});

const savePersonalSettings = async () => {
  await usersStore.updateUser(personalSettings.value);

  toast({
    title: t("saveChangesToastTitle"),
    description: t("saveChangesToastText", [t("personal")]),
  });
};
</script>

<template>
  <div v-if="user" class="bg-gradient pt-24">
    <div class="grid gap-5 px-8 md:px-12 py-6 bg-white">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <Avatar class="w-12 h-12 md:w-24 md:h-24">
            <AvatarImage :src="'/uploads/images/' + user?.profilePhoto" />
            <AvatarFallback>{{ avatarFallback }}</AvatarFallback>
            <!-- src gelmezse isim soyisim ilk harflerini al -->
          </Avatar>
          <div class="flex flex-col gap-1">
            <span class="font-bold text-xs md:text-lg"
              >{{ user?.firstname }} {{ user?.lastname }}</span
            >
            <span class="text-xs">{{ user?.email }}</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label class="text-xs" for="firstname">{{ $t("firstName") }}</Label>
          </div>
          <Input
            id="firstname"
            required
            v-model="personalSettings.firstname"
            class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
          />
        </div>
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label class="text-xs" for="lastname">{{ $t("lastName") }}</Label>
          </div>
          <Input
            id="lastname"
            required
            v-model="personalSettings.lastname"
            placeholder="lastname bilgisi gelecek"
            class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
          />
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-5">
        <div class="grid gap-2">
          <Label class="text-xs" for="email">{{ $t("email") }}</Label>
          <Input
            id="email"
            type="email"
            placeholder="cenkbulbul67@gmail.com"
            disabled
            required
            class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
          />
        </div>

        <div class="grid gap-2">
          <Label class="text-xs" for="telephone">{{ $t("telephone") }}</Label>
          <Input
            id="telephone"
            placeholder="999-999-9999"
            v-model="personalSettings.telephone"
            class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
          />
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-5">
        <div class="grid gap-2">
          <Label class="text-xs">{{ $t("resume") }}</Label>
          <DropzoneComponent
            :options="{
              acceptedFiles: '.pdf',
              maxFiles: 1,
              dictDefaultMessage: 'cvDropzoneText',
              url: '/api/upload',
            }"
          />
        </div>

        <div class="grid gap-2">
          <Label class="text-xs">{{ $t("profilePhoto") }}</Label>
          <DropzoneComponent
            :options="{
              acceptedFiles: 'image/*',
              maxFiles: 1,
              dictDefaultMessage: 'profilePhotoDropzoneText',
              url: '/api/upload',
            }"
          />
        </div>
      </div>

      <div class="grid gap-2">
        <Label class="text-xs" for="job">{{ $t("job") }}</Label>
        <Input
          id="job"
          :placeholder="$t('job')"
          v-model="personalSettings.job"
          class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
        />
      </div>

      <div class="grid gap-2">
        <Label class="text-xs" for="biography">{{ $t("biography") }}</Label>
        <Textarea
          id="biography"
          v-model="personalSettings.biography"
          class="text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
          :placeholder="$t('biographyText')"
        />
      </div>

      <div class="grid gap-2">
        <Label class="text-xs" for="abilities">{{ $t("abilities") }}</Label>
        <TagsInput id="abilities" v-model="personalSettings.abilities">
          <TagsInputItem
            v-for="(ability, index) in personalSettings.abilities"
            :key="index"
            :value="ability"
          >
            <TagsInputItemText />
            <TagsInputItemDelete />
          </TagsInputItem>

          <TagsInputInput :placeholder="$t('abilitiesText')" class="text-xs" />
        </TagsInput>
      </div>

      <div class="grid gap-2">
        <Label class="text-xs">{{ $t("emailNotifications") }}</Label>
        <div class="flex items-center gap-2">
          <Switch
            id="email-switch"
            :checked="personalSettings.emailNotification"
            @update:checked="handleChangeEmailSwitch"
          />
          <Label for="email-switch" class="text-xs">{{
            $t("turnOnEmailNotifications")
          }}</Label>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-2">
        <Label class="col-span-3 text-xs">{{ $t("socialLinks") }}</Label>
        <div class="col-span-3 md:col-span-1 flex items-center gap-1">
          <Icon name="mynaui:globe" class="text-xl" />
          <Input
            id="website"
            type="text"
            placeholder="Web Site"
            v-model="personalSettings.social.web"
            class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
          />
        </div>
        <div class="col-span-3 md:col-span-1 flex items-center gap-1">
          <Icon name="mynaui:brand-linkedin" class="text-xl" />
          <Input
            id="linkedin"
            type="text"
            placeholder="Linkedin"
            v-model="personalSettings.social.linkedin"
            class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
          />
        </div>
        <div class="col-span-3 md:col-span-1 flex items-center gap-1">
          <Icon name="mynaui:brand-github" class="text-xl" />
          <Input
            id="website"
            type="text"
            placeholder="Github"
            v-model="personalSettings.social.github"
            class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
          />
        </div>
      </div>

      <Button @click="savePersonalSettings" class="text-xs w-32">{{
        $t("saveChanges")
      }}</Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg-gradient {
  background: rgb(186, 213, 242);
  background: linear-gradient(
    103deg,
    rgba(186, 213, 242, 1) 0%,
    rgba(253, 252, 227, 1) 100%
  );
}
</style>
