<template>
    <div id="app">
        <torline-header/>
        <transition enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut"
                    @after-enter="$emit('ready-to-change')"
        >
            <loading-screen v-show="isLoading"/>
        </transition>
        <router-view @load="isLoading = false"/>
    </div>
</template>

<script>
    import TorlineHeader from "./components/TorlineHeader";
    import LoadingScreen from "./components/LoadingScreen";

    export default {
        name: "app",

        components: {
            TorlineHeader,
            LoadingScreen
        },

        data() {
            return {
                isLoading: true
            }
        },

        created() {
            this.$router.beforeEach( (to, from, next) => {
                this.isLoading = true;
                this.$once('ready-to-change', next);
            } );
        }
    };
</script>

<style lang="less" scoped>
    @import "assets/less/variables";

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
    @import "assets/less/global";
</style>
