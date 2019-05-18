<template>
    <section class="discover-section">
        <div class="header">
            <h2 class="title">{{ title }}</h2>
            <button-lite>все</button-lite>
        </div>
        <ul class="list-of-items"
            ref="listOfItems"
            @scroll="addItems"
        >
            <li v-for="item in items"
                class="item"
            >
                <movie-item class="loadable-discover-section"
                            @load="checkLoading"
                            v-bind="item"
                />
            </li>
        </ul>
        <button-standard class="prev" @click="back">
            <font-awesome-icon icon="chevron-left"></font-awesome-icon>
        </button-standard>
        <button-standard class="next" @click="next">
            <font-awesome-icon icon="chevron-right"></font-awesome-icon>
        </button-standard>
    </section>
</template>

<script>
    import ButtonLite from './ButtonLite';
    import ButtonStandard from './ButtonStandard';
    import MovieItem from './MovieItem';
    import loading from './mixins/loading';

    export default {
        name: "DiscoverSection",

        mixins: [
            loading
        ],

        components: {
            ButtonLite,
            ButtonStandard,
            MovieItem
        },

        props: {
            contentType: {
                validator(value) {
                    return [
                        'popular',
                        'rated',
                        'similar',
                        'recommendations'
                    ].indexOf(value) !== -1;
                }
            },
            tmdbId: {
                type: Number
            }
        },

        data() {
            return {
                items: [],
                totalPages: 1,
            }
        },

        computed: {
            title() {
                switch (this.contentType) {
                    case 'popular':
                        return 'Самые популярные';

                    case 'rated':
                        return 'С высоким рейтингом';

                    case 'similar':
                        return 'Похожие фильмы';

                    case 'recommendations':
                        return 'Рекомендуемые';
                }
            }
        },

        methods: {
            reset() {
                this.loadedSourcesCount = 0;
                this.isLoaded = false;

                for (let key in this.$data) {
                    if (Array.isArray(this[key])) {
                        this[key] = [];
                    }
                }
            },
            loadItems(page = 1) {
                return new Promise( (resolve, reject) => {
                    if (page > this.totalPages) reject(new Error('Value of argument "page" is bigger than "totalPage"'));

                    // Выбираем какие элементы нужно загрузить и готовим URL
                    let url;
                    switch (this.contentType) {
                        case 'popular':
                            url = `https://api.themoviedb.org/3/movie/popular?region=RU&page=${page}&language=ru&api_key=0b771070b72e43da48055b81f73de132`;
                            break;

                        case 'rated':
                            url = `https://api.themoviedb.org/3/movie/top_rated?region=RU&page=${page}&language=ru&api_key=0b771070b72e43da48055b81f73de132`;
                            break;

                        case 'similar':
                            url = `https://api.themoviedb.org/3/movie/${this.tmdbId}/similar?api_key=0b771070b72e43da48055b81f73de132&language=ru&page=${page}`;
                            break;

                        case 'recommendations':
                            url = `https://api.themoviedb.org/3/movie/${this.tmdbId}/recommendations?api_key=0b771070b72e43da48055b81f73de132&language=ru&page=${page}`;
                            break;

                        default:
                            throw new Error('Invalid prop "contentType"');
                    }

                    // Отправляем запрос
                    fetch(url)
                        .then( (response) => response.json() )
                        .then( (response) => {
                            this.totalPages = +response.total_pages;
                            const results = response.results;

                            // Добавляем элементы
                            results.forEach((item) => {
                                this.items.push({
                                    tmdbId: +item.id,
                                    title: item.title,
                                    releaseDate: item.release_date,
                                    rating: item.vote_average,
                                    posterFileName: item.poster_path
                                });
                            });

                            resolve();
                        } );
                } );
            },
            addItems() {
                // Проверка на наличие уже отправленного ранее и не завершенного запроса
                if (this.isLoading) return;

                // Высчитываем страницу результатов поиска на tMDB (1 страница = 20 элементов)
                const page = this.items.length / 20 + 1;
                if (page > this.totalPages) return;

                // Проверяем, нужно ли загрузить еще элементы (в зависимости от прокрутки)
                const itemsWrapper = this.$refs.listOfItems;
                const invisibleNextWidth = itemsWrapper.scrollWidth - itemsWrapper.clientWidth - itemsWrapper.scrollLeft;
                if (invisibleNextWidth >= itemsWrapper.clientWidth) return;

                // Загружаем элементы
                this.isLoading = true;
                this.loadItems(page)
                    .then( () => {
                        this.$nextTick( () => {
                            this.isLoading = false;

                            // Рекурсия, чтобы проверить, не нужно ли догрузить еще элементов
                            this.addItems();
                        } );
                    } )
                    .catch( () => {
                        this.isLoading = false;
                    } );
            },
            getCapacity() {
                const item = this.$refs.listOfItems.firstElementChild;

                return Math.floor(this.$refs.listOfItems.clientWidth / item.offsetWidth);
            },
            scrollTo(coordinate) {
                const startTime = performance.now();
                const startPosition = this.$refs.listOfItems.scrollLeft;
                const distance = coordinate - startPosition;
                const duration = 300;

                requestAnimationFrame( function animate(time) {
                    let timeFraction = (time - startTime) / duration;
                    if (timeFraction > 1) timeFraction = 1;

                    this.$refs.listOfItems.scrollLeft = startPosition + (distance * timeFraction);

                    if (timeFraction < 1) requestAnimationFrame(animate.bind(this));
                }.bind(this) );
            },
            next() {
                const wrapperCoordinates = this.$refs.listOfItems.getBoundingClientRect();
                const wrapperScrollLeft = this.$refs.listOfItems.scrollLeft;
                const targetItem = document.elementFromPoint(wrapperCoordinates.right - 1, wrapperCoordinates.top + 1).closest('li');
                const targetCoordinate = targetItem.getBoundingClientRect().left - wrapperCoordinates.left + wrapperScrollLeft;

                this.scrollTo(targetCoordinate);
            },
            back() {
                const itemWidth = this.$refs.listOfItems.firstElementChild.offsetWidth;
                let targetCoordinate = this.$refs.listOfItems.scrollLeft - (itemWidth * this.getCapacity());
                if (targetCoordinate < 0) targetCoordinate = 0;

                this.scrollTo(targetCoordinate);
            }
        },

        watch: {
            tmdbId() {
                this.reset();
                this.$nextTick(this.addItems);
            }
        },

        mounted() {
            this.addItems();
        }
    }
</script>

<style lang="less" scoped>
    @import "../less/variables";

    .discover-section {
        @buttonsWidth: 50px;

        position: relative;
        margin: 0 @buttonsWidth / 2;

        @media (max-width: 1200px) {
            margin: 0 2.1vw;
        }

        @media (max-width: 670px) {
            margin: 0 14px;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.8em;
        }

        .title {
            display: inline-block;
            margin: 0 0.5em 0 0;
            padding: 0 1em 0.9em 1em;
            flex-shrink: 0;

            font-size: 1.67em;
            font-weight: 300;
            text-transform: uppercase;
            letter-spacing: 0.05em;

            background: linear-gradient(300deg,
            transparent 28%, #colors[contrast] 29%,
                #colors[contrast] 71%, transparent 72%
            ) right bottom / 1.4em 0.9em repeat-x;

            @media (max-width: 800px) {
                font-size: 2.55vw;
            }

            @media (max-width: 535px) {
                font-size: 14px;
            }
        }

        .button-lite {
            padding: 0.3em 0.5em;

            text-transform: uppercase;
        }

        .list-of-items {
            display: flex;
            margin: 0;
            padding: 0;

            overflow: hidden;
        }

        .item {
            flex-shrink: 0;
            width: 189px;

            list-style: none;

            @media (max-width: 1200px) {
                width: 15.75vw;
            }

            @media (max-width: 670px) {
                width: 105px;
            }
        }

        .button-standard {
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto 0;
            padding: 0;
            width: @buttonsWidth;
            height: 30%;

            font-size: 2.5em;

            @media (max-width: 1200px) {
                width: 4.2vw;
            }

            @media (max-width: 670px) {
                width: 28px;
            }
        }

        .prev {
            left: -@buttonsWidth / 2;

            @media (max-width: 1200px) {
                left: -2.1vw;
            }

            @media (max-width: 670px) {
                left: -14px;
            }
        }

        .next {
            right: -@buttonsWidth / 2;

            @media (max-width: 1200px) {
                right: -2.1vw;
            }

            @media (max-width: 670px) {
                right: -14px;
            }
        }

        .movie-item {
            display: block;
            margin-right: 15%;
        }

        & /deep/ .poster {
            box-shadow: 3px 3px 10px -3px #colors[primary];
        }
    }
</style>
