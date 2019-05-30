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
    import loading from './mixins/loading';

    export default {
        name: 'ActorsSection',

        mixins: [
            loading
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

            },
            scrollTo(coordinate) {

                // Save initial data
                const startTime = performance.now();
                const startPosition = this.$refs.listOfItems.scrollLeft;

                const distance = coordinate - startPosition;
                const duration = 300;

                // Planning to scroll to the next animation frame
                requestAnimationFrame( function animate(time) {

                    // Calculate the completeness of the animation
                    let timeFraction = (time - startTime) / duration;
                    if (timeFraction > 1) timeFraction = 1; // Correcting

                    // Scrolling
                    this.$refs.listOfItems.scrollLeft = startPosition + (distance * timeFraction);

                    // Checking the completeness of the animation and repeating if needed
                    if (timeFraction < 1) requestAnimationFrame(animate.bind(this));
                }.bind(this) );
            },
            next() {

                // Getting the initial data
                const wrapperCoordinates = this.$refs.listOfItems.getBoundingClientRect();
                const wrapperScrollLeft = this.$refs.listOfItems.scrollLeft;

                // Finding the last item coordinate
                const targetItem = document.elementFromPoint(wrapperCoordinates.right - 1, wrapperCoordinates.top + 1).closest('li');
                const targetCoordinate = targetItem.getBoundingClientRect().left - wrapperCoordinates.left + wrapperScrollLeft;

                // Scroll to the last item
                this.scrollTo(targetCoordinate);
            },
            back() {

                // Finding of target coordinate
                const itemWidth = this.$refs.listOfItems.firstElementChild.offsetWidth;
                let targetCoordinate = this.$refs.listOfItems.scrollLeft - (itemWidth * this.getCapacity());
                if (targetCoordinate < 0) targetCoordinate = 0; // Correcting if needed

                // Scroll
                this.scrollTo(targetCoordinate);
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