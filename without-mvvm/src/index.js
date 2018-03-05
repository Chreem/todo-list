import $ from 'jquery'
import './style/index.less'
import TitleControl from './js/titleControl'

import Navbar from './components/navbar.class'
import FloatButton from './components/floatButton.class'

/**
 * 导航
 */
new Navbar(require('./assets/menu.json'), $('nav ul').children(), $('.nav-content'));


/**
 * 悬浮按钮及其popover
 */
$('.popover[data-for="favorite_btn"] .star').map((i, e) => {
    $(e).css({animationDelay: i * 100 + 'ms'})
});

const floatBtn = new FloatButton($('#favorite_btn'));
floatBtn.popover().setParams({margin: 15});
floatBtn.isActive(active => {
    floatBtn.popover(active);
    floatBtn.instance.text(active ? 'open' : 'close');
});


/**
 * 回顶
 */
const toTop = $('#to_top');
$('.main-body').scroll(({originalEvent}) => {
    const scrollTop = originalEvent.target.scrollTop;
    scrollTop > 200 ? toTop.addClass('active') : toTop.removeClass('active')
});
toTop.click(function () {
    toTop.addClass('shake shake-hard shake-constant');
    setTimeout(() => {
        $('.main-body').animate({scrollTop: 0}, 300, () => {
            toTop.removeClass('shake shake-hard shake-constant');
        });
    }, 200)
});


new TitleControl({
    fun: true,
    funTitle: '崩溃了',
    funRecoverTitle: '又好了',
    funRecoverTime: 500,
    funDelay: 1000
});
