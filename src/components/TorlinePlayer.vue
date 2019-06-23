<template>
    <div class="torline-player">

        <button class="button-close" @click="close">[X]</button>

        <div class="main-wrapper" ref="mainWrapper">

            <font-awesome-icon v-show="loading" icon="spinner" pulse class="loader"/>

            <transition name="tv" @before-enter="loading = false" @after-leave="loading = true">
                <div v-show="contentIsVisible" class="content-wrapper" ref="contentWrapper">

                    <video v-if="content === 'movie'" :src="url" ref="plyr"></video>

                    <div v-if="content === 'trailer'"
                         ref="plyr"
                         :data-plyr-provider="provider"
                         :data-plyr-embed-id="id"
                    ></div>

                </div>
            </transition>

        </div>

    </div>
</template>

<script>
    import Plyr from 'plyr';
    import 'plyr/dist/plyr.css';

    export default {
        name: "TorlinePlayer",

        data() {
            return {
                plyr: {},
                loading: true,
                contentIsVisible: false
            }
        },

        computed: {
            content() {
                return this.$store.state.player.content;
            },
            provider() {
                return this.$store.state.player.provider;
            },
            id() {
                return this.$store.state.player.id;
            }
        },

        methods: {
            setTrailerSize() {
                /*
                    Setting max-width and flex-grow of trailer wrapper so that
                    when the aspect ratio is 16/9 the player fits in height
                */

                // Getting height of contentWrapper
                const mainWrapper = this.$refs.mainWrapper;
                let mainWrapperHeight = getComputedStyle(mainWrapper).height;
                mainWrapperHeight = parseFloat(mainWrapperHeight);

                this.$refs.contentWrapper.style.maxWidth = (mainWrapperHeight / 9 * 16) + 'px';
                this.$refs.contentWrapper.style.flexGrow = '1';
            },
            renderPlyr() {
                if (this.content === 'trailer') {
                    window.addEventListener('resize', this.setTrailerSize);
                    this.setTrailerSize();
                }

                this.plyr = new Plyr(this.$refs.plyr);

                return this.plyr;
            },
            close() {
                window.removeEventListener('resize', this.setTrailerSize);
                this.$store.commit('player/turnOff');
            }
        },

        mounted() {
            if (this.content === 'trailer') {
                this.renderPlyr()
                    .once('ready', () => this.contentIsVisible = true);
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/less/variables";

    @keyframes tv {
        from {
            transform: scaleX(0) scaleY(0);
        }
        30% {
            transform: scaleX(0.005) scaleY(0.005);
        }
        50% {
            transform: scaleX(1.05) scaleY(0.005);
        }
        75% {
            transform: scaleX(1) scaleY(0.005);
        }
        to {
            transform: scaleX(1) scaleY(1);
        }
    }

    .torline-player {
        background-color: #ffffff;
        bottom: 0;
        display: flex;
        flex-direction: column;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 10;
    }

    .button-close {
        align-self: flex-end;
        background: none;
        border: none;
        cursor: pointer;
        margin: 10px;
        transition: color #times[hover];

        &:hover {
            color: #colors[contrast];
        }
    }

    .main-wrapper {
        align-items: center;
        display: flex;
        flex-grow: 1;
        justify-content: center;
        overflow: hidden;
        padding: 0 3% 3%;
    }

    .loader {
        font-size: 5em;
    }

    .tv-enter-active {
        animation-name: tv;
        animation-duration: 1s;
        animation-timing-function: ease-in;
    }

    .tv-leave-active {
        animation-name: tv;
        animation-direction: reverse;
        animation-duration: 1s;
        animation-timing-function: ease-in;
    }
</style>