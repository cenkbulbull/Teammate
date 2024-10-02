<script lang="ts" setup>
definePageMeta({
  layout: "user",
});

const job: Job = {
  id: "ac789xc",
  user: "Paylaşan İsim",
  title: "Frontend Developer",
  location: "Remote",
  estimatedJobTime: "1-3",
  description:
    "TIKLANINCA DRAWER AÇ Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scr, when an unknown printer took a galley of type and scr, when an unknown printer took a galley of type and scr, when an unknown printer took a galley of type and scr, when an unknown printer took a galley of type and scr, when an unknown printer took a galley of type and scr, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  requirements: ["Javascript", "İngilizce", "Araştırma", "Takım çalışması"],
};
</script>

<template>
  <div class="relative">
    <div class="w-full h-20 md:h-40 magicpattern-dots-bg"></div>

    <div
      class="px-4 md:px-24 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 absolute top-0 md:top-[32%] left-0"
    >
      <Card class="col-span-3 p-3 md:p-8 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <Avatar class="w-8 h-8 md:w-12 md:h-12">
            <AvatarImage src="https://github.com/radix-vue.png" />
            <AvatarFallback>CB</AvatarFallback>
            <!-- src gelmezse isim soyisim ilk harflerini al -->
          </Avatar>
          <div class="flex flex-col gap-1">
            <span class="font-bold text-xs md:text-sm">Cenk Bülbül</span>
            <span class="text-xs">Meslek bilgisi</span>
          </div>
        </div>

        <div>
          <a href="mailto:">
            <Button variant="outline" class="flex items-center gap-2">
              <Icon name="mynaui:send" />
              <span class="text-xs">{{ $t("sendMail") }}</span>
            </Button>
          </a>
        </div>
      </Card>

      <div class="flex flex-col gap-4 col-span-3 md:col-span-2">
        <div class="flex flex-col gap-4 text-xs">
          <div class="font-bold">
            {{ $t("biography") }}
          </div>
          <div class="leading-6">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil,
            temporibus tempora! Sunt cum dicta ad nulla illum aliquam, dolorem
            rem maiores explicabo inventore voluptatem voluptate, est quos
            repellendus quae aut optio, vero ex numquam quasi. Praesentium illo
            tempore ut consequuntur temporibus, veritatis quasi neque dicta
            incidunt maiores facilis eligendi blanditiis quo, laudantium, id
            minus quam sunt itaque quis rerum. Nulla obcaecati ipsam quae
            placeat incidunt expedita numquam sunt, repellat consectetur tenetur
            harum quod eligendi velit officia, maxime dolor perferendis tempora
            id architecto. Magnam ducimus consequatur necessitatibus magni
            veritatis minus facere at deleniti quis eaque? Alias fugit
            laudantium veniam perferendis facilis.
          </div>
        </div>

        <div class="flex flex-col gap-4 text-xs">
          <div class="font-bold">
            {{ $t("abilities") }}
          </div>
          <div class="flex flex-wrap gap-2">
            <Badge
              variant="secondary"
              class="py-2 px-6"
              v-for="(i, index) in 24"
              >Html {{ index }}</Badge
            >
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4 col-span-3 md:col-span-1">
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
                <span><a href="tel:097029327428">097029327428</a></span>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <div class="flex items-center p-1 rounded">
                <Icon name="mynaui:envelope-open" class="text-3xl" />
              </div>
              <div class="flex flex-col text-xs gap-1">
                <span class="text-slate-600">{{ $t("email") }}</span>
                <span><a href="mailto:test@mail.com">test@mail.com</a></span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle class="font-bold text-xs">{{
              $t("socialLinks")
            }}</CardTitle>
          </CardHeader>
          <CardContent class="flex gap-3">
            <a href="#">
              <Button
                size="icon"
                variant="outline"
                class="hover:bg-indigo-800 hover:text-white"
                ><Icon name="mynaui:globe" class="text-2xl" />
              </Button>
            </a>
            <a href="#">
              <Button
                size="icon"
                variant="outline"
                class="hover:bg-indigo-800 hover:text-white"
                ><Icon name="mynaui:brand-github" class="text-2xl" />
              </Button>
            </a>
            <a href="#">
              <Button
                size="icon"
                variant="outline"
                class="hover:bg-indigo-800 hover:text-white"
                ><Icon name="mynaui:brand-linkedin" class="text-2xl" />
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.magicpattern-dots-bg {
  background-color: #e5e5f7;
  opacity: 0.8;
  background-image: radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px);
  background-size: 10px 10px;
}
</style>
