<template>
    <div id="app">
        <torline-header></torline-header>
        <main-page></main-page>
    </div>
</template>

<script>
    import TorlineHeader from "./components/TorlineHeader";
    import MainPage from "./components/MainPage";

    export default {
        name: "app",

        components: {
            MainPage,
            TorlineHeader
        }
    };
</script>

<style lang="less" scoped>
    @import "./less/variables";

    #app {
        max-width: 1440px;
        margin: 0 auto;

        color: #colors[primary];
        font-family: 'Roboto', sans-serif;
        font-size: 18px;

        @media (max-width: 1444px) {
            margin: 0 8px;
        }

        @media (max-width: 1200px) {
            font-size: 1.5vw;
        }

        @media (max-width: 800px) {
            font-size: 12px;
        }
    }
</style>

<style lang="less">
    @import "~normalize.css";
    @import "~animate.css";
    @import "./less/global";
</style>
