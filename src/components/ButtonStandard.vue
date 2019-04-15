<template>

    <button class="button-standard"
            :disabled="loading"
            @click="$emit('click')"
    >
        <font-awesome-icon icon="spinner"
                           pulse
                           v-if="loading"
        ></font-awesome-icon>
        <slot v-else></slot>
    </button>

</template>

<!--JavaScript-->
<script>

    export default {
        name: "ButtonStandard",

        props: {
            loading: Boolean
        }
    }

</script>

<!--Styles-->
<style lang="less" scoped>

    @import "../less/variables";

    .button-standard {
        padding: 0.3em 1.5em;

        overflow: hidden;
        text-overflow: ellipsis;

        font-family: inherit;
        color: #colors[white];
        font-size: 1em;

        background-color: #colors[contrast];

        border: none;
        border-radius: 5px;
        outline: none;

        cursor: pointer;

        transition: background-color #times[hover], color #times[hover];

        &:hover:not([disabled]) {
            background-color: #colors[primary];

            color: #colors[contrast];
        }

        &[disabled] {
            filter: opacity(0.5);

            cursor: auto;
        }
    }

</style>