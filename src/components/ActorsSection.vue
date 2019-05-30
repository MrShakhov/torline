<template>
    <section class="actors-section">

        <button-standard class="back" @click="back">
            <font-awesome-icon icon="chevron-left"/>
        </button-standard>

        <ul class="list" ref="listOfItems" @scroll="addItemsIfNeeded">
            <li class="item" v-for="actor in activeItems">
                <actors-section-item :name="actor.name"
                                     :photo-file-name="actor.photoFileName"
                                     :gender="actor.gender"
                                     @load="checkLoading(null, addItemsIfNeeded)"
                                     class="loadable-actors-section"
                />
            </li>
        </ul>

        <button-standard class="next" @click="next">
            <font-awesome-icon icon="chevron-right"/>
        </button-standard>

    </section>
</template>

<script>
    // Components
    import ActorsSectionItem from './ActorsSectionItem';
    import ButtonStandard from './ButtonStandard';

    //Mixins
    import loading from '../mixins/loading';
    import slider from '../mixins/slider';

    export default {
        name: 'ActorsSection',

        mixins: [
            loading,
            slider
        ],

        props: {
            actors: {
                type: Array,
                required: true
            }
        },

        data() {
            return {
                activeItemsAmount: 1
            }
        },

        computed: {
            activeItems() {
                let items = [];

                for (let i = 0; i < this.activeItemsAmount && i < this.actors.length; i++) {
                    items.push(this.actors[i]);
                }

                return items;
            }
        },

        methods: {
            getCapacity() {
                const container = this.$refs.listOfItems;
                const item = container.firstElementChild;

                return Math.ceil(container.clientWidth / item.offsetWidth);
            },
            addItemsIfNeeded() {

                // Check for inactive items
                const inactiveItemsAmount = this.actors.length - this.activeItemsAmount;
                if (inactiveItemsAmount === 0) return;

                // Checking the need to add items depending on the scroll
                const container = this.$refs.listOfItems;
                const invisibleNextWidth = container.scrollWidth - container.clientWidth - container.scrollLeft;
                if (invisibleNextWidth >= container.clientWidth) return;

                // Adding items
                const capacity = this.getCapacity();
                if (inactiveItemsAmount < capacity) {
                    this.activeItemsAmount += inactiveItemsAmount;
                } else {
                    this.activeItemsAmount += capacity;
                }

            }
        },

        components: {
            ActorsSectionItem,
            ButtonStandard
        },

        mounted() {
            this.activeItemsAmount =
                this.getCapacity() > this.actors.length
                    ? this.actors.length
                    : this.getCapacity();

            window.addEventListener('resize', this.addItemsIfNeeded);
        },

        beforeDestroy() {
            window.removeEventListener('resize', this.addItemsIfNeeded);
        }
    }
</script>

<style lang="less" scoped>
    .actors-section {
        margin: 0 20px;
        position: relative;

        @media (max-width: 1440px) {
            margin: 0 calc(2.8vw / 2);
        }

        @media (max-width: 745px) {
            margin: 0 10.5px;
        }
    }

    .button-standard {
        bottom: 0;
        font-size: 1.5em;
        height: 35%;
        margin: auto 0;
        padding: 0;
        position: absolute;
        top: 0;
        width: 40px;

        @media (max-width: 1440px) {
            width: 2.8vw;
        }

        @media (max-width: 745px) {
            width: 21px;
        }

        &.back {
            left: -20px;

            @media (max-width: 1440px) {
                left: calc( (2.8vw / 2) * -1 );
            }

            @media (max-width: 745px) {
                left: -10.5px;
            }
        }

        &.next {
            right: -20px;

            @media (max-width: 1440px) {
                right: calc( (2.8vw / 2) * -1 );
            }

            @media (max-width: 745px) {
                right: -10.5px;
            }
        }
    }

    .list {
        display: flex;
        margin: 0;
        overflow: hidden;
        padding: 0;
    }

    .item {
        flex-shrink: 0;
        list-style: none;
        width: 135px;

        @media (max-width: 1440px) {
            width: 9.4vw;
        }

        @media (max-width: 745px) {
            width: 70px;
        }

        .actors-section-item {
            width: 85%;
        }
    }
</style>