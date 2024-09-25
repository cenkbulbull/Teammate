<script lang="ts" setup>
import { useClipboard } from "@vueuse/core";

const props = defineProps<{
  job: Job;
  myJob?: boolean;
}>();

const { text, copy, copied, isSupported } = useClipboard();
</script>

<template>
  <Drawer>
    <Card :class="myJob ? 'border-none' : ''">
      <div class="flex gap-3 bg-white p-5 rounded">
        <!-- <div class="flex text-4xl bg-green-300 p-3 h-[50%] rounded">
          <Icon class="text-white" name="mynaui:planet" />
        </div> -->

        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <div class="font-bold flex justify-center gap-1">
              <div>
                {{ job.title }}
              </div>

              <div v-if="!myJob">
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
              <div v-if="myJob" class="flex gap-2">
                <!-- applicatans sheet -->
                <Sheet>
                  <SheetTrigger>
                    <Button size="icon" variant="outline">
                      <Icon name="mynaui:eye" class="text-xl" />
                    </Button>
                  </SheetTrigger>

                  <SheetContent class="px-0">
                    <SheetHeader>
                      <SheetTitle class="flex items-center gap-1 px-4">
                        <Icon name="mynaui:file-text" class="text-xl" />{{
                          $t("applicants")
                        }}</SheetTitle
                      >
                      <div
                        class="flex flex-col gap-3 p-5 divide-y overflow-auto max-h-[90vh]"
                      >
                        <!-- users -->
                        <div class="flex justify-between pt-3">
                          <div class="flex items-center gap-2">
                            <Avatar class="w-8 h-8">
                              <AvatarImage
                                src="https://github.com/radix-vue.png"
                              />
                              <AvatarFallback>CB</AvatarFallback>
                              <!--src gelmezse isim soyisim ilk harflerini al-->
                            </Avatar>
                            <p class="text-xs">Name Surname</p>
                          </div>

                          <div>
                            <Button size="icon" variant="outline"
                              ><Icon name="mynaui:eye" class="text-xl"
                            /></Button>
                          </div>
                        </div>
                        <div class="flex justify-between pt-3">
                          <div class="flex items-center gap-2">
                            <Avatar class="w-8 h-8">
                              <AvatarImage
                                src="https://github.com/radix-vue.png"
                              />
                              <AvatarFallback>CB</AvatarFallback>
                              <!--src gelmezse isim soyisim ilk harflerini al-->
                            </Avatar>
                            <p class="text-xs">Name Surname</p>
                          </div>

                          <div>
                            <Button size="icon" variant="outline"
                              ><Icon name="mynaui:eye" class="text-xl"
                            /></Button>
                          </div>
                        </div>
                        <div class="flex justify-between pt-3">
                          <div class="flex items-center gap-2">
                            <Avatar class="w-8 h-8">
                              <AvatarImage
                                src="https://github.com/radix-vue.png"
                              />
                              <AvatarFallback>CB</AvatarFallback>
                              <!--src gelmezse isim soyisim ilk harflerini al-->
                            </Avatar>
                            <p class="text-xs">Name Surname</p>
                          </div>

                          <div>
                            <Button size="icon" variant="outline"
                              ><Icon name="mynaui:eye" class="text-xl"
                            /></Button>
                          </div>
                        </div>
                        <div class="flex justify-between pt-3">
                          <div class="flex items-center gap-2">
                            <Avatar class="w-8 h-8">
                              <AvatarImage
                                src="https://github.com/radix-vue.png"
                              />
                              <AvatarFallback>CB</AvatarFallback>
                              <!--src gelmezse isim soyisim ilk harflerini al-->
                            </Avatar>
                            <p class="text-xs">Name Surname</p>
                          </div>

                          <div>
                            <Button size="icon" variant="outline"
                              ><Icon name="mynaui:eye" class="text-xl"
                            /></Button>
                          </div>
                        </div>
                        <div class="flex justify-between pt-3">
                          <div class="flex items-center gap-2">
                            <Avatar class="w-8 h-8">
                              <AvatarImage
                                src="https://github.com/radix-vue.png"
                              />
                              <AvatarFallback>CB</AvatarFallback>
                              <!--src gelmezse isim soyisim ilk harflerini al-->
                            </Avatar>
                            <p class="text-xs">Name Surname</p>
                          </div>

                          <div>
                            <Button size="icon" variant="outline"
                              ><Icon name="mynaui:eye" class="text-xl"
                            /></Button>
                          </div>
                        </div>
                        <div class="flex justify-between pt-3">
                          <div class="flex items-center gap-2">
                            <Avatar class="w-8 h-8">
                              <AvatarImage
                                src="https://github.com/radix-vue.png"
                              />
                              <AvatarFallback>CB</AvatarFallback>
                              <!--src gelmezse isim soyisim ilk harflerini al-->
                            </Avatar>
                            <p class="text-xs">Name Surname</p>
                          </div>

                          <div>
                            <Button size="icon" variant="outline"
                              ><Icon name="mynaui:eye" class="text-xl"
                            /></Button>
                          </div>
                        </div>
                        <div class="flex justify-between pt-3">
                          <div class="flex items-center gap-2">
                            <Avatar class="w-8 h-8">
                              <AvatarImage
                                src="https://github.com/radix-vue.png"
                              />
                              <AvatarFallback>CB</AvatarFallback>
                              <!--src gelmezse isim soyisim ilk harflerini al-->
                            </Avatar>
                            <p class="text-xs">Name Surname</p>
                          </div>

                          <div>
                            <Button size="icon" variant="outline"
                              ><Icon name="mynaui:eye" class="text-xl"
                            /></Button>
                          </div>
                        </div>
                        <div class="flex justify-between pt-3">
                          <div class="flex items-center gap-2">
                            <Avatar class="w-8 h-8">
                              <AvatarImage
                                src="https://github.com/radix-vue.png"
                              />
                              <AvatarFallback>CB</AvatarFallback>
                              <!--src gelmezse isim soyisim ilk harflerini al-->
                            </Avatar>
                            <p class="text-xs">Name Surname</p>
                          </div>

                          <div>
                            <Button size="icon" variant="outline"
                              ><Icon name="mynaui:eye" class="text-xl"
                            /></Button>
                          </div>
                        </div>
                        <div class="flex justify-between pt-3">
                          <div class="flex items-center gap-2">
                            <Avatar class="w-8 h-8">
                              <AvatarImage
                                src="https://github.com/radix-vue.png"
                              />
                              <AvatarFallback>CB</AvatarFallback>
                              <!--src gelmezse isim soyisim ilk harflerini al-->
                            </Avatar>
                            <p class="text-xs">Name Surname</p>
                          </div>

                          <div>
                            <Button size="icon" variant="outline"
                              ><Icon name="mynaui:eye" class="text-xl"
                            /></Button>
                          </div>
                        </div>
                        <div class="flex justify-between pt-3">
                          <div class="flex items-center gap-2">
                            <Avatar class="w-8 h-8">
                              <AvatarImage
                                src="https://github.com/radix-vue.png"
                              />
                              <AvatarFallback>CB</AvatarFallback>
                              <!--src gelmezse isim soyisim ilk harflerini al-->
                            </Avatar>
                            <p class="text-xs">Name Surname</p>
                          </div>

                          <div>
                            <Button size="icon" variant="outline"
                              ><Icon name="mynaui:eye" class="text-xl"
                            /></Button>
                          </div>
                        </div>
                        <!-- users -->
                      </div>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
                <!-- applicatans sheet -->

                <Dialog>
                  <DialogTrigger as-child>
                    <Button size="icon" variant="outline">
                      <Icon name="mynaui:pencil" class="text-xl bg-sky-600" />
                    </Button>
                  </DialogTrigger>

                  <!--  Update Jobs Modal-->
                  <DialogsUpdateJob />
                  <!--  Update Jobs Modal-->
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger as-child>
                    <Button size="icon" variant="outline">
                      <Icon name="mynaui:trash" class="text-xl bg-red-600" />
                    </Button>
                  </AlertDialogTrigger>
                  <!-- delete dialog -->
                  <DialogsDelete />
                  <!-- delete dialog -->
                </AlertDialog>
              </div>

              <div v-else class="flex gap-2">
                <div class="flex">
                  <Icon
                    name="material-symbols-light:bookmark-outline"
                    class="text-2xl cursor-pointer bg-green-700 fill-black"
                  />

                  <Icon
                    name="material-symbols-light:bookmark"
                    class="text-2xl cursor-pointer bg-green-700 fill-black"
                  />
                </div>

                <!-- Job Card Detail Button -->
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <DrawerTrigger class="flex items-center">
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
