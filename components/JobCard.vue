<script lang="ts" setup>
import { useClipboard } from "@vueuse/core";

const props = defineProps<{
  job: Job;
  applyButton?: boolean;
}>();

const { text, copy, copied, isSupported } = useClipboard();
</script>

<template>
  <Drawer>
    <Card>
      <div class="flex gap-3 bg-white p-5 rounded">
        <!-- <div class="flex text-4xl bg-green-300 p-3 h-[50%] rounded">
          <Icon class="text-white" name="mynaui:planet" />
        </div> -->

        <div class="flex flex-col gap-2">
          <div class="flex justify-between">
            <div class="font-bold flex justify-center gap-1">
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

            <div :class="applyButton ? 'flex gap-3' : ''">
              <!-- apply button -->
              <Button v-if="applyButton" class="text-xs rounded h-7">{{
                $t("apply")
              }}</Button>

              <!-- apply button -->
              <!-- Job Card Detail Button -->
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <DrawerTrigger>
                      <Icon
                        class="text-xl"
                        name="mynaui:chevron-right-square"
                      />
                    </DrawerTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{{ $t("goToDetail") }}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <!-- Job Card Detail Button -->
            </div>
          </div>

          <div class="flex gap-1 flex-wrap">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge class="gap-1"
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
                  <Badge class="gap-1"
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

          <div class="text-xs line-clamp-3">
            {{ job.description }}
          </div>
        </div>
      </div>
    </Card>
    <!-- Job Details Drawer -->
    <DrawersJob :job />
    <!-- Job Details Drawer -->
  </Drawer>
</template>
