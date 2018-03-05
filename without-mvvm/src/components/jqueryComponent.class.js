import $ from 'jquery'

const positionX = ['left', 'right'];
const positionY = ['top', 'bottom'];

class Component {
    constructor(data) {
        if (!!data && data.constructor === Object) this.props = data;
        else {
            // TODO data为jquery $选择器选出的元素, 暂未知类型未做判断
            this.instance = data;
        }
    }

    /**
     * 还会返回设置参数的方法
     */
    popover(show) {
        // 设置默认
        if (!this.popoverEl) {
            this.popoverEl = $('.popover').filter((i, item) => item.dataset['for'] === this.instance.attr('id'))
            this.setParams.call(this);
        }

        show ? this.popoverEl.addClass('active')
            : this.popoverEl.removeClass('active');
        this.setPosition();
        return {setParams: this.setParams.bind(this)}
    }

    setPosition() {
        this.position.split('-').map(p => {
            if (positionX.indexOf(p) > -1) this.positionX = p;
            if (positionY.indexOf(p) > -1) this.positionY = p;
        });

        const popoverWidth = this.popoverEl.width(),
            popoverHeight = this.popoverEl.height(),
            targetWidth = this.instance.width(),
            targetHeight = this.instance.height();
        const {top, left} = this.instance.offset();

        const offset = {};
        // bottom
        if (this.positionY !== 'top') {
            offset.top = top + targetHeight + this.margin;
        }
        // default top
        else {
            offset.top = top - popoverHeight - this.margin;
        }

        // right
        if (this.positionX !== 'left') {
            offset.left = left + targetWidth - popoverWidth;
        }
        // default left
        else {
            offset.left = left;
        }

        this.popoverEl.css(offset);
    }

    setParams(obj) {
        if (!obj || obj.constructor !== Object) obj = {};
        this.margin = obj.margin || 0;
        this.position = obj.position || 'top-right';
        this.setPosition();
    }
}

export default Component
