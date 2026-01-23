import BaseModal from "./BaseModal";
import { useAuthContext } from "../context/auth/AuthContext";
import "./BaseModal.css";
import styles from "./LogoutModal.module.css";

export default function Logout({ show, handleClose }) {
  const { logout } = useAuthContext();

  return (
    <BaseModal
      show={show}
      onClose={handleClose}
      title="Logout User"
      secondTitle="Are you sure you want to logout?"
      size="logout" 
    >
      <div className={styles.logoutBody}>
       

        <div className={styles.logoutButtons}>
          <button
            type="button"
            className={styles.logoutYesBtn}
            onClick={logout}
          >
            Yes
          </button>
          <button
            type="button"
            className={styles.logoutNoBtn}
            onClick={handleClose}
          >
            No
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
