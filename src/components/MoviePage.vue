<template>
    <div class="movie-page">
        <nav class="navigation">
            <button class="button-back">< Назад</button>
        </nav>
        <main>
            <article class="main-content">
                <figure class="poster">
                    <img :src="posterUrl" :alt="`Постер ${title}`">
                </figure>
                <div class="content">
                    <header>
                        <h1 class="title">{{ title }}</h1>
                        <span class="original-title">{{ originalTitle }}</span><br>
                        <span class="short-properties">{{ properties }}</span>
                        <div class="buttons">
                            <ButtonStandard>Смотреть</ButtonStandard>
                            <ButtonStandard>Трейлер</ButtonStandard>
                        </div>
                    </header>
                    <div class="properties">
                        <dl class="column">
                            <div class="dt-dd-wrapper">
                                <dt>Жанры</dt>
                                <dd>{{ genres.join(', ') }}</dd>
                            </div>
                            <div class="dt-dd-wrapper">
                                <dt>Режиссёр</dt>
                                <dd>{{ director }}</dd>
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
                    <actors-section :actors="cast"></actors-section>
                </div>
            </article>
        </main>
        <discover-section content-type="recommendations" :tmdb-id="tmdbId"></discover-section>
        <discover-section content-type="similar" :tmdb-id="tmdbId"></discover-section>
    </div>
</template>

<script>
    import ButtonStandard from './ButtonStandard';
    import ActorsSection from './ActorsSection';
    import DiscoverSection from './DiscoverSection';

    export default {
        name: "MoviePage",

        props: {
            tmdbId: {
                type: Number,
                required: true
            }
        },

        data() {
            return {
                title: '',
                originalTitle: '',
                posterFileName: '',
                year: 0,
                duration: '',
                rating: 0,
                countries: [],
                genres: [],
                director: '',
                cast: [],
                trailer: {},
                overview: ''
            }
        },

        computed: {
            properties() {
                return `${this.year} / ${this.duration} / tMDB ${this.rating} / ${this.countries.join(', ')}`;
            },
            castStr() {
                let cast = [];

                for (let i = 0; i < 10 && i < this.cast.length; i++) {
                    cast.push(this.cast[i].name);
                }

                return cast.join(', ');
            },
            posterUrl() {
                return (this.posterFileName) ?
                    `https://image.tmdb.org/t/p/w500${this.posterFileName}` :
                    '/img/poster.svg';
            }
        },

        methods: {
            loadContent() {
                // Запрашиваем информацию о фильме с tMDB и заполняем поля экземпляра
                let url = `https://api.themoviedb.org/3/movie/${this.tmdbId}?api_key=0b771070b72e43da48055b81f73de132&language=ru&append_to_response=videos%2Ccredits`;
                fetch(url)
                    .then( (response) => response.json() )
                    .then( (response) => {
                        this.originalTitle = response.original_title;
                        this.overview = response.overview;
                        this.posterFileName = response.poster_path;
                        this.year = response.release_date.slice(0, 4);
                        this.duration = getDurationFromMinutes(response.runtime);
                        this.title = response.title;
                        this.rating = response.vote_average;

                        if (response.videos.results.length > 0) {
                            this.trailer = {
                                provider: response.videos.results[0].site,
                                key: response.videos.results[0].key
                            };
                        }

                        /*
                            Отфильтровываем не нужные нам данные из ответа,
                            нужные записываем в соответстующие свойства
                        */

                        // Парсим жанры
                        response.genres.forEach( (item) => {
                            this.genres.push(item.name);
                        } );

                        // Парсим страны
                        response.production_countries.forEach( (item) => {
                            this.countries.push(item.name);
                        } );

                        // Парсим актеров
                        for (let i = 0; i < response.credits.cast.length; i++) {
                            this.cast.push({
                                name: response.credits.cast[i].name,
                                photoFileName: response.credits.cast[i].profile_path,
                                gender: response.credits.cast[i].gender
                            });
                        }

                        // Парсим режисера
                        for (let i = 0; i < response.credits.crew.length; i++) {
                            if (response.credits.crew[i].job === 'Director') {
                                this.director = response.credits.crew[i].name;
                                break;
                            }
                        }

                        // Functions
                        function getDurationFromMinutes(mins) {
                            let hours = Math.floor(mins / 60);
                            let minutes = mins % 60;
                            return `${hours} ч ${minutes} мин`;
                        }
                    } );
            }
        },

        components: {
            ButtonStandard,
            ActorsSection,
            DiscoverSection
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

    .navigation {
        margin-bottom: 1.5em;

        .button-back {
            margin-left: 1em;
            padding: 0;

            border: none;

            background: none;

            cursor: pointer;

            font-size: 1.22em;
            font-weight: 100;

            transition: color #times[hover];

            &:hover {
                color: #colors[contrast];
            }
        }
    }

    main {
        margin-bottom: 2em;
    }

    .main-content {
        display: flex;

        @media (max-width: 550px) {
            display: block;
        }

        .poster {
            min-width: 200px;
            width: 28%;
            margin: 0 2.5% 0 0;
            flex-shrink: 0;

            @media (max-width: 550px) {
                margin: 0 auto 2em;
                width: 40%;
            }

            img {
                position: sticky;
                top: 10px;
                display: block;
                width: 100%;

                border-radius: 5px;

                box-shadow: 0 0 15px #colors[primary];
            }
        }

        .title {
            display: inline-block;
            margin: 0 0.4em 0 0;

            font-size: 2em;
            font-weight: 400;
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
            padding: 0.5em 1.5em;

            font-size: 1.3em;

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
            margin-bottom: 0.8em;

            line-height: 1.4;

            @media (max-width: 400px) {
                display: block;
                margin: 0;
            }
        }

        .column {
            &:first-child {
                margin-right: 1em;
                flex-basis: 40%;
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
            margin-bottom: 1.4em;

            line-height: 1.4;
        }
    }

    .discover-section {
        margin-bottom: 2em;
    }


</style>