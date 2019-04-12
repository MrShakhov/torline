<template>
    <div id="app">
        <MainSliderSlide :tmdb-id="37724"/>
    </div>
</template>

<script>
    import MainSliderSlide from "./components/MainSliderSlide.vue";

    export default {
        name: "app",

        components: {
            MainSliderSlide
        }
    };
</script>

<style lang="less" scoped>
    @import "./less/variables";

    #app {
        color: #colors[primary];
        font-family: 'Roboto', sans-serif;
        font-size: 18px;
    }
</style>
