import React from 'react'

import Item from './item.jsx'

const service = require('../service.js');

class Todo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            items: [{ todo: 'local data', objectId: '1' }]
        }

        this.handleInputKeyDowm = this.handleInputKeyDowm.bind(this)
        this.handleButtonClick = this.handleButtonClick.bind(this)
    }

    componentDidMount() {
        if (/debug/.test(window.location.href)) {
            console.log('in debug mode');
            this.setState({
                items: [
                    { todo: '111', objectId: '1' },
                    { todo: '222', objectId: '2' },
                    { todo: '333', objectId: '3' },
                ]
            });
            return
        }

        service.readItems().then(items => {
            this.setState({ items });
        });
    }

    addNewItem(todo) {
        if (todo === '') return
        service.addNewItem(todo).then(res => {
            this.setState(prevState => ({
                items: [{ todo, objectId: res.objectId }].concat(prevState.items)
            }));
        });
    }
    handleInputKeyDowm(e) {
        if (e.key === 'Enter') {
            this.addNewItem(e.target.value)
            e.target.value = ''
        }
    }
    handleButtonClick(e) {
        this.addNewItem(new_item.value)
        new_item.value = ''
    }

    handleItemClick(e, obj, index) {
        service.deleteItem(obj.objectId);
        this.setState(prevState => {
            let items = prevState.items.concat();
            items.splice(index, 1)
            return { items }
        });
    }

    render() {
        let divStyle = {
            display: 'inline-block'
        };

        return (
            <div id="todo_list">
                <div className="input-field" style={divStyle}>
                    <input id="new_item" type="text" onKeyDown={this.handleInputKeyDowm} />
                    <label htmlFor="new_item">add new todo</label>
                </div>
                <button className="waves-effect waves-light btn" onClick={this.handleButtonClick}>Add</button>
                <ul className="collection">
                    {this.state.items.map((obj, index) =>
                        <li key={obj.objectId}
                            className="collection-item">
                            <Item onItemClicked={(e) => this.handleItemClick(e, obj, index)}
                                todoContent={obj.todo}></Item>
                        </li>)}
                </ul>
            </div >
        )
    }
}

module.exports = Todo;