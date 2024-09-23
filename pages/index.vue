<script lang="ts" setup>
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
  <div
    class="col-span-1 grid grid-cols-1 gap-4 bg-slate-50 px-12 md:grid-cols-3 lg:grid-cols-4 py-7"
  >
    <div class="grid gap-2 col-span-3 lg:col-span-1">
      <div>
        <JobFilter />
      </div>
      <div>
        <EmailCard />
      </div>
    </div>
    <div class="grid gap-4 col-span-3">
      <JobCard :job />
      <JobCard :job />
      <JobCard :job />
      <JobCard :job />

      <Pagination
        class="m-auto"
        v-slot="{ page }"
        :total="100"
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
