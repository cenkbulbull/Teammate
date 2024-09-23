<script lang="ts" setup>
const props = defineProps<{
  job: Job;
}>();
</script>

<template>
  <Drawer>
    <Card>
      <div class="flex gap-3 bg-white p-5 rounded">
        <div class="flex text-4xl bg-green-300 p-3 h-[50%] rounded">
          <Icon class="text-white" name="mynaui:planet" />
        </div>

        <div class="flex flex-col gap-2">
          <div class="flex justify-between">
            <div class="font-bold">{{ job.title }}</div>

            <!-- Job Card Detail Button -->
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <DrawerTrigger>
                    <Icon class="text-xl" name="mynaui:info-circle" />
                  </DrawerTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{{ $t("goToDetail") }}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <!-- Job Card Detail Button -->
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

          <!-- apply button -->
          <Button
            class="bg-sky-700 rounded-none text-xs hover:bg-slate-100 hover:text-inherit rounded float-right"
            >{{ $t("apply") }}</Button
          >
          <!-- apply button -->
        </div>
      </div>
    </Card>
    <!-- Job Details Drawer -->
    <DrawersJob :job />
    <!-- Job Details Drawer -->
  </Drawer>
</template>
