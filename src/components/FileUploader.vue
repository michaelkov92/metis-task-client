<script setup lang="ts">
import axios from 'axios';
import { ref } from "vue";
const selectedFile = ref<string | Blob | null>(null);
const uploadProgress = ref<number | null>(null);
const uploadSpeed = ref<string | null>(null)
const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
        selectedFile.value = files[0];
        selectedFile.value && uploadFile(selectedFile.value);
    }
}

async function uploadFile(file: string | Blob) {
    const formData = new FormData();
    formData.append('file', file);
    let lastLoaded = 0;
    const interval = 500;
    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3000/files/upload',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                    if (progressEvent.loaded > lastLoaded) {
                        const speed = (progressEvent.loaded - lastLoaded) / (interval / 1000);
                        const speedInMbps = (speed * 0.000008).toFixed(2);
                        uploadSpeed.value = speedInMbps + ' Mbps';
                        lastLoaded = progressEvent.loaded;
                    }

                    uploadProgress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                }
            }
        })
        console.log(response.data);
    } catch (error) {
        console.error(error);
    } finally {
        selectedFile.value = null;
        uploadProgress.value = null;
        uploadProgress.value = null;
    }
}
</script>
<template>
    <div class="file-uploader">
        <input v-if="!uploadProgress" type="file" @change="handleFileUpload">
        <div v-else class="progress-wrapper">
            <span><b>Progress:</b> {{ uploadProgress }}%</span>
            <span>
                <b>Speed:</b> {{ uploadSpeed }}</span>
        </div>
    </div>
</template>
<style scoped lang="less">
.file-uploader {
    width: 300px;
    color: white;
    padding: 15px;
    align-items: center;
}

.progress-wrapper {
    display: flex;
    flex-direction: column;
}
</style>
