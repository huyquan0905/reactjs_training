import React, { Component } from "react";
import "./input.css";
import { STATUS_TASK } from "../../constants/const";
import FilterList from "./FilterList";

class InputList extends Component {
  state = {
    tasks: [],
    inputValue: "",
    filter: STATUS_TASK.ALL,
    editingTaskId: null,
    // editInputValue: "",
  };

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  // QuanHH: Logic cũ trước khi update edit task -> double click -> focus input -> editted
  // handleKeyDown = (e) => {
  //   const { inputValue, tasks } = this.state;
  //   if (e.key === "Enter" && inputValue.trim() !== "") {
  //     const newTask = {
  //       id: Date.now(),
  //       text: inputValue.trim(),
  //       completed: false,
  //     };
  //     this.setState({
  //       tasks: [...tasks, newTask],
  //       inputValue: "",
  //     });
  //   }
  // };

  handleKeyDown = (e) => {
    const { inputValue, tasks, editingTaskId } = this.state;

    if (e.key === "Enter" && inputValue.trim() !== "") {
      if (editingTaskId !== null) {
        const updatedTasks = tasks.map((task) =>
          task.id === editingTaskId
            ? { ...task, text: inputValue.trim() }
            : task
        );
        this.setState({
          tasks: updatedTasks,
          inputValue: "",
          editingTaskId: null,
        });
      } else {
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
    }

    if (e.key === "Escape") {
      this.setState({ editingTaskId: null, inputValue: "" });
    }
  };

  toggleTask = (id) => {
    const updatedTasks = this.state.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.setState({ tasks: updatedTasks });
  };

  deleteTask = (id) => {
    this.setState({
      tasks: this.state.tasks.filter((task) => task.id !== id),
    });
  };

  // startEditing = (id, currentText) => {
  //   this.setState({
  //     editingTaskId: id,
  //     editInputValue: currentText,
  //   });
  // };

  startEditing = (id, currentText) => {
    this.setState(
      {
        editingTaskId: id,
        inputValue: currentText,
      },
      () => {
        this.inputRef?.focus();
      }
    );
  };

  // handleEditChange = (e) => {
  //   this.setState({ editInputValue: e.target.value });
  // };

  // handleEditKeyDown = (e, id) => {
  //   if (e.key === "Enter") {
  //     const updatedTasks = this.state.tasks.map((task) =>
  //       task.id === id ? { ...task, text: this.state.editInputValue } : task
  //     );
  //     this.setState({
  //       tasks: updatedTasks,
  //       editingTaskId: null,
  //       editInputValue: "",
  //     });
  //   }
  // };

  setFilter = (filter) => {
    this.setState({ filter });
  };

  clearCompleted = () => {
    this.setState({
      tasks: this.state.tasks.filter((task) => !task.completed),
    });
  };

  // cancelEdit = () => {
  //   this.setState({
  //     editingTaskId: null,
  //     editInputValue: "",
  //   });
  // };

  render() {
    const { tasks, inputValue, filter, editingTaskId } = this.state;

    const filteredTasks = tasks.filter((task) => {
      if (filter === STATUS_TASK.ACTIVE) return !task.completed;
      if (filter === STATUS_TASK.COMPLETED) return task.completed;
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
          ref={(ref) => (this.inputRef = ref)}
        />

        <ul className="todo-list">
          {filteredTasks.map((task) => (
            <li key={task.id} className="todo-item">
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => this.toggleTask(task.id)}
                />

                <span
                  className={task.completed ? "completed" : ""}
                  onDoubleClick={() => this.startEditing(task.id, task.text)}
                >
                  {task.text}
                </span>
              </label>
              
              <button
                className="delete-btn"
                onClick={() => this.deleteTask(task.id)}
              >
                x
              </button>
            </li>
          ))}
        </ul>

        <FilterList
          itemsLeft={itemsLeft}
          filter={filter}
          setFilter={this.setFilter}
          clearCompleted={this.clearCompleted}
        />
      </div>
    );
  }
}

export default InputList;
