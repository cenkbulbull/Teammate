<template>
  <Card>
    <CardHeader class="gap-4">
      <CardTitle class="flex items-center gap-1"
        ><Icon name="mynaui:envelope" />
        <span class="text-lg tracking-wide">{{ $t("emailMeForJobs") }}</span>
      </CardTitle>
      <CardDescription class="text-xs"
        >{{ $t("subscribeText") }}
      </CardDescription>
    </CardHeader>
    <CardContent
      ><Input
        type="email"
        placeholder="name@mail.com"
        class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
    /></CardContent>
    <CardFooter>
      <Button class="text-xs w-full">{{ $t("subscribe") }}</Button>
    </CardFooter>
  </Card>
</template>
