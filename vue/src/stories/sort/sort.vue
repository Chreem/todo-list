<template>
    <div class="chr-main-container">
        <div>
            <a href="https://sort.hust.cc/1.bubbleSort.html">灵感来源一   </a>
            <a href="https://juejin.im/entry/58c9dadb2f301e007e35110c/view?from=timeline&isappinstalled=1">灵感来源二</a>
            <button @click="stopSort">stop</button>
            <select name="sortMethods"
                    id="sort_methods"
                    v-model="selected">
                <option value="bubble">正向冒泡排序</option>
                <option value="select">选择排序</option>
                <option value="quick">快速排序</option>
            </select>
        </div>
        <transition-group name="sort-group"
                          class="chr-sort"
                          :style="style"
                          tag="div">
            <rectangle v-for="rect in waitSortArrayWithStyle"
                       :obj="rect"
                       :key="rect.index"></rectangle>
        </transition-group>
    </div>
</template>

<script>
import rectangle from './rectangle.vue';
const sort = require('./sort.js')();
const sleep = t => { return new Promise(r => { setTimeout(r, t); }); };

export default {
    name: 'sort',
    components: { rectangle },
    mounted() {
        // 主要流程
        (async vm => {
            do {
                await sort[vm.selected](vm.waitSortArrayWithStyle);
                await sleep(1000);
                vm.waitSortArrayWithStyle = vm.arrayInit(null, vm.waitSortArray);
            }
            while (vm.loop)
        })(this);
    },
    props: {
        // 容器本身各项设定
        width: { default: 100 },
        height: { default: 150 },
        gutter: { default: 4 },
        loop: { default: false },

        // 待排数组
        waitSortArray: { default: () => [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48] },
        sortMethod: { default: 'bubble' }
    },
    created() {
        let result = this.arrayInit(this, this.waitSortArray);
        this.waitSortArrayWithStyle = result;
    },
    data() {
        return {
            waitSortArrayWithStyle: [],
            selected: this.sortMethod
        };
    },
    watch: {
        selected() {
            this.stopSort();
        }
    },
    methods: {
        // 加工待排数组使其更适合展示
        arrayInit(vm, arr) {
            let heightCalcArray = arr.concat();
            heightCalcArray.sort((a, b) => (a - b));

            return arr.map((num, index) => ({
                num,
                index,
                bigger: heightCalcArray.indexOf(num) + 1,
                state: ''
            }));
        },
        stopSort() {
            sort.stopSort();
        }
    },
    computed: {
        // 容器本身各项设定
        style() {
            let result = {};
            result.width = `${this.width}%`;
            result.height = `${this.height}px`;
            if (this.gutter) {
                result.marginLeft = `-${this.gutter / 2}px`;
                result.marginRight = result.marginLeft;
            }
            return result;
        }
    }
}
</script>

<style>
.chr-main-container {
    display: inherit;
    flex-flow: column;
    width: 100%;
}

.chr-sort {
    display: flex;
    padding: 10px 0;
    align-items: flex-end;
    background-color: #eee;
}

.sort-group-move {
    transition: transform .5s;
}
</style>
