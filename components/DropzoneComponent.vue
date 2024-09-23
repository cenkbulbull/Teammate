<script lang="ts" setup>
import Dropzone from "dropzone";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const dropzoneRef = ref(null);

onMounted(() => {
  new Dropzone(dropzoneRef.value, {
    url: "/api/upload", // Dosya yükleme URL'si
    autoProcessQueue: true,
    acceptedFiles: ".pdf",
    dictDefaultMessage: t("dragOrSelectFile"), // İlk açılışta mesaj gösterme
    maxFiles: 1,
    init: function () {
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
}
</style>
