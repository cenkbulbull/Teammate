<template>
  <div
    class="flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center py-5 text-xs px-12"
  >
    <nuxt-link to="/"><div class="text-lg">teammate</div></nuxt-link>
    <!-- <ul class="flex gap-1 md:gap-10">
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
        <nuxt-link
          class="px-5 py-2 rounded-lg hover:bg-slate-100"
          to="https://github.com/cenkbulbull/Teammate"
          target="blank"
          >Github</nuxt-link
        >
      </li>
    </ul> -->

    <div>
      <ul class="flex gap-2">
        <li>
          <nuxt-link to="/auth/login">
            <Button class="text-xs" variant="outline">{{ $t("login") }}</Button>
          </nuxt-link>
        </li>

        <li>
          <nuxt-link to="/auth/signup">
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

        <li>
          <nuxt-link to="/user/myprojects">
            <Button size="icon" variant="outline">
              <Icon class="text-xl" name="mynaui:bell" />
            </Button>
          </nuxt-link>
        </li>

        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button size="icon" variant="outline">
              <Icon class="text-xl" name="mynaui:user-circle" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-56 mr-12">
            <DropdownMenuLabel class="flex items-center gap-2">
              <Avatar class="w-6 h-6">
                <AvatarImage src="https://github.com/radix-vue.png" />
                <AvatarFallback>CB</AvatarFallback>
                <!--src gelmezse isim soyisim ilk harflerini al-->
              </Avatar>
              <span>Cenk Bülbül</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <nuxt-link to="/user/profile" class="flex gap-2"
                  ><Icon name="mynaui:user" class="text-xl" />
                  <span>Profile</span></nuxt-link
                >
              </DropdownMenuItem>

              <DropdownMenuItem class="flex gap-2">
                <Icon name="la:cog" class="text-xl" />
                <nuxt-link to="/user/settings">
                  <span>Settings</span>
                </nuxt-link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuItem @click="console.log('logout')" class="flex gap-2">
              <Icon name="mynaui:logout" class="text-xl" />
              <nuxt-link to="">
                <span>Log out</span>
              </nuxt-link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ul>
    </div>
  </div>
</template>
