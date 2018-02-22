import 'babel-polyfill'
import Vue from 'vue'
import App from './app.vue'

import './js/rootSize'

(new Vue({
    render: c => c(App)
})).$mount('#root')
