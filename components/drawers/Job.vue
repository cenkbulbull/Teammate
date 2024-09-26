<script lang="ts" setup>
defineProps<{
  job: Job;
}>();
</script>
<template>
  <DrawerContent>
    <DrawerHeader class="gap-4">
      <DrawerTitle class="flex gap-2"
        ><Icon name="mynaui:briefcase" /> {{ job.title }}</DrawerTitle
      >
      <div class="flex gap-1 flex-wrap">
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

      <DrawerDescription
        class="overflow-auto max-h-48 flex flex-col gap-2 text-xs leading-6"
      >
        {{ job.description }}
      </DrawerDescription>
    </DrawerHeader>

    <DrawerFooter class="flex-row">
      <Button class="text-xs">{{ $t("apply") }}</Button>

      <DrawerClose>
        <Button class="text-xs" variant="outline"> Cancel </Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</template>
