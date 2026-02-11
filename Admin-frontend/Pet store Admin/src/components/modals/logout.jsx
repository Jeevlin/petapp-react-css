import BaseModal from "../common/basemodal";
import "./logout.css";
import { useNavigate } from "react-router-dom";

export default function LogoutModal({ show, handleClose }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
    handleClose();
  };

  return (
    <BaseModal show={show} onClose={handleClose} title="Logout">
      <p>Are you sure you want to logout?</p>

      <div className="btn-row">
        <button className="btn danger" onClick={logout}>Yes</button>
        <button className="btn" onClick={handleClose}>No</button>
      </div>
    </BaseModal>
  );
}
