// context/TaskContext.js
import React, { Component, createContext } from "react";
import { STATUS_TASK, TASKS_PER_PAGE } from "../constants/const";

export const TaskContext = createContext();

export class TaskProvider extends Component {
  state = {
    tasks: [],
    inputValue: "",
    filter: STATUS_TASK.ALL,
    editingTaskId: null,
    currentPage: 1,
  };

  handleChange = (e) => this.setState({ inputValue: e.target.value });

  handleKeyDown = (e) => {
    const { inputValue, tasks, editingTaskId } = this.state;
    if (e.key === "Enter" && inputValue.trim()) {
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
        this.setState({ tasks: [...tasks, newTask], inputValue: "" });
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
    this.setState({ tasks: this.state.tasks.filter((task) => task.id !== id) });
  };

  startEditing = (id, currentText) => {
    this.setState({ editingTaskId: id, inputValue: currentText });
  };

  setFilter = (filter) => this.setState({ filter });

  clearCompleted = () =>
    this.setState({
      tasks: this.state.tasks.filter((task) => !task.completed),
    });

  changePage = (page) => this.setState({ currentPage: page });

  render() {
    return (
      <TaskContext.Provider
        value={{
          ...this.state,
          handleChange: this.handleChange,
          handleKeyDown: this.handleKeyDown,
          toggleTask: this.toggleTask,
          deleteTask: this.deleteTask,
          startEditing: this.startEditing,
          setFilter: this.setFilter,
          clearCompleted: this.clearCompleted,
          changePage: this.changePage,
          TASKS_PER_PAGE,
        }}
      >
        {this.props.children}
      </TaskContext.Provider>
    );
  }
}
