import React, { Component } from "react";
import "./input.css";

class InputList extends Component {
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="What needs to be done?"
          className="todo-input"
        />
      </div>
    );
  }
}

export default InputList;
