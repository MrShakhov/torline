<template>
    <div class="movie-page">

        <button class="button-back" @click="$router.back()">&lt; Назад</button>

        <main class="main">

            <figure class="poster">
                <img v-if="posterFileName !== ''"
                     :src="posterUrl"
                     :alt="`Постер ${title}`"
                     class="loadable-movie-page"
                     @load="checkLoading"
                >
            </figure>

            <div class="content">

                <h1 class="title">{{ title }}</h1>
                <span class="original-title">{{ originalTitle }}</span><br>
                <span class="short-properties">{{ shortProperties }}</span>

                <div class="buttons">
                    <ButtonStandard>Смотреть</ButtonStandard>
                    <ButtonStandard :disabled="videos.length === 0">Трейлер</ButtonStandard>
                </div>

                <div class="properties">
                    <dl class="column">
                        <div class="dt-dd-wrapper">
                            <dt>Жанры</dt>
                            <dd>{{ genresStr }}</dd>
                        </div>
                        <div class="dt-dd-wrapper">
                            <dt>Режиссёр</dt>
                            <dd>{{ director.name }}</dd>
                        </div>
                    </dl>
                    <dl class="column">
                        <div class="dt-dd-wrapper">
                            <dt>Актеры</dt>
                            <dd>{{ castStr }}</dd>
                        </div>
                    </dl>
                </div>

                <dl class="overview">
                    <dt>Описание</dt>
                    <dd>{{ overview }}</dd>
                </dl>

                <actors-section v-if="cast.length > 0"
                                :actors="cast"
                                class="loadable-movie-page"
                                @init-complete="checkLoading"
                />

            </div>
            <!--content-->

        </main>

        <aside>
            <discover-section v-if="isRecommendations"
                              content-type="recommendations"
                              :tmdb-id="tmdbId"
                              class="loadable-movie-page"
                              @init-complete="checkLoading"
            />
            <discover-section v-if="isSimilar"
                              content-type="similar"
                              :tmdb-id="tmdbId"
                              class="loadable-movie-page"
                              @init-complete="checkLoading"
            />
        </aside>

    </div>
</template>

<script>
    // Components
    import ButtonStandard from './ButtonStandard';
    import ActorsSection from './ActorsSection';
    import DiscoverSection from './DiscoverSection';
    import LoadingScreen from './LoadingScreen';

    // Mixins
    import loading from '../mixins/loading';
    import movie from '../mixins/movie';

    export default {
        name: "MoviePage",

        mixins: [
            loading,
            movie
        ],

        methods: {
            reset() {
                this.loadedSourcesCount = 0;
                this.isLoaded = false;

                // Search for arrays in the data object and reset them
                for (let key in this.$data) {
                    if (Array.isArray(this[key])) {
                        this[key] = [];
                    }
                }
            }
        },

        components: {
            ButtonStandard,
            ActorsSection,
            DiscoverSection,
            LoadingScreen
        },

        watch: {
            tmdbId() {
                this.reset();
                this.loadContent();
            }
        },

        created() {
            this.loadContent();
        }
    }
</script>

<style lang="less" scoped>
    @import "../less/variables";

    .movie-page {
        margin-top: 1.5em;
    }

    .button-back {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.22em;
        font-weight: 100;
        margin: 0 0 1.5em 1em;
        padding: 0;
        transition: color #times[hover];

        &:hover {
            color: #colors[contrast];
        }
    }

    .main {
        display: flex;
        margin-bottom: 2em;

        @media (max-width: 550px) {
            display: block;
        }
    }

    .poster {
        flex-shrink: 0;
        margin: 0 2.5% 0 0;
        min-width: 200px;
        width: 28%;

        @media (max-width: 550px) {
            margin: 0 auto 2em;
            width: 40%;
        }

        img {
            border-radius: 5px;
            box-shadow: 0 0 15px #colors[primary];
            display: block;
            position: sticky;
            top: 10px;
            width: 100%;
        }
    }

    .title {
        display: inline-block;
        font-size: 2em;
        font-weight: 400;
        margin: 0 0.4em 0 0;
    }

    .original-title {
        font-size: 0.9em;
        font-weight: 300;
        white-space: nowrap;
    }

    .short-properties {
        color: #colors[secondary];
        font-weight: 300;
    }

    .buttons {
        margin: 1.2em 0;
    }

    .button-standard {
        font-size: 1.3em;
        padding: 0.5em 1.5em;

        &:not(:last-child) {
            margin-right: 0.4em;

            @media (max-width: 400px) {
                margin: 0 0 0.3em 0;
            }
        }

        @media (max-width: 400px) {
            display: block;
            width: 100%;
        }
    }

    .content {
        width: 69.5%;

        @media (max-width: 730px) {
            width: calc(97.5% - 200px);
        }

        @media (max-width: 550px) {
            width: auto;
        }
    }

    dt {
        font-weight: 300;

        &:after {
            content: ':';
        }
    }

    dl {
        margin: 0;
    }

    .properties {
        display: flex;
        line-height: 1.4;
        margin-bottom: 0.8em;

        @media (max-width: 400px) {
            display: block;
            margin: 0;
        }
    }

    .column {
        &:first-child {
            flex-basis: 40%;
            margin-right: 1em;
        }

        &:last-child {
            flex-basis: 60%;
        }
    }

    .dt-dd-wrapper {
        &:not(:last-child) {
            margin-bottom: 0.3em;
        }

        @media (max-width: 400px) {
            margin-bottom: 0.3em;
        }
    }

    .overview {
        line-height: 1.4;
        margin-bottom: 1.4em;
    }

    .discover-section {
        margin-bottom: 2em;
    }
</style>