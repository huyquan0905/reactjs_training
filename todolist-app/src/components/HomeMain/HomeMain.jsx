import React, { Component } from "react";
import { ThemeContext } from "../../context/themeContext";
import { TaskContext } from "../../context/TaskContext";
import InputField from "../InputField/InputField";
import TaskList from "../TaskList/TaskList";
import FilterList from "../FilterTask/FilterList";
import PagingTask from "../PagingTask/PagingTask";
import { CHANGE_THEME_BTN } from "../../constants/const";

class HomeMain extends Component {
  static contextType = ThemeContext;

  render() {
    const theme = this.context;

    return (
      <TaskContext.Consumer>
        {(taskContext) => {
          const itemsLeft = taskContext.tasks.filter(
            (t) => !t.completed
          ).length;
          const totalPages = Math.ceil(
            taskContext.tasks.length / taskContext.TASKS_PER_PAGE
          );

          return (
            <div className="todo-container" style={theme.themeStyles}>
              <InputField />

              <TaskList />

              <FilterList
                itemsLeft={itemsLeft}
                filter={taskContext.filter}
                setFilter={taskContext.setFilter}
                clearCompleted={taskContext.clearCompleted}
              />

              <PagingTask
                totalPages={totalPages}
                currentPage={taskContext.currentPage}
                changePage={taskContext.changePage}
              />

              <button className="change-theme" onClick={theme.toggleFunction}>
                {CHANGE_THEME_BTN}
              </button>
            </div>
          );
        }}
      </TaskContext.Consumer>
    );
  }
}

export default HomeMain;
