<script setup lang="ts">
import { computed } from 'vue';
import { useWordSetsStore } from '../stores/wordSetsStore';
import Button from 'primevue/button';

const wordSetsStore = useWordSetsStore();
const filesList = computed(() => wordSetsStore.getFilesList);
const selectedFile = computed(() => wordSetsStore.getSelectedWordSet);
    
const onSelectFile = (fileName: string) => {
    wordSetsStore.setSelectedWordSet(fileName);
}

</script>
<template>
    <div class="home-page">
        <div class="files-selection">
            <Button v-for="file in filesList" :severity="selectedFile === file ? 'success' : 'info'" @click="onSelectFile(file)">{{file}}</Button>
        </div>
        <WordCloud/>
    </div>
</template>
<style scoped lang="less">
.home-page {
    background-color: #ffff;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    .files-selection {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        place-content: space-evenly;
        margin: 10px 0px 10px 0px;
        color: #0e2d3f;
    }
}
</style>