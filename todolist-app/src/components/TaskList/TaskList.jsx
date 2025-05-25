// components/TaskList/TaskList.js
import React, { useContext } from "react";
import { LoadMoreContext } from "../../context/loadMoreContext";
import { STATUS_TASK } from "../../constants/const";
import withScroll from "../withScroll";

const TaskListBase = ({ tasks, setTasks, filter, startEditing }) => {
  const { displayTask } = useContext(LoadMoreContext);

  const filteredTasks = tasks.filter((task) => {
    if (filter === STATUS_TASK.ACTIVE) return !task.completed;
    if (filter === STATUS_TASK.COMPLETED) return task.completed;
    return true;
  });

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // const currentPageTasks = filteredTasks.slice(
  //   (currentPage - 1) * TASKS_PER_PAGE,
  //   currentPage * TASKS_PER_PAGE
  // );

  const taskDisplay = filteredTasks.slice(0, displayTask);

  return (
    <ul className="todo-list">
      {taskDisplay.map((task) => (
        <li
          key={task.id}
          className="todo-item"
          onDoubleClick={() => startEditing(task.id, task.text)}
        >
          <label>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span className={task.completed ? "completed" : ""}>
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
};

const TaskListWithScroll = withScroll(TaskListBase);

const TaskList = (props) => {
  const { loadMore, displayTask } = useContext(LoadMoreContext);
  console.log(props);

  return (
    <TaskListWithScroll
      {...props}
      loadMore={loadMore}
      displayTask={displayTask}
    />
  );
};

export default TaskList;
