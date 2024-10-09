<script lang="ts" setup>
import { usePostsStore } from "@/stores/posts";
import { useAppStore } from "@/stores/app";
const postsStore = usePostsStore();
const appStore = useAppStore();

const { status } = useAuth();
const loggedIn = computed(() => status.value === "authenticated");

const posts = computed(() => postsStore.posts);

const favoritesFilterToggle = ref(false);
const appliedFilterToggle = ref(false);

const changeFavoriteFilter = async (isPressed) => {
  if (isPressed) {
    const { data: user } = await useFetch("/api/users/getUser", {
      method: "POST",
      body: JSON.stringify({ id: appStore.activeUser?.id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    postsStore.fetchPosts({
      filtered: {
        favorites: user.value?.favorites,
      },
    });
  } else {
    postsStore.fetchPosts();
  }
};

// Sorting
const changeSort = (sort) => {
  postsStore.fetchPosts({
    filtered: {
      sort,
    },
  });
};
</script>

<template>
  <!-- Settings Sheet -->
  <Sheet v-if="loggedIn">
    <SheetTrigger>
      <div
        class="flex p-1 cursor-pointer text-2xl bg-indigo-800 text-white fixed top-[50%] -right-[8px] rounded transition-all hover:-right-[3px]"
      >
        <Icon name="mynaui:chevron-left" />
      </div>
    </SheetTrigger>
    <SheetsSettings />
  </Sheet>
  <!-- Settings Sheet -->

  <div
    class="col-span-1 grid grid-cols-1 gap-4 bg-slate-50 px-4 py-7 md:px-12 md:grid-cols-3 lg:grid-cols-4"
  >
    <div class="flex flex-col gap-3 gap-2 col-span-3 lg:col-span-1">
      <div>
        <JobFilter />
      </div>
      <div>
        <EmailCard />
      </div>
    </div>
    <div class="flex flex-col gap-4 col-span-3">
      <!-- filters -->
      <div class="flex gap-4">
        <div class="w-full flex items-center border bg-white rounded-lg">
          <Icon name="mynaui:location" class="text-xl ms-2" />

          <Select @update:modelValue="changeSort">
            <SelectTrigger
              class="text-xs outline-none border-none focus:outline-none focus:ring-0 focus:ring-offset-0"
            >
              <SelectValue :placeholder="$t('newToOld')" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="newToOld">{{ $t("newToOld") }}</SelectItem>
                <SelectItem value="oldToNew">{{ $t("oldToNew") }}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <!-- filter favorites -->
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger class="flex items-center gap-1">
                <Toggle
                  variant="outline"
                  v-model:pressed="favoritesFilterToggle"
                  @update:pressed="changeFavoriteFilter"
                >
                  <Icon
                    :name="
                      favoritesFilterToggle
                        ? 'material-symbols-light:bookmark'
                        : 'material-symbols-light:bookmark-outline'
                    "
                    class="text-3xl cursor-pointer bg-green-300"
                /></Toggle>
              </TooltipTrigger>
              <TooltipContent>
                <p>{{ $t("favoritesOnly") }}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <!-- filter favorites -->
      </div>
      <!-- filters -->

      <div class="flex flex-col gap-4">
        <!-- jobs -->
        <div class="grid lg:grid-cols-2 gap-2">
          <JobCard
            v-if="posts.length > 0"
            v-for="(post, index) in posts"
            :key="index"
            :job="post"
          />
          <Alert v-else variant="destructive" class="col-span-2">
            <AlertDescription class="flex gap-2 items-center">
              <Icon name="mdi:checkbox-blank-badge-outline" />
              {{ $t("noOneHasSharedAnythingYet") }}
            </AlertDescription>
          </Alert>
          <!-- <JobCard :job :appliedButRemoved="true" /> -->
        </div>
        <!-- jobs -->

        <Pagination
          v-if="posts.length > 0"
          class="mx-auto"
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
  </div>
</template>
