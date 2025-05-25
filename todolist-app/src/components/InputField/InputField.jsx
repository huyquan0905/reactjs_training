import { useEffect, useRef } from "react";
import "./input.css";

const InputField = ({
  handleKeyDown,
  inputValue,
  setInputValue,
  editingTaskId,
}) => {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (editingTaskId !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingTaskId]);

  return (
    <input
      type="text"
      className="todo-input"
      placeholder="What needs to be done?"
      value={inputValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      ref={inputRef}
    />
  );
};

export default InputField;
