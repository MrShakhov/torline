<template>

    <header>
        <div class="logo-wrapper">
            <img src="../assets/logo.svg" alt="Логотип TorLine">
            <span>Tor</span><span>Line</span>
        </div>
        <span class="tagline">Смотри торрент онлайн</span>
        <search-form class="search-form"></search-form>
    </header>

</template>

<!--script-->
<script>

    import SearchForm from "./SearchForm";

    export default {
        name: "TorlineHeader",

        components: {
            SearchForm
        }
    }

</script>

<!--style-->
<style lang="less" scoped>
    @import "../less/variables";

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.83em 0 15px 0;
        margin-bottom: 3em;

        background: linear-gradient(
                135deg,
                    #colors[primary] 12px, #colors[contrast] 12px,
                    #colors[contrast] 29px, #colors[primary] 29px
        ) left bottom / 41px 13px repeat-x;

        @media (max-width: 1440px) {
            margin-bottom: 3.7vw;
        }

        @media (max-width: 400px) {
            display: block;

            text-align: center;
        }

        .tagline {
            font-size: 1.22em;
            text-align: center;

            @media (max-width: 500px) {
                display: none;
            }
        }
    }

    .logo-wrapper {
        flex-shrink: 0;

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
            margin-right: 0.15em;

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

        @media (max-width: 800px) {
            font-size: 7.5vw;
        }

        @media (max-width: 535px) {
            font-size: 40px;
        }
    }

    .search-form {
        & /deep/ .search-field {
            transition:
                    width #times[hover],
                    padding #times[hover],
                    border #times[hover];

            @media (max-width: 980px) {
                width: 25vw;
            }

            @media (max-width: 700px) {
                width: 0;
                padding: 0;
                border: none;
            }

            @media (max-width: 500px) {
                width: 40vw;
                padding: 0.14em 1.7em 0.14em 0.14em;
                border: 2px solid #colors[primary];
            }

            @media (max-width: 400px) {
                width: 100%;
            }
        }

        &:hover /deep/ .search-field,
        & /deep/ .search-field:focus {
            @media (max-width: 700px) {
                width: 33vw;
                padding: 0.14em 1.7em 0.14em 0.14em;
                border: 2px solid #colors[primary];
            }

            @media (max-width: 600px) {
                width: 40vw;
                padding: 0.14em 1.7em 0.14em 0.14em;
                border: 2px solid #colors[primary];
            }

            @media (max-width: 400px) {
                width: 100%;
            }
        }

        & /deep/ .button-standard {
            @media (max-width: 700px) {
                border: 2px solid #colors[primary];
                border-radius: 5px;
            }

            @media (max-width: 500px) {
                border-left: none;
                border-radius: 0 5px 5px 0;
            }
        }

        @media (max-width: 1068px) {
            font-size: 16px;
        }
    }

</style>