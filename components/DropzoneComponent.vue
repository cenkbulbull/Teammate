<script lang="ts" setup>
import Dropzone from "dropzone";
import { useI18n } from "vue-i18n";
import { useAppStore } from "@/stores/app";
const appStore = useAppStore();

const { t } = useI18n();

const props = defineProps<{
  options: DropzoneOptions;
}>();

const dropzoneRef = ref(null);

onMounted(() => {
  const dropzone = new Dropzone(dropzoneRef.value, {
    url: props.options.url,
    autoProcessQueue: false, //Otomatik yükleme
    acceptedFiles: props.options.acceptedFiles,
    dictDefaultMessage: t(props.options.dictDefaultMessage),
    maxFiles: 1,
    clickable: true,
    init: function () {
      this.on("addedfile", async (file) => {
        if (this.files.length > 1) {
          this.removeFile(this.files[0]); // Birden fazla resim seçildiğinde hepsi ekranda gözükmesin diye ilk resim herzaman siliniyor
        }

        // Eğer dosya zaten yüklenmişse, yeni dosya eklemeyi durdur
        if (this.files.filter((f) => f.name === file.name).length > 1) {
          this.removeFile(file); // Yeni dosyayı kaldır
          return; // Yeni dosyayı ekleme
        }

        const userId = appStore?.activeUser?.id;
        const formData = new FormData();
        formData.append("file", file); // Dosyayı formData'ya ekle
        formData.append("userId", userId); // userId'yi de ekle

        // Dosya eklendiğinde yapılacak işlemler
        const { data } = await useFetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        await appStore.initializeUser(); //Uploaddan sonra store -> active user güncelle

        // Yükleme tamamlandıktan sonra dosyayı kaldır
        this.on("success", (file) => {
          this.removeFile(file);
        });
      });
    },
  });
});
</script>

<template>
  <div>
    <form class="dropzone" ref="dropzoneRef">
      <div class="fallback">
        <input name="file" type="file" />
      </div>
    </form>
  </div>
</template>

<style lang="scss">
.dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #3730a3;
  border-radius: 5px;
  min-height: 100px;
  padding: 20px;
  text-align: center;
  font-size: 12px;

  .dz-image {
    display: flex;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &:hover {
    border-color: #1c1399;
  }

  .dz-error-message,
  .dz-success-mark,
  .dz-error-mark {
    display: none !important;
  }
}
</style>
