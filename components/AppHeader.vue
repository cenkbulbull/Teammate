<script lang="ts" setup>
import { usePostsStore } from "@/stores/posts";
import { useUsersStore } from "@/stores/users";
const postsStore = usePostsStore();
const usersStore = useUsersStore();

const { locale, setLocale, t } = useI18n();

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
      <Card class="w-full max-w-xs p-2 text-slate-800">
        <CardContent class="flex gap-3 p-2">
          <div
            class="flex items-center p-3 rounded text-xl text-white bg-green-300"
          >
            <Icon name="mynaui:users" />
          </div>
          <div>
            <p class="text-lg font-bold">
              {{ usersStore.users.length }}
            </p>
            <p class="text-xs">{{ $t("users") }}</p>
          </div>
        </CardContent>
      </Card>

      <Card class="w-full max-w-xs p-2 text-slate-800">
        <CardContent class="flex gap-3 p-2">
          <div
            class="flex items-center p-3 rounded text-xl text-white bg-violet-300"
          >
            <Icon name="mynaui:users" />
          </div>
          <div>
            <p class="text-lg font-bold">{{ postsStore.totalPosts || 0 }}</p>
            <p class="text-xs">{{ $t("jobs") }}</p>
          </div>
        </CardContent>
      </Card>

      <!-- Bugün açılan ilanların sayısı -->
      <Card class="w-full max-w-xs p-2 text-slate-800">
        <CardContent class="flex gap-3 p-2">
          <div
            class="flex items-center p-3 rounded text-xl text-white bg-sky-700"
          >
            <Icon name="mynaui:bell" />
          </div>
          <div>
            <p class="text-lg font-bold">
              {{
                postsStore.allPosts.filter((post) => {
                  const postDate = new Date(post.createdAt);
                  const today = new Date();
                  const todayStart = new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate()
                  );
                  const todayEnd = new Date(todayStart);
                  todayEnd.setDate(todayEnd.getDate() + 1); // Bugünün sonu

                  // Konsola yazdırma
                  if (postDate >= todayStart && postDate < todayEnd) {
                    console.log(
                      `Post: ${post.title}, Created At: ${post.createdAt}`
                    );
                    return true; // Bugün paylaşılan postları döndür
                  }
                  return false; // Bugün değilse döndürme
                }).length
              }}
            </p>
            <p class="text-xs">{{ $t("newJobs") }}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
