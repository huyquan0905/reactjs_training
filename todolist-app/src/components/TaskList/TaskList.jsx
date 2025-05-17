// components/TaskList/TaskList.js
import React, { Component } from "react";
import { TaskContext } from "../../context/TaskContext";
import { STATUS_TASK } from "../../constants/const";

class TaskList extends Component {
  static contextType = TaskContext;

  render() {
    const {
      tasks,
      filter,
      currentPage,
      TASKS_PER_PAGE,
      toggleTask,
      deleteTask,
      startEditing,
    } = this.context;

    const filteredTasks = tasks.filter((task) => {
      if (filter === STATUS_TASK.ACTIVE) return !task.completed;
      if (filter === STATUS_TASK.COMPLETED) return task.completed;
      return true;
    });

    const currentPageTasks = filteredTasks.slice(
      (currentPage - 1) * TASKS_PER_PAGE,
      currentPage * TASKS_PER_PAGE
    );

    return (
      <ul className="todo-list">
        {currentPageTasks.map((task) => (
          <li key={task.id} className="todo-item">
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span
                className={task.completed ? "completed" : ""}
                onDoubleClick={() => startEditing(task.id, task.text)}
              >
                {task.text}
              </span>
            </label>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              x
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export default TaskList;
