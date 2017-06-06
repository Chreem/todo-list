const axios = require('axios')
    , ApiURL = 'https://api.leancloud.cn/1.1/classes/'
    , AppID = 'iRhOMA0LCQSfhTDAsWpu4rUD-gzGzoHsz'
    , AppKey = 'sucm6XOg1wJko4UxSNQQGpB4'
    , ClassName = 'TodoList'
    ;

const headers = {
    'Content-Type': ' application/json',
    'X-LC-Id': AppID,
    'X-LC-Key': AppKey
};
const requestURL = ApiURL + ClassName;
module.exports = {
    readItems() {
        return axios.get(requestURL, { headers })
            .then(res => {
                return res.data;
            });
    },

    /**
     * 传入todo仅为字符串
     * @param {*} todo 
     */
    addNewItem(todo) {
        todo = typeof todo === 'string'
            ? todo : todo.toString()
    }
}