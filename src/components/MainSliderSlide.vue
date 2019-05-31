<template>
    <article class="main-slider-slide" :style="background">

        <figure class="poster animated rotateIn">
            <img v-if="posterFileName !== ''"
                 :src="posterUrl"
                 :alt="`Постер ${title}`"
                 class="loadable-main-slider-slide"
                 @load="checkLoading"
            >
        </figure>

        <div class="content">

            <header>
                <h3 class="title animated fadeInDown">{{ title }}</h3>
                <span class="original-title animated fadeIn">{{ originalTitle }}</span>
                <span class="short-properties animated fadeIn">{{ shortProperties }}</span>
                <div class="buttons">
                    <button-lite class="animated jackInTheBox">Смотреть</button-lite>
                    <button-lite class="animated jackInTheBox" :disabled="videos.length === 0">Трейлер</button-lite>
                </div>
            </header>

            <div class="properties">
                <dl class="column animated fadeInDown">
                    <div class="dt-dd-wrapper">
                        <dt>Жанры</dt>
                        <dd>{{ genresStr }}</dd>
                    </div>
                    <div class="dt-dd-wrapper">
                        <dt>Режиссёр</dt>
                        <dd>{{ director.name }}</dd>
                    </div>
                </dl>
                <dl class="column animated fadeInRight">
                    <div class="dt-dd-wrapper">
                        <dt>Актеры</dt>
                        <dd>{{ castStr }}</dd>
                    </div>
                </dl>
            </div>

            <p class="overview animated fadeInUp">
                {{ overview }}
            </p>

        </div>
        <!--content-->

    </article>
</template>

<script>
    // Components
    import ButtonLite from './ButtonLite';

    //Mixins
    import loading from '../mixins/loading';
    import movie from '../mixins/movie';

    export default {
        name: 'MainSliderSlide',

        mixins: [
            loading,
            movie
        ],

        components: {
            ButtonLite
        },

        computed: {
            background() {
                if (!this.backdropFileName) return;

                let image = `url("https://image.tmdb.org/t/p/w1280${this.backdropFileName}") center / cover no-repeat`;
                let gradient = 'linear-gradient( rgba(51, 51, 51, 0.7), rgba(51, 51, 51, 0.7) )';

                return {
                    background: `${gradient}, ${image}`
                }
            }
        },

        created() {
            this.loadContent();
        }
    };
</script>

<style lang="less" scoped>
    @import "../less/variables";

    @animationDelay: 1.1s;

    .main-slider-slide {
        align-items: center;
        box-shadow: 0 0 15px #colors[primary];
        box-sizing: border-box;
        border-radius: 5px;
        color: #colors[white];
        cursor: pointer;
        display: flex;
        overflow: hidden;
        padding: 3% 5%;
    }

    .poster {
        animation-delay: @animationDelay;
        border-radius: 5px;
        box-shadow: 0 0 15px #colors[secondary];
        flex-shrink: 0;
        margin: 0 5% 0 0;
        overflow: hidden;
        transition: box-shadow #times[hover];
        width: 22%;

        img {
            display: block;
            width: 100%;
        }
    }

    .content {
        max-height: 100%;
        overflow: hidden;
        position: relative;
    }

    .title {
        animation-delay: @animationDelay + 0.2s;
        display: inline-block;
        font-size: 2.3em;
        font-weight: 500;
        line-height: 1;
        margin: 0 0.25em 0.12em 0;

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

    .original-title {
        animation-delay: @animationDelay + 0.3s;
        color: #colors[lightgray];
        font-weight: 300;
        white-space: nowrap;

        @media (max-width: 650px) {
            display: none;
        }
    }

    .short-properties {
        animation-delay: @animationDelay + 0.4s;
        color: #colors[lightgray];
        display: block;
        font-weight: 300;

        @media (max-width: 400px) {
            display: none;
        }
    }

    .buttons {
        margin: 1em 0;

        @media (max-width: 450px) {
            display: none;
        }
    }

    .button-lite {
        animation-delay: @animationDelay + 1.5s;

        &:not(:last-child) {
            margin-right: 0.5em;
        }

        @media (max-width: 800px) {
            border-width: 2px;
        }
    }

    .properties {
        color: #colors[lightgray];
        display: flex;
        font-size: 0.9em;
        line-height: 1.4;
        margin: 0 0 0.6em 0;

        @media (max-width: 760px) {
            display: none;
        }

        dl {
            margin: 0;
        }

        dt {
            display: inline;
            margin-right: 0.5em;

            &:after {
                content: ':';
            }
        }

        dd {
            display: inline;
            margin: 0;
        }

    }

    .column {
        &:first-child {
            animation-delay: @animationDelay + 0.6s;
            flex-basis: 40%;
            margin-right: 1em;
        }

        &:last-child {
            animation-delay: @animationDelay + 0.7s;
            flex-basis: 60%;
        }
    }

    .dt-dd-wrapper {
        margin-bottom: 0.5em;
    }

    .overview {
        animation-delay: @animationDelay + 0.9s;
        line-height: 1.4;
        margin-top: 0;

        @media (max-width: 600px) {
            display: none;
        }
    }
</style>
