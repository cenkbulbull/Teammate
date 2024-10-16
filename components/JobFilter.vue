<script lang="ts" setup>
import locations from "@/data/locationsData";
import jobTime from "@/data/jobTimeData";
import dateofposting from "@/data/dateOfPostingData";
import postTypes from "@/data/postTypesData";

const appStore = useAppStore();
const postsStore = usePostsStore();
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
