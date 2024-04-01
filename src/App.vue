<script setup lang="ts">
import { fetchAvailableFiles } from './services/http';
import { onMounted } from 'vue';
import { useWordSetsStore } from './stores/wordSetsStore';
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
const toast = useToast();
const wordSetsStore = useWordSetsStore();
onMounted(async () => {
  const fileNames = await fetchAvailableFiles()
  if (!fileNames) {
    toast.add({ severity: 'warn', summary: 'Connection error', detail: 'Failed To fetch word files', life: 3000 });
  }
  wordSetsStore.setFilesList(fileNames);
})
</script>

<template>
  <div class="app-container">
    <Toast />
    <Header class="header"></Header>
    <Home class="home"></Home>
  </div>
</template>

<style scoped lang="less">
.app-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
