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
  <div class="flex flex-col gap-4 py-8 px-4 md:px-12">
    <div class="grid lg:grid-cols-4 gap-y-4 lg:gap-4">
      <div class="flex flex-col col-span-3 gap-3">
        <Card class="p-3 flex justify-between items-center">
          <div class="flex items-center gap-2">
            <Avatar class="w-8 h-8">
              <AvatarImage src="https://github.com/radix-vue.png" />
              <AvatarFallback>CB</AvatarFallback>
              <!--src gelmezse isim soyisim ilk harflerini al-->
            </Avatar>
            <div class="flex flex-col">
              <span class="font-bold text-sm">Cenk Bülbül</span>
              <span class="text-xs">Meslek bilgisi</span>
            </div>
          </div>

          <div>
            <a href="mailto:">
              <Button variant="outline" class="flex items-center gap-2">
                <Icon name="mynaui:send" />
                <span>{{ $t("sendMail") }}</span>
              </Button>
            </a>
          </div>
        </Card>

        <div class="grid grid-cols-3 flex gap-3">
          <div class="flex flex-col col-span-3 lg:col-span-2 gap-3">
            <Card>
              <CardHeader>
                <CardTitle class="text-md">{{ $t("biography") }}</CardTitle>
              </CardHeader>
              <CardContent>
                <p class="text-xs">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Nihil, temporibus tempora! Sunt cum dicta ad nulla illum
                  aliquam, dolorem rem maiores explicabo inventore voluptatem
                  voluptate, est quos repellendus quae aut optio, vero ex
                  numquam quasi. Praesentium illo tempore ut consequuntur
                  temporibus, veritatis quasi neque dicta incidunt maiores
                  facilis eligendi blanditiis quo, laudantium, id minus quam
                  sunt itaque quis rerum. Nulla obcaecati ipsam quae placeat
                  incidunt expedita numquam sunt, repellat consectetur tenetur
                  harum quod eligendi velit officia, maxime dolor perferendis
                  tempora id architecto. Magnam ducimus consequatur
                  necessitatibus magni veritatis minus facere at deleniti quis
                  eaque? Alias fugit laudantium veniam perferendis facilis.
                </p>
              </CardContent>
            </Card>

            <Card class="col-span-3 lg:col-span-1">
              <CardHeader>
                <CardTitle class="text-md">{{ $t("abilities") }}</CardTitle>
              </CardHeader>
              <CardContent class="flex gap-3 flex-wrap">
                <Badge v-for="(i, index) in 24" class="bg-green-500"
                  >Html {{ index }}</Badge
                >
                <Badge class="bg-sky-700">Css</Badge>
                <Badge>Javacript</Badge>
                <Badge>Responsive Web Design</Badge>
              </CardContent>
            </Card>
          </div>

          <div class="col-span-3 lg:col-span-1 flex flex-col gap-3">
            <Card>
              <CardHeader>
                <CardTitle class="text-md">{{
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

            <Card class="col-span-3 lg:col-span-1">
              <CardHeader>
                <CardTitle class="text-md">{{
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
                    <span class="font-bold">097029327428</span>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <div class="flex items-center p-1 rounded">
                    <Icon name="mynaui:envelope-open" class="text-3xl" />
                  </div>
                  <div class="flex flex-col text-xs gap-1">
                    <span class="text-slate-600">{{ $t("email") }}</span>
                    <span class="font-bold">test@mail.com</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card class="col-span-3 lg:col-span-1">
              <CardHeader>
                <CardTitle class="text-md">{{ $t("socialLinks") }}</CardTitle>
              </CardHeader>
              <CardContent class="flex gap-3">
                <a href="#">
                  <Button
                    size="icon"
                    variant="outline"
                    class="hover:bg-sky-700 hover:text-white"
                    ><Icon name="mynaui:globe" class="text-2xl" />
                  </Button>
                </a>
                <a href="#">
                  <Button
                    size="icon"
                    variant="outline"
                    class="hover:bg-sky-700 hover:text-white"
                    ><Icon name="mynaui:brand-github" class="text-2xl" />
                  </Button>
                </a>
                <a href="#">
                  <Button
                    size="icon"
                    variant="outline"
                    class="hover:bg-sky-700 hover:text-white"
                    ><Icon name="mynaui:brand-linkedin" class="text-2xl" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div class="col-span-3 lg:col-span-1 flex flex-col gap-3">
        <div class="font-bold text-sm uppercase border-b p-2">
          {{ $t("latest") }}
        </div>
        <JobCard :job />
        <JobCard :job />
      </div>
    </div>
  </div>
</template>
