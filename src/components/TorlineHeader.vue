<template>
    <header class="header">

        <router-link to="/" class="logo-wrapper">
            <img src="../assets/img/logo.svg" alt="Логотип TorLine">
            <span>Tor</span><span>Line</span>
        </router-link>

        <span class="tagline">Смотри торрент онлайн</span>

        <search-form class="search-form"/>

    </header>
</template>

<script>
    // Components
    import SearchForm from "./SearchForm";

    export default {
        name: "TorlineHeader",

        components: {
            SearchForm
        }
    }
</script>

<style lang="less" scoped>
    @import "../less/variables";

    .header {
        align-items: center;
        background: linear-gradient(
                        135deg,
                            #colors[primary] 12px, #colors[contrast] 12px,
                            #colors[contrast] 29px, #colors[primary] 29px
                        ) left bottom / 41px 13px repeat-x;
        display: flex;
        justify-content: space-between;
        padding: 0.83em 0 15px 0;

        @media (max-width: 400px) {
            display: block;
            text-align: center;
        }
    }

    .tagline {
        font-size: 1.22em;
        text-align: center;

        @media (max-width: 500px) {
            display: none;
        }
    }

    .logo-wrapper {
        display: block;
        flex-shrink: 0;
        font-family: 'Arial', sans-serif;
        font-size: 5em;
        font-weight: 700;
        line-height: 1;
        letter-spacing: -0.05em;

        @media (max-width: 800px) {
            font-size: 7.5vw;
        }

        @media (max-width: 535px) {
            font-size: 40px;
        }

        &:hover {

            img {
                filter: none;
            }

            span {
                text-shadow: none;
            }
        }

        img {
            filter: drop-shadow(7px -3px 7px #3333334f);
            margin-right: 0.15em;
            max-height: 0.85em;
            transition: filter #times[hover];
        }

        span {
            text-shadow: 7px -3px 7px #3333334f;
            transition: text-shadow #times[hover];

            &:first-of-type {
                color: #colors[contrast];
            }
        }
    }
</style>