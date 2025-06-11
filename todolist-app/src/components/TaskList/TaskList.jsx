import React, { useState, useCallback } from "react";
import useScroll from "../useScoll";
import ToDoItem from "./ToDoItem";
import AcModal from "../atoms/AcModal";
import { useDispatch } from "react-redux";
import { toggleTask, deleteTask } from "../../redux/tasks/thunk";
import "./taskList.css";

const TaskList = ({ filteredTask, onEdit, loading }) => {
  const dispatch = useDispatch();
  const [displayTask, setDisplayTask] = useState(10);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const loadMore = useCallback(() => {
    setDisplayTask((prev) => prev + 5);
  }, []);

  useScroll(loadMore);

  const handleToggle = (id, currentStatus) => {
    dispatch(toggleTask({ id, completed: !currentStatus }));
  };

  const handleDeleteClick = (taskId) => {
    setTaskToDelete(taskId);
  };

  const confirmDelete = () => {
    dispatch(deleteTask(taskToDelete));
    setTaskToDelete(null);
  };

  const cancelDelete = () => setTaskToDelete(null);

  const taskDisplay = filteredTask.slice(0, displayTask);

  if (loading) return <div className="spinner" />;

  return (
    <>
      <ul className="todo-list">
        {taskDisplay.map((task) => (
          <ToDoItem
            key={task._id}
            task={task}
            onToggle={() => handleToggle(task._id, task.completed)}
            onDelete={() => handleDeleteClick(task._id)}
            onEdit={onEdit}
          />
        ))}
      </ul>

      <AcModal
        isOpen={taskToDelete !== null}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this task?"
      />
    </>
  );
};

export default TaskList;
