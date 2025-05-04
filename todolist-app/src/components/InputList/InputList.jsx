import React, { Component } from "react";
import "./input.css";

class InputList extends Component {
  state = {
    tasks: [],
    inputValue: "",
    filter: "All", 
  };

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleKeyDown = (e) => {
    const { inputValue, tasks } = this.state;
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
      };
      this.setState({
        tasks: [...tasks, newTask],
        inputValue: "",
      });
    }
  };

  toggleTask = (id) => {
    const updatedTasks = this.state.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.setState({ tasks: updatedTasks });
  };

  setFilter = (filter) => {
    this.setState({ filter });
  };

  clearCompleted = () => {
    this.setState({
      tasks: this.state.tasks.filter((task) => !task.completed),
    });
  };

  render() {
    const { tasks, inputValue, filter } = this.state;

    const filteredTasks = tasks.filter((task) => {
      if (filter === "Active") return !task.completed;
      if (filter === "Completed") return task.completed;
      return true;
    });

    const itemsLeft = tasks.filter((t) => !t.completed).length;

    return (
      <div className="todo-container">
        <input
          type="text"
          placeholder="What needs to be done?"
          className="todo-input"
          value={inputValue}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        <ul className="todo-list">
          {filteredTasks.map((task) => (
            <li key={task.id}>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => this.toggleTask(task.id)}
                />
                <span className={task.completed ? "completed" : ""}>
                  {task.text}
                </span>
              </label>
            </li>
          ))}
        </ul>

        <div className="todo-footer">
          <span>{itemsLeft} items left!</span>
          <div className="filters">
            <button
              className={filter === "All" ? "active" : ""}
              onClick={() => this.setFilter("All")}
            >
              All
            </button>
            <button
              className={filter === "Active" ? "active" : ""}
              onClick={() => this.setFilter("Active")}
            >
              Active
            </button>
            <button
              className={filter === "Completed" ? "active" : ""}
              onClick={() => this.setFilter("Completed")}
            >
              Completed
            </button>
          </div>
          <button onClick={this.clearCompleted}>Clear completed</button>
        </div>
      </div>
    );
  }
}

export default InputList;
