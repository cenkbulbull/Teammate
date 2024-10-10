<script lang="ts" setup>
import { useClipboard } from "@vueuse/core";
import { useUsersStore } from "@/stores/users";
import { useAppStore } from "@/stores/app";
import { useToast } from "@/components/ui/toast/use-toast";

const usersStore = useUsersStore();
const appStore = useAppStore();

const { toast } = useToast();

const { t } = useI18n();

const { status } = useAuth();
const loggedIn = computed(() => status.value === "authenticated");

const props = defineProps<{
  job: Job;
  myJob?: boolean;
  appliedButRemoved?: boolean;
}>();

const advertiserId = props.job.user;

const { data } = useFetch("/api/users/getUser", {
  method: "POST",
  body: JSON.stringify({ id: advertiserId }),
  headers: {
    "Content-Type": "application/json",
  },
});

// Yalnızca paylaşanın id/firstname/lastname/profilePhoto bilgisi atanıyor
const advertiser = computed(() => {
  if (!data.value) return null; // Veri henüz gelmemişse null döndür
  const { id, firstname, lastname, profilePhoto } = data.value;
  return { id, firstname, lastname, profilePhoto };
});

const avatarFallback = computed(() => {
  const firstInitial = advertiser.value?.firstname.charAt(0).toUpperCase();
  const lastInitial = advertiser.value?.lastname.charAt(0).toUpperCase();
  return `${firstInitial}${lastInitial}`;
});

const { text, copy, copied, isSupported } = useClipboard();

const copyID = async (id: string) => {
  await copy(id);
  toast({
    title: t("adIdCopied"),
    description: id,
  });
};

const isFavorite = ref(false);

// favorites dizisini ve props.job.id'yi kontrol edin
watch(
  () => appStore.activeUser?.favorites,
  (favorites) => {
    if (favorites) {
      isFavorite.value = favorites.some((item) => item === props.job.id);
    }
  },
  { immediate: true } // İlk başta da kontrol etsin
);

const changeFavorite = async (isPressed: boolean) => {
  try {
    const favorites = appStore.activeUser?.favorites || [];

    if (isPressed) {
      if (!favorites.includes(props.job.id)) {
        favorites.push(props.job.id);
      }
    } else {
      // Eğer false ise, ID'yi kaldır
      const index = favorites.indexOf(props.job.id);
      if (index > -1) {
        favorites.splice(index, 1);
      }
    }

    // Güncellenmiş kullanıcı verisini yolla
    await usersStore.updateUser({ id: appStore.activeUser?.id, favorites });
  } catch (error) {
    console.error("Error updating favorite status:", error);
  }
};
</script>

<template>
  <Drawer>
    <Card
      @click="copyID(job.id)"
      class="flex flex-col gap-5 p-2 rounded-xl text-sm group hover:border-green-300 transition-all cursor-pointer"
    >
      <CardHeader class="rounded-t-xl p-2">
        <div class="flex flex-col gap-3">
          <div class="flex justify-between items-center">
            <CardTitle class="text-md">{{ job.title }}</CardTitle>
            <div v-if="loggedIn && !myJob" class="flex">
              <Toggle
                v-if="!appliedButRemoved"
                size="sm"
                v-model:pressed="isFavorite"
                @update:pressed="changeFavorite"
              >
                <Icon
                  :name="
                    isFavorite
                      ? 'material-symbols-light:bookmark'
                      : 'material-symbols-light:bookmark-outline'
                  "
                  class="text-2xl cursor-pointer bg-green-300"
              /></Toggle>
              <div v-else="appliedButRemoved">
                <Alert
                  variant="destructive"
                  class="flex items-center h-9 text-xs"
                >
                  <Icon name="mdi:exclamation-thick" />
                  <AlertTitle class="mt-1">
                    {{ $t("removed") }}
                  </AlertTitle>
                </Alert>
              </div>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div class="flex gap-1 flex-wrap">
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
            </div>
          </div>

          <div class="text-xs line-clamp-5 leading-5">
            {{ job.description }}
          </div>
        </div>
      </CardHeader>
      <CardFooter class="px-2 pb-3">
        <div class="flex justify-between w-full">
          <div class="flex gap-2 items-center">
            <Avatar>
              <AvatarImage :src="advertiser?.profilePhoto" />
              <AvatarFallback>{{ avatarFallback }}</AvatarFallback>
            </Avatar>

            <div class="flex gap-2 items-center font-bold text-xs">
              <div>{{ advertiser?.firstname }} {{ advertiser?.lastname }}</div>
            </div>
          </div>

          <div
            v-if="!appliedButRemoved"
            class="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Sheet>
              <SheetTrigger class="hidden md:block">
                <Button class="text-xs">
                  {{ $t("view") }}
                </Button>
              </SheetTrigger>
              <SheetsJob :job :myJob :advertiser />
            </Sheet>

            <DrawerTrigger class="md:hidden">
              <Button class="text-xs">
                {{ $t("view") }}
              </Button>
            </DrawerTrigger>
          </div>
        </div>
      </CardFooter>
    </Card>
    <DrawersJob :job :myJob :advertiser />
  </Drawer>
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
