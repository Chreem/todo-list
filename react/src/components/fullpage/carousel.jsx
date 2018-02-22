import React from 'react'
import Swiper from 'swiper'
import PropTypes from 'prop-types'
import './full.css'

/**
 * 将形如[1,2,3,[4,5,[6]],7]拍平成为[1,2,3,4,5,6,7]
 * @param {*} arr 
 */
function arrayFormat(arr) {
    if (arr.constructor !== Array)
        return;
    let newArr = [];
    let j = 0;
    function fn(arr) {
        for (let i = 0; i < arr.length; i++) {//遍历数组
            if (arr[i].constructor === Array) {
                j += 1;
                fn(arr[i]);    //递归调用
            } else {
                newArr.push(arr[i]);
            }
        }
    }
    fn(arr);
    return newArr;
}

class FullPage extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * life cycle
     */
    componentDidMount() {
        const self = this;
        const config = this.props.config || {
            direction: 'vertical',
            // loop: true,
            effect: 'fade'
        }
        this.swiper = new Swiper('#' + this.props.id, config)
    }

    /**
     * 下翻页
     */
    handleNextSlideClick() {
        this.swiper.slideNext();
    }

    render() {
        // const children = arrayFormat(this.props.children);
        const children = this.props.children;
        const hasArrow = this.props.config.upArrow;
        return <div id={this.props.id}>
            <div className="swiper-wrapper">
                {children.map((item, index) => <div key={index} className="swiper-slide">{item}</div>)}
            </div>
            {hasArrow ? <img className="slidetip-down" src={require('./up.png')} alt="上划" onClick={this.handleNextSlideClick.bind(this)} /> : ''}
        </div>
    }
}

FullPage.propTypes = {
    id: PropTypes.string.isRequired
}

export default FullPage
