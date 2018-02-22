(function (win, count, maxWidth, contid) {
    return new function () {
        let SetSize = win.SetSize = this,
            docHtml = document.documentElement,
            count = count || 32,
            maxWidth = maxWidth || 640,
            screenRatio,
            width,
            scale;

        this.fontSize = 0;

        let setup = function () {
            let isApp = (win.navigator.appVersion.match(/android/gi), win.navigator.appVersion.match(/iphone/gi));
            screenRatio = 1;
            scale = 1 / screenRatio;
            createMeta();
        }
        let createMeta = function () {
            document.write('<meta name="viewport" content="initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', width=device-width, user-scalable=no" />');
            document.write('<style>body,input,textarea{font-size:' + 10 * screenRatio + 'px;}</style>');
            maxWidth = screenRatio * maxWidth;
            readSize();
            bindEvents();
        }
        let readSize = function () {
            width = win.innerWidth || document.documentElement.clientWidth;
            if (!width && !!document.body) {
                width = document.body.clientWidth;
            } else if (!width) {
                return false;
            }
            width = Math.min(width, maxWidth);
            SetSize.fontSize = width / count;
            docHtml.style.fontSize = SetSize.fontSize + 'px';
        }
        let bindEvents = function () {
            win.addEventListener('resize', function () {
                readSize();
            }, false);
        }

        this.getFontSize = function () {
            return SetSize.fontSize;
        }

        this.getScreenRatio = function () {
            return screenRatio;
        }

        this.getEmSize = function (px) {
            return Math.floor(px / SetSize.fontSize * 100) / 100;
        }

        setup();
    }
})(window, 32, 640);