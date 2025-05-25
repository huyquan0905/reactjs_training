import React from "react";
import {
  STATUS_TASK,
  STATUS_FILTER,
  CLEAR_COMPLETED,
} from "../../constants/const";

const FilterList = ({ setTask, itemsLeft, filter, setFilter }) => {
  
  const clearCompleted = () => {
    setTask((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  return (
    <div className="todo-footer">
      <span>{itemsLeft} items left!</span>
      <div className="filters">
        <button
          className={filter === STATUS_TASK.ALL ? "active" : ""}
          onClick={() => setFilter(STATUS_TASK.ALL)}
        >
          {STATUS_FILTER.ALL}
        </button>

        <button
          className={filter === STATUS_TASK.ACTIVE ? "active" : ""}
          onClick={() => setFilter(STATUS_TASK.ACTIVE)}
        >
          {STATUS_FILTER.ACTIVE}
        </button>

        <button
          className={filter === STATUS_TASK.COMPLETED ? "active" : ""}
          onClick={() => setFilter(STATUS_TASK.COMPLETED)}
        >
          {STATUS_FILTER.COMPLETED}
        </button>
      </div>
      <button onClick={clearCompleted}>{CLEAR_COMPLETED}</button>
    </div>
  );
};

export default FilterList;
