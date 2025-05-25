import React, { useContext, useState, useCallback } from "react";
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
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState(STATUS_TASK.ALL);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsLeft = tasks.filter((t) => !t.completed).length;
  const totalPages = Math.ceil(tasks.length / TASKS_PER_PAGE);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      if (editingTaskId !== null) {
        const updatedTasks = produce(tasks, (draft) => {
          const task = draft.find((t) => t.id === editingTaskId);
          if (task) task.text = inputValue.trim();
        });
        setTasks(updatedTasks);
        // setTimeout(() => {
        setInputValue("");
        // }, 0);
        setEditingTaskId(null);
      } else {
        const newTask = {
          id: Date.now(),
          text: inputValue.trim(),
          completed: false,
        };
        setTasks([...tasks, newTask]);
        // setTimeout(() => {
        setInputValue("");
        // }, 0);
      }
    }
    // Clear input field nếu không muốn edit nữa
    if (e.key === "Escape") {
      setEditingTaskId(null);
      setInputValue("");
      console.log("123");
    }
  };

  const startEditing = (id, currentText) => {
    setEditingTaskId(id);
    console.log("Editing task ID:", currentText);
    setInputValue(currentText);
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="todo-container" style={theme.themeStyles}>
      <InputField
        handleKeyDown={handleKeyDown}
        inputValue={inputValue}
        setInputValue={setInputValue}
        editingTaskId={editingTaskId}
      />

      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        filter={filter}
        startEditing={startEditing}
      />

      <FilterList
        setTask={setTasks}
        itemsLeft={itemsLeft}
        filter={filter}
        setFilter={setFilter}
      />

      <PagingTask
        totalPages={totalPages}
        currentPage={currentPage}
        changePage={changePage}
      />

      <button className="change-theme" onClick={theme.toggleFunction}>
        {CHANGE_THEME_BTN}
      </button>
    </div>
  );
};

export default HomeMain;
