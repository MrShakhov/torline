<template>
    <button class="button-lite" @click="$emit('click')">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: "ButtonLite"
    }
</script>

<style lang="less" scoped>
    @import "../assets/less/variables";

    .button-lite {
        background-color: transparent;
        border: 3px solid #colors[contrast];
        border-radius: 5px;
        color: #colors[contrast];
        cursor: pointer;
        font-family: inherit;
        font-size: 1em;
        overflow: hidden;
        padding: 0.3em 1.5em;
        text-overflow: ellipsis;
        transition: background-color #times[hover], color #times[hover];

        &:hover:not(:disabled) {
            background-color: #colors[contrast];
            color: #colors[primary];
        }

        &:disabled {
            cursor: auto;
            filter:
                    opacity(0.5)
                    saturate(0);
        }
    }
</style>