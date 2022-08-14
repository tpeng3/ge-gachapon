import React from "react";

function Modal() {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close">×</span>
        <div className="frog-image"></div>
        <div className="frog-artist"></div>
        <div className="list-artists"></div>
      </div>
    </div>
  );
}

export default Modal;
