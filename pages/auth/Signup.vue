<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
</script>

<template>
  <div
    class="w-full flex justify-center lg:grid lg:grid-cols-2 h-[100vh] overflow-hidden"
  >
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-center">
          <h1 class="text-2xl font-bold">{{ $t("signup") }}</h1>
          <p class="text-xs text-balance text-muted-foreground">
            {{ $t("signupText") }}
          </p>
        </div>
        <div class="grid gap-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-2">
              <Label class="text-xs" for="email">{{ $t("firstName") }}</Label>
              <Input
                id="email"
                type="email"
                :placeholder="$t('firstName')"
                required
                class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
              />
            </div>
            <div class="grid gap-2">
              <Label class="text-xs" for="email">{{ $t("lastName") }}</Label>
              <Input
                id="email"
                type="email"
                :placeholder="$t('lastName')"
                required
                class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
              />
            </div>
          </div>

          <div class="grid gap-2">
            <Label class="text-xs" for="email">{{ $t("email") }}</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              required
              class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
            />
          </div>

          <div class="grid gap-2">
            <div class="grid grid-cols-2 gap-4">
              <div class="grid gap-2">
                <div class="flex items-center">
                  <Label class="text-xs" for="password">{{
                    $t("password")
                  }}</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
                />
              </div>
              <div class="grid gap-2">
                <div class="flex items-center">
                  <Label class="text-xs" for="password">{{
                    $t("repassword")
                  }}</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
                />
              </div>
            </div>
          </div>

          <Button type="submit" class="w-full">{{ $t("signup") }}</Button>
          <Button variant="outline" class="w-full gap-1">
            <Icon class="text-xl" name="mynaui:brand-google" />
            {{ $t("signupWithGoogle") }}
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          {{ $t("haveAnAccount") }}
          <nuxt-link to="login"
            ><a class="underline">
              {{ $t("login") }}
            </a></nuxt-link
          >
        </div>
      </div>
    </div>
    <div class="hidden bg-muted lg:block">
      <img
        src="https://placehold.co/200"
        alt="Image"
        width="1920"
        height="1080"
        class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  </div>
</template>
