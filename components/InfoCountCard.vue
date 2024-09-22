<script lang="ts" setup>
const props = defineProps<{
  info: Info;
}>();
</script>

<template>
  <Card class="w-full max-w-xs p-2 text-slate-800">
    <CardContent class="flex gap-3 p-2">
      <div
        class="flex items-center p-3 rounded text-xl text-white"
        :class="info.iconBg"
      >
        <Icon :name="info.icon" />
      </div>
      <div>
        <p class="text-lg font-bold">{{ info.count }}</p>
        <p class="text-xs">{{ info.text }}</p>
      </div>
    </CardContent>
  </Card>
</template>
