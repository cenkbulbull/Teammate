<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

const value = ref<string[]>([]);
const handleComplete = (e: string[]) => alert(e.join(""));
</script>

<template>
  <div
    class="w-full flex justify-center lg:grid lg:grid-cols-2 h-[100vh] overflow-hidden"
  >
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-center">
          <h1 class="text-2xl font-bold">{{ $t("confirmation") }}</h1>
          <p class="text-xs text-muted-foreground">
            {{ $t("emailVerifyText", { mail: "cenkbulbul67@gmail.com" }) }}
          </p>
        </div>
        <div class="grid gap-4">
          <div class="m-auto">
            <PinInput
              id="pin-input"
              v-model="value"
              placeholder="○"
              @complete="handleComplete"
            >
              <PinInputGroup>
                <PinInputInput
                  v-for="(id, index) in 5"
                  :key="id"
                  :index="index"
                />
              </PinInputGroup>
            </PinInput>
          </div>

          <Button variant="outline" class="w-full">{{
            $t("resendCode")
          }}</Button>
          <Button class="w-full">{{ $t("continue") }}</Button>
        </div>
      </div>
    </div>
    <div class="hidden bg-muted lg:block">
      <img
        src="https://placehold.co/200"
        alt="Image"
        width="1920"
        height="1080"
        class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  </div>
</template>
