import React from 'react'
import './css/index.css'
import Canvas from './components/canvas-test'

import jsonp from './js/jsonp'


const sun = new Image();
const moon = new Image();
const earth = new Image();
sun.src = require('./assets/star/sun.png');
moon.src = require('./assets/star/moon.png');
earth.src = require('./assets/star/earth.png');


class ball {
    constructor(x = 0, y = 0, radius = 25, color = 'blue') {
        this.x = x
        this.y = y
        this.radius = radius;
        this.color = color;
    }

    setSpeed(vx, vy) {
        this.vx = vx;
        this.vy = vy;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

const b = new ball(100, 100);
b.setSpeed(5, 2)
function draw(canvas) {
    const ctx = canvas.getContext('2d')
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'rgba(0,0,0,.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    b.draw(ctx)
    b.x += b.vx;
    b.y += b.vy;
    b.vy *= .99;
    b.vy += .25;

    if (b.y + b.vy > canvas.height || b.y + b.vy < 0) b.vy = -b.vy
    if (b.x + b.vx > canvas.height || b.x + b.vx < 0) b.vx = -b.vx
}

export default class App extends React.Component {
    componentDidMount() {
        test.style.transformOrigin = "0 0";
        test.style.transform = "scale(2)"

    }

    render() {
        const w = window.innerWidth;
        const h = window.innerHeight;

        return <div className="canvasSet">
            <Canvas id="test" width={w / 2} height={h / 2} onDraw={draw}></Canvas>
        </div>
    }
}
