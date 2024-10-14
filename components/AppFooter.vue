<template>
  <footer class="bg-card">
    <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 text-xs">
      <div class="md:flex md:justify-between">
        <div class="mb-6 md:mb-0">
          <a href="/" class="flex items-center">
            <span class="self-center text-2xl font-semibold whitespace-nowrap">
              <span class="logo-text-gradient">team</span>mate</span
            >
          </a>
        </div>
        <div class="grid grid-cols-2 gap-8 sm:gap-6">
          <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">
              {{ $t("about") }}
            </h2>
            <ul class="text-gray-500 font-medium">
              <li class="mb-4">
                <nuxt-link to="contact" class="hover:underline">{{
                  $t("contact")
                }}</nuxt-link>
              </li>
              <li>
                <nuxt-link href="about" class="hover:underline">{{
                  $t("whatIsTeammate")
                }}</nuxt-link>
              </li>
            </ul>
          </div>
          <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase">
              {{ $t("legal") }}
            </h2>
            <ul class="text-gray-500 font-medium">
              <li class="mb-4">
                <a href="#" class="hover:underline">{{
                  $t("privacyPolicy")
                }}</a>
              </li>
              <li>
                <a href="#" class="hover:underline">{{
                  $t("termsConditions")
                }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
      <div class="sm:flex sm:items-center sm:justify-between">
        <span class="text-sm text-gray-500 sm:text-center"
          >© 2024
          <a href="" class="hover:underline">teammate</a>
          {{ $t("openSource") }}
        </span>
        <div class="flex mt-4 sm:justify-center sm:mt-0">
          <a href="#" class="text-gray-500 hover:text-gray-900">
            <Icon name="mynaui:brand-linkedin" class="text-xl" />
            <span class="sr-only">Linkedin page</span>
          </a>

          <a href="#" class="text-gray-500 hover:text-gray-900 ms-5">
            <Icon name="mynaui:brand-github" class="text-xl" />
            <span class="sr-only">GitHub account</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
