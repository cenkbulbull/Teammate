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
  <SheetContent class="px-0 w-100">
    <SheetHeader>
      <SheetTitle class="flex items-center gap-1 px-4"
        ><Icon name="mynaui:briefcase" class="text-xl" />
        {{ $t("myWorks") }}</SheetTitle
      >
      <div class="flex flex-col gap-3 overflow-auto max-h-[90vh]">
        <JobCard :job :myJob="true" />
        <JobCard :job :myJob="true" />
        <JobCard :job :myJob="true" />
        <JobCard :job :myJob="true" />
        <JobCard :job :myJob="true" />
      </div>
    </SheetHeader>
  </SheetContent>
</template>
