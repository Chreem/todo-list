<template>
    <div class="item" @click="handleClick">
        <span>
            <slot></slot>
        </span>
    </div>
</template>

<script>
export default {
    name: 'Item',
    props: ['item'],
    methods: {
        handleClick() {
            this.$emit('itemClick');
        }
    }
}
</script>

<style>

</style>
