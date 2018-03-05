import $ from 'jquery'
import jQueryComponent from './jqueryComponent.class'

export default class extends jQueryComponent {
    /**
     *
     * @param data 二级菜单详情
     * @param items 所有以及导航
     * @param content 子导航所显示的容器
     * @param config 可有可无的配置
     */
    constructor(data, items, content, config) {
        super(data);
        content.hide();
        config = config || {};
        this.topnavThrottleTime = config.topnavThrottleTime || 100;
        this.closeNavDelay = config.closeNavDelay || 300;
        this.content = content;
        this.hover = false;
        this.contentTimer = null;
        this.setActiveTimer = null;
        this.activeItem = null;

        items.map((i, item) => {
            $(item).hover(
                this.handleTopnavEnter.bind(this, item),
                this.handleTopnavLeave.bind(this, item)
            );
        });

        content.hover(
            this.handleContentEnter.bind(this),
            this.handleContentLeave.bind(this)
        )
    }

    handleTopnavEnter(item) {
        clearTimeout(this.setActiveTimer);
        this.setActiveTimer = setTimeout(() => {
            /**
             * 导航正文
             */
            clearTimeout(this.contentTimer);
            this.setContent(this.content, this.props[item.dataset['index']]);
            this.content.show();

            /**
             * 一级分类激活状态
             */
            if (!!this.activeItem) {
                // 如果有激活项
                this.activeItem.removeClass('active');
            }
            this.activeItem = $(item);
            this.activeItem.addClass('active');
        }, this.topnavThrottleTime);
    }

    handleTopnavLeave() {
        clearTimeout(this.contentTimer);
        this.contentTimer = setTimeout(() => {
            if (!this.hover) {
                if (!!this.activeItem) this.activeItem.removeClass('active');
                this.content.hide();
            }
        }, this.closeNavDelay);
    }

    handleContentEnter() {
        this.hover = true;
        if (this.setActiveTimer) clearTimeout(this.setActiveTimer);
    }

    handleContentLeave() {
        this.hover = false;
        this.content.hide();
        if (!!this.activeItem) this.activeItem.removeClass('active')
    }

    setContent(navContent, items) {
        let strHtml = '<ul class="second">';
        items.map(item => {
            strHtml += `<li><div class="main">${item.name}</div><ul class="third">`
            item.children.map(child => {
                strHtml += `<li>${child}</li>`
            });
            strHtml += '</ul></li>'
        });
        strHtml += '</ul>';
        navContent.html(strHtml);
    }
}
