<script lang="ts" setup>
const requirements = ref();
</script>
<template>
  <DialogContent>
    <DialogHeader>
      <DialogTitle class="flex gap-2"
        ><Icon name="mynaui:briefcase" /> {{ $t("findATeammate") }}</DialogTitle
      >
    </DialogHeader>
    <div class="grid gap-4 py-3">
      <div>
        <Input
          id="title"
          :placeholder="$t('title')"
          class="col-span-3 w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
        />
      </div>

      <div class="grid grid-cols-2 gap-2">
        <div>
          <Select>
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
          </Select>
        </div>

        <div>
          <Select>
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
          </Select>
        </div>
      </div>

      <div>
        <Textarea
          class="text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
          :placeholder="$t('jobDescriptionText')"
        />
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

          <TagsInputInput :placeholder="$t('requirementsText')" />
        </TagsInput>
      </div>
    </div>
    <DialogFooter>
      <Button type="submit">{{ $t("create") }}</Button>
    </DialogFooter>
  </DialogContent>
</template>
