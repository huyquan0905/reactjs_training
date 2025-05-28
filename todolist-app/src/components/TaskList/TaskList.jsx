import React, { useState, useCallback } from "react";
import useScroll from "../../hooks/useInfiniteScroll";
import ToDoItem from "./ToDoItem";

const TaskList = ({ setTasks, filteredTask, inputRef }) => {
  const [displayTask, setDisplayTask] = useState(10);

  const loadMore = useCallback(() => {
    setDisplayTask((prev) => prev + 5);
  }, []);

  useScroll(loadMore);

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

  const taskDisplay = filteredTask.slice(0, displayTask);

  return (
    <ul className="todo-list">
      {taskDisplay.map((task) => (
        <ToDoItem
          key={task.id}
          task={task}
          onToggle={toggleTask}
          onDelete={deleteTask}
          inputRef={inputRef}
        />
      ))}
    </ul>
  );
};

export default TaskList;
