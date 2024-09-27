<template>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>{{ $t("delete") }}</AlertDialogTitle>
      <AlertDialogDescription>
        {{ $t("deleteMessage") }}
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>{{ $t("cancel") }}</AlertDialogCancel>
      <AlertDialogAction>{{ $t("continue") }}</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</template>
