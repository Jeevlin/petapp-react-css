import React, { useState, useEffect } from "react";
import "./customers.css";
import { db } from "../components/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";

function Customers() {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const usersRef = collection(db, "Users");
    const userQuery = query(usersRef, where("approved", "==", false));

    const unsubscribe = onSnapshot(userQuery, (snapshot) => {
      const updatedUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(updatedUsers);
      setCurrentIndex((prev) =>
        updatedUsers.length > 0
          ? Math.min(prev, updatedUsers.length - 1)
          : 0
      );
    });

    return () => unsubscribe();
  }, []);

  const handleApprove = async () => {
    const currentUser = users[currentIndex];
    if (!currentUser) return;

    try {
      const userRef = doc(db, "Users", currentUser.id);
      await updateDoc(userRef, { approved: true });
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + 1 >= users.length ? 0 : prev + 1
    );
  };

  if (users.length === 0) {
    return <h1 className="empty-message">No new users to display.</h1>;
  }

  const currentUser = users[currentIndex];

  return (
    <div className="customers">
      <div className="title">
        <h3>Register New Customers</h3>
      </div>

      <div className="line">
        <div className="number">
          <span>{currentIndex + 1}</span>
        </div>

        <div className="details">
          <ul className="labels">
            <li>Username:</li>
            <li>First Name:</li>
            <li>Last Name:</li>
            <li>Email:</li>
            <li>Mobile No:</li>
            <li>Password:</li>
          </ul>

          <div className="inputs">
            <input type="text" value={currentUser.username} readOnly />
            <input type="text" value={currentUser.firstName} readOnly />
            <input type="text" value={currentUser.lastName} readOnly />
            <input type="text" value={currentUser.email} readOnly />
            <input type="text" value={currentUser.PhoneNumber} readOnly />
            <input type="text" value={currentUser.password} readOnly />
          </div>
        </div>

        <div className="actions">
          <button className="outline-btn" onClick={handleNext}>
            Add Another User
          </button>

          <button className="primary-btn" onClick={handleApprove}>
            Create User
          </button>
        </div>
      </div>
    </div>
  );
}

export default Customers;
