<script setup lang="ts">
definePageMeta({
  layout: "auth",
  middleware: "auth",
});
import { useToast } from "@/components/ui/toast/use-toast";
import { formSchema } from "@/schemas/signupSchema";
import { useForm } from "vee-validate";

const appStore = useAppStore();
const { toast } = useToast();
const { t } = useI18n();
//google ile giriş/kayıt
const { signIn } = useAuth();
//normal kayıt
const router = useRouter();

const signupLoading = ref(false);
const { handleSubmit } = useForm({
  validationSchema: formSchema(),
});

const onSubmit = handleSubmit(async (values) => {
  signupLoading.value = true;
  const user = values;
  delete user?.repassword;

  try {
    const userExist = await useFetch("/api/users/getUser", {
      method: "POST",
      body: {
        email: user.email,
      },
    });

    //daha önce kayıt yapıldı mı?, kontrolü yapılıyor
    if (userExist.data.value) {
      toast({
        title: t("error"),
        description: t("alreadyUserText"),
        variant: "destructive",
      });
    } else {
      await sendConfirmationEmail(user.email);
      sessionStorage.setItem("user", JSON.stringify(user));
      router.push({
        path: "/auth/confirmation",
      });
    }
  } catch (error) {
    console.error(error);
  }

  signupLoading.value = false;
});

const sendConfirmationEmail = async (email: string) => {
  try {
    const response = await useFetch("/api/send-confirmation-email", {
      method: "POST",
      body: {
        email: email,
      },
    });

    appStore.setConfirmationCode(response.data.value.confirmationCode);
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <Toaster />
  <div
    class="w-full flex justify-center lg:grid lg:grid-cols-2 h-[100vh] overflow-hidden"
  >
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-2">
        <div class="grid gap-2 text-center">
          <h1 class="text-2xl font-bold">{{ $t("signup") }}</h1>
          <p class="text-xs text-balance text-muted-foreground">
            {{ $t("signupText") }}
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="grid gap-2">
            <FormField v-slot="{ componentField }" name="firstname">
              <FormItem>
                <FormLabel class="text-xs" for="firstname">{{
                  $t("firstName")
                }}</FormLabel>
                <FormControl>
                  <Input
                    id="firstname"
                    type="text"
                    :placeholder="$t('firstName')"
                    v-bind="componentField"
                    class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage class="text-xs" />
              </FormItem>
            </FormField>
          </div>

          <div class="grid gap-2">
            <FormField v-slot="{ componentField }" name="lastname">
              <FormItem>
                <FormLabel class="text-xs" for="lastname">{{
                  $t("lastName")
                }}</FormLabel>
                <FormControl>
                  <Input
                    id="lastname"
                    type="text"
                    :placeholder="$t('lastName')"
                    v-bind="componentField"
                    class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage class="text-xs" />
              </FormItem>
            </FormField>
          </div>
        </div>

        <div class="grid gap-2">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel class="text-xs" for="email">{{
                $t("email")
              }}</FormLabel>
              <FormControl>
                <Input
                  v-bind="componentField"
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
                />
              </FormControl>
              <FormMessage class="text-xs" />
            </FormItem>
          </FormField>
        </div>

        <div class="grid gap-2">
          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-2">
              <FormField v-slot="{ componentField }" name="password">
                <FormItem>
                  <FormLabel class="text-xs" for="password">{{
                    $t("password")
                  }}</FormLabel>
                  <FormControl>
                    <Input
                      v-bind="componentField"
                      id="password"
                      type="password"
                      :placeholder="$t('password')"
                      class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage class="text-xs" />
                </FormItem>
              </FormField>
            </div>

            <div class="grid gap-2">
              <FormField v-slot="{ componentField }" name="repassword">
                <FormItem>
                  <FormLabel class="text-xs" for="repassword">{{
                    $t("repassword")
                  }}</FormLabel>
                  <FormControl>
                    <Input
                      v-bind="componentField"
                      id="repassword"
                      type="password"
                      :placeholder="$t('repassword')"
                      class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage class="text-xs" />
                </FormItem>
              </FormField>
            </div>
          </div>
        </div>

        <recaptcha />

        <Button
          @click="onSubmit"
          class="w-full flex gap-2"
          :disabled="signupLoading"
          >{{ $t("signup") }}
          <Icon
            v-if="signupLoading"
            class="text-xl"
            name="line-md:loading-twotone-loop"
        /></Button>

        <Button
          @click="($event) => signIn('google')"
          variant="outline"
          class="w-full gap-1"
          :disabled="signupLoading"
        >
          <Icon class="text-xl" name="mynaui:brand-google" />
          {{ $t("signupWithGoogle") }}
        </Button>

        <Alert variant="destructive" class="flex gap-1 items-center p-2">
          <Icon name="mdi:exclamation-thick" class="text-4xl" />
          <AlertDescription class="text-xs">
            {{ $t("criticalAlertText") }}
          </AlertDescription>
        </Alert>

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
