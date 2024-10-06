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
    <Card :class="[myJob ? 'border-none' : '']" class="rounded-none">
      <div class="flex gap-3 bg-white p-5 rounded">
        <!-- <div class="flex text-4xl bg-green-300 p-3 h-[50%] rounded">
          <Icon class="text-white" name="mynaui:planet" />
        </div> -->

        <Avatar>
          <AvatarImage src="https://github.com/radix-vue.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <div class="font-bold text-sm flex justify-center gap-1">
              <div>
                {{ job.title }}
              </div>

              <div>
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

            <div class="flex gap-2">
              <div v-if="!appliedButRemoved" class="flex gap-1">
                <!-- favorite toggle -->
                <div v-if="loggedIn && !myJob" class="flex">
                  <Toggle size="sm" v-model:pressed="isFavorite">
                    <Icon
                      :name="
                        isFavorite
                          ? 'material-symbols-light:bookmark'
                          : 'material-symbols-light:bookmark-outline'
                      "
                      class="text-2xl cursor-pointer bg-green-300"
                  /></Toggle>
                </div>
                <!-- favorite toggle -->

                <!-- Job Card Detail Button (sm) -->
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <DrawerTrigger
                        class="flex items-center text-primary md:hidden"
                      >
                        <Icon class="text-xl" name="mynaui:panel-bottom-open" />
                      </DrawerTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{{ $t("goToDetail") }}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <!-- Job Card Detail Button -->

                <!-- Job Card Detail Button (md>) -->
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Sheet>
                        <SheetTrigger>
                          <div class="text-primary hidden md:block mt-1">
                            <Icon
                              class="text-xl"
                              name="mynaui:panel-right-open"
                            />
                          </div>
                        </SheetTrigger>
                        <SheetsJob :job :myJob />
                      </Sheet>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{{ $t("goToDetail") }}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <!-- Job Card Detail Button (md>) -->
              </div>

              <div v-if="appliedButRemoved">
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

          <div class="text-xs line-clamp-3 leading-6">
            {{ job.description }}
          </div>
        </div>
      </div>
    </Card>
    <!-- Job Details Drawer -->
    <DrawersJob :job :myJob />
    <!-- Job Details Drawer -->
  </Drawer>
</template>
