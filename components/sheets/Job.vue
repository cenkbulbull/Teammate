<script lang="ts" setup>
defineProps<{
  job: Job;
}>();
</script>

<template>
  <SheetContent class="md:max-w-2xl">
    <SheetHeader>
      <SheetTitle class="flex items-center gap-1"
        ><Icon name="mynaui:briefcase" class="text-xl" />
        {{ job.title }}</SheetTitle
      >
      <!-- <SheetDescription>
        Make changes to your profile here. Click save when you're done.
      </SheetDescription> -->
    </SheetHeader>

    <div class="flex flex-col">
      <div class="flex gap-3 flex-wrap mt-5 overflow-auto max-h-[80vh]">
        <div class="flex flex-wrap gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge class="gap-1 font-normal" variant="secondary"
                  ><Icon name="mynaui:user" />{{ job.user }}</Badge
                >
              </TooltipTrigger>
              <TooltipContent>
                <p>{{ $t("personWhoShares") }}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

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

          <TooltipProvider v-for="requirement in job.requirements">
            <Tooltip>
              <TooltipTrigger>
                <Badge class="gap-1 font-normal"
                  ><Icon name="mynaui:star" />{{ requirement }}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{{ $t("requirements") }}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div class="text-xs leading-6 pb-6">
          {{ job.description }}
        </div>
      </div>

      <div class="flex gap-2">
        <Button class="text-xs">{{ $t("apply") }}</Button>

        <SheetClose aria-label="Close">
          <Button class="text-xs" variant="outline">
            {{ $t("cancel") }}
          </Button>
        </SheetClose>
      </div>
    </div>
  </SheetContent>
</template>
