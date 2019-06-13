<template>
    <form class="search-form" v-on:submit.prevent="onSubmit">

        <input type="search" class="search-field" v-model.trim="searchQuery" required>

        <button-standard class="button-standard">
            <font-awesome-icon icon="search"/>
        </button-standard>

    </form>
</template>

<script>
    // Components
    import ButtonStandard from "./ButtonStandard";

    export default {
        name: "SearchForm",

        components: {
            ButtonStandard
        },

        data() {
            return {
                searchQuery: ''
            }
        },

        methods: {
            onSubmit() {
                this.$router.push(`/search/${ this.searchQuery }`);
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/less/variables";

    .search-form {
        position: relative;

        &:hover .search-field,
        .search-field:focus {
            @media (max-width: 700px) {
                border: 2px solid #colors[primary];
                padding: 0.14em 1.7em 0.14em 0.14em;
                width: 33vw;
            }

            @media (max-width: 600px) {
                border: 2px solid #colors[primary];
                padding: 0.14em 1.7em 0.14em 0.14em;
                width: 40vw;
            }

            @media (max-width: 400px) {
                width: 100%;
            }
        }

        @media (max-width: 1068px) {
            font-size: 16px;
        }
    }

    .search-field {
        border: 2px solid #colors[primary];
        border-radius: 5px;
        font-size: 1.2em;
        padding: 0.14em 1.7em 0.14em 0.14em;
        transition:
                border #times[hover],
                padding #times[hover],
                width #times[hover];

        @media (max-width: 980px) {
            width: 25vw;
        }

        @media (max-width: 700px) {
            border: none;
            padding: 0;
            width: 0;
        }

        @media (max-width: 500px) {
            border: 2px solid #colors[primary];
            padding: 0.14em 1.7em 0.14em 0.14em;
            width: 40vw;
        }

        @media (max-width: 400px) {
            width: 100%;
        }
    }

    .button-standard {
        border: 2px solid #colors[primary];
        border-left: none;
        border-radius: 0 5px 5px 0;
        color: #colors[primary];
        font-size: 1.2em;
        height: 100%;
        padding: 0.14em 0.3em;
        position: absolute;
        right: 0;
        top: 0;

        @media (max-width: 700px) {
            border: 2px solid #colors[primary];
            border-radius: 5px;
            height: auto;
        }

        @media (max-width: 500px) {
            border-left: none;
            border-radius: 0 5px 5px 0;
            height: 100%;
        }
    }
</style>