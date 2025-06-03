import React from "react";

const ToDoItem = ({ task, onToggle, onDelete, inputRef}) => {
  
  const handleDoubleClick = () => {
    inputRef?.current?.onEdit(task._id, task.text);
  };

  return (
    <li className="todo-item" onDoubleClick={handleDoubleClick}>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className={task.completed ? "completed" : ""}>
          {task.text}
        </span>
      </label>
      <button className="delete-btn" onClick={() => onDelete(task._id)}>
        x
      </button>
    </li>
  );
};

export default ToDoItem;
