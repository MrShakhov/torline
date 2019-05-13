<template>
    <main class="main-page">
        <main-slider class="loadable-main-page" @load="checkLoading"/>
        <discover-section class="loadable-main-page" content-type="popular" @load="checkLoading"/>
        <discover-section class="loadable-main-page" content-type="rated" @load="checkLoading"/>
    </main>
</template>

<script>
    import MainSlider from "./MainSlider";
    import DiscoverSection from "./DiscoverSection";
    import loading from "./mixins/loading";

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

    .main-slider {
        height: 530px;
        margin-bottom: 3em;

        @media (max-width: 1440px) {
            height: 36.8vw;
            margin-bottom: 3.7vw;
        }

        & /deep/ .button-standard {
            &:disabled {
                font-size: 2.5em;

                @media (max-width: 800px) {
                    font-size: 3.75vw;
                }
            }

            @media (max-width: 800px) {
                font-size: 5.25vw;
            }
        }

        & /deep/ .button-lite {
            @media (max-width: 800px) {
                border-width: 2px;
            }
        }

        & /deep/ h1 {
            @media (max-width: 800px) {
                font-size: 3.45vw;
            }

            @media (max-width: 640px) {
                font-size: 22px;
            }

            @media (max-width: 450px) {
                margin-bottom: 0.3em;
            }

            @media (max-width: 400px) {
                margin: 0;
            }
        }

        & /deep/ .properties {
            @media (max-width: 760px) {
                display: none;
            }
        }

        & /deep/ .original-title {
            @media (max-width: 650px) {
                display: none;
            }
        }

        & /deep/ .overview {
            @media (max-width: 600px) {
                display: none;
            }
        }

        & /deep/ .buttons {
            @media (max-width: 450px) {
                display: none;
            }
        }

        & /deep/ .description {
            @media (max-width: 400px) {
                display: none;
            }
        }

    }

    .discover-section {
        margin-bottom: 2em;

        @media (max-width: 1440px) {
            margin-bottom: 2.5vw;
        }
    }
</style>