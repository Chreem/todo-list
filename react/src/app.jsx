import React from 'react'
import './css/index.css'
import Fullpage from './components/fullpage'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

import jsonp from './js/jsonp'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };

        const self = this;
        (async function () {
            let resu = await $.get('https://jsonplaceholder.typicode.com/posts')
            self.setState({
                posts: resu
            })
        })()
    }

    async componentDidMount() {
        const postEl = document.querySelector('#posts');
        postEl.parentNode.style.overflow = 'auto'
    }

    render() {
        const posts = this.state.posts.map(item => <div key={item.id}>
            <span>{item.id}</span>
            <span>{item.title}</span>
            <span>{item.body}</span>
        </div>);

        return <Fullpage id="app" config={{
            effect: 'cube',
            cubeEffect: {
                slideShadows: false,
                shadow: false
            }
        }}>
            <img src={require('./assets/首页效果图.jpg')} alt="首页" />
            <Fullpage id="spots" config={{ effect: 'fade', direction: 'vertical', upArrow: true }}>
                {(r => r.keys().map(item => {
                    return <img key={item} src={item} alt="景点" />
                }))(require.context('./assets/2', false, /\.jpg$/))}
            </Fullpage>
            <img src={require('./assets/3.jpg')} alt="尾页" />
            <div id="posts" style={{ color: 'white' }}>{posts}</div>
        </Fullpage>
    }
}
