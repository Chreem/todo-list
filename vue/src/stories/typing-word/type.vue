<template>
    <span :class="cls">{{msg}}</span>
</template>

<style>
@keyframes cursor-blink {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

.typing::after {
    animation: cursor-blink .8s infinite linear;
    content: "|";
}

.disabled::after {
    animation: none;
    content: "";
}
</style>

<script>
function split(str = '', keyword = '\n') {
    str = str.replace(`(^${keyword})|(${keyword}&)`, '');
    return str.split(keyword);
};

const sleep = (timeout) => new Promise(resolve => {
    setTimeout(resolve, timeout);
});

export default {
    props: {
        words: { default: 'default' },
        keyword: { type: String, default: '\n' },
        typeSpeed: { type: Number, default: 50 },
        everyLineWait: { type: Number, default: 1000 },
        loop: { type: Boolean, default: true },
    },
    mounted() {
        if (typeof this.words === 'string') { this.ary = split(this.words, this.keyword); }
        if (typeof this.words === 'object') {
            this.words.length ? this.ary = this.words : void 0;
        }
    },
    data() {
        return {
            msg: '',
            ary: [],
            cls: ['typing']
        }
    },
    watch: {
        ary(newAry) {
            let everyLineWait = this.everyLineWait,
                typeSpeed = this.typeSpeed,
                loop = this.loop,
                ary = newAry;
            (async (data) => {
                for (let loopback = true; loopback; loopback = loop) {
                    for (let i = 0; i < ary.length; i++) {
                        //打字
                        for (let j = 0; j < ary[i].length; j++) {
                            data['msg'] += ary[i][j];
                            await sleep(typeSpeed);
                        }

                        //最后一次不循环则直接退出  留下一行不删
                        if (i >= ary.length - 1 && !loop) {
                            data['cls'].push('disabled');
                            continue;
                        }

                        //显示完一行等一下
                        await sleep(everyLineWait);

                        //删字
                        let msg = data['msg'],
                            length = msg.length;
                        for (let k = 0; k < length; k++) {
                            msg = msg.slice(0, -1);
                            data['msg'] = msg;
                            await sleep(typeSpeed);
                        }
                    }
                }
            })(this.$data);
        }
    }
}
</script>