<template>
    <router-link class="movie-item" :to="`/movie/${tmdbId}`">
        <article>

            <figure class="poster">
                <img :src="posterUrl"
                     :alt="`Постер ${title}`"
                     class="loadable-movie-item"
                     @load="checkLoading"
                >
            </figure>
            <!--poster-->

            <h1 class="title">{{ title }}</h1>
            <!--title-->

            <div class="properties">
                <span class="year">{{ year }}</span>
                <span class="rating">{{ rating }}</span>
                <font-awesome-icon icon="star" class="icon"></font-awesome-icon>
            </div>
            <!--properties-->

        </article>
    </router-link>
</template>

<script>
    // Mixins
    import loading from './mixins/loading';

    export default {
        name: "MovieItem",

        mixins: [
            loading
        ],

        props: {
            tmdbId: {
                type: Number,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            releaseDate: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            posterFileName: {
                validator(value) {
                    return (typeof value === 'string') || (value === null);
                }
            }
        },

        computed: {
            posterUrl() {
                return this.posterFileName ?
                    `https://image.tmdb.org/t/p/w185${this.posterFileName}` :
                    '/img/poster.svg';
            },
            year() {
                return this.releaseDate.slice(0, 4);
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../less/variables";

    .movie-item {
        cursor: pointer;

        &:hover .poster {
            box-shadow: none;
        }

        &:hover .title {
            color: #colors[contrast];
        }
    }

    .poster {
        border-radius: 5px;
        box-shadow: 0 0 15px #colors[primary];
        margin: 0 0 0.55em 0;
        overflow: hidden;
        transition: box-shadow #times[hover];

        img {
            display: block;
            width: 100%;
        }
    }

    .title {
        font-size: 1em;
        font-weight: 300;
        line-height: 1.15;
        margin: 0 0 0.15em 0;
        max-height: calc(1.15em * 3);
        overflow: hidden;
        text-overflow: ellipsis;
        transition: color #times[hover];
    }

    .properties {
        color: #colors[secondary];
        font-size: 0.95em;
        font-weight: 300;
    }

    .icon,
    .rating {
        color: #colors[contrast];
        float: right;
    }

    .icon {
        margin-right: 0.3em;
    }
</style>