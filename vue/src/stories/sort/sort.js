const sleep = t => new Promise(r => { setTimeout(r, t); });
function swap(i, j, arr, len) {
    let tempId = arr[j].index;
    arr[j].index = Math.floor(Math.random * 100 + len);
    let temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
    arr[i].index = tempId;
}

module.exports = options => {
    let sleepTime = options ? (options.sleepTime || 300) : 300;
    let stopSort = false;
    return {
        'bubble': arr => new Promise(res => {
            stopSort = false;
            (async () => {
                let len = arr.length, isSwap;
                for (let i = 0; i < len - 1; i++) {
                    isSwap = false;
                    for (let j = 0; j < len - 1 - i; j++) {
                        if (stopSort) { break; }
                        arr[j].state = 'comparing';
                        arr[j + 1].state = 'comparing';
                        await sleep(sleepTime / 2);
                        arr[j].num > arr[j + 1].num && (isSwap = true) && swap(j, j + 1, arr, len);
                        await sleep(sleepTime / 2);
                        if (stopSort) { break; }
                        arr[j].state = '';
                        arr[j + 1].state = '';
                    }
                    if (stopSort) { break; }
                    arr[len - 1 - i].state = 'sorted';
                    await sleep(sleepTime);
                    if (!isSwap) {
                        arr.map(obj => { obj.state = 'sorted'; });
                        break;
                    }
                }
                res();
            })();
        }),

        'select': arr => new Promise(res => {
            stopSort = false;
            (async () => {
                let length = arr.length, min;
                for (let i = 0; i < length - 1; i++) {
                    min = i;
                    arr[min].state = 'selected';
                    for (let j = i + 1; j < length; j++) {
                        arr[j].state = 'comparing';
                        if (arr[j].num < arr[min].num) {
                            arr[min].state = '';
                            min = j;
                            arr[min].state = 'selected'
                        }
                        if (stopSort) { break; }
                        await sleep(sleepTime);
                        if (arr[j].state === 'comparing') { arr[j].state = '' }
                    }
                    if (min != i) {
                        arr[i].state = 'selected';
                        if (stopSort) { break; }
                        await sleep(sleepTime);
                        swap(i, min, arr);
                        if (stopSort) { break; }
                        await sleep(sleepTime);
                        arr[min].state = '';
                        arr[i].state = '';
                        arr[i].state = 'sorted';
                    } else {
                        arr[min].state = 'sorted';
                    }
                    if (stopSort) { break; }
                    await sleep(sleepTime);
                }
                res();
            })();
        }),

        'quick': arr => new Promise(res => {
            stopSort = false;
            async function quickSort(arr, left, right) {
                
            };
            quickSort(arr);
        }),

        'stopSort': () => {
            stopSort = true;
        }
    };
};
