<script setup lang="ts">
const headerText = 'Word set files viewer'
</script>
<template>
    <div>
        <img src="../assets/METIS-header-logo.png" />
        <span>{{ headerText }}</span>
    </div>
</template>
<style scoped lang="less">
div {
    height: 90px;
    background-color: #072233;
    display: flex;

    img {
        margin: auto 0px auto 15px;
        height: 40px;
        width: auto;
    }

    span {
        color: #ffff;
        margin: auto auto auto 15px;
    }

}
</style>