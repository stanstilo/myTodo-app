import React from "react";
import "./style.css";

class App extends React.Component {
  state = {
    todoItems: [], //todo items,initialized with empty array
    inputValue: "" //input value initialized with empty string also the value of the input tag
  };

  //when the input value changes, run this function which sets the input value state to what is typed in the input
  handleChange = e => {
    this.setState({
      inputValue: e.target.value
    });
  };

  handleClick = () => {
    // add the input value to todo items array
    const { todoItems, inputValue } = this.state;
    if (inputValue !== "") {

      const newTodoItems = [
        ...todoItems,
        {
          id: todoItems.length + inputValue, //generate a unique id for each item. which helps when we want to target an item for deletion
          item: inputValue, //the item we ant to add in the todo
          done: false //checks if an item is done
        }
      ];
      this.setState({
        todoItems: newTodoItems,
        //clear the input value state
        inputValue: ""
      });
    }
  };

  handleChecked = checkboxID => {
    const newTodoItems = [...this.state.todoItems];
    // map through the state items array get the item whose id is same as the one passed from the checkbox
    newTodoItems.map(data => {
      if (data.id === checkboxID) {
        return (data.done = !data.done);
      }
      return data;
    });

    this.setState({
      todoItems: newTodoItems
    });
  };

  handleDelete = todoId => {
    const { todoItems } = this.state;
    const newTodoItems = [...todoItems];
    newTodoItems.map(data => {
      const { id } = data;
      if (todoId === id) {
        newTodoItems.splice(newTodoItems.indexOf(data), 1);
      }
        this.setState({
          todoItems: newTodoItems
        });     
    });
  };

  render() {
    // destructure todo items and input value and extract the from the state
    const { todoItems, inputValue } = this.state;

    return (
      <div className="todo-container">             
        {/* instead of using the direct input value, we want a controlled input where the input value state is 
        the value being typed */}
          <h3 className='todo-heading'>TODO APP</h3>
        <div className="todo-row">
        <input type="text" value={inputValue} onChange={this.handleChange} />

        {/* when we click the button, take the value on the input and push it to the array which will be 
        rendered as a todo item */}
        <button className="add-item-btn" onClick={this.handleClick}>
          Add Item
        </button>
        </div>
        <ul>
          {// map the todoitems from the state
          todoItems.length > 0 &&
            todoItems.map(data => {
              const { id, item, done } = data; //take out id and item from the data
              return (
                <div className="todo-item" key={id}>
                  <input
                    type="checkbox"
                    onClick={() => this.handleChecked(id)}
                  />
                  <li className={done ? "done" : undefined}>{item}</li>
                  <button
                    className="delete"
                    onClick={() => this.handleDelete(id)}
                  >
                    X
                  </button>
                </div>
              );
            })}
          </ul>
       
      </div>
    );
  }
}

export default App;
