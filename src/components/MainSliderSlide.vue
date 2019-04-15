<template>
    <article class="slide"
             :style="background"
             @load.capture="checkLoading"
    >
        <figure class="poster">
            <img :src="posterPath"
                 :alt="`Постер ${title}`"
            >
        </figure>
        <div class="content">
            <header>
                <div>
                    <h1>{{ title }}</h1>
                    <span class="original-title">{{ originalTitle }}</span>
                </div>
                <span class="description">{{ description }}</span>
            </header>
            <div class="buttons">
                <button-lite class="button-lite">Смотреть</button-lite>
                <button-lite class="button-lite">Трейлер</button-lite>
            </div>
            <dl class="properties">
                <div>
                    <div class="dt-dd-wrapper">
                        <dt>Жанры:</dt>
                        <dd>{{ genres.join(', ') }}</dd>
                    </div>
                    <div class="dt-dd-wrapper">
                        <dt>Режиссёр:</dt>
                        <dd>{{ director }}</dd>
                    </div>
                </div>
                <div>
                    <dt>Актеры:</dt>
                    <dd>{{ cast.join(', ') }}</dd>
                </div>
            </dl>
            <p class="overview">
                {{ overview }}
            </p>
        </div>
    </article>
</template>

<script>
    import ButtonLite from './ButtonLite';

    export default {
        name: 'MainSliderSlide',

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
                isLoaded: false,
                loadedResources: 0
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
            posterPath() {
                // Если имя файла еще не пришло с tMDB, то ничего не делаем
                if (!this.posterFileName) return;

                let baseUrl = 'https://image.tmdb.org/t/p/w342';
                return `${baseUrl}${this.posterFileName}`;
            }
        },

        methods: {
            checkLoading() {
                // Отслеживаем загрузку всех картинок
                // и генерируем событие "load"
                this.loadedResources++;
                let amountResources = this.$el.querySelectorAll('[src]').length + 1; // +1 - это фоновое изобр-ие
                if (this.loadedResources === amountResources) {
                    this.isLoaded = true;
                    this.$emit('load');
                }
            }
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
                    this.trailer = {
                        provider: response.videos.results[0].site,
                        key: response.videos.results[0].key
                    };

                    // Начинаем загрузку фонового изображения здесь,
                    // чтобы была возможность отследить окончание загрузки
                    let img = document.createElement('img');
                    img.src = `https://image.tmdb.org/t/p/w1280${response.backdrop_path}`;
                    img.onload = () => {
                        this.backdropPath = response.backdrop_path;
                        this.checkLoading();
                    };

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
                        let hours = Math.trunc(mins / 60);
                        let minutes = mins % 60;
                        return `${hours} ч ${minutes} мин`;
                    }

                } );
        }
    };
</script>







<style lang="less" scoped>
    @import "../less/variables";
    @import "../less/mixins";

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

        #animations.rotateIn(@animationDelay);

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
        margin: 0 1% 0.5% 0;

        font-size: 2.3em;
        font-weight: 500;
        line-height: 1;

        #animations.fadeInDown(@animationDelay + 0.2s);
    }

    .original-title {
        color: #colors[lightgray];
        font-weight: 300;
        white-space: nowrap;

        #animations.fadeIn(@animationDelay + 0.3s);
    }

    .description {
        color: #colors[lightgray];
        font-weight: 300;

        #animations.fadeIn(@animationDelay + 0.4s);
    }

    .buttons {
        margin: 1em 0;

        .button-lite {
            #animations.jackInTheBox(@animationDelay + 1.5s);
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

            #animations.fadeInDown(@animationDelay + 0.6s);
        }

        & > div:last-child {
            flex-basis: 60%;
            margin-right: 1em;

            #animations.fadeInRight(@animationDelay + 0.7s);
        }
    }

    .dt-dd-wrapper {
        margin-bottom: 0.5em;
    }

    .overview {
        margin-top: 0;
        line-height: 1.4;

        #animations.fadeInUp(@animationDelay + 0.9s);
    }
</style>
