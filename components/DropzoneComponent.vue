<script lang="ts" setup>
import Dropzone from "dropzone";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
  options: DropzoneOptions;
}>();

const dropzoneRef = ref(null);

onMounted(() => {
  const dropzone = new Dropzone(dropzoneRef.value, {
    url: props.options.url,
    autoProcessQueue: true,
    acceptedFiles: props.options.acceptedFiles,
    dictDefaultMessage: t(props.options.dictDefaultMessage),
    maxFiles: props.options.maxFiles,
    init:
      props.options.init ||
      function () {
        this.on("addedfile", function (file) {
          // Dosya eklendiğinde yapılacak işlemler
        });
      },
  });
});
</script>

<template>
  <div>
    <form action="/upload" class="dropzone" ref="dropzoneRef">
      <div class="fallback">
        <input name="file" type="file" />
      </div>
    </form>
  </div>
</template>

<style scoped>
.dropzone {
  border: 2px dashed #007bff;
  border-radius: 5px;
  min-height: 100px;
  padding: 20px;
  text-align: center;
  font-size: 12px;
}
</style>
