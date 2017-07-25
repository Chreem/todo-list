export default (function () {
    let counter = 0;
    return {
        incrementCounter(i) {
            return counter += i;
        },
        resetCounter() {
            return counter = 0;
        }
    }
})();