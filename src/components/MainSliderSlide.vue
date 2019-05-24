<template>
    <article class="slide"
             :style="background"
    >
        <figure class="poster animated rotateIn">
            <img :src="posterUrl"
                 :alt="`Постер ${title}`"
                 @load="checkLoading"
                 class="loadable-main-slider-slide"
            >
        </figure>
        <div class="content">
            <header>
                <div>
                    <h1 class="animated fadeInDown">{{ title }}</h1>
                    <span class="original-title animated fadeIn">{{ originalTitle }}</span>
                </div>
                <span class="description animated fadeIn">{{ description }}</span>
                <div class="buttons">
                    <button-lite class="button-lite animated jackInTheBox">Смотреть</button-lite>
                    <button-lite class="button-lite animated jackInTheBox" :disabled="!trailer.provider">Трейлер</button-lite>
                </div>
            </header>
            <dl class="properties">
                <div class="animated fadeInDown">
                    <div class="dt-dd-wrapper">
                        <dt>Жанры:</dt>
                        <dd>{{ genres.join(', ') }}</dd>
                    </div>
                    <div class="dt-dd-wrapper">
                        <dt>Режиссёр:</dt>
                        <dd>{{ director }}</dd>
                    </div>
                </div>
                <div class="animated fadeInRight">
                    <dt>Актеры:</dt>
                    <dd>{{ cast.join(', ') }}</dd>
                </div>
            </dl>
            <p class="overview animated fadeInUp">
                {{ overview }}
            </p>
        </div>
    </article>
</template>

<script>
    import ButtonLite from './ButtonLite';
    import loading from './mixins/loading';

    export default {
        name: 'MainSliderSlide',

        mixins: [
            loading
        ],

        props: {
            tmdbId: {
                type: Number,
                required: true
            }
        },

        components: {
            ButtonLite
        },

        data() {
            return {
                title: '',
                originalTitle: '',
                year: 0,
                duration: '',
                backdropPath: '',
                posterFileName: '',
                genres: [],
                overview: '',
                countries: [],
                rating: 0,
                trailer: {},
                cast: [],
                director: '',
            };
        },

        computed: {
            description() {
                return `${this.year} / ${this.duration} / tMDB ${this.rating} / ${this.countries.join(', ')}`;
            },
            background() {
                if (!this.backdropPath) return; // Если имя файла еще не пришло с tMDB, то ничего не делаем

                let image = `url("https://image.tmdb.org/t/p/w1280${this.backdropPath}") center / cover no-repeat`;
                let gradient = 'linear-gradient( rgba(51, 51, 51, 0.7), rgba(51, 51, 51, 0.7) )';

                return {
                    background: `${gradient}, ${image}`
                }
            },
            posterUrl() {
                // Если имя файла еще не пришло с tMDB, то ничего не делаем
                if (!this.posterFileName) return;

                const baseUrl = 'https://image.tmdb.org/t/p/w342';
                return baseUrl + this.posterFileName;
            }
        },

        methods: {
        },

        created() {
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
                    this.backdropPath = response.backdrop_path;

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
                    for (let i = 0; i < 10 && i < response.credits.cast.length; i++) {
                        this.cast.push(response.credits.cast[i].name);
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
    };
</script>

<style lang="less" scoped>
    @import "../less/variables";

    @animationDelay: 1.1s;

    .slide {
        display: flex;
        align-items: center;

        box-sizing: border-box;

        overflow: hidden;

        padding: 3% 5%;

        border-radius: 5px;

        box-shadow: 0 0 15px #colors[primary];

        color: #colors[white];

        cursor: pointer;
    }

    .poster {
        margin: 0 5% 0 0;
        width: 22%;

        flex-shrink: 0;

        border-radius: 5px;

        box-shadow: 0 0 15px #colors[secondary];

        overflow: hidden;

        transition: box-shadow #times[hover];

        animation-delay: @animationDelay;

        img {
            display: block;
            width: 100%;
        }
    }

    .content {
        position: relative;
        max-height: 100%;
        overflow: hidden;
    }

    h1 {
        display: inline-block;
        margin: 0 0.25em 0.12em 0;

        font-size: 2.3em;
        font-weight: 500;
        line-height: 1;

        animation-delay: @animationDelay + 0.2s;
    }

    .original-title {
        color: #colors[lightgray];
        font-weight: 300;
        white-space: nowrap;

        animation-delay: @animationDelay + 0.3s;
    }

    .description {
        color: #colors[lightgray];
        font-weight: 300;

        animation-delay: @animationDelay + 0.4s;
    }

    .buttons {
        margin: 1em 0;

        .button-lite {
            animation-delay: @animationDelay + 1.5s;
        }

        .button-lite:not(:last-child) {
            margin-right: 0.5em;
        }
    }

    .properties {
        display: flex;
        margin: 0 0 0.6em 0;

        line-height: 1.4;
        font-size: 0.9em;
        color: #colors[lightgray];

        dt {
            display: inline;
            margin-right: 0.5em;
        }

        dd {
            display: inline;
            margin: 0;
        }

        & > div:first-child {
            flex-basis: 40%;
            margin-right: 1em;

            animation-delay: @animationDelay + 0.6s;
        }

        & > div:last-child {
            flex-basis: 60%;
            margin-right: 1em;

            animation-delay: @animationDelay + 0.7s;
        }
    }

    .dt-dd-wrapper {
        margin-bottom: 0.5em;
    }

    .overview {
        margin-top: 0;
        line-height: 1.4;

        animation-delay: @animationDelay + 0.9s;
    }
</style>
