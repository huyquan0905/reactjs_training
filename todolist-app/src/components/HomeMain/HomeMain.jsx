import React, { useContext, useState, useRef, useEffect } from "react";
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
import { produce } from "immer";
import { apiClient } from "../../api/helpers/api_helper";
import { TASK_ADD, TASKS_GET, TASK_UPDATE } from "../../constants/url";

const HomeMain = () => {
  const theme = useContext(ThemeContext);
  const [tasks, setTasks] = useState([]);
  const [loadingGetTasks, setLoadingGetTasks] = useState(true);
  const [loadingAddTask, setLoadingAddTask] = useState(false);

  const [filter, setFilter] = useState(STATUS_TASK.ALL);
  const [currentPage, setCurrentPage] = useState(1);
  const inputRef = useRef();
  const totalPages = Math.ceil(tasks.length / TASKS_PER_PAGE);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await apiClient.get(TASKS_GET);
        setTasks(response.data.data);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoadingGetTasks(false);
      }
    };

    getTasks();
  }, []);

  const itemsLeft = tasks.filter((t) => !t.completed).length;

  const handleSubmit = async (value, editingId) => {
    // if (editingId !== null) {
    //   const index = tasks.findIndex((t) => t.id === editingId);
    //   const updatedTasks = produce(tasks, (draft) => {
    //     draft[index].text = value;
    //   });
    //   setTasks(updatedTasks);
    // }
    if (editingId !== null) {
      try {
        const payload = {
          _id: editingId,
          text: value,
        };

        const response = await apiClient.put(TASK_UPDATE, payload);
        if (response.status === 200) {
          const index = tasks.findIndex((t) => t._id === editingId);
          const updatedTasks = produce(tasks, (draft) => {
            draft[index].text = value;
          });
          setTasks(updatedTasks);
        }
      } catch (err) {
        console.error("Edit task error:", err);
      }
    } else {
      setLoadingAddTask(true);
      try {
        const newTask = {
          text: value,
          completed: false,
        };

        const taskNew = await apiClient.post(TASK_ADD, newTask);
        const savedTask = taskNew.data.data;

        setTasks((prev) => [savedTask, ...prev]);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoadingAddTask(false);
      }
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
      <InputField
        ref={inputRef}
        onSubmit={handleSubmit}
        disabled={loadingAddTask}
      />

      <TaskList
        setTasks={setTasks}
        filter={filter}
        inputRef={inputRef}
        filteredTask={filteredTasks}
        loading={loadingGetTasks}
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
