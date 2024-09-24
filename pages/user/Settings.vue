<script lang="ts" setup>
definePageMeta({
  layout: "user",
});

const abilities = ref();
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
              <Label class="text-xs" for="biography">{{
                $t("biography")
              }}</Label>
              <Textarea
                id="biography"
                class="text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
                :placeholder="$t('biographyText')"
              />
            </div>

            <div class="grid gap-2">
              <Label class="text-xs" for="abilities">{{
                $t("abilities")
              }}</Label>
              <TagsInput id="abilities" v-model="abilities">
                <TagsInputItem
                  v-for="(ability, index) in abilities"
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
          </CardContent>
          <CardFooter>
            <Button class="text-xs">{{ $t("saveChanges") }}</Button>
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
                class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
              />
            </div>
            <div class="flex items-center gap-2">
              <Icon name="mynaui:brand-linkedin" class="text-xl" />
              <Input
                id="linkedin"
                type="text"
                placeholder="Linkedin"
                class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
              />
            </div>
            <div class="flex items-center gap-2">
              <Icon name="mynaui:brand-github" class="text-xl" />
              <Input
                id="website"
                type="text"
                placeholder="Github"
                class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button class="text-xs">{{ $t("saveChanges") }}</Button>
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
          <CardFooter>
            <Button class="text-xs">{{ $t("saveChanges") }}</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>
