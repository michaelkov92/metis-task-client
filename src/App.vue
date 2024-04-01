<script setup lang="ts">
import { fetchAvailableFiles } from './services/http';
import { onMounted } from 'vue';
import { useWordSetsStore } from './stores/wordSetsStore';
const wordSetsStore = useWordSetsStore();
onMounted(async () => {
  const fileNames = await fetchAvailableFiles()
  console.log(fileNames);
  wordSetsStore.setFilesList(fileNames);
})
</script>

<template>
  <div class="app-container">
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
