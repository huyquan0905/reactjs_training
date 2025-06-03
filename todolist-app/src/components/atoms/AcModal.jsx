import React from "react";
import { REMOVE_BTN, CANCEL_BTN } from "../../constants/const";
import "./modal.css";

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onConfirm}>{REMOVE_BTN}</button>
          <button onClick={onClose}>{CANCEL_BTN}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
