<template>
    <main class="main-page">
        <main-slider class="loadable-main-page" @load="checkLoading"/>
        <discover-section class="loadable-main-page" content-type="popular" @load="checkLoading"/>
        <discover-section class="loadable-main-page" content-type="rated" @load="checkLoading"/>
    </main>
</template>

<script>
    // Components
    import MainSlider from "./MainSlider";
    import DiscoverSection from "./DiscoverSection";

    // Mixins
    import loading from "../mixins/loading";

    export default {
        name: "MainPage",

        components: {
            MainSlider,
            DiscoverSection
        },

        mixins: [
            loading
        ]
    }
</script>

<style lang="less" scoped>
    .main-page {
        margin-top: 3em;

        @media (max-width: 1440px) {
            margin-top: 3.7vw;
        }
    }

    .discover-section {
        margin-bottom: 2em;

        @media (max-width: 1440px) {
            margin-bottom: 2.5vw;
        }
    }
</style>