import React, { Component } from "react";
import "./input.css";

class InputList extends Component {
  state = {
    tasks: [],
    inputValue: ""
  };

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleKeyDown = (e) => {
    const { inputValue, tasks } = this.state;
    if (e.key === "Enter" && inputValue.trim() !== "") {
      this.setState({
        tasks: [...tasks, inputValue.trim()],
        inputValue: ""
      });
    }
  };

  render() {
    const { tasks, inputValue } = this.state;

    return (
      <div>
        <input
          type="text"
          placeholder="What needs to be done?"
          className="todo-input"
          value={inputValue}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <input type="checkbox" />
              <span>{task}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default InputList;
