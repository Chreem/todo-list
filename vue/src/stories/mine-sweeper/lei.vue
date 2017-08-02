<template>
    <div :class="cls"
         @click="handleClick">
        {{content}}
    </div>
</template>

<style scoped>
.chr-boom-grid {
    width: 20px;
    min-width: 20px;
    height: 20px;
    min-height: 20px;
    border: 3px solid white;
    text-align: center;
    background-color: lightblue;
}

.chr-boom-is-lei {
    background-color: red;
}

.chr-boom-not-lei {
    background-color: lawngreen;
}
</style>

<script>
export default {
    name: 'lei',
    props: ['row', 'column', 'count', 'show'],
    data() {
        return {
            defaultClass: ['chr-boom-grid'],
        }
    },
    computed: {
        cls() {
            let arr = this.defaultClass.concat();
            if (this.count !== "") {
                if (this.count === -1) {
                    arr.push('chr-boom-is-lei');
                } else {
                    arr.push('chr-boom-not-lei');
                }
            }
            return arr;
        },
        content() {
            if (this.count == -1 || this.count == 0) {
                return "";
            }
            return this.count;
        }
    },
    methods: {
        handleClick(e) {
            this.$emit('click', this.row, this.column);
        }
    }
};
</script>
