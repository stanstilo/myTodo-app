import React from 'react';
import './App.css';


class App extends React.Component {
  state = {
    inputValue: '',
    todoItems: []
  }

  handleInputChange = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  handleClickedButton = () => {
    const { inputValue, todoItems } = this.state;
    if (inputValue !== '') {
      this.setState({
        todoItems: [...todoItems, {
          id: todoItems.length + inputValue,
          item: inputValue,
          done: false
        }],
        inputValue: ''
      })
    }
    return this.state
  }

  handleChecked = (todoId) => {
    const { todoItems } = this.state;
    const newTodoItems = [...todoItems]
    newTodoItems.map((data, index) => {
      const { id, done } = data
      if (todoId === id) {
        data = { ...data, done: !done }
        newTodoItems[index] = data
      }
    })
    this.setState({
      todoItems: newTodoItems
    })
  }

  handleDelete = (todoId) => {
    const { todoItems } = this.state
    const newTodoItems = [...todoItems]
    newTodoItems.map(data => {
      const { id } = data
      if (id === todoId) {
        newTodoItems.splice(newTodoItems.indexOf(data), 1)
        this.setState({
          todoItems: newTodoItems
        })
      }
    })
  }

  render() {
    const { inputValue, todoItems } = this.state
    return (
      <>
        <div>
          <input
            type='text'
            value={inputValue}
            onChange={this.handleInputChange}
          />
          <button
            onClick={this.handleClickedButton}
          >Add item</button>
        </div>
        <ul>
          {
            todoItems.map(data => {
              const { id, item, done } = data;
              return (
                <div className="item" key={id}>
                  <input type="checkbox" onClick={() => this.handleChecked(id)} />
                  <li className={done ? 'done' : null}>{item}</li>
                  <button className="delete" onClick={() => this.handleDelete(id)}>delete</button>
                </div>
              )
            })
          }
        </ul>
      </>
    )
  }
}
export default App;
