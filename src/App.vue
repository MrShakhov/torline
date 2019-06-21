<template>
    <div id="app">
        <torline-header/>

        <transition enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut"
                    @after-enter="$emit('ready-to-change')"
        >
            <loading-screen v-show="isLoading"/>
        </transition>

        <torline-player v-if="playerIsActive"/>

        <router-view @load="isLoading = false"/>
    </div>
</template>

<script>
    // Components
    import TorlineHeader from "./components/TorlineHeader";
    import LoadingScreen from "./components/LoadingScreen";
    import TorlinePlayer from "./components/TorlinePlayer";

    export default {
        name: "app",

        components: {
            TorlineHeader,
            LoadingScreen,
            TorlinePlayer
        },

        data() {
            return {
                isLoading: true
            }
        },

        computed: {
            playerIsActive() {
                return this.$store.state.player.isActive;
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
