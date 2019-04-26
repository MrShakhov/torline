<template>
    <div class="actors-section">
        <button-standard class="back" @click="back">
            <font-awesome-icon icon="chevron-left"></font-awesome-icon>
        </button-standard>
        <ul class="list" ref="listOfItems" @scroll="addItems">
            <li class="item"
                v-for="actor in activeItems"
            >
                <actors-section-item :name="actor.name"
                                     :photoFileName="actor.photoFileName"
                                     :gender="actor.gender"
                                     @load="checkLoading"
                ></actors-section-item>
            </li>
        </ul>
        <button-standard class="next" @click="next">
            <font-awesome-icon icon="chevron-right"></font-awesome-icon>
        </button-standard>
    </div>
</template>

<script>
    import ActorsSectionItem from './ActorsSectionItem';
    import ButtonStandard from './ButtonStandard';

    export default {
        name: 'ActorsSection',

        props: {
            actors: {
                type: Array,
                required: true
            }
        },

        data() {
            return {
                loadedItemsAmount: 0,
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
            checkLoading() {
                this.loadedItemsAmount++;

                if ( this.loadedItemsAmount === this.getCapacity() ) {
                    this.$emit('load');
                    this.addItems();
                }
            },
            getCapacity() {
                const item = this.$refs.listOfItems.firstElementChild;

                return Math.ceil(this.$refs.listOfItems.clientWidth / item.offsetWidth);
            },
            addItems() {
                const itemsWrapper = this.$refs.listOfItems;
                const invisibleNextWidth = itemsWrapper.scrollWidth - itemsWrapper.clientWidth - itemsWrapper.scrollLeft;
                if (invisibleNextWidth >= itemsWrapper.clientWidth) return;

                const inactiveItemsAmount = this.actors.length - this.activeItemsAmount;
                if (inactiveItemsAmount === 0) return;

                const capacity = this.getCapacity();

                if (inactiveItemsAmount < capacity) {
                    this.activeItemsAmount += inactiveItemsAmount;
                } else {
                    this.activeItemsAmount += capacity;
                }
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

        components: {
            ActorsSectionItem,
            ButtonStandard
        },

        mounted() {
            setTimeout( () => this.activeItemsAmount = this.getCapacity(), 1000 );
        }
    }
</script>

<style lang="less" scoped>
    .actors-section {
        position: relative;
        margin: 0 20px;

        @media (max-width: 1440px) {
            margin: 0 calc(2.8vw / 2);
        }

        @media (max-width: 745px) {
            margin: 0 10.5px;
        }
    }

    .button-standard {
        position: absolute;
        width: 40px;
        height: 35%;
        top: 0;
        bottom: 0;
        margin: auto 0;
        padding: 0;

        font-size: 1.5em;

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
        padding: 0;

        overflow: hidden;
    }

    .item {
        flex-shrink: 0;
        width: 135px;

        list-style: none;

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