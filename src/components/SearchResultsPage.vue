<template>
    <div class="search-results-page">
        <nav class="navigation">
            <button class="button-back">&lt; Назад</button>
        </nav>
        <h1 class="title" v-if="totalResults">По запросу &quot;{{ searchQuery }}&quot; найдено {{ totalResults }}:</h1>
        <h1 class="title" v-else>По запросу &quot;{{ searchQuery }}&quot; ничего не найдено</h1>
        <ul class="search-results" v-if="searchResults.length > 0">
            <li class="item"
                v-for="item in searchResults"
            >
                <movie-item v-bind="item"
                            class="loadable-search-results-page"
                            @load="checkLoading"
                />
            </li>
        </ul>
        <div class="preloader" v-if="totalResults > searchResults.length">
            <font-awesome-icon icon="spinner" pulse/>
        </div>
    </div>
</template>

<script>
    import MovieItem from './MovieItem';
    import loading from '../mixins/loading';

    export default {
        name: "SearchResultsPage",

        props: {
            searchQuery: {
                type: String,
                required: true
            }
        },

        mixins: [
            loading
        ],

        components: {
            MovieItem
        },

        data() {
            return {
                searchResults: [],
                totalResults: 0,
                newItemsAreLoading: false
            }
        },

        computed: {
            nextPage() {
                return this.searchResults.length / 20 + 1;
            }
        },

        methods: {
            loadItems(page = 1) {
                return new Promise( (resolve, reject) => {
                    if (!this.searchQuery) reject( new Error('Empty property "searchQuery" of "SearchResultsPage"') );

                    // preparing a url
                    const url = `https://api.themoviedb.org/3/search/movie?api_key=0b771070b72e43da48055b81f73de132&language=ru&query=${this.searchQuery}&page=${page}&region=RU`;

                    // setting the loading flag
                    this.newItemsAreLoading = true;

                    // send query
                    fetch(url)
                        .then( (response) => response.json() )
                        .then( (response) => {
                            this.totalResults = response.total_results;
                            if (!this.totalResults) this.$emit('load');

                            response.results.forEach( (item) => {
                                this.searchResults.push({
                                    tmdbId: +item.id,
                                    posterFileName: item.poster_path,
                                    releaseDate: item.release_date,
                                    title: item.title,
                                    rating: item.vote_average
                                });
                            } );

                            // remove the loading flag
                            this.newItemsAreLoading = false;

                            resolve();
                        } );
                } );
            },
            addItems() {
                // checking the loading flag
                if (this.newItemsAreLoading) return;

                // checking availability new items
                if (this.totalResults === this.searchResults.length) return;

                // checking scroll height
                const nextScrollHeight = document.documentElement.scrollHeight - (window.pageYOffset + document.documentElement.clientHeight);
                if (nextScrollHeight >= document.documentElement.clientHeight) return;

                // loading new items
                this.loadItems(this.nextPage);
            }
        },

        watch: {
            searchQuery() {
                // reset
                this.searchResults = [];
                this.isLoaded = false;
                this.loadedSourcesCount = 0;

                this.loadItems();
            }
        },

        created() {
            this.loadItems();
            this.$on('load', this.addItems);
            window.addEventListener('scroll', this.addItems);
        },

        beforeDestroy() {
            window.removeEventListener('scroll', this.addItems);
        }
    }
</script>

<style lang="less" scoped>
    @import "../less/variables";

    .search-results-page {
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

    .title {
        font-weight: 300;
        font-size: 1.2em;
    }

    .search-results {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 0;
        padding: 0;
    }

    .item {
        flex-shrink: 0;
        width: 189px;
        margin-bottom: 1.5em;

        list-style: none;

        @media (max-width: 1200px) {
            width: 15.75vw;
        }

        @media (max-width: 670px) {
            width: 105px;
        }

        &:last-of-type {
            margin-right: auto;
        }
    }

    .movie-item {
        display: block;
        margin-right: 15%;
    }

    .preloader {
        margin: 1em 0;

        text-align: center;
        font-size: 3em;
    }
</style>