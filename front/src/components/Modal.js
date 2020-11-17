import React from "react";
import ReactDOM from "react-dom";
import "../css/modal.css";

function Modal({ children, show }) {
  // const [show, setShow] = useState(false)
  return show
    ? ReactDOM.createPortal(
      <div className="background">
        <div className="modal-container">{children}</div>
      </div>,
      document.getElementById("modal")
    )
    : null;
}

export default Modal;
