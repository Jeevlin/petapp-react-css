import { useEffect, useState } from "react";
import BaseModal from "../common/basemodal";
import { editPet } from "../../../api.js/petApi";
import "./QuickEdit.css";

export default function QuickEdit({ show, handleClose, pet }) {
  const [quick, setQuick] = useState({
    id: "",
    name: "",
    status: "",
  });

  useEffect(() => {
    if (pet && show) {
      setQuick({
        id: pet.id || "",
        name: pet.name || "",
        status: pet.status || "",
      });
    }
  }, [pet, show]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setQuick((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await editPet(quick.id, quick);
      handleClose();
    } catch (err) {
      console.error("Error updating pet", err);
    }
  };

  return (
    <BaseModal show={show} onClose={handleClose} title="Quick Update Pet Info">
      <form className="quickedit-form" onSubmit={handleSave}>
        <div className="quickedit-row">
          <label>Name:</label>
          <input id="name" value={quick.name} onChange={handleChange} />
        </div>

        <div className="quickedit-row">
          <label>Status:</label>
          <input id="status" value={quick.status} onChange={handleChange} />
        </div>

        <button className="quickedit-save" type="submit">
          Save Changes
        </button>
      </form>
    </BaseModal>
  );
}
