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
  <div class="bg-gradient pt-24">
    <div class="px-4 md:px-24 py-12 grid grid-cols-1 gap-8 bg-white">
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
.bg-gradient {
  background: rgb(186, 213, 242);
  background: linear-gradient(
    103deg,
    rgba(186, 213, 242, 1) 0%,
    rgba(253, 252, 227, 1) 100%
  );
}
</style>
