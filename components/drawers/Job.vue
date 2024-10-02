<script lang="ts" setup>
defineProps<{
  job: Job;
  myJob: boolean;
}>();

const { status } = useAuth();

const loggedIn = computed(() => status.value === "authenticated");
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
      <div v-if="!myJob" class="flex gap-2">
        <Button v-if="loggedIn" class="text-xs">{{ $t("apply") }}</Button>

        <DrawerClose v-if="loggedIn">
          <Button class="text-xs" variant="outline">
            {{ $t("cancel") }}
          </Button>
        </DrawerClose>
      </div>
      <div v-else class="flex gap-2">
        <!-- applicatans sheet -->
        <Sheet>
          <SheetTrigger>
            <Button variant="outline"> {{ $t("applicants") }} </Button>
          </SheetTrigger>

          <SheetContent class="px-0">
            <SheetHeader>
              <SheetTitle class="flex items-center gap-1 px-4">
                <Icon name="mynaui:file-text" class="text-xl" />{{
                  $t("applicants")
                }}</SheetTitle
              >
            </SheetHeader>
            <div
              class="flex flex-col gap-3 px-5 py-2 divide-y overflow-auto max-h-[88vh]"
            >
              <!-- users -->
              <div v-for="i in 15" class="flex justify-between pt-3">
                <div class="flex items-center gap-2">
                  <Avatar class="w-8 h-8">
                    <AvatarImage src="https://github.com/radix-vue.png" />
                    <AvatarFallback>CB</AvatarFallback>
                    <!--src gelmezse isim soyisim ilk harflerini al-->
                  </Avatar>
                  <p class="text-xs">Name Surname</p>
                </div>

                <div>
                  <Button size="icon" variant="outline" class="w-8 h-8"
                    ><Icon name="mynaui:eye" class="text-sm text-primary"
                  /></Button>
                </div>
              </div>

              <!-- users -->
            </div>
          </SheetContent>
        </Sheet>
        <!-- applicatans sheet -->

        <Dialog>
          <DialogTrigger as-child>
            <Button variant="outline"> {{ $t("edit") }} </Button>
          </DialogTrigger>

          <!--  Update Jobs Modal-->
          <DialogsUpdateJob />
          <!--  Update Jobs Modal-->
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger as-child>
            <Button variant="outline"> {{ $t("delete") }} </Button>
          </AlertDialogTrigger>
          <!-- delete dialog -->
          <DialogsDelete />
          <!-- delete dialog -->
        </AlertDialog>
      </div>
    </DrawerFooter>
  </DrawerContent>
</template>
