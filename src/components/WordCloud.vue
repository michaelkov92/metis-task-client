<script setup lang="ts">
import { watch, computed, ref } from 'vue';
import { useWordSetsStore } from '../stores/wordSetsStore';
import { WordSetParsed, CloudWord } from '../types/wordSetsTypes';
import ProgressSpinner from 'primevue/progressspinner';
import VueWordCloud from 'vuewordcloud';
import Dropdown from 'primevue/dropdown';

const wordSetsStore = useWordSetsStore();

const concepts = ref<Array<{ name: string, code: string }>>([])
const selectedWords = computed(() => {
    return wordSetsStore.getSelectedWordSetItems
});
const loading = ref(false);
const heavyLoad = computed(() => words.value.length > 200 ? true : false)
const words = ref<Array<CloudWord>>([]);
const selectedConcept = ref();

const filteredWords = computed(() => {
    return selectedConcept.value && concepts.value.length > 1 ?
        words.value.filter((word: CloudWord) => word.concept === selectedConcept.value.code)
            .map((word: CloudWord) => word.cloudValue) :
        words.value.map((word: CloudWord) => word.cloudValue);
})

watch(selectedWords, (items: Array<WordSetParsed>) => {
    const uniqueConcepts = new Set<string>();
    words.value = [];
    items.forEach((item: WordSetParsed) => {
        uniqueConcepts.add(item.entityConcept);
        words.value.push({ cloudValue: item.cloudValue, concept: item.entityConcept });
    });
    concepts.value = [...uniqueConcepts].map((concept: string) => {
        return { name: concept.charAt(0).toUpperCase() + concept.slice(1).toLowerCase(), code: concept }
    });
    selectedConcept.value = null;
    loading.value = true;
})

const getColorByWeight = (value: Array<number | string>) => {
    const weight = +value[1];
    const colorScale = ['#FF5733', '#FFC300', '#6a9972', '#33AFFF', '#A633FF'];
    const index = Math.floor(weight + 10 / 100);
    return colorScale[index % colorScale.length];
};
const updateHandler = (e: any) => {
    if (e.length) {
        loading.value = false;
    }
}
</script>

<template>
    <div class="word-cloud-wrapper">
        <div v-if="loading">
            <ProgressSpinner class='spinner' />
        </div>
        <Dropdown v-if="concepts.length" class='concept-filter' v-model="selectedConcept" :disabled="loading"
            :options="concepts" showClear optionLabel="name" placeholder="Concept Filter" />
        <vue-word-cloud style="height: 90%; place-self: center;" :style="{ 'opacity': loading ? '50%' : '100%' }"
            :words="filteredWords" :font-size-ratio="7" @update:cloudWords="updateHandler"
            :animation-duration="heavyLoad ? 0 : 2000" :animation-overlap="heavyLoad ? 1 : 0"
            :color="(value: Array<number | string>) => getColorByWeight(value)" font-family="Roboto">
            <template #default="{ text, weight }">
                <div v-tooltip.top="`${text}, ${weight}`" type="text" placeholder="Top" style="font-size: smaller;">
                    {{ text }}
                </div>
            </template>
        </vue-word-cloud>
    </div>
</template>

<style scoped lang="less">
.word-cloud-wrapper {
    height: 95%;
    width: 100%;
    display: flex;
    flex-direction: column;

    .spinner {
        position: fixed;
        height: 100px;
        width: 100px;
        top: 50%;
        left: 50%
    }

    .concept-filter {
        width: 200px;
        place-self: center;
        z-index: 5;
    }
}
</style>
