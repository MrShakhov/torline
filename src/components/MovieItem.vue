<template>
    <router-link class="movie-item" :to="`/movie/${tmdbId}`">
        <div class="poster">
            <img :src="posterUrl"
                 :alt="`Постер ${title}`"
                 @load="$emit('load')"
            >
        </div>
        <h3 class="title">{{ title }}</h3>
        <div class="properties">
            <span class="year">{{ year }}</span>
            <span class="rating">{{ rating }}</span>
            <font-awesome-icon icon="star" class="icon"></font-awesome-icon>
        </div>
    </router-link>
</template>

<script>
    export default {
        name: "MovieItem",

        props: {
            tmdbId: {
                type: Number,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            year: {
                type: Number,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            posterFileName: {
                type: String,
                required: true
            }
        },

        computed: {
            posterUrl() {
                return this.posterFileName ?
                    `https://image.tmdb.org/t/p/w185${this.posterFileName}` :
                    '/img/poster.svg';
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

        .poster {
            margin-bottom: 0.55em;

            overflow: hidden;

            border-radius: 5px;

            box-shadow: 0 0 15px #colors[primary];

            transition: box-shadow #times[hover];

            img {
                display: block;
                width: 100%;
            }
        }

        .title {
            max-height: calc(1.15em * 3);
            margin: 0 0 0.15em 0;

            overflow: hidden;
            text-overflow: ellipsis;

            font-size: 1em;
            font-weight: 300;
            line-height: 1.15;

            transition: color #times[hover];
        }

        .properties {
            font-size: 0.95em;
            font-weight: 300;
            color: #colors[secondary];
        }

        .icon,
        .rating {
            float: right;

            color: #colors[contrast];
        }

        .icon {
            margin-right: 0.3em;
        }
    }
</style>