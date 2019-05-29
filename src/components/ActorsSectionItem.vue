<template>
    <div class="actors-section-item">
        <img :src="photoUrl"
             :alt="name"
             class="photo"
             @load="$emit('load')"
             @error="$emit('error')"
        >
        <span class="name">{{ name }}</span>
    </div>
</template>

<script>
    export default {
        name: 'ActorsSectionItem',

        props: {
            name: {
                type: String,
                required: true
            },
            photoFileName: {
                validator(value) {
                    return (typeof value === 'string') || (value === null);
                }
            },
            gender: {
                type: Number,
                required: true
            }
        },

        computed: {
            photoUrl() {
                if (this.photoFileName) {
                    return `https://image.tmdb.org/t/p/w185${this.photoFileName}`;
                } else if (this.gender === 1) {
                    return '/img/photo_woman.svg';
                } else {
                    return '/img/photo_man.svg';
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../less/variables";

    .actors-section-item {
        cursor: pointer;
        font-size: 1.1em;

        &:hover {
            .photo {
                box-shadow: none;
            }

            .name {
                color: #colors[contrast];
            }
        }
    }

    .photo {
        border-radius: 5px;
        box-shadow: 3px 3px 10px -3px #colors[primary];
        display: block;
        margin-bottom: 0.6em;
        transition: box-shadow #times[hover];
        width: 100%;
    }

    .name {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        transition: color #times[hover];
        width: 100%;
    }
</style>