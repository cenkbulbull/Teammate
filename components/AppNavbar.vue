<template>
  <div class="flex justify-between items-center py-5 text-xs px-12">
    <div class="text-lg">teammate</div>
    <ul class="flex gap-10">
      <li>
        <nuxt-link class="px-5 py-2 rounded-lg hover:bg-slate-100" to="/a"
          >Jobs List</nuxt-link
        >
      </li>
      <li>
        <nuxt-link class="px-5 py-2 rounded-lg hover:bg-slate-100" to="/a">{{
          $t("whatIsTeammate")
        }}</nuxt-link>
      </li>
      <li>
        <nuxt-link class="px-5 py-2 rounded-lg hover:bg-slate-100" to="/a"
          >Github</nuxt-link
        >
      </li>
    </ul>

    <div>
      <ul class="flex gap-2">
        <li>
          <nuxt-link to="">
            <Button class="text-xs" variant="outline">{{ $t("login") }}</Button>
          </nuxt-link>
        </li>

        <li>
          <nuxt-link to="a">
            <Button
              class="text-xs bg-sky-700 text-white hover:bg-slate-100 hover:text-inherit"
              >{{ $t("signup") }}</Button
            >
          </nuxt-link>
        </li>

        <li>
          <Dialog>
            <DialogTrigger as-child>
              <Button
                class="text-xs bg-sky-700 text-white hover:bg-slate-100 hover:text-inherit gap-1"
              >
                <Icon class="text-xl" name="mynaui:plus-circle" />
                {{ $t("findATeammate") }}</Button
              >
            </DialogTrigger>

            <!--  New Jobs Modal-->
            <DialogsNewJob />
            <!--  New Jobs Modal-->
          </Dialog>
        </li>
      </ul>
    </div>
  </div>
</template>
