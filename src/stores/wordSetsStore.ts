import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { fetchSelectedFile } from "../services/http";
import { WordSetDTO, WordSetItemDTO, WordSetParsed } from "../types/wordSetsTypes";

export const useWordSetsStore = defineStore('counter', () => {
    //state
    const filesList = ref<Array<string>>([]);
    const selectedWordSet = ref<string>();
    const downloadedWordSetFiles = ref<Map<string, Array<WordSetParsed>>>(new Map());
    const selectedWordSetItems = ref<Array<WordSetParsed>>([]);

    //getters
    const getFilesList = computed(() => filesList.value);
    const getSelectedWordSet = computed(() => selectedWordSet.value);
    const getSelectedWordSetItems = computed(() => selectedWordSetItems.value);

    //setters
    const setFilesList = (fileNames: Array<string>) => {
        filesList.value = fileNames;
    }
    const setSelectedWordSet = async (fileName: string) => {
        selectedWordSet.value = fileName;
        const isFileExists = downloadedWordSetFiles.value.has(fileName);
        if (!isFileExists) {
            const results: WordSetDTO = await fetchSelectedFile(fileName);
            const parsedResults = results.items.reduce((acc: Array<WordSetParsed>, curr: WordSetItemDTO) => {
                const parsedItem: WordSetParsed = {
                    entityId: '',
                    entityTitle: '',
                    entityConcept: '',
                    count: 0,
                    cloudValue: []
                };
                curr.values.forEach(field => {
                    if (field.key === 'entityId') {
                        parsedItem.entityId = field.value;
                    } else if (field.key === 'entityTitle') {
                        parsedItem.entityTitle = field.value;
                    } else if (field.key === 'entityConcept') {
                        parsedItem.entityConcept = field.value.split("#")[1];
                    }
                    else if (field.key === 'count') {
                        parsedItem.count = +field.value;
                    }
                });
                parsedItem.cloudValue = [parsedItem.entityTitle, parsedItem.count]
                acc.push(parsedItem);
                return acc;
            }, [])
            downloadedWordSetFiles.value.set(fileName, parsedResults);
            selectedWordSetItems.value = parsedResults;
        } else {
            selectedWordSetItems.value = downloadedWordSetFiles.value.get(fileName)!;
        }
    }

    return { getFilesList, getSelectedWordSet, getSelectedWordSetItems, setFilesList, setSelectedWordSet }
})