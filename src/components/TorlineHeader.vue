<template>

    <header>
        <div class="logo-wrapper">
            <img src="../assets/logo.svg" alt="Логотип TorLine">
            <span>Tor</span><span>Line</span>
        </div>
        <span class="tagline">Смотри торрент онлайн</span>
        <search-form></search-form>
    </header>

</template>

<script>
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

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 0;

        background: url("../assets/background_line.svg") left bottom repeat-x;

        .tagline {
            font-size: 1.22em;
        }
    }

    .logo-wrapper {
        font-family: 'Arial', sans-serif;
        font-size: 5em;
        font-weight: 700;
        line-height: 1;
        letter-spacing: -0.05em;

        cursor: pointer;

        transition:
                transform #times[hover];

        &:hover {
            transform: scale(1.01);

            img {
                filter: drop-shadow(8px -4px 10px #3333334f);
            }

            span {
                text-shadow: 8px -4px 10px #3333334f;
            }
        }

        img {
            max-height: 0.85em;

            filter: drop-shadow(7px -3px 7px #3333334f);

            transition: filter #times[hover];
        }

        span {
            text-shadow: 7px -3px 7px #3333334f;

            transition: text-shadow #times[hover];
        }

        span:first-of-type {
            color: #colors[contrast];
        }
    }

</style>