import React, { useContext, useState, useRef, useEffect, useMemo } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getTasks, addTask, updateTask } from "../../redux/tasks/thunk";
import {
  fetch,
  addRequest,
  updateRequest,
  clearCompleted,
} from "../../redux/tasks/slice";
import {
  selectAllTasks,
  selectActiveTaskCount,
} from "../../redux/tasks/selectors";

const HomeMain = () => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { tasks, isLoadingGet, isLoadingAdd } = useSelector(
    (state) => state.tasks
  );

  const [filter, setFilter] = useState(STATUS_TASK.ALL);
  const [currentPage, setCurrentPage] = useState(1);
  const inputRef = useRef();
  // const totalPages = Math.ceil(tasks.length / TASKS_PER_PAGE);

  useEffect(() => {
    dispatch(fetch());
  }, []);

  const handleEdit = (id, text) => {
    inputRef.current?.onEdit(id, text);
  };

  const tasksData = useMemo(() => tasks.data ?? [], [tasks.data]);

  // const itemsLeft = tasksData.filter((t) => !t.completed).length;
  const itemsLeft = useSelector(selectActiveTaskCount);

  // const handleSubmit = async (value, editingId) => {
  //   // if (editingId !== null) {
  //   //   const index = tasks.findIndex((t) => t.id === editingId);
  //   //   const updatedTasks = produce(tasks, (draft) => {
  //   //     draft[index].text = value;
  //   //   });
  //   //   setTasks(updatedTasks);
  //   // }
  //   if (editingId !== null) {
  //     try {
  //       const payload = {
  //         _id: editingId,
  //         text: value,
  //       };

  //       const response = await apiClient.put(TASK_UPDATE, payload);
  //       if (response.status === 200) {
  //         const index = tasks.findIndex((t) => t._id === editingId);
  //         const updatedTasks = produce(tasks, (draft) => {
  //           draft[index].text = value;
  //         });
  //         setTasks(updatedTasks);
  //       }
  //     } catch (err) {
  //       console.error("Edit task error:", err);
  //     }
  //   } else {
  //     setLoadingAddTask(true);
  //     try {
  //       const newTask = {
  //         text: value,
  //         completed: false,
  //       };

  //       const taskNew = await apiClient.post(TASK_ADD, newTask);
  //       const savedTask = taskNew.data.data;

  //       setTasks((prev) => [savedTask, ...prev]);
  //     } catch (err) {
  //       console.error("Error:", err);
  //     } finally {
  //       setLoadingAddTask(false);
  //     }
  //   }
  // };

  const handleSubmit = (value, editingId) => {
    if (editingId) {
      dispatch(updateRequest({ id: editingId, text: value }));
    } else {
      dispatch(addRequest({ text: value, completed: false }));
    }
  };

  const handleClearCompleted = () => {
    dispatch(clearCompleted());
  };

  // const changePage = (page) => {
  //   setCurrentPage(page);
  // };

  const filteredTasks = tasksData.filter((task) =>
    filter === STATUS_TASK.ACTIVE
      ? !task.completed
      : filter === STATUS_TASK.COMPLETED
      ? task.completed
      : true
  );

  // const clearCompleted = () => {
  //   setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  // };

  return (
    <div className="todo-container" style={theme.themeStyles}>
      <InputField
        ref={inputRef}
        onSubmit={handleSubmit}
        disabled={isLoadingAdd}
      />

      <TaskList
        filter={filter}
        filteredTask={filteredTasks}
        loading={isLoadingGet}
        onEdit={handleEdit}
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
