import jQueryComponent from './jqueryComponent.class'

export default class extends jQueryComponent {
    constructor(button) {
        super(button);
        this.state = false;
        this.activeCallback = null;
        button.click(this.handleButtonClick.bind(this))
    }

    isActive(fn) {
        this.activeCallback = fn.bind(this)
    }

    handleButtonClick() {
        this.state = !this.state;
        if (!!this.activeCallback) this.activeCallback(this.state);
    }
}
