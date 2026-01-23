import { useState, useEffect } from "react";
import BaseModal from "./BaseModal";
import { auth, db } from "../component/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "./BaseModal.css";
import styles from "./UserDetails.module.css";

const UserDetails = ({ show, handleClose, setUserdata }) => {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const user = auth.currentUser;

      if (user) {
        try {
          const docSnap = await getDoc(doc(db, "Users", user.uid));
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
          } else {
            setUserDetails(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserDetails(null);
        }
      } else {
        setUserDetails(null);
      }

      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) return;

    try {
      const docRef = doc(db, "Users", user.uid);
      await updateDoc(docRef, userDetails);

      const updatedDocSnap = await getDoc(docRef);
      if (updatedDocSnap.exists()) {
        const updatedData = updatedDocSnap.data();
        setUserDetails(updatedData);
        setUserdata(updatedData);
      }

      toast.success("Information Updated", { position: "top-center" });
      handleClose();
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  return (
    <BaseModal
      show={show}
      onClose={handleClose}
      title="Edit User Information"
      secondTitle="User Details"
      size="userdetails"
    >
      <form className={styles.formContainer} onSubmit={handleSaveChanges}>
        {["username", "firstName", "lastName", "email", "PhoneNumber", "password"].map(
          (field, index) => (
            <div className={styles.formGroup} key={index}>
              <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
             {field === "password" ? (

          <input type="password" id="password" value="********" readOnly />
              ) : (
 
           <input
               type="text"
               id={field}
              value={userDetails[field] || ""}
              onChange={(e) =>
              setUserDetails({ ...userDetails, [field]: e.target.value })
            }
          />
        )}

            </div>
          )
        )}

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.userDetailsButton}>
            Save Changes
          </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default UserDetails;
