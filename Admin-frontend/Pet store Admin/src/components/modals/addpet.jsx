import { useState, useEffect } from "react";
import BaseModal from "../common/basemodal";
import { addPet } from "../../../api.js/petApi";
import "./AddPet.css";

export default function AddPet({ show, handleClose, setFilteredPets }) {
  const [petData, setPetData] = useState({
    name: "",
    category: "",
    status: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!show) {
      setPetData({ name: "", category: "", status: "" });
      setSelectedFile(null);
      setMessage("");
    }
  }, [show]);

  const generatePetId = () => {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    return Array.from({ length: 6 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", generatePetId());
    formData.append("name", petData.name);
    formData.append("category", petData.category);
    formData.append("status", petData.status);
    if (selectedFile) formData.append("photoURLs", selectedFile);

    try {
      await addPet(formData);
      setFilteredPets((prev) => [...prev, petData]);
      handleClose();
    } catch (err) {
      console.error("Failed to add pet", err);
      setMessage("Failed to add pet");
    }
  };

  return (
    <BaseModal show={show} onClose={handleClose} title="Add a New Pet To The Store">
      <form className="addpet-form" onSubmit={handleSubmit}>
        <div className="addpet-row">
          <label>Name:</label>
          <input name="name" value={petData.name} onChange={handleChange} />
        </div>

        <div className="addpet-row">
          <label>Choose Category:</label>
          <input name="category" value={petData.category} onChange={handleChange} />
        </div>

        <div className="addpet-row">
          <label>Photo:</label>
          <input type="file" onChange={handleFileChange} />
        </div>

        <div className="addpet-row">
          <label>Status:</label>
          <input name="status" value={petData.status} onChange={handleChange} />
        </div>

        <button className="addpet-save" type="submit">
          Add Pet
        </button>

        {message && <p className="addpet-error">{message}</p>}
      </form>
    </BaseModal>
  );
}
