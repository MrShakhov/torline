<template>
    <button class="button-lite">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: "ButtonLite"
    }
</script>

<style lang="less" scoped>
    @import "../less/variables";

    .button-lite {
        padding: 0.3em 1.5em;

        overflow: hidden;
        text-overflow: ellipsis;

        font-family: inherit;
        color: #colors[contrast];
        font-size: 1em;

        background-color: transparent;

        border: 3px solid #colors[contrast];
        border-radius: 5px;
        outline: none;

        cursor: pointer;

        transition: background-color #times[hover], color #times[hover];

        &:hover {
            background-color: #colors[contrast];

            color: #colors[primary];
        }
    }
</style>