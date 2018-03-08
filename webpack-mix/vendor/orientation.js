/**
 * 检查横竖屏状态
 * 竖屏为true 横屏false
 * @returns {boolean}
 */
export default function checkOrientation() {
    if (!!window.orientation) return window.orientation === 0;
    return window.innerHeight > window.innerWidth;
}
//
// export class OrientationChangeListener {
//     constructor(pcb, lcb) {
//         this.pcb = pcb || console.log;
//         this.lcb = lcb || console.log;
//         window.addEventListener('orientationchange', this.handleOrientationChange.bind(this));
//     }
//
//     handleOrientationChange() {
//         /**
//          * 此事件在旋转动作做出而未完成时执行, 如横转竖时, 数据均为横屏数据
//          */
//         !checkOrientation() ? this.pcb() : this.lcb();
//     }
// }