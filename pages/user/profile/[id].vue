<script lang="ts" setup>
definePageMeta({
  layout: "user",
});

const route = useRoute();
const userId = route.params.id;

const { data } = useFetch("/api/users/getUser", {
  method: "POST",
  body: JSON.stringify({ id: userId }),
  headers: {
    "Content-Type": "application/json",
  },
});

// Kullanıcı verilerini filtrele
const user = computed(() => {
  if (!data.value) return null; // Veri henüz gelmemişse null döndür
  const { password, authMethod, _id, __v, ...filteredUser } = data.value;
  return filteredUser;
});

const avatarFallback = computed(() => {
  const firstInitial = user.value?.firstname.charAt(0).toUpperCase();
  const lastInitial = user.value?.lastname.charAt(0).toUpperCase();
  return `${firstInitial}${lastInitial}`;
});
</script>

<template>
  <div v-if="user" class="bg-gradient pt-24">
    <div class="flex flex-col gap-5 px-8 md:px-12 py-6 bg-white">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <Avatar class="w-12 h-12 md:w-24 md:h-24">
            <AvatarImage :src="'/uploads/images/' + user?.profilePhoto" />
            <AvatarFallback>{{ avatarFallback }}</AvatarFallback>
            <!-- src gelmezse isim soyisim ilk harflerini al -->
          </Avatar>
          <div class="flex flex-col gap-1">
            <span class="font-bold text-xs md:text-lg"
              >{{ user?.firstname }} {{ user?.lastname }}</span
            >
            <span class="text-xs">{{ user?.email }}</span>
          </div>
        </div>

        <div v-if="user?.social" class="flex gap-2">
          <a :href="user?.social.web" target="_blank">
            <Button
              size="icon"
              variant="outline"
              class="hover:bg-indigo-800 hover:text-white"
              ><Icon name="mynaui:globe" class="text-2xl" />
            </Button>
          </a>
          <a :href="user?.social.github" target="_blank">
            <Button
              size="icon"
              variant="outline"
              class="hover:bg-indigo-800 hover:text-white"
              ><Icon name="mynaui:brand-github" class="text-2xl" />
            </Button>
          </a>
          <a :href="user?.social.linkedin" target="_blank">
            <Button
              size="icon"
              variant="outline"
              class="hover:bg-indigo-800 hover:text-white"
              ><Icon name="mynaui:brand-linkedin" class="text-2xl" />
            </Button>
          </a>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="col-span-2 flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle class="font-bold text-xs">
                {{ $t("biography") }}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div class="leading-6 text-xs">
                {{ user?.biography }}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle class="font-bold text-xs">
                {{ $t("abilities") }}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div class="flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  class="py-2 px-6"
                  v-for="(ability, index) in user?.abilities"
                  >{{ ability }}</Badge
                >
              </div>
            </CardContent>
          </Card>
        </div>

        <div class="col-span-1 flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle class="font-bold text-xs">{{
                $t("downloadResume")
              }}</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="flex justify-between">
                <div class="flex items-center gap-2">
                  <div class="flex items-center">
                    <Icon name="mynaui:file-text" class="text-4xl" />
                  </div>
                  <div class="flex flex-col text-xs gap-1 text-slate-600">
                    <span>Dosya İsmi</span>
                    <span>{{ $t("pdf") }}</span>
                  </div>
                </div>
                <div>
                  <Button size="icon"
                    ><Icon name="mynaui:download" class="text-2xl" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle class="font-bold text-xs">{{
                $t("contactInformation")
              }}</CardTitle>
            </CardHeader>
            <CardContent class="flex flex-col gap-4">
              <div class="flex items-center gap-2">
                <div class="flex items-center p-1 rounded">
                  <Icon name="mynaui:telephone-call" class="text-3xl" />
                </div>
                <div class="flex flex-col text-xs gap-1">
                  <span class="text-slate-600">{{ $t("phone") }}</span>
                  <span
                    ><a :href="'tel:' + user.telephone">{{
                      user.telephone
                    }}</a></span
                  >
                </div>
              </div>

              <div class="flex items-center gap-2">
                <div class="flex items-center p-1 rounded">
                  <Icon name="mynaui:envelope-open" class="text-3xl" />
                </div>
                <div class="flex flex-col text-xs gap-1">
                  <span class="text-slate-600">{{ $t("email") }}</span>
                  <span
                    ><a :href="'mailto:' + user.email">{{
                      user.email
                    }}</a></span
                  >
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg-gradient {
  background: rgb(186, 213, 242);
  background: linear-gradient(
    103deg,
    rgba(186, 213, 242, 1) 0%,
    rgba(253, 252, 227, 1) 100%
  );
}
</style>
