export default (() => {
    let instance;
    function init() {
        let privateValue = 'private';
        let publicFunc = () => {
            return privateValue;
        }
        return {
            getValue: publicFunc
        }
    }

    return {
        getInstance() {
            if (!instance) {
                instance = init();
                console.log('init');
            }
            return instance;
        }
    }
})()