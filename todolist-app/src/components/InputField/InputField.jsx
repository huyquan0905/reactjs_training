import React, { Component } from "react";
import { TaskContext } from "../../context/TaskContext";
import "./input.css";

class InputField extends Component {
  static contextType = TaskContext;

  componentDidUpdate() {
    if (this.context.editingTaskId !== null) {
      this.inputRef?.focus();
    }
  }

  render() {
    const { inputValue, handleChange, handleKeyDown } = this.context;

    return (
      <input
        type="text"
        className="todo-input"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={(ref) => (this.inputRef = ref)}
      />
    );
  }
}

export default InputField;
