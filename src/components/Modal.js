import ReactDOM from "react-dom";
import React from "react";
import Edit from "../pages/airtable/EditTodo";
import "./Modal.scss";
import { AiFillCloseCircle } from "react-icons/ai";

const Modal = ({ tId, isOpen, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modalCon">
        <div className="close-container">
          <h2>Ret to do:</h2>
          <div>
            <AiFillCloseCircle onClick={onClose} />
          </div>
        </div>

        <Edit id={tId} />
      </div>
    </div>,
    document.body
  );
};
export default Modal;
