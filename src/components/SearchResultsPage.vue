<template>
    <div class="search-results-page">

        <button class="button-back" @click="$router.back()">&lt; Назад</button>

        <main>

            <h1 class="title" v-if="totalResults">По запросу &quot;{{ searchQuery }}&quot; найдено {{ totalResults }}:</h1>
            <h1 class="title" v-else>По запросу &quot;{{ searchQuery }}&quot; ничего не найдено</h1>

            <ul class="search-results" v-if="searchResults.length > 0">
                <li class="item" v-for="item in searchResults">
                    <movie-item v-bind="item"
                                class="loadable-search-results-page"
                                @load="checkLoading(null, removeLoadingFlag, addItemsIfNeeded)"
                    />
                </li>
            </ul>

        </main>

        <div class="loader" v-if="newItemsAreLoading">
            <font-awesome-icon icon="spinner" pulse/>
        </div>

    </div>
</template>

<script>
    // Components
    import MovieItem from './MovieItem';

    // Mixins
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
                return new Promise( resolve => {

                    // preparing url
                    const url = `https://api.themoviedb.org/3/search/movie?api_key=0b771070b72e43da48055b81f73de132&language=ru&query=${this.searchQuery}&page=${page}&region=RU`;

                    // setting the loading flag
                    this.newItemsAreLoading = true;

                    // send query
                    fetch(url)
                        .then( response => response.json() )
                        .then( response => {

                            this.totalResults = response.total_results;

                            // if nothing is found emit "load" event to
                            // hide loading screen and show page
                            if (!this.totalResults) this.checkLoading();
                            this.newItemsAreLoading = false;

                            // parsing of search results
                            response.results.forEach( (item) => {
                                this.searchResults.push({
                                    tmdbId: item.id,
                                    posterFileName: item.poster_path,
                                    releaseDate: item.release_date,
                                    title: item.title,
                                    rating: item.vote_average
                                });
                            } );

                            resolve();
                        } );
                } );
            },
            removeLoadingFlag() {
                this.newItemsAreLoading = false;
            },
            addItemsIfNeeded() {
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
                // resetting
                this.searchResults = [];
                this.isLoaded = false;
                this.loadedSourcesCount = 0;
                this.newItemsAreLoading = false;

                this.loadItems();
            }
        },

        created() {
            this.loadItems();
            window.addEventListener('scroll', this.addItemsIfNeeded);
        },

        beforeDestroy() {
            window.removeEventListener('scroll', this.addItemsIfNeeded);
        }
    }
</script>

<style lang="less" scoped>
    @import "../less/variables";

    .search-results-page {
        margin-top: 1.5em;
    }

    .button-back {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.22em;
        font-weight: 100;
        margin: 0 0 1em 1em;
        padding: 0;
        transition: color #times[hover];

        &:hover {
            color: #colors[contrast];
        }
    }

    .title {
        font-size: 1.2em;
        font-weight: 300;
        margin: 0 0 0.7em 0;
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
        list-style: none;
        margin-bottom: 1.5em;
        width: 189px;

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

    .loader {
        font-size: 3em;
        margin: 1em 0;
        text-align: center;
    }
</style>