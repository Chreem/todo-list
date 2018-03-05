class RootSize {
    constructor(win, count, maxWidth) {
        const isApp = (win.navigator.appVersion.match(/android/gi), win.navigator.appVersion.match(/iphone/gi));
        this.win = win;
        this.docHtml = document.documentElement;
        this.count = count || 32;
        this.maxWidth = maxWidth || 640;
        this.screenRatio = 1;
        this.scale = 1 / this.screenRatio;
        this.createMeta();
        this.readSize();
        this.win.addEventListener('resize', this.readSize.bind(this), false);
        window.SetSize = this
    }

    createMeta() {
        const viewPort = document.head.querySelector('meta[name="viewport"]')
        const content = `initial-scale=${this.scale}, maximum-scale=${this.scale}, minimum-scale=${this.scale}, width=device-width, user-scalable=no`
        if (viewPort) { viewPort.content = content }
        else {
            const meta = document.createElement('meta')
            meta.name = 'viewport'
            meta.content = content
            document.head.appendChild(meta)
        }
        document.write(`<style>body,input,textarea{font-size:${10 * this.screenRatio}px;}</style>`)
        this.maxWidth = this.screenRatio * this.maxWidth;
    }

    readSize() {
        let width = this.win.innerWidth || this.docHtml.clientWidth;
        if (!width && document.body) { width = document.body.clientWidth; }
        else if (!width) { return false; }
        width = Math.min(width, this.maxWidth);
        this.fontSize = width / this.count;
        this.docHtml.style.fontSize = this.fontSize + 'px';
    }

    getFontSize() { return this.fontSize }
    getScreenRatio() { return this.screenRatio }
    getEmSize(px) { return Math.floor(px / this.fontSize * 100) / 100 }
}

export default new RootSize(window);
