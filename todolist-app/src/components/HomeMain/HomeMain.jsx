import React, { useContext, useState, useRef } from "react";
import { ThemeContext } from "../../context/themeContext";
import InputField from "../InputField/InputField";
import TaskList from "../TaskList/TaskList";
import FilterList from "../FilterTask/FilterList";
import PagingTask from "../PagingTask/PagingTask";
import {
  CHANGE_THEME_BTN,
  STATUS_TASK,
  TASKS_PER_PAGE,
} from "../../constants/const";
import { mockTasks } from "../../mockData";
import { produce } from "immer";

const HomeMain = () => {
  const theme = useContext(ThemeContext);
  const [tasks, setTasks] = useState(mockTasks);
  const [filter, setFilter] = useState(STATUS_TASK.ALL);
  const [currentPage, setCurrentPage] = useState(1);
  const inputRef = useRef();
  const itemsLeft = tasks.filter((t) => !t.completed).length;
  const totalPages = Math.ceil(tasks.length / TASKS_PER_PAGE);

  const handleSubmit = (value, editingId) => {
    if (editingId !== null) {
      const index = tasks.findIndex((t) => t.id === editingId);
      const updatedTasks = produce(tasks, (draft) => {
        draft[index].text = value;
      });
      setTasks(updatedTasks);
    } else {
      const newTask = {
        id: Date.now(),
        text: value,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const filteredTasks = tasks.filter((task) =>
    filter === STATUS_TASK.ACTIVE
      ? !task.completed
      : filter === STATUS_TASK.COMPLETED
      ? task.completed
      : true
  );

  const clearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  return (
    <div className="todo-container" style={theme.themeStyles}>
      <InputField ref={inputRef} onSubmit={handleSubmit} />

      <TaskList
        setTasks={setTasks}
        filter={filter}
        inputRef={inputRef}
        filteredTask={filteredTasks}
      />

      <FilterList
        itemsLeft={itemsLeft}
        filter={filter}
        setFilter={setFilter}
        clearCompleted={clearCompleted}
      />

      {/* <PagingTask
        totalPages={totalPages}
        currentPage={currentPage}
        changePage={changePage}
      /> */}

      <button className="change-theme" onClick={theme.toggleFunction}>
        {CHANGE_THEME_BTN}
      </button>
    </div>
  );
};

export default HomeMain;
