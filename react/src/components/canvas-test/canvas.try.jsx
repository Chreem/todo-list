import React from 'react'
import PropTypes from 'prop-types'
import './canvas.css'

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.handleCanvasDraw = this.handleCanvasDraw.bind(this);
        this.timeout = null;
    }

    handleCanvasDraw() {
        const canvas = document.querySelector('#' + this.props.id)
        this.props.onDraw.call(this, canvas)

        if (!this.props.fps) return window.requestAnimationFrame(this.handleCanvasDraw);
        window.clearTimeout(this.timeout)
        this.timeout = setTimeout(
            () => (window.requestAnimationFrame(this.handleCanvasDraw)),
            1000 / this.props.fps
        )
    }

    componentDidMount() {
        const canvas = document.querySelector('#' + this.props.id)
        if (!canvas.getContext) return console.log('dont support canvas')
        this.handleCanvasDraw();
    }

    render() {
        const { id, width, height } = this.props;
        return <canvas id={id} width={width} height={height}>
            browser too old to open canvas
        </canvas>
    }
}

Canvas.propTypes = { id: PropTypes.string.isRequired }

Canvas.defaultProps = {
    width: 300,
    height: 300
}

export default Canvas
