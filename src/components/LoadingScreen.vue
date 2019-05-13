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
        display: flex;
        justify-content: center;
        align-items: center;

        margin-right: calc(-1 * (100vw - 100%));

        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10;

        background-color: #ffffff;

        animation-duration: 0.5s;
    }

    .loader {
    }
</style>