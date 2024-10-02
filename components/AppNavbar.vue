<script lang="ts" setup>
const localePath = useLocalePath();

const { status, signOut } = useAuth();

const loggedIn = computed(() => status.value === "authenticated");
</script>

<template>
  <div
    class="flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center py-5 px-12"
  >
    <nuxt-link :to="localePath('/')"
      ><div class="text-lg">teammate</div></nuxt-link
    >
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
        <li v-if="!loggedIn">
          <nuxt-link :to="localePath('/auth/login')">
            <Button class="text-xs" variant="outline">{{ $t("login") }}</Button>
          </nuxt-link>
        </li>

        <li v-if="!loggedIn">
          <nuxt-link :to="localePath('/auth/signup')">
            <Button class="text-xs">{{ $t("signup") }}</Button>
          </nuxt-link>
        </li>

        <li v-if="loggedIn">
          <Dialog>
            <DialogTrigger as-child>
              <Button class="text-xs gap-1">
                <Icon class="text-xl" name="mynaui:plus-circle" />
                {{ $t("findATeammate") }}</Button
              >
            </DialogTrigger>

            <!--  New Jobs Modal-->
            <DialogsNewJob />
            <!--  New Jobs Modal-->
          </Dialog>
        </li>

        <li v-if="loggedIn">
          <nuxt-link to="/user/myjobs">
            <Button size="icon" variant="outline">
              <Icon
                class="text-xl"
                name="material-symbols-light:work-outline"
              />
            </Button>
          </nuxt-link>
        </li>

        <li v-if="loggedIn">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button size="icon" variant="outline">
                <Icon
                  class="text-xl"
                  name="material-symbols-light:account-circle-outline"
                />
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
                  <nuxt-link
                    :to="localePath('/user/profile')"
                    class="flex gap-2"
                    ><Icon name="mynaui:user" class="text-xl" />
                    <span>{{ $t("profile") }}</span></nuxt-link
                  >
                </DropdownMenuItem>

                <DropdownMenuItem class="flex gap-2">
                  <Icon name="la:cog" class="text-xl" />
                  <nuxt-link :to="localePath('/user/settings')">
                    <span>{{ $t("settings") }}</span>
                  </nuxt-link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              <DropdownMenuItem class="flex gap-2">
                <Icon name="mynaui:logout" class="text-xl" />
                <nuxt-link to="/" @click="signOut()">
                  <span>{{ $t("logout") }}</span>
                </nuxt-link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>

        <li>
          <SelectLanguage />
        </li>
      </ul>
    </div>
  </div>
</template>
