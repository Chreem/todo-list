<template>
    <div class="chr-boom-box">
        <div class="chr-boom-row">
            <button @click="setMode('easy')">Easy</button>
            <button @click="setMode('normal')">Normal</button>
            <button @click="setMode('hard')">Hard</button>
            <button @click="showAllBooms()">Show all</button>
            <button @click="clearAction(isStart)">Clear</button>
        </div>
        <div class="chr-boom-row" v-for="col,rInd in qipan">
            <template v-for="boom,cInd in col">
                <grid :row="rInd" :column="cInd" :count="qipan[rInd][cInd]" @click="handleGridClick">
                </grid>
            </template>
        </div>
    </div>
</template>

<style scoped>
.chr-boom-box {
    display: flex;
    flex-flow: column;
    border: 3px solid white;
}

.chr-boom-row {
    display: inherit;
}

.chr-boom-box>.chr-boom-row:first-child {
    padding-left: 3px;
    padding-right: 3px;
    background-color: white;
}

button {
    border: 3px solid gray;
}
</style>


<script>
import grid from './lei.vue';
import { queue } from './queue.js';

let mode = 'normal';
// function firstUpperCase(str) {
//     return str[0].toUpperCase() + str.slice(1);
// }
let defaultMode = {
    'easy': [10, 10, 0.1],
    'normal': [12, 20, 0.15],
    'hard': [14, 40, 0.2]
};

//example 1-5
function getRandom(start = 0, end = 1, isInt = true) {
    start = start < 0 ? 0 : start;
    end = end < start ? start : end;
    let resu = start == end
        ? start
        : start + Math.random() * (end - start);
    return isInt ? parseInt(resu) : resu;
}

//get new array like this: [{0:'',1:'',...},{},...]
function qipanInit(row, col) {
    let arr = [];
    for (let r = 0; r < row; r++) {
        arr[r] = {};
        for (let c = 0; c < col; c++) {
            arr[r][c] = "";
        }
    }
    return arr;
}

//as this name
function getConfirm() {
    if (window.confirm('放弃本菊？')) {
        console.log('残忍抛弃');
        return true;
    } else {
        console.info('骚年，安心受虐');
    }
    return false;
}

//check whether num is between start and end
function checkArrayRange(num, start, end) {
    start = start < 0 ? 0 : start;
    end = end < start ? start : end;
    if (num < start) {
        num = start;
    } else if (num >= end) {
        num = end;
    }
    return num;
}

export default {
    mounted() {
        this.qipanInit();
    },
    components: { grid },
    data() {
        return {
            mode,
            row: defaultMode.easy[1],
            column: defaultMode.easy[0],
            persent: defaultMode.easy[2],
            qipan: [],
            qipanLogic: [],
            boomsCount: 0,
            isStart: false,
        }
    },
    watch: {
        // qipan: {
        //     handler() {
        //         console.log('qipan has changed');
        //     },
        //     deep: true
        // }
    },
    computed: {
        leiCount() {
            let defMod = this.defaultMode[this.mode];
            return defMode[0] * defMod[1] * defMod[2];
        },

    },
    methods: {
        setMode(mode) {
            this.clearAction(this.isStart, () => {
                //难度选择若不支持则默认normal难度
                mode = ['easy', 'normal', 'hard'].indexOf(mode) > -1 ? mode : 'normal';

                //配置扫雷棋盘参数
                this.row = defaultMode[mode][1];
                this.column = defaultMode[mode][0];
                this.persent = defaultMode[mode][2];
                this.mode = [mode];
            });
        },

        //棋盘初始化
        qipanInit() {
            let row = this.row,
                col = this.column;
            this.qipan = qipanInit(row, col);
            queue.clear();
        },

        leiInit(firstRow, firstCol) {
            let row = this.row,
                col = this.column,
                qipanLogic = JSON.parse(JSON.stringify(this.qipan)),
                count = Math.floor(row * col * this.persent);
            this.boomsCount = count;

            //TODO if( persent > 0.5 ) { 默认全是雷 }
            while (count > 0) {
                let boomInCol = getRandom(0, col),
                    boomInRow = getRandom(0, row);

                //首次点击位置相同则跳过生成这颗💣
                if (firstCol && firstRow
                    && (firstRow == boomInRow && firstCol == boomInCol)) continue;

                //难不成一个坑埋两个雷？
                if (qipanLogic[boomInRow][boomInCol] == -1) continue;
                qipanLogic[boomInRow][boomInCol] = -1;
                count--;
            }

            for (let r = 0; r < row; r++) {
                for (let c = 0; c < col; c++) {
                    qipanLogic[r][c] = qipanLogic[r][c] == -1 ? -1 : "";
                }
            }

            this.qipanLogic = qipanLogic;
        },


        handleGridClick(row, column) {
            if (!this.isStart) {
                this.clearAction(false);
                this.leiInit(row, column);
                this.isStart = true;
            }

            //💣💣💣💣💣
            let logic = this.qipanLogic;
            if (logic[row][column] == -1) {
                alert('Boom!');
                this.showAllBooms(true);
                this.isStart = false;
            } else {
                this.showBoxNotBoom(row, column);
            }

            //👏👏👏👏👏 win!
            if (!this.getUnclickedCount()) {
                alert('congratulation! you win!');
                this.isStart = false;
            }
        },

        showBoxNotBoom(row, column) {
            //点击的格子没被点过就入队
            if (this.qipanLogic[row][column] === '') {
                queue.push({ x: row * 1, y: column * 1 });
            } else { return; }

            //循环查找队列直到元素为空
            // let box = queue.pop();
            for (let box = queue.pop(); box; box = queue.pop()) {
                let count = this.getBooms(box.x, box.y);
                this.qipanLogic[box.x][box.y] = count;
                this.qipan[box.x][box.y] = count;

                //如果是0周围没点过的格子''则将该格子入队
                if (count == 0) {
                    this.searchBooms(box.x, box.y, this.qipanLogic,
                        (num, r, c) => {
                            if (num === '') {
                                let obj = { x: r, y: c };
                                if (queue.find(obj)) {
                                    return;
                                }
                                queue.push({ x: r, y: c });
                            }
                        });
                }
            }
        },

        //计算雷数并赋值
        getBooms(row, col) {
            let count = 0,
                qipanLogic = this.qipanLogic;
            this.searchBooms(row, col, qipanLogic,
                num => {
                    num === -1 ? count++ : 0;
                });
            return count;
        },

        /** the func() will be triggered every box around arr[row][col] include itself*/
        searchBooms(row, col, arr, func) {
            row = row * 1;
            col = col * 1;
            for (let r = row - 1; r <= row + 1; r++) {
                if (arr[r] === void 0) { continue; }
                for (let c = col - 1; c <= col + 1; c++) {
                    let num = arr[r][c];
                    if (num === void 0) { continue; }
                    if (r == row && c == col) { continue; }
                    func(num, r, c);
                }
            }
        },

        //计算剩余没点过的位置
        getUnclickedCount() {
            let row = this.row,
                col = this.column,
                arr = this.qipanLogic,
                count = 0;
            for (let r = 0; r < row; r++) {
                for (let c = 0; c < col; c++) {
                    arr[r][c] === '' ? count++ : void 0;
                }
            }
            return count;
        },

        clearAction() {
            let ask = arguments[0],
                func;

            //是否询问
            if (typeof ask !== 'boolean') {
                func = ask;
                ask = true;    //默认询问
            } else {
                func = arguments[1];
            }

            //询问结果
            if (ask) {
                if (!getConfirm()) { return; }   //并不想放弃并甩你一脸数据
            }

            if (this.isStart) {
                this.isStart = false;
                this.clearAction(false, func);
            }

            //提供了function才运行
            if (func !== void 0) { func(); }

            this.qipanInit();
        },

        showAllBooms(failed) {
            if (!this.isStart) {
                this.clearAction(false);
                this.leiInit();
                this.qipan = this.qipanLogic;
                return;
            }

            if (failed || getConfirm()) {
                this.isStart = false;
                this.qipan = this.qipanLogic;
            }
        }
    }
};
</script>
