import React from 'react'
import './css/index.css'
import Canvas from './components/canvas-test'

import jsonp from './js/jsonp'

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

    moveFollowSpeed() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy *= .99;
        this.vy += .25;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function edgeDetection(b, el) {
    /**
     * edge detection
     */
    if (b.y + b.vy > el.height || b.y + b.vy < 0) b.vy = -b.vy
    if (b.x + b.vx > el.height || b.x + b.vx < 0) b.vx = -b.vx
}
const b = new ball(100, 100);
b.setSpeed(5, 2)
const balls = [b]
function draw(canvas) {
    const ctx = canvas.getContext('2d')
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'rgba(0,0,0,.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    balls.map(b => {
        b.draw(ctx)
        b.moveFollowSpeed();
        edgeDetection(b, canvas)
    })
}

export default class App extends React.Component {
    componentDidMount() {
    }

    handleClick(e) {
        const b = new ball(e.clientX, e.clientY);
        b.setSpeed(5, 2);
        balls.push(b)
    }

    render() {
        const { innerWidth, innerHeight } = window;

        return <div className="canvasSet">
            <Canvas id="test" width={innerWidth} height={innerHeight} onDraw={draw} onClick={this.handleClick}></Canvas>
        </div>
    }
}
