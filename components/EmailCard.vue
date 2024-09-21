<template>
  <Card class="max-w-lg">
    <CardHeader class="gap-4">
      <CardTitle class="flex items-center gap-1"
        ><Icon name="mynaui:envelope" />
        <span class="text-lg tracking-wide">Email me for jobs</span>
      </CardTitle>
      <CardDescription class="text-xs"
        >Ut esse eiusmod aute. Sit enim labore dolore. Aute ea fugiat commodo ea
        foes.
      </CardDescription>
    </CardHeader>
    <CardContent
      ><Input
        type="email"
        placeholder="name@mail.com"
        class="w-full text-xs focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
    /></CardContent>
    <CardFooter>
      <Button
        class="text-xs bg-sky-700 text-white hover:bg-slate-100 hover:text-inherit w-full"
        >Subscribe</Button
      >
    </CardFooter>
  </Card>
</template>
