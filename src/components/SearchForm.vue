<template>
    <form class="search-form" v-on:submit.prevent>
        <input type="search" class="search-field" required>
        <button-standard class="button-standard">
            <font-awesome-icon icon="search"></font-awesome-icon>
        </button-standard>
    </form>
</template>

<script>
    import ButtonStandard from "./ButtonStandard";
    export default {
        name: "SearchForm",

        components: {
            ButtonStandard
        }
    }
</script>

<style lang="less" scoped>
    @import "../less/variables";

    .search-form {
        position: relative;
    }

    .search-field {
        padding: 0.14em 1.7em 0.14em 0.14em;

        font-size: 1.2em;

        border: 2px solid #colors[primary];
        border-radius: 5px;
    }

    .button-standard {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        padding: 0.14em 0.3em;

        color: #colors[primary];
        font-size: 1.2em;

        border: 2px solid #colors[primary];
        border-left: none;
        border-radius: 0 5px 5px 0;
    }
</style>