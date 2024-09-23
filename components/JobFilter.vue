<script lang="ts" setup>
const locations = [
  {
    id: "remote",
    label: "Remote",
  },
  {
    id: "istanbul",
    label: "İstanbul",
  },
  {
    id: "ankara",
    label: "Ankara",
  },
  {
    id: "zonguldak",
    label: "Zonguldak",
  },
];

const dateofposting = [
  {
    id: "alltime",
    label: "All Time",
  },
  {
    id: "last24hours",
    label: "Last 24 hours",
  },
  {
    id: "last7days",
    label: "Last 7 days",
  },
];

const jobTime = [
  {
    id: "0-1ay",
    label: "0-1 Ay",
  },
  {
    id: "1-3ay",
    label: "1-3 Ay",
  },
  {
    id: "3-6ay",
    label: "3-6 Ay",
  },
  {
    id: "6-12ay",
    label: "6-12 Ay",
  },
  {
    id: "12ay>",
    label: "12 Ay >",
  },
];

const filter = reactive({
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
</script>

<template>
  <Card>
    <CardContent class="flex flex-col mt-3 gap-5">
      <!-- location -->
      <div class="flex flex-col gap-2">
        <p class="font-bold text-xs">Location</p>
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
          <Label class="text-xs" :for="location.id">{{ location.label }}</Label>
        </div>
      </div>

      <!-- posting time -->
      <div class="flex flex-col gap-2">
        <p class="font-bold text-xs">Date of Posting</p>
        <RadioGroup v-model="filter.postingTime">
          <div
            v-for="date in dateofposting"
            class="flex items-center space-x-2"
          >
            <RadioGroupItem :key="date.id" :id="date.id" :value="date.id" />
            <Label class="text-xs" :for="date.id">{{ date.label }}</Label>
          </div>
        </RadioGroup>
      </div>

      <!-- job time -->
      <div class="flex flex-col gap-2">
        <p class="font-bold text-xs">Job Time</p>
        <div v-for="time in jobTime" :key="time.id" class="flex gap-2">
          <Checkbox
            :id="time.id"
            @update:checked="
              (event) => {
                filterJobTime(event, time.id);
              }
            "
          />
          <Label class="text-xs" :for="time.id">{{ time.label }}</Label>
        </div>
      </div>
      <Button @click="console.log(filter)">Filter</Button>
    </CardContent>
  </Card>
</template>
