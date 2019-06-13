<template>
    <div class="torline-player">

        <button class="button-close">[X]</button>

        <div class="plyr-wrapper">

            <template v-if="isMovie">
                <video :src="url" ref="plyr"></video>
            </template>

            <div v-else class="trailer-wrapper">
                <div ref="plyr" :data-plyr-provider="provider" :data-plyr-embed-id="id"></div>
            </div>

        </div>

    </div>
</template>

<script>
    import Plyr from 'plyr';

    export default {
        name: "TorlinePlayer",

        props: {
            provider: {
                validator(value) {
                    return value === 'youtube' || value === 'vimeo';
                }
            },
            id: {
                type: String
            },
            url: {
                type: String
            }
        },

        data() {
            return {
                plyr: {}
            }
        },

        computed: {
            isMovie() {
                return !!this.url;
            }
        },

        mounted() {
            this.plyr = new Plyr(this.$refs.plyr);
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/less/variables";

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

    .plyr-wrapper {
        align-items: center;
        display: flex;
        flex-grow: 1;
        justify-content: center;
        padding: 3%;
    }

    .trailer-wrapper {
        flex-grow: 1;
    }
</style>