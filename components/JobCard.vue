<script lang="ts" setup>
import { useClipboard } from "@vueuse/core";

const { status } = useAuth();

const loggedIn = computed(() => status.value === "authenticated");

const props = defineProps<{
  job: Job;
  myJob?: boolean;
  appliedButRemoved?: boolean;
}>();

const { text, copy, copied, isSupported } = useClipboard();

const isFavorite = ref(false);
</script>

<template>
  <Drawer>
    <Card class="flex flex-col gap-5 p-2 rounded-xl text-sm">
      <CardHeader class="bg-slate-50 rounded-t-xl px-5 py-2">
        <div class="flex flex-col gap-3">
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

            <div v-if="loggedIn && !myJob" class="flex">
              <Toggle
                v-if="!appliedButRemoved"
                size="sm"
                v-model:pressed="isFavorite"
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

          <div class="text-xs line-clamp-5 leading-5">
            {{ job.description }}
          </div>
        </div>
      </CardHeader>
      <CardFooter class="px-5 pb-3">
        <div class="flex justify-between w-full">
          <div class="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/radix-vue.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div class="flex gap-2 items-center font-bold text-xs">
              <div>
                {{ job.title }}
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger class="flex items-center gap-1">
                    <Icon
                      click="copy(job.id)"
                      @click="copy(job.id)"
                      name="mynaui:clipboard"
                      class="text-xl"
                    />
                    <div v-if="copied" class="text-green-300 text-xs">
                      {{ $t("copied") }}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{{ $t("copyAdId") }}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div v-if="!appliedButRemoved">
            <Sheet>
              <SheetTrigger class="hidden md:block">
                <Button class="text-xs">
                  {{ $t("view") }}
                </Button>
              </SheetTrigger>
              <SheetsJob :job :myJob />
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
    <DrawersJob :job :myJob />
  </Drawer>
</template>
