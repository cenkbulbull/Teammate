<template>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>{{ $t("delete") }}</AlertDialogTitle>
      <AlertDialogDescription>
        {{ $t("deleteMessage") }}
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</template>
