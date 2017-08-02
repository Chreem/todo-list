export const queue = (() => {
    let queue = [];
    return {
        push(obj) {
            queue.push(obj);
        },
        pop() {
            let resu = queue[0];
            queue = queue.slice(1);
            return resu;
        },
        find(obj) {
            for (let i = 0; i < queue.length; i++) {
                if (JSON.stringify(queue[i]) === JSON.stringify(obj)) {
                    return i;
                }
            }
            return false;
        },
        getOne(index) {
            return queue[index];
        },
        getAll() {
            return queue.concat();
        },
        clear() {
            queue = [];
        }
    };
})();
