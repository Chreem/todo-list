import React from 'react'

module.exports = class Item extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        this.props.onItemClicked(e.target.innerHTML)
    }
    render() {
        return (
            <div onClick={this.handleClick}>
                {this.props.todoContent}
            </div>
        )
    }
}