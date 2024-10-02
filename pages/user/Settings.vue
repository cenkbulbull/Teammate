<script lang="ts" setup>
definePageMeta({
  layout: "user",
  middleware: "auth",
});

const personalSettings = ref({
  id: "0.9380986828625959",
  firstname: "",
  lastname: "",
  telephone: "",
  job: "",
  biography: "",
  abilities: ref(),
  emailNotification: ref(),
});

const socialSettings = ref({
  id: "0.9380986828625959",
  social: {
    linkedin: "",
    github: "",
    web: "",
  },
});

const handleChangeEmailSwitch = (value: Boolean) => {
  personalSettings.value.emailNotification = value;
};

import { useUsersStore } from "@/stores/users";

const usersStore = useUsersStore();

const savePersonalSettings = () => {
  usersStore.updateUser(personalSettings.value);
};

const saveSocialSettings = () => {
  usersStore.updateUser(socialSettings.value);
};
</script>

<template>
  <div class="px-12 py-7">
    <Tabs default-value="personal">
      <TabsList class="grid w-full grid-cols-3">
        <TabsTrigger value="personal">
          <div class="flex gap-1">
            <Icon name="mynaui:user" class="text-xl" />{{ $t("personal") }}
          </div>
        </TabsTrigger>

        <TabsTrigger value="social"
          ><div class="flex gap-1">
            <Icon name="mynaui:globe" class="text-xl" />{{ $t("socialLinks") }}
          </div>
        </TabsTrigger>

        <TabsTrigger value="password"
          ><div class="flex gap-1">
            <Icon name="mynaui:lock-password" class="text-xl" />{{
              $t("password")
            }}
          </div>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="personal">
        <Card>
          <CardHeader>
            <CardTitle>{{ $t("personal") }}</CardTitle>
            <CardDescription class="text-xs">
              {{ $t("updatePersonalInfo") }}
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
            <div class="grid grid-cols-2 gap-4">
              <div class="grid gap-2">
                <div class="flex items-center">
                  <Label class="text-xs" for="firstname">{{
                    $t("firstName")
                  }}</Label>
                </div>
                <Input
                  id="firstname"
                  required
                  v-model="personalSettings.firstname"
                  placeholder="firsname bilgisi gelecek"
                  class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
                />
              </div>
              <div class="grid gap-2">
                <div class="flex items-center">
                  <Label class="text-xs" for="lastname">{{
                    $t("lastName")
                  }}</Label>
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
              <Label class="text-xs" for="telephone">{{
                $t("telephone")
              }}</Label>
              <Input
                id="telephone"
                placeholder="999-999-9999"
                v-model="personalSettings.telephone"
                class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
              />
            </div>

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
              <Label class="text-xs" for="biography">{{
                $t("biography")
              }}</Label>
              <Textarea
                id="biography"
                v-model="personalSettings.biography"
                class="text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
                :placeholder="$t('biographyText')"
              />
            </div>

            <div class="grid gap-2">
              <Label class="text-xs" for="abilities">{{
                $t("abilities")
              }}</Label>
              <TagsInput id="abilities" v-model="personalSettings.abilities">
                <TagsInputItem
                  v-for="(ability, index) in personalSettings.abilities"
                  :key="index"
                  :value="ability"
                >
                  <TagsInputItemText />
                  <TagsInputItemDelete />
                </TagsInputItem>

                <TagsInputInput
                  :placeholder="$t('abilitiesText')"
                  class="text-xs"
                />
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
          </CardContent>
          <CardFooter>
            <Button @click="savePersonalSettings" class="text-xs">{{
              $t("saveChanges")
            }}</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="social">
        <Card>
          <CardHeader>
            <CardTitle>{{ $t("socialLinks") }}</CardTitle>
            <CardDescription class="text-xs">
              {{ $t("socialLinksText") }}
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
            <div class="flex items-center gap-2">
              <Icon name="mynaui:globe" class="text-xl" />
              <Input
                id="website"
                type="text"
                placeholder="Web Site"
                v-model="socialSettings.social.web"
                class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
              />
            </div>
            <div class="flex items-center gap-2">
              <Icon name="mynaui:brand-linkedin" class="text-xl" />
              <Input
                id="linkedin"
                type="text"
                placeholder="Linkedin"
                v-model="socialSettings.social.linkedin"
                class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
              />
            </div>
            <div class="flex items-center gap-2">
              <Icon name="mynaui:brand-github" class="text-xl" />
              <Input
                id="website"
                type="text"
                placeholder="Github"
                v-model="socialSettings.social.github"
                class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button @click="saveSocialSettings" class="text-xs">{{
              $t("saveChanges")
            }}</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>{{ $t("password") }}</CardTitle>
            <CardDescription class="text-xs">
              {{ $t("changePasswordText") }}
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
            <div class="flex items-center gap-2">
              <Input
                id="password"
                type="password"
                :placeholder="$t('password')"
                class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
              />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="flex items-center gap-2">
                <Input
                  id="newpassword"
                  type="password"
                  :placeholder="$t('newPassword')"
                  class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
                />
              </div>
              <div class="flex items-center gap-2">
                <Input
                  id="newpassword"
                  type="password"
                  :placeholder="$t('repassword')"
                  class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter class="flex gap-3 flex-wrap">
            <Button class="text-xs">{{ $t("saveChanges") }}</Button>

            <Dialog>
              <DialogTrigger as-child>
                <Button
                  variant="outline"
                  class="text-xs bg-red-600 text-white"
                  >{{ $t("deleteYourAccount") }}</Button
                >
              </DialogTrigger>

              <!--  New Jobs Modal-->
              <DialogsDelete />
              <!--  New Jobs Modal-->
            </Dialog>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>
