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
    /**
     * 获取所有todos
     */
    readItems() {
        return axios.get(requestURL, { headers })
            .then(res => res.data.results);
    },

    /**
     * 传入todo仅为字符串
     * @param {string} todo 
     */
    addNewItem(todo) {
        if (!typeof todo === 'string') return
        return axios.post(requestURL, { todo }, { headers })
    },

    /**
     * 仅接受objectId
     * @param {string} objectId 
     */
    deleteItem(objectId) {
        if (!typeof objectId === 'string') return
        return axios.delete(requestURL + '/' + objectId, { headers })
    }
}