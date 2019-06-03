<template>
    <section class="main-slider">

        <transition-group :enter-active-class="`animated ${enterClassName}`"
                          :leave-active-class="`animated ${leaveClassName}`"
                          @after-enter="changingSlideTo = ''"
                          tag="ul"
                          class="slides-list"
        >
            <li v-for="(slide, index) in activeSlides"
                :key="slide.tmdbId"
                v-show="index === 1"
            >
                <main-slider-slide class="slide"
                                   :tmdb-id="slide.tmdbId"
                                   @load="onLoad(slide, index)"
                />
            </li>
        </transition-group>

        <button-standard class="button-standard"
                         @click="changeSlideTo('prev')"
                         :loading="changingSlideTo === 'prev'"
        >
            <font-awesome-icon icon="chevron-left"/>
        </button-standard>

        <button-standard class="button-standard"
                         @click="changeSlideTo('next')"
                         :loading="changingSlideTo === 'next'"
        >
            <font-awesome-icon icon="chevron-right"/>
        </button-standard>

    </section>
</template>

<script>
    // Components
    import MainSliderSlide from "./MainSliderSlide";
    import ButtonStandard from "./ButtonStandard";

    export default {
        name: "MainSlider",

        data() {
            return {
                slides: [
                    {tmdbId: 450465, isLoaded: false, expected: false},
                    {tmdbId: 280217, isLoaded: false, expected: false},
                    {tmdbId: 166428, isLoaded: false, expected: false},
                    {tmdbId: 429197, isLoaded: false, expected: false},
                    {tmdbId: 440472, isLoaded: false, expected: false},
                    {tmdbId: 516724, isLoaded: false, expected: false},
                    {tmdbId: 400650, isLoaded: false, expected: false},
                    {tmdbId: 480530, isLoaded: false, expected: false},
                    {tmdbId: 475215, isLoaded: false, expected: false},
                    {tmdbId: 522681, isLoaded: false, expected: false},
                    {tmdbId: 470044, isLoaded: false, expected: false}
                    ],
                currentSlide: 0,
                animationDirection: 'left',
                changingSlideTo: '',
                timer: 0,
                isLoaded: false
            }
        },

        computed: {
            activeSlides() {
                return [
                    this.slides[this.prevSlideIndex],
                    this.slides[this.currentSlide],
                    this.slides[this.nextSlideIndex]
                ];
            },
            enterClassName() {
                return (this.animationDirection === 'left') ? 'fadeInRight' : 'fadeInLeft';
            },
            leaveClassName() {
                return (this.animationDirection === 'left') ? 'fadeOutLeft' : 'fadeOutRight';
            },
            nextSlideIndex() {
                return (this.currentSlide === this.slides.length - 1) ? 0 : this.currentSlide + 1;
            },
            prevSlideIndex() {
                return (this.currentSlide === 0) ?
                    this.slides.length - 1 : this.currentSlide - 1;
            }
        },

        methods: {
            onLoad(slide, index) {
                this.checkLoading(index);
                this.changeSlideState(slide);
            },
            checkLoading(index) {
                if (index === 1 && !this.isLoaded) {
                    this.isLoaded = true;
                    this.$emit('load');
                }
            },
            changeSlideState(slide) {
                slide.isLoaded = true;
                if (slide.expected) {
                    slide.expected = false;
                    (this.slides.indexOf(slide) > this.currentSlide)
                        ? this.changeSlideTo('next')
                        : this.changeSlideTo('prev');
                }
            },
            changeSlideTo(direction) {
                const newSlideIndex = (direction === 'prev') ? this.prevSlideIndex : this.nextSlideIndex;

                this.animationDirection = (direction === 'next') ? 'left' : 'right';
                this.changingSlideTo = direction;

                // Remove flag "expected"
                direction === 'next'
                    ? this.slides[this.prevSlideIndex].expected = false
                    : this.slides[this.nextSlideIndex].expected = false;

                // Check reading of new slide
                if (this.slides[newSlideIndex].isLoaded) {
                    this.currentSlide = newSlideIndex;
                } else {
                    this.slides[newSlideIndex].expected = true;
                }
            },
            start() {
                this.timer = setInterval(
                    () => this.changeSlideTo('next'),
                    7000);
            },
            stop() {
                clearInterval(this.timer);
            }
        },

        components: {
            ButtonStandard,
            MainSliderSlide
        },

        mounted() {
            this.start();

            window.addEventListener('focus', this.start);
            window.addEventListener('blur', this.stop);
        },

        beforeDestroy() {
            window.removeEventListener('focus', this.start);
            window.removeEventListener('blur', this.stop);
        }
    }
</script>

<style lang="less" scoped>
    .main-slider {
        height: 530px;
        margin: 0 3% 3em 3%;
        position: relative;

        @media (max-width: 1440px) {
            height: 36.8vw;
            margin-bottom: 3.7vw;
        }
    }

    .main-slider-slide {
        height: 100%;
    }

    .button-standard {
        @width: 6%;

        bottom: 0;
        font-size: 3.5em;
        height: 30%;
        margin: auto 0;
        padding: 0;
        position: absolute;
        top: 0;
        width: @width;

        @media (max-width: 800px) {
            font-size: 5.25vw;
        }

        &:first-of-type {
            left: @width / 2 * -1;
        }

        &:last-of-type {
            right: @width / 2 * -1;
        }

        &:disabled {
            font-size: 2.5em;

            @media (max-width: 800px) {
                font-size: 3.75vw;
            }
        }
    }

    .slides-list {
        height: 100%;
        margin: 0;
        padding: 0;

        li {
            height: inherit;
            list-style: none;
        }
    }

    .v-leave,
    .v-leave-to,
    .v-enter,
    .v-enter-to{
        position: absolute;
    }
</style>