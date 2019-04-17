<template>

    <section class="main-slider" @click="stop">
        <ul class="slides-list">
            <transition-group :enter-active-class="enterClassName"
                              :leave-active-class="leaveClassName"
                              @after-enter="changingSlideTo = ''"
                              tag="div"
            >
                <li v-for="(slide, index) in activeSlides"
                    :key="slide.tmdbId"
                    v-show="index === 1"
                >
                    <main-slider-slide class="slide"
                                       :tmdb-id="slide.tmdbId"
                                       @load="changeSlideState(slide)"
                    ></main-slider-slide>
                </li>
            </transition-group>
        </ul>
        <button-standard class="button-standard"
                         @click="changeSlideTo('prev')"
                         :loading="changingSlideTo === 'prev'"
        >
            <font-awesome-icon icon="chevron-left"></font-awesome-icon>
        </button-standard>
        <button-standard class="button-standard"
                         @click="changeSlideTo('next')"
                         :loading="changingSlideTo === 'next'"
        >
            <font-awesome-icon icon="chevron-right"></font-awesome-icon>
        </button-standard>
    </section>

</template>

<!--Script-->
<script>

    import MainSliderSlide from "./MainSliderSlide";
    import ButtonStandard from "./ButtonStandard";

    export default {
        name: "MainSlider",

        data() {
            return {
                slides: [
                    {tmdbId: 329996, isLoaded: false, expected: false},
                    {tmdbId: 287947, isLoaded: false, expected: false},
                    {tmdbId: 424783, isLoaded: false, expected: false},
                    {tmdbId: 458723, isLoaded: false, expected: false},
                    {tmdbId: 157433, isLoaded: false, expected: false}
                    ],
                currentSlide: 0,
                animationDirection: 'left',
                changingSlideTo: '',
                timer: 0
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
            changeSlideState(slide) {
                slide.isLoaded = true;
                if (slide.expected === true) {
                    slide.expected = false;
                    (this.slides.indexOf(slide) > this.currentSlide) ? this.changeSlideTo('next') : this.changeSlideTo('prev');
                }
            },
            changeSlideTo(direction) {
                if (direction !== 'prev' && direction !== 'next') {
                    console.log('Error in method "changeSlideTo": invalid argument');
                    return;
                }

                const newSlideIndex = (direction === 'prev') ? this.prevSlideIndex : this.nextSlideIndex;

                this.animationDirection = (direction === 'next') ? 'left' : 'right';
                this.changingSlideTo = direction;

                // Если ожидалась загрузка предыдущего/следующего слайда,
                // то помечаем его как не ожидаемый
                direction === 'next' ?
                    this.slides[this.prevSlideIndex].expected = false :
                    this.slides[this.nextSlideIndex].expected = false;

                // Проверяем готовность нового слайда перед сменой
                if (this.slides[newSlideIndex].isLoaded) {
                    this.currentSlide = newSlideIndex;
                } else {
                    // Если не готов, то помечаем его как ожидаемый
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
        }
    }

</script>

<!--Style-->
<style lang="less" scoped>

    .main-slider {
        position: relative;
        margin: 0 3%;
        height: 500px;
    }

    .slide {
        height: 100%;
    }

    .button-standard {
        position: absolute;
        top: 0;
        bottom: 0;

        @width: 6%;
        width: @width;
        height: 30%;
        margin: auto 0;
        padding: 0;

        font-size: 3.5em;

        &:first-of-type {
            left: @width / 2 * -1;
        }

        &:last-of-type {
            right: @width / 2 * -1;
        }
    }

    .slides-list {
        height: 100%;
        margin: 0;
        padding: 0;

        div {
            height: inherit;
        }

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