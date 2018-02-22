function firstUpperCase(str) {
    str = str.toLowerCase();
    return str[0].toUpperCase() + str.slice(1)
}

function formatDataset() {
    let strs = Array.prototype.slice.call(arguments);
    if (strs.length === 1) return strs[0];
    else {
        let result = strs[0];
        for (let i = 1; i < strs.length; i++) { result += firstUpperCase(strs[i]); }
        return result
    }
}

const DEFAULT = {
    event: 'change',
    root_tag_name: 'form',
    prefix: 'chr',
    suffix: 'message'
};

let checkTagName = (el, tag = DEFAULT.root_tag_name) => el.tagName === tag.toUpperCase();

const ERROR = {
    NOT_FORM: 'root element must be ' + DEFAULT.root_tag_name,
    MISMATCH_MESSAGE: '不满足条件'
}

const RULES = {
    /**
     * str='a-b' a<=x<=b 或 str='a' x==a
     * 满足条件返回true 否则为错误原因
     * @param str
     * @returns {*}
     */
    char(str) {
        const [a, b] = str.split('-');
        const x = this.value.length;
        return typeof b === 'undefined'
            ? x * 1 === a * 1
            : a <= x && x <= b;
    },

    /**
     * 正则匹配
     * @param regex
     */
    regex(regex) { return new RegExp(regex).test(this.value) },

    /**
     * 换行数 <=num
     * @param num
     */
    wrap(num) { return this.value.split(/[\r\n]/).length <= num },

    /**
     * 密码必须相同
     * @param password
     * @returns {*}
     */
    password(password) { return password === this.value }
}

export default function (root, options = {}) {
    Object.assign(DEFAULT, options);
    if (!root || !checkTagName(root, DEFAULT.root_tag_name)) throw new Error(error.NOT_FORM);

    if (options.selfRules) Object.assign(RULES, options.selfRules);

    // NodeList为伪数组
    Array.prototype.slice.call(root.querySelectorAll('input,textarea,selection')).map(element => {
        element.addEventListener(DEFAULT.event, e => {
            element.setCustomValidity('');
            for (let rule in RULES) {
                const userConfig = element.dataset[formatDataset(DEFAULT.prefix, rule)];
                if (typeof userConfig !== 'undefined') continue;
                if (!RULES[rule].call(element, userConfig)) {
                    return element.setCustomValidity(
                        element.dataset[formatDataset(DEFAULT.prefix, rule, DEFAULT.suffix)]
                        || error.MISMATCH_MESSAGE
                    )
                }
            }
        })
    })
}
