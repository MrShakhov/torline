<template>
    <article class="discover-section">

        <header class="header">
            <h2 class="title">{{ title }}</h2>
            <button-lite>Все</button-lite>
        </header>

        <ul class="list-of-items" ref="listOfItems" @scroll="addItemsIfNeeded">
            <li v-for="item in items" class="item">
                <movie-item v-bind="item"
                            class="loadable-discover-section"
                            @init-complete="checkLoading"
                />
            </li>
        </ul>

        <button-standard class="prev" @click="back">
            <font-awesome-icon icon="chevron-left"/>
        </button-standard>
        <button-standard class="next" @click="next">
            <font-awesome-icon icon="chevron-right"/>
        </button-standard>

    </article>
</template>

<script>
    // Components
    import ButtonLite from './ButtonLite';
    import ButtonStandard from './ButtonStandard';
    import MovieItem from './MovieItem';

    // Mixins
    import loading from './mixins/loading';
    import slider from './mixins/slider';

    export default {
        name: "DiscoverSection",

        mixins: [
            loading,
            slider
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
                    if (page > this.totalPages) reject( new Error('Value of argument "page" is bigger than "totalPages"') );

                    // Preparing the URL
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
                            reject( new Error('Invalid prop "contentType"') );
                    }

                    // Sending of request
                    fetch(url)
                        .then( response => response.json() )
                        .then( response => {
                            this.totalPages = +response.total_pages;
                            const results = response.results;

                            // Add received items
                            results.forEach( item => {
                                this.items.push({
                                    tmdbId: +item.id,
                                    title: item.title,
                                    releaseDate: item.release_date,
                                    rating: item.vote_average,
                                    posterFileName: item.poster_path
                                });
                            } );

                            resolve();
                        } );
                } );
            },
            addItemsIfNeeded() {
                // Check for already sent and not completed request
                if (this.isLoading) return;

                // Calculate page of search results on TMDB (1 page = 20 items)
                const page = this.items.length / 20 + 1;

                // Check for additional pages
                if (page > this.totalPages) return;

                // Checking the need to add items depending on the scroll
                const container = this.$refs.listOfItems;
                const invisibleNextWidth = container.scrollWidth - container.clientWidth - container.scrollLeft;
                if (invisibleNextWidth >= container.clientWidth) return;

                // Loading new items
                this.isLoading = true;
                this.loadItems(page)
                    .then( () => {

                        // We are waiting for new elements to be rendered,
                        // below we will check the need to load more elements
                        this.$nextTick( () => {
                            this.isLoading = false;

                            // Recursion to check if additional elements need to be loaded
                            this.addItemsIfNeeded();
                        } );

                    } )

                    .catch( () => {
                        // Temporary. Here will be error message for user
                        this.isLoading = false;
                    } );
            },
            getCapacity() {
                const container = this.$refs.listOfItems;
                const item = container.firstElementChild;

                return Math.floor(container.clientWidth / item.offsetWidth);
            }
        },

        watch: {
            tmdbId() {
                this.reset();
                this.$nextTick(this.addItemsIfNeeded); // Need to redo later without $nextTick!
            }
        },

        mounted() {
            this.addItemsIfNeeded();
        }
    }
</script>

<style lang="less" scoped>
    @import "../less/variables";

    // Variables
    @buttonsWidth: 50px;

    .discover-section {
        margin: 0 @buttonsWidth / 2;
        position: relative;

        @media (max-width: 1200px) {
            margin: 0 2.1vw;
        }

        @media (max-width: 670px) {
            margin: 0 14px;
        }
    }

    .header {
        align-items: center;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.8em;
    }

    .title {
        background: linear-gradient(
                300deg,
                transparent 28%, #colors[contrast] 29%,
                #colors[contrast] 71%, transparent 72%
                ) right bottom / 1.4em 0.9em repeat-x;
        display: inline-block;
        flex-shrink: 0;
        font-size: 1.67em;
        font-weight: 300;
        letter-spacing: 0.05em;
        margin: 0 0.5em 0 0;
        padding: 0 1em 0.9em 1em;
        text-transform: uppercase;

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
        overflow: hidden;
        padding: 0;
    }

    .item {
        flex-shrink: 0;
        list-style: none;
        width: 189px;

        @media (max-width: 1200px) {
            width: 15.75vw;
        }

        @media (max-width: 670px) {
            width: 105px;
        }
    }

    .button-standard {
        bottom: 0;
        font-size: 2.5em;
        height: 30%;
        margin: auto 0;
        padding: 0;
        position: absolute;
        top: 0;
        width: @buttonsWidth;

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
</style>
