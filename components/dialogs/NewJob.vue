<script lang="ts" setup>
import { formSchema } from "@/schemas/createJobSchema";
import { useForm } from "vee-validate";
import { usePostsStore } from "@/stores/posts";
import { useAppStore } from "@/stores/app";
import { useToast } from "@/components/ui/toast/use-toast";
const { t } = useI18n();
const { toast } = useToast();
const postsStore = usePostsStore();
const appStore = useAppStore();

const { handleSubmit } = useForm({
  validationSchema: formSchema(),
});

const requirements = ref();

const onSubmit = handleSubmit(async (values) => {
  await postsStore.createPost({
    user: appStore.activeUser.id,
    ...values,
    requirements: requirements.value,
  });

  toast({
    title: t("added"),
  });
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
          <FormField v-slot="{ componentField }" name="title">
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
            <FormField v-slot="{ componentField }" name="location">
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
                        <SelectItem value="apple"> Şehir1 </SelectItem>
                        <SelectItem value="banana"> Şehir2 </SelectItem>
                        <SelectItem value="blueberry"> Şehir3 </SelectItem>
                        <SelectItem value="grapes"> Şehir4 </SelectItem>
                        <SelectItem value="pineapple"> Şehir5 </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </FormControl>
                </Select>
                <FormMessage class="text-xs" />
              </FormItem>
            </FormField>
          </div>

          <div>
            <FormField v-slot="{ componentField }" name="estimatedJobTime">
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
                        <SelectItem value="apple">0-1 Ay </SelectItem>
                        <SelectItem value="banana"> 1-3 Ay </SelectItem>
                        <SelectItem value="blueberry"> 3-6 Ay </SelectItem>
                        <SelectItem value="grapes"> 6-12 Ay </SelectItem>
                        <SelectItem value="pineapple"> 12 Ay > </SelectItem>
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
          <FormField v-slot="{ componentField }" name="description">
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
          <TagsInput v-model="requirements">
            <TagsInputItem
              v-for="(requirement, index) in requirements"
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
        <DialogClose as-child>
          <Button type="submit">{{ $t("create") }}</Button>
        </DialogClose>
      </DialogFooter>
    </form>
  </DialogContent>
</template>
