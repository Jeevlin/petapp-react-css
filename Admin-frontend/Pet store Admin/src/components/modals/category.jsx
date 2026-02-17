import { useEffect, useState } from "react";
import BaseModal from "../common/basemodal";
import { getCategory, addCategory, deleteCategory } from "../../../api.js/petApi";
import "./Category.css";

export default function CategoryModal({ show, handleClose }) {
  const [categoryData, setCategoryData] = useState({ category: "" });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!show) return;

    fetchCategories();
  }, [show]);

  const fetchCategories = async () => {
    try {
      const res = await getCategory();
      setCategories(res.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const handleChange = (e) => {
    setCategoryData({ category: e.target.value });
  };

  const handleSubmit = async () => {
    if (!categoryData.category.trim()) return;

    try {
      await addCategory(categoryData);
      setCategoryData({ category: "" });
      fetchCategories();
      handleClose();
    } catch {
      console.error("Failed to add category");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch {
      console.error("Failed to delete category");
    }
  };

  return (
    <BaseModal show={show} onClose={handleClose} title="Add a Pet Category">
      <div className="category-modal">

        <p className="category-description">
          Click to add or modify pet categories
        </p>

        <div className="category-box">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <div key={cat._id} className="category-pill-wrapper">
                <button className="category-pill">
                  {cat.category}
                </button>

                <span
                  className="category-delete"
                  onClick={() => handleDelete(cat._id)}
                >
                  ×
                </span>
              </div>
            ))
          ) : (
            <p className="category-empty">No category available</p>
          )}
        </div>

        <div className="category-input-row">
          <p>Pet Store Inventory</p>
          <input
            value={categoryData.category}
            onChange={handleChange}
            placeholder="New category"
          />
        </div>

        <button className="category-save" onClick={handleSubmit}>
          Save Changes
        </button>

      </div>
    </BaseModal>
  );
}
