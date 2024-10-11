<script lang="ts" setup>
import { usePostsStore } from "@/stores/posts";
const postsStore = usePostsStore();

const { locale, setLocale, t } = useI18n();

const infoUsers: Info = {
  icon: "mynaui:users",
  iconBg: "bg-violet-300",
  text: "users",
  count: "1000",
};

const infoJobs: Info = {
  icon: "mynaui:briefcase",
  iconBg: "bg-green-300",
  text: "jobs",
  count: "300",
};

const infoNewJobs: Info = {
  icon: "mynaui:bell",
  iconBg: "bg-sky-700",
  text: "newJobs",
  count: "30",
};

const locations = [
  {
    id: "remote",
    label: "Remote",
  },
  {
    id: "İstanbul",
    label: "İstanbul",
  },
  {
    id: "Ankara",
    label: "Ankara",
  },
  {
    id: "Zonguldak",
    label: "Zonguldak",
  },
];

const postIdOrTitle = ref(null);
const location = ref(null);

const searchJob = () => {
  postsStore.fetchPosts({
    filtered: {
      postIdOrTitle: postIdOrTitle.value,
      location: location.value,
    },
  });
};
</script>
<template>
  <div class="flex flex-col gap-5 py-8 px-4 md:px-12">
    <div class="text-4xl font-bold">
      {{ $t("findTeammatesForYourTeam") }}
    </div>
    <div class="text-slate-600">
      {{ $t("findTeammatesForYourTeamDescription") }}
    </div>

    <div
      class="flex justify-between border border-slate-100 border-solid divide-x flex-wrap md:flex-nowrap gap-2"
    >
      <div class="w-full flex items-center border md:border-none">
        <Icon name="mynaui:search" class="text-xl ms-2" />
        <Input
          id="search"
          type="text"
          :placeholder="$t('searchJobText')"
          v-model="postIdOrTitle"
          class="w-full border-none text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
        />
      </div>

      <div class="w-full flex items-center border md:border-none">
        <Icon name="mynaui:location" class="text-xl ms-2" />
        <Select v-model="location">
          <SelectTrigger
            class="text-xs outline-none border-none focus:outline-none focus:ring-0 focus:ring-offset-0"
          >
            <SelectValue :placeholder="$t('location')" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="(location, index) in locations"
                :key="index"
                :value="location.id"
              >
                {{ location.label }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Button @click="searchJob" class="rounded-none text-xs w-full">{{
          $t("searchJob")
        }}</Button>
      </div>
    </div>

    <div class="grid md:grid-cols-4 sm:grid-cols-2 gap-5">
      <InfoCountCard :info="infoUsers" />

      <InfoCountCard :info="infoJobs" />

      <InfoCountCard :info="infoNewJobs" />
    </div>
  </div>
</template>
