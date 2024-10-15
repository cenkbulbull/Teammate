<script setup lang="ts">
definePageMeta({
  layout: "auth",
  middleware: [
    "auth",
    function (to, from) {
      const appStore = useAppStore();

      //code yoksa signupa yönlendir
      if (!appStore.confirmationCode) {
        return navigateTo("/auth/signup");
      }
    },
  ],
});
const usersStore = useUsersStore();
const appStore = useAppStore();
import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();
const { t } = useI18n();
const router = useRouter();
const user = ref<object>();
const code = ref<string[]>([]);

onMounted(async () => {
  user.value = JSON.parse(sessionStorage.getItem("user") || "{}");
});

const confirmEmail = async (e: string[]) => {
  if (e.join("") === appStore.confirmationCode) {
    await usersStore.addUser({ ...user.value });
    sessionStorage.removeItem("user");
    appStore.setConfirmationCode(null);
    router.push("/auth/login");
  } else {
    toast({
      title: t("error"),
      description: t("wrongCodeText"),
      variant: "destructive",
    });
  }
};
</script>

<template>
  <Toaster />
  <div
    class="w-full flex justify-center lg:grid lg:grid-cols-2 h-[100vh] overflow-hidden"
  >
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-center">
          <h1 class="text-2xl font-bold">{{ $t("confirmation") }}</h1>
          <p class="text-xs text-muted-foreground" v-if="user">
            {{ $t("emailVerifyText", { mail: user.email }) }}
          </p>
        </div>
        <div class="grid gap-4">
          <div class="m-auto">
            <PinInput id="pin-input" v-model="code" placeholder="○">
              <PinInputGroup>
                <PinInputInput
                  v-for="(id, index) in 5"
                  :key="id"
                  :index="index"
                />
              </PinInputGroup>
            </PinInput>
          </div>

          <Button variant="outline" class="w-full">{{
            $t("resendCode")
          }}</Button>
          <Button @click="confirmEmail(code)" class="w-full">{{
            $t("continue")
          }}</Button>
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
