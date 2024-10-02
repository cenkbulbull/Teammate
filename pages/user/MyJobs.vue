<script lang="ts" setup>
definePageMeta({
  layout: "user",
  middleware: "auth",
});

const job: Job = {
  id: "ac789xc",
  user: "Paylaşan İsim",
  title: "Frontend Developer",
  location: "Remote",
  estimatedJobTime: "1-3",
  description:
    "TIKLANINCA DRAWER AÇ Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scr, when an unknown printer took a galley of type and scr, when an unknown printer took a galley of type and scr, when an unknown printer took a galley of type and scr, when an unknown printer took a galley of type and scr, when an unknown printer took a galley of type and scr, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  requirements: ["Javascript", "İngilizce", "Araştırma", "Takım çalışması"],
};
</script>

<template>
  <div class="relative">
    <div class="w-full h-20 md:h-40 magicpattern-dots-bg flex justify-center">
      <span
        class="flex gap-2 text-xl md:text-3xl font-bold mt-7 uppercase tracking-widest"
        ><Icon
          class="text-2xl mt-[1px] md:text-3xl md:mt-[2px]"
          name="material-symbols-light:work-outline"
        />{{ $t("myJobs") }}</span
      >
    </div>
    <div
      class="px-4 md:px-24 py-12 grid grid-cols-1 gap-8 absolute md:top-[30%] left-0"
    >
      <!-- <Card class="col-span-3 p-3 md:p-8 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <div class="flex gap-2">
            <Icon class="text-xl" name="material-symbols-light:work-outline" />
            <span class="font-bold text-xs md:text-sm">{{
              $t("openProjects")
            }}</span>
          </div>
        </div>
      </Card> -->

      <div class="flex flex-col gap-8 col-span-3">
        <JobCard :job :myJob="true" />
        <JobCard :job :myJob="true" />
        <JobCard :job :myJob="true" />
      </div>

      <Pagination
        class="m-auto"
        v-slot="{ page }"
        :total="40"
        :sibling-count="1"
        show-edges
        :default-page="2"
      >
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <PaginationFirst />
          <PaginationPrev />

          <template v-for="(item, index) in items">
            <PaginationListItem
              v-if="item.type === 'page'"
              :key="index"
              :value="item.value"
              as-child
            >
              <Button
                class="w-10 h-10 p-0"
                :variant="item.value === page ? 'default' : 'outline'"
              >
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </template>

          <PaginationNext />
          <PaginationLast />
        </PaginationList>
      </Pagination>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.magicpattern-dots-bg {
  background-color: #e5e5f7;
  opacity: 0.8;
  background-image: radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px);
  background-size: 10px 10px;
}
</style>
