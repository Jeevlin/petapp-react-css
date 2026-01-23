
import { useEffect } from "react";
import "./BaseModal.css";

const BaseModal = ({ show, onClose, size = "md", title, children ,secondTitle}) => {
    useEffect(() => {
  if (show) {
    document.body.classList.add("modal-open"); 
  } else {
    document.body.classList.remove("modal-open"); 
  }

  return () => document.body.classList.remove("modal-open");
}, [show]);

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal-container modal-${size}`}>
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* Body */}
        <div className="title-separator" >{secondTitle}</div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default BaseModal;
