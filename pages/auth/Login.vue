<script setup lang="ts">
definePageMeta({
  layout: "auth",
  middleware: "auth",
});

const { signIn } = useAuth();
const email = ref();
const password = ref();
</script>

<template>
  <div
    class="w-full flex justify-center lg:grid lg:grid-cols-2 h-[100vh] overflow-hidden"
  >
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-center">
          <h1 class="text-2xl font-bold">{{ $t("login") }}</h1>
          <p class="text-xs text-balance text-muted-foreground">
            {{ $t("loginText") }}
          </p>
        </div>

        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label class="text-xs" for="email">{{ $t("email") }}</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              v-model="email"
              required
              class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
            />
          </div>

          <div class="grid gap-2">
            <div class="flex items-center">
              <Label class="text-xs" for="password">{{ $t("password") }}</Label>
              <nuxt-link
                to="forgot-password"
                class="ml-auto inline-block text-sm underline"
                ><a>
                  <p class="text-xs">{{ $t("forgotPassword") }}</p>
                </a></nuxt-link
              >
            </div>
            <Input
              id="password"
              type="password"
              required
              v-model="password"
              class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
            />
          </div>

          <Button
            @click="($event) => signIn('credentials', { email, password })"
            class="w-full"
            >{{ $t("login") }}</Button
          >

          <Button
            @click="($event) => signIn('google')"
            variant="outline"
            class="w-full gap-1"
          >
            <Icon class="text-xl" name="mynaui:brand-google" />
            {{ $t("loginWithGoogle") }}
          </Button>
        </div>

        <div class="mt-4 text-center text-sm">
          {{ $t("dontHaveAccount") }}
          <nuxt-link to="signup"
            ><a class="underline">
              {{ $t("signup") }}
            </a></nuxt-link
          >
        </div>
      </div>
    </div>

    <div class="hidden bg-muted lg:block magicpattern">
      <!-- <img
        src="https://placehold.co/200"
        alt="Image"
        width="1920"
        height="1080"
        class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      /> -->
    </div>
  </div>
</template>
