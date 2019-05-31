<template>
    <div class="loading-screen">
        <div class="loader">
            Загрузка...
        </div>
    </div>
</template>

<script>
    export default {
        name: "LoadingScreen"
    }
</script>

<style lang="less" scoped>
    .loading-screen {
        align-items: center;
        animation-duration: 0.5s;
        background-color: #ffffff;
        bottom: 0;
        display: flex;
        justify-content: center;
        left: 0;
        margin-right: calc(-1 * (100vw - 100%));
        position: fixed;
        right: 0;
        top: 0;
        z-index: 10;
    }
</style>