<script setup lang="ts">
import { ChevronsUpDown } from "lucide-vue-next";

interface Language {
  label: string;
  value: string;
  flag: string;
}

const { locale, setLocale } = useI18n();
const selectedLanguage = ref<string>("en-US");
const openLangPopover = ref<boolean>(false);
const languages: Language[] = [
  { label: "Türkçe", value: "tr-TR", flag: "tr.png" },
  { label: "English", value: "en-US", flag: "en.png" },
  { label: "Azərbaycan", value: "az-AZ", flag: "az.png" },
];

const setLanguage = (language: Language) => {
  selectedLanguage.value = language.value;
  localStorage.setItem("locale", selectedLanguage.value);
  openLangPopover.value = false;
  setLocale(localStorage.getItem("locale") as string);
};

onMounted(() => {
  selectedLanguage.value =
    (localStorage.getItem("locale") as string | null) || "en-US";
});
</script>

<template>
  <Popover v-model:open="openLangPopover">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        class="justify-between text-muted-foreground w-20"
      >
        <div v-for="language in languages" :key="language.value">
          <img
            v-if="language.value === selectedLanguage"
            :src="'/' + language.flag"
            width="20"
          />
        </div>
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-full py-0">
      <Command>
        <CommandList>
          <CommandGroup>
            <CommandItem
              class="cursor-pointer"
              v-for="language in languages"
              :key="language.value"
              :value="language.label"
              @select="setLanguage(language)"
            >
              <img :src="'/' + language.flag" width="20" />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
