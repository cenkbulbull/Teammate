<script lang="ts" setup>
import { useAppStore } from "@/stores/app";
import { usePostsStore } from "@/stores/posts";
const appStore = useAppStore();
const postsStore = usePostsStore();

const { locale, setLocale, t } = useI18n();

const postTypes = [
  {
    id: "all",
  },
  {
    id: "appliedOnly",
  },
];

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

const dateofposting = [
  {
    id: "allTime",
  },
  {
    id: "last24hours",
  },
  {
    id: "last7days",
  },
];

const jobTime = [
  {
    id: "0-1",
    label: "0-1",
  },
  {
    id: "1-3",
    label: "1-3",
  },
  {
    id: "3-6",
    label: "3-6",
  },
  {
    id: "6-12",
    label: "6-12",
  },
  {
    id: "12>",
    label: "12 >",
  },
];

const filter = reactive({
  postType: "all",
  location: [],
  postingTime: null,
  jobTime: [],
});

const filterLocation = (e: Boolean, id: String) => {
  e
    ? filter.location.push(id)
    : (filter.location = filter.location.filter((location) => location !== id));
};

const filterJobTime = (e: Boolean, id: String) => {
  e
    ? filter.jobTime.push(id)
    : (filter.jobTime = filter.jobTime.filter((jobTime) => jobTime !== id));
};

const filterPosts = () => {
  if (filter.postType === "appliedOnly") {
    postsStore.fetchPosts({
      filtered: {
        applied: appStore.activeUser?.applied,
        ...filter,
      },
    });
  } else {
    postsStore.fetchPosts({
      filtered: {
        ...filter,
      },
    });
  }
};
</script>

<template>
  <Card>
    <CardContent class="flex flex-col mt-3 gap-5">
      <!-- post type -->
      <div class="flex flex-col gap-2">
        <p class="font-bold text-xs">{{ $t("postType") }}</p>
        <RadioGroup default-value="all" v-model="filter.postType">
          <div
            v-for="postType in postTypes"
            class="flex items-center space-x-2"
          >
            <RadioGroupItem
              :key="postType.id"
              :id="postType.id"
              :value="postType.id"
            />
            <Label class="text-xs" :for="postType.id">{{
              $t(postType.id)
            }}</Label>
          </div>
        </RadioGroup>
      </div>

      <!-- location -->
      <div class="flex flex-col gap-2">
        <p class="font-bold text-xs">{{ $t("location") }}</p>
        <div
          v-for="location in locations"
          :key="location.id"
          class="flex gap-2"
        >
          <Checkbox
            :id="location.id"
            @update:checked="
              (event) => {
                filterLocation(event, location.id);
              }
            "
          />
          <Label class="text-xs" :for="location.id">{{
            $t(location.id)
          }}</Label>
        </div>
      </div>

      <!-- posting time -->
      <div class="flex flex-col gap-2">
        <p class="font-bold text-xs">{{ $t("dateOfPosting") }}</p>
        <RadioGroup v-model="filter.postingTime">
          <div
            v-for="date in dateofposting"
            class="flex items-center space-x-2"
          >
            <RadioGroupItem :key="date.id" :id="date.id" :value="date.id" />
            <Label class="text-xs" :for="date.id">{{ $t(date.id) }}</Label>
          </div>
        </RadioGroup>
      </div>

      <!-- job time -->
      <div class="flex flex-col gap-2">
        <p class="font-bold text-xs">{{ $t("estimatedJobTime") }}</p>
        <div v-for="time in jobTime" :key="time.id" class="flex gap-2">
          <Checkbox
            :id="time.id"
            @update:checked="
              (event) => {
                filterJobTime(event, time.id);
              }
            "
          />
          <Label class="text-xs" :for="time.id"
            >{{ time.label }} {{ $t("month") }}</Label
          >
        </div>
      </div>
      <Button @click="filterPosts" class="text-xs">{{ $t("filter") }}</Button>
    </CardContent>
  </Card>
</template>
