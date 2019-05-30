<template>
    <button class="button-standard" :disabled="loading" @click="$emit('click')">
        <font-awesome-icon v-if="loading" icon="spinner" pulse/>
        <slot v-else></slot>
    </button>
</template>

<script>
    export default {
        name: "ButtonStandard",

        props: {
            loading: Boolean
        }
    }
</script>

<style lang="less" scoped>
    @import "../less/variables";

    .button-standard {
        background-color: #colors[contrast];
        border: none;
        border-radius: 5px;
        color: #colors[white];
        cursor: pointer;
        font-family: inherit;
        font-size: 1em;
        overflow: hidden;
        padding: 0.3em 1.5em;
        text-align: center;
        text-overflow: ellipsis;
        transition: background-color #times[hover], color #times[hover];

        &:hover:not([disabled]) {
            background-color: #colors[primary];
            color: #colors[contrast];
        }

        &[disabled] {
            cursor: auto;
            filter: opacity(0.5);
        }
    }
</style>