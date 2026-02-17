import React, { useState,useEffect } from "react";
import "./inventory.css";
import Cardcomp from "../components/cardcomp";
import  AddPet from "../components/modals/addpet"
import CategoryModal from "../components/modals/category"
import EditPet from "../components/modals/editpet";
import QuickEdit from "../components/modals/quickedit";
import {  getPets } from "../../api.js/petApi";
import { getCategory } from "../../api.js/petApi";

function Inventory() {
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showAddPet , setShowAddPet]= useState(false)
    const [showEditPet, setShowEditPet]=useState(false)
    const [showQuickEdit,setShowQuickPet]=useState(false)
    const [ SelectedPet,setSelectedPet]=useState(null)
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [category,setCategory]=useState('')
    const [selectedCategory, setSelectedCategory] = useState('All'); // Tracks the selected category
    const [filteredPets, setFilteredPets] = useState([]);
    const[ categoryIndex,setCategoryIndex] =useState(null)
   

// Filter pets whenever the selected category changes
useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredPets(pets);
    } else {
      const filtered = pets.filter((pet) => pet.category === selectedCategory);
      setFilteredPets(filtered);
  
    }
  }, [selectedCategory, pets]);


    useEffect(() => {
        const interval = setTimeout(async () => {
        
            try {
                const data = await getPets();
                setPets(data.data);
            } catch (err) {
                setError("failed to fetch");
            } finally {
                setLoading(false);
            }
        },1000)
        return () => clearInterval(interval); // Clean up
        
    }, []);
    
      
        

    useEffect(() => {

        const getCat = async () => {
            try {
                const data = await getCategory();
                setCategory(data.data);
                
            } catch (err) {
                console.error("failed to fetch");
            }  finally {
                setLoading(false);
            }
        };
      
        getCat();
      
      },[]);


  
    const handleQuickClick=(pet)=>{
        setSelectedPet(pet);
        setShowQuickPet(true);  
    }
    const handleCardClick=(pet)=> {
        console.log('Card clicked:', pet);
        setSelectedPet(pet);
        setShowEditPet(true)
    }
    

    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
 
    
    
   return (
  <div className="inventory">
    <div className="heading">
      <h3 className="inventory-title">Pet Store Inventory</h3>

      <select
        className="category-select"
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="All">All</option>
        {category.length > 0 &&
          category.map((cat, index) => (
            <option key={index} value={cat.category}>
              {cat.category}
            </option>
          ))}
      </select>
    </div>

    <div className="outborder">
      <div className="category-buttons">
        <button
          className={`buttons ${categoryIndex === null ? "active" : ""}`}
          onClick={() => {
            setSelectedCategory("All");
            setCategoryIndex(null);
          }}
        >
          All
        </button>

        {category.length > 0 &&
          category.map((cat, index) => (
            <button
              key={index}
              className={`buttons ${
                categoryIndex === index ? "active" : ""
              }`}
              onClick={() => {
                setSelectedCategory(cat.category);
                setCategoryIndex(index);
              }}
            >
              {cat.category}
            </button>
          ))}

        <button
          className="buttons"
          onClick={() => setShowCategoryModal(true)}
        >
          + Add
        </button>
      </div>

      <CategoryModal
        show={showCategoryModal}
        handleClose={() => setShowCategoryModal(false)}
      />

      <div className="pets-container">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet, index) => (
            <div className="pet-card" key={index}>
              <Cardcomp
                onClick={() => handleCardClick(pet)}
                name={pet.name}
                id={pet.id}
                status={pet.status}
                photoURLs={
                  pet.photoURLs ||
                  "https://via.placeholder.com/250"
                }
                onQuickEdit={() => handleQuickClick(pet)}
              />
            </div>
          ))
        ) : (
          <p className="empty-text">
            No pets available for this category
          </p>
        )}
      </div>

      <button
        className="add-pet-button"
        onClick={() => setShowAddPet(true)}
      >
        + Add New Pet
      </button>

      <AddPet
        show={showAddPet}
        handleClose={() => setShowAddPet(false)}
        setFilteredPets={setFilteredPets}
      />

      {SelectedPet && (
        <EditPet
          show={showEditPet}
          handleClose={() => setShowEditPet(false)}
          pet={SelectedPet}
        />
      )}

      {SelectedPet && (
        <QuickEdit
          show={showQuickEdit}
          handleClose={() => setShowQuickPet(false)}
          pet={SelectedPet}
        />
      )}
    </div>
  </div>
);


   
}

export default Inventory;
