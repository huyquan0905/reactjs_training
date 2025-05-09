import React, { Component } from "react";
import { STATUS_TASK, STATUS_FILTER } from "../../constants/const";

class FilterList extends Component {
  render() {
    const { itemsLeft, filter, setFilter, clearCompleted } = this.props;

    return (
      <div className="todo-footer">
        <span>{itemsLeft} items left!</span>
        <div className="filters">
          <button
            className={filter === STATUS_TASK.ALL ? STATUS_TASK.ACTIVE : ""}
            onClick={() => setFilter(STATUS_TASK.ALL)}
          >
            {STATUS_FILTER.ALL}
          </button>

          <button
            className={filter === STATUS_TASK.ACTIVE ? STATUS_TASK.ACTIVE : ""}
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
        <button onClick={clearCompleted}>Clear completed</button>
      </div>
    );
  }
}

export default FilterList;
