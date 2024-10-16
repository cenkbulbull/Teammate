<script lang="ts" setup>
const props = defineProps<{
  post: Job;
}>();

import locations from "@/data/locationsData";
import jobTime from "@/data/jobTimeData";
import { formSchema } from "@/schemas/createJobSchema";
import { useForm } from "vee-validate";
import { useToast } from "@/components/ui/toast/use-toast";

const { t } = useI18n();
const { toast } = useToast();
const postsStore = usePostsStore();
const appStore = useAppStore();
const postDetail = ref({
  title: props.post.title,
  location: props.post.location,
  estimatedJobTime: props.post.estimatedJobTime,
  description: props.post.description,
  requirements: props.post.requirements,
});

const userId = computed(() => appStore.activeUser?.id);

const { handleSubmit } = useForm({
  validationSchema: formSchema(),
});

const onSubmit = handleSubmit(async (values) => {
  await postsStore.updatePost({
    id: props.post.id,
    ...values,
    requirements: postDetail.value.requirements,
  });

  toast({
    title: t("added"),
  });

  await postsStore.fetchMyPosts(userId.value);
});
</script>

<template>
  <Toaster />
  <DialogContent>
    <form @submit="onSubmit">
      <DialogHeader>
        <DialogTitle class="flex gap-2"
          ><Icon name="mynaui:briefcase" />
          {{ $t("findATeammate") }}</DialogTitle
        >
      </DialogHeader>

      <div class="grid gap-4 py-3">
        <div>
          <FormField
            v-slot="{ componentField }"
            name="title"
            v-model="postDetail.title"
          >
            <FormItem>
              <FormControl>
                <Input
                  id="title"
                  :placeholder="$t('title')"
                  v-bind="componentField"
                  class="col-span-3 w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
                />
              </FormControl>
              <FormMessage class="text-xs" />
            </FormItem>
          </FormField>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div>
            <FormField
              v-slot="{ componentField }"
              name="location"
              v-model="postDetail.location"
            >
              <FormItem>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger
                      class="text-xs outline-none focus:outline-none focus:ring-0 focus:ring-offset-0"
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
                  </FormControl>
                </Select>
                <FormMessage class="text-xs" />
              </FormItem>
            </FormField>
          </div>

          <div>
            <FormField
              v-slot="{ componentField }"
              name="estimatedJobTime"
              v-model="postDetail.estimatedJobTime"
            >
              <FormItem>
                <Select v-bind="componentField">
                  <FormControl>
                    <SelectTrigger
                      class="text-xs outline-none focus:outline-none focus:ring-0 focus:ring-offset-0"
                    >
                      <SelectValue :placeholder="$t('estimatedJobTime')" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          v-for="(time, index) in jobTime"
                          :key="index"
                          :value="time.id"
                        >
                          {{ time.label }} {{ $t("month") }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </FormControl>
                </Select>
                <FormMessage class="text-xs" />
              </FormItem>
            </FormField>
          </div>
        </div>

        <div>
          <FormField
            v-slot="{ componentField }"
            name="description"
            v-model="postDetail.description"
          >
            <FormItem>
              <FormControl>
                <Textarea
                  class="text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
                  :placeholder="$t('jobDescriptionText')"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage class="text-xs" />
            </FormItem>
          </FormField>
        </div>

        <div>
          <TagsInput v-model="postDetail.requirements">
            <TagsInputItem
              v-for="(requirement, index) in postDetail.requirements"
              :key="index"
              :value="requirement"
            >
              <TagsInputItemText />
              <TagsInputItemDelete />
            </TagsInputItem>

            <TagsInputInput
              :placeholder="$t('requirementsText')"
              class="text-xs"
            />
          </TagsInput>
        </div>
      </div>

      <DialogFooter>
        <DialogTrigger asChild>
          <Button type="submit">{{ $t("create") }}</Button>
        </DialogTrigger>
      </DialogFooter>
    </form>
  </DialogContent>
</template>
