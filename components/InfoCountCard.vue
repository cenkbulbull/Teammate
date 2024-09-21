<script lang="ts" setup>
defineProps({
  icon: String,
  iconBg: String,
  text: String,
  count: String,
});
</script>

<template>
  <Card class="w-full max-w-xs p-2 text-slate-800">
    <CardContent class="flex gap-3 p-2">
      <div
        class="flex items-center p-3 rounded text-xl text-white"
        :class="iconBg"
      >
        <Icon :name="icon" />
      </div>
      <div>
        <p class="text-lg font-bold">{{ count }}</p>
        <p class="text-xs">{{ text }}</p>
      </div>
    </CardContent>
  </Card>
</template>
