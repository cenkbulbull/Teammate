<template>
  <div class="flex flex-col gap-5 py-16 px-12">
    <div class="text-4xl font-bold">
      Find your <span class="text-sky-700">new job</span> today
    </div>
    <div class="text-slate-600">
      Thousands of jobs in the computer, engineering and technology sectors are
      waiting for you.
    </div>

    <div
      class="flex justify-between border border-slate-100 border-solid divide-x"
    >
      <div class="w-full flex items-center">
        <Icon name="mynaui:search" class="text-xl ms-2" />
        <Input
          id="search"
          type="text"
          placeholder="What position are you looking for?"
          class="w-full border-none text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
        />
      </div>

      <div class="w-full flex items-center">
        <Icon name="mynaui:location" class="text-xl ms-2" />

        <Select>
          <SelectTrigger
            class="text-xs outline-none border-none focus:outline-none focus:ring-0 focus:ring-offset-0"
          >
            <SelectValue placeholder="Location" />
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
        <Button class="bg-sky-700 rounded-none text-xs w-full hover:bg-sky-700"
          >Search job</Button
        >
      </div>
    </div>

    <div class="grid md:grid-cols-4 sm:grid-cols-2 gap-5">
      <InfoCountCard
        icon="mynaui:users"
        iconBg="bg-violet-300"
        text="Users"
        count="1000"
      />

      <InfoCountCard
        icon="mynaui:briefcase"
        iconBg="bg-green-300"
        text="Jobs"
        count="300"
      />

      <InfoCountCard
        icon="mynaui:bell"
        iconBg="bg-sky-700"
        text="New Jobs"
        count="30"
      />
    </div>
  </div>
</template>
