import Cardcomp from "../component/cardcomp";
import "./homepage.css";
import image from "../login/pet.jpg"
import Logout  from "../modal/LogoutModal";
import { useEffect, useState } from "react";
import { auth, db } from "../component/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getPets, getCategory, FindPet, FindOrder } from "../db/db";
import { toast } from "react-toastify";
import UserDetails from  "../modal/UserDetails";
import OrderStatus from "../modal/OrderStatus";


function Homepage() {
  const [showOrderStatus, setShowOrderStatus] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const [userdata, setUserdata] = useState(null);
  const [pets, setPets] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredPets, setFilteredPets] = useState([]);
  const [petID, setPetID] = useState("");
  const [orderID, setOrderID] = useState("");
  const [petError, setPetError] = useState("");
  const [orderError, setOrderError] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const [orderDetails, setOrderDetails] = useState({
    userId: "",
    orderId: "",
    petId: "",
    quantity: "",
    shippingDate: "",
    orderStatus: "",
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserdata(docSnap.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUserdata(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredPets(pets);
    } else {
      setFilteredPets(pets.filter((pet) => pet.category === selectedCategory));
    }
  }, [selectedCategory, pets]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await getPets();
        setPets(data.data);
      } catch {
        setPetError("Failed to fetch pets.");
      }
    };
    fetchPets();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await getCategory();
        setCategory(data.data);
      } catch {
        console.error("Failed to fetch categories.");
      }
    };
    fetchCategory();
  }, []);

  const handleFindPet = async () => {
    if (!petID) {
      setPetError("Please enter a valid Pet ID.");
      return;
    }
    try {
      const data = await FindPet(petID);
      if (data) {
        setFilteredPets([data]);
        setPetError("");
        setPetID("");
      } else {
        setFilteredPets([]);
        setPetError("No pet found with this ID.");
        toast.error("Pet Not Found", { position: "top-center" });
      }
    } catch {
      setPetError("Error fetching pet details.");
      toast.error("Error fetching pet details.", { position: "top-center" });
    }
  };

  const handleFindOrder = async () => {
    if (!orderID) {
      setOrderError("Please enter a valid Order ID.");
      return;
    }
    try {
      const response = await FindOrder(orderID);
      if (response) {
        setOrderDetails(response);
        setShowOrderStatus(true);
        setOrderError("");
        setOrderID("");
      } else {
        setOrderDetails(null);
        setOrderError("No order found.");
        toast.error("Order Not Found", { position: "top-center" });
      }
    } catch {
      setOrderError("Error fetching order details.");
      toast.error("Error fetching order details.", { position: "top-center" });
    }
  };

  return (
    <div className="homepage">
      {/* Header */}
      <div className="header">
        <h1 className="dashboard">Raaz Pet Store</h1>
        <button className="logout" onClick={() => setShowLogout(true)}>Log out</button>
        <Logout show={showLogout} handleClose={() => setShowLogout(false)} />
      </div>

      <div className="main">
        {/* User Info */}
        <div className="section-container">
          <div className="outline outline-large">
            <div className="outline-header">
              <h5>User Information</h5>
              <button className="editbtn" onClick={() => setShowUserDetails(true)}>Edit info</button>
              <UserDetails show={showUserDetails} handleClose={() => setShowUserDetails(false)} setUserdata={setUserdata} />
            </div>
            <div className="user-row">
              <img className="imghome" src={image} alt="User profile" />
              {userdata ? (
                <ul className="list">
                  <li>👤 Username: {userdata.username}</li>
                  <li>🪪 Name: {userdata.firstName}</li>
                  <li>✉️ Email: {userdata.email}</li>
                  <li>☎️ Mobile: {userdata.PhoneNumber}</li>
                  <li>🔒 Password: ********</li>
                </ul>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>

        {/* Order Status */}
        <div className="section-container">
          <div className="outline dark-bg">
            <h3>Find Your Pet Order Status</h3>
            <div className="input-box">
              <input
                type="text"
                placeholder="Enter your order id"
                value={orderID}
                onChange={(e) => setOrderID(e.target.value)}
              />
              <button className="findbtn" onClick={handleFindOrder}>Find status</button>
              <OrderStatus show={showOrderStatus} handleClose={() => setShowOrderStatus(false)} orderDetails={orderDetails || {}} />
            </div>
            {orderError && <p className="error">{orderError}</p>}
          </div>
        </div>

        {/* Pets Section */}
        <div className="section-container">
          <div className="pets-header">
            <h1>Pets in store</h1>
            <select>
              <option>Available</option>
            </select>
          </div>
          <div className="outline">
           
            <button
              className={`filterbtn ${selectedCategoryId === null ? "active" : ""}`}
              onClick={() => {
                setSelectedCategory("All");
                setSelectedCategoryId(null);
              }}
            >
              All
            </button>
            {category.map((cate) => (
              <button
                key={cate._id}
                className={`filterbtn ${selectedCategoryId === cate._id ? "active" : ""}`}
                onClick={() => {
                  setSelectedCategory(cate.category);
                  setSelectedCategoryId(cate._id);
                }}
              >
                {cate.category}
              </button>
            ))}
             <div className="outline ">

            <div className="pets-grid">
              {filteredPets.length > 0 ? (
                filteredPets.map((pet) => (
                  <Cardcomp
                    key={pet._id}
                    name={pet.name}
                    id={pet.id}
                    photoURLs={pet.photoURLs || "https://via.placeholder.com/250"}
                  />
                ))
              ) : (
                <p>No pets available for this category</p>
              )}
              </div>
            </div>
          </div>
        </div>

        {/* Find Pet by ID */}
        <div className="section-container">
          <div className="outline dark-bg">
            <h3>Enter Pet ID</h3>
            <div className="input-box">
              <input
                type="text"
                placeholder="Enter Pet id to search"
                value={petID}
                onChange={(e) => setPetID(e.target.value)}
              />
              <button className="findbtn" onClick={handleFindPet}>Find Pet</button>
            </div>
            {petError && <p className="error">{petError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
