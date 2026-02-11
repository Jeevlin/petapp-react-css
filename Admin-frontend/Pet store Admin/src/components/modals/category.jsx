import { useEffect, useState } from "react";
import BaseModal from "../common/basemodal";
import { getCategory, addCategory } from "../../../api.js/petApi";
import "./Category.css";

export default function CategoryModal({ show, handleClose }) {
  const [categoryData, setCategoryData] = useState({ category: "" });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!show) return;

    const fetchCategories = async () => {
      try {
        const res = await getCategory();
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, [show]);

  const handleChange = (e) => {
    setCategoryData({ category: e.target.value });
  };

  const handleSubmit = async () => {
    if (!categoryData.category.trim()) return;

    try {
      await addCategory(categoryData);
      setCategoryData({ category: "" });

      const res = await getCategory();
      setCategories(res.data);

      handleClose();
    } catch (err) {
      console.error("Failed to add category");
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
            categories.map((cat, index) => (
              <button key={index} className="category-pill">
                {cat.category}
              </button>
            ))
          ) : (
            <p className="category-empty">No category available</p>
          )}
        </div>

        <div className="category-input-row">
          <p>Pet Store Inventory</p>
          <input
            name="category"
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
