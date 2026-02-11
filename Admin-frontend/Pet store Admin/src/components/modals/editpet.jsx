import { useEffect, useState } from "react";
import BaseModal from "../common/basemodal";
import { editPet, deletePet } from "../../../api.js/petApi";
import "./EditPet.css";

export default function EditPet({ show, handleClose, pet }) {
  const [data, setData] = useState({
    id: "",
    name: "",
    category: "",
    photoURLS: "",
    status: "",
  });

  useEffect(() => {
    if (pet && show) {
      setData({
        id: pet.id || "",
        name: pet.name || "",
        category: pet.category || "",
        photoURLS: pet.photoURLS || "",
        status: pet.status || "",
      });
    }
  }, [pet, show]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await editPet(data.id, data);
      handleClose();
    } catch (err) {
      console.error("Error updating pet", err);
    }
  };

  const handleDelete = async () => {
    if (!data.id) return;
    try {
      await deletePet(data.id);
      handleClose();
    } catch (err) {
      console.error("Error deleting pet", err);
    }
  };

  return (
    <BaseModal show={show} onClose={handleClose} title="Edit Pet Information">
      <form className="editpet-form" onSubmit={handleSave}>
        <div className="editpet-row">
          <label>Name:</label>
          <input id="name" value={data.name} onChange={handleChange} />
        </div>

        <div className="editpet-row">
          <label>Category:</label>
          <input id="category" value={data.category} onChange={handleChange} />
        </div>

        <div className="editpet-row">
          <label>Photo:</label>
          <input id="photoURLS" type="file" onChange={handleChange} />
        </div>

        <div className="editpet-row">
          <label>Status:</label>
          <input id="status" value={data.status} onChange={handleChange} />
        </div>

        <button className="editpet-save" type="submit">
          Save Changes
        </button>

        <button
          type="button"
          className="editpet-delete"
          onClick={handleDelete}
        >
          Delete Pet
        </button>
      </form>
    </BaseModal>
  );
}
