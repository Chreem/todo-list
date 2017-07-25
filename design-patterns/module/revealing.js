export default (() => {
    let privateValue = 'private'

    let publicFunc = () => {
        return privateValue;
    }
    return {
        getValue: publicFunc
    }
})()