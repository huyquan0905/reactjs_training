import React, { useState, useCallback } from "react";
import useScroll from "../useScoll";
import ToDoItem from "./ToDoItem";
import { apiClient } from "../../api/helpers/api_helper";
import { TASK_UPDATE,TASKS_REMOVE } from "../../constants/url";
import AcModal from "../atoms/AcModal";
import "./taskList.css";

const TaskList = ({ setTasks, filteredTask, onEdit, loading }) => {
  const [displayTask, setDisplayTask] = useState(10);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const loadMore = useCallback(() => {
    setDisplayTask((prev) => prev + 5);
  }, []);

  useScroll(loadMore);

  const toggleTask = async (id, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;

      await apiClient.put(TASK_UPDATE, {
        _id: id,
        completed: updatedStatus,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, completed: updatedStatus } : task
        )
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteClick = (taskId) => {
    setTaskToDelete(taskId);
  };

  const confirmDelete = async () => {
    try {
      const taskDelete = {
        _id: taskToDelete,
      };
      await apiClient.delete(TASKS_REMOVE, taskDelete);
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== taskToDelete)
      );
      setTimeout(() => {
        setTaskToDelete(null);
      }, 0);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setTaskToDelete("");
    }
  };

  const cancelDelete = () => setTaskToDelete(null);

  const taskDisplay = filteredTask.slice(0, displayTask);

  if (loading) {
    return <div className="spinner" />;
  }

  return (
    <>
      <ul className="todo-list">
        {taskDisplay.map((task) => (
          <ToDoItem
            key={task._id}
            task={task}
            onToggle={() => toggleTask(task._id, task.completed)}
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
