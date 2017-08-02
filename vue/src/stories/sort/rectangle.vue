<template>
    <div :class="rectClass"
         :style="style">
        <div class="chr-rect-content"
             :style="numberStyle">{{obj.num}}</div>
    </div>
</template>

<script>

export default {
    name: 'rectangle',
    props: ['obj'],
    data() {
        return {
            height: 0
        };
    },
    computed: {
        // 判断该条目的状态
        rectClass() {
            let result = ['chr-rectangle'];
            result.push(this.obj.state);
            return result;
        },

        // 内联样式用于动态判定宽,高,边距
        style() {
            let transitionGroup = this.$parent
                , sortElementsContainer = transitionGroup.$parent
                , gutter = sortElementsContainer.gutter
                , result = {};
            // 判断内边距
            if (gutter) {
                // 因使用flex触发BFC所以改margin, 通常改padding
                result.marginLeft = `${gutter / 2}px`;
                result.marginRight = result.marginLeft
            }

            // 每个矩形该有的宽度根据父元素宽度及其子元素数量判断
            let length = sortElementsContainer.waitSortArray.length;
            if (length) {
                result.width = `${(1 / length) * 100}%`;
                this.height = sortElementsContainer.height
                result.height = `${(this.obj.bigger / length) * 100}%`;
            }
            return result;
        },

        // 高度不足25则将数字挪至上方
        numberStyle() {
            let height = this.height * (parseFloat(this.style.height) / 100);
            if (height < 25) { return { top: `-${height}px` } }
        }
    }
}
</script>

<style>
.chr-rectangle {
    /*矩形默认样式*/
    display: flex;
    align-items: flex-end;
    background-color: rgb(182, 220, 233);
    transition: all .3s ease;
}

.selected {
    /*被选中的元素*/
    background-color: rgb(218, 42, 56);
}

.comparing {
    /*正在排的元素*/
    background-color: rgb(0, 139, 0);
}

.sorted {
    /*已经排好的元素*/
    background-color: rgb(254, 174, 0);
}

.signal {
    /*快排中的待排项*/
    background-color: rbg(255, 255, 0);
}

.less {
    /*比待排项小的*/
    background-color: rgb(68, 188, 124);
}

.greater {
    /*.......大的*/
    background-color: rgb(163, 57, 210);
}

.chr-rect-content {
    /*内部数字*/
    position: relative;
    width: 100%;
    text-align: center;
}
</style>
