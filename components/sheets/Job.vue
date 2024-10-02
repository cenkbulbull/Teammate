<script lang="ts" setup>
defineProps<{
  job: Job;
  myJob?: boolean;
}>();

const { status } = useAuth();

const loggedIn = computed(() => status.value === "authenticated");
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
        <div v-if="!myJob" class="flex gap-2">
          <Button v-if="loggedIn" class="text-xs">{{ $t("apply") }}</Button>

          <SheetClose v-if="loggedIn" aria-label="Close">
            <Button class="text-xs" variant="outline">
              {{ $t("cancel") }}
            </Button>
          </SheetClose>
        </div>

        <div v-else class="flex gap-2">
          <!-- applicatans sheet -->
          <Sheet>
            <SheetTrigger>
              <Button class="flex gap-1" variant="outline">
                <Icon name="mynaui:eye" class="text-xl" />
                {{ $t("applicants") }}
              </Button>
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
              <Button class="flex gap-1" variant="outline">
                <Icon name="mynaui:edit-one" class="text-xl" />
                {{ $t("edit") }}
              </Button>
            </DialogTrigger>

            <!--  Update Jobs Modal-->
            <DialogsUpdateJob />
            <!--  Update Jobs Modal-->
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger as-child>
              <Button class="flex gap-1" variant="outline">
                <Icon name="mynaui:trash-one" class="text-xl" />
                {{ $t("delete") }}
              </Button>
            </AlertDialogTrigger>
            <!-- delete dialog -->
            <DialogsDelete />
            <!-- delete dialog -->
          </AlertDialog>
        </div>
      </div>
    </div>
  </SheetContent>
</template>
