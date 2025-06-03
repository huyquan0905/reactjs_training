import React, {
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import "./input.css";

const InputField = forwardRef(({ onSubmit, disabled }, ref) => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => setInputValue(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      onSubmit(inputValue.trim(), editingId);
      setTimeout(() => {
        setInputValue("");
      }, 0);
      // setInputValue("");
      setEditingId(null);
    }

    if (e.key === "Escape") {
      setInputValue("");
      setEditingId(null);
    }
  };

  useImperativeHandle(ref, () => ({
    onEdit: (id, currentText) => {
      setEditingId(id);
      setInputValue(currentText);
      inputRef.current?.focus();
    },
  }));

  return (
    <input
      type="text"
      className="todo-input"
      placeholder="What needs to be done?"
      value={inputValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      ref={inputRef}
      disabled={disabled}
    />
  );
});

export default InputField;
