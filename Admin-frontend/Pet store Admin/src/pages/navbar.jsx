import { useState } from "react";
import "./navbar.css";
import Customers from "./customers";
import PetOrders from "./petOrders";
import Inventory from "./inventory";
import LogoutModal from "../components/modals/logout";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(0);
  const [showLogout, setShowLogout] = useState(false);

  const navItems = [
    { label: "Register Customers", component: <Customers /> },
    { label: "Manage Pet Orders", component: <PetOrders /> },
    { label: "Manage Pet Inventory", component: <Inventory /> }
  ];

  return (
    <div className="container">
      {/* TOP BAR */}
      <div className="top">
        <p className="brand">Raz Pet Store Admin</p>
        <button className="logout-btn" onClick={() => setShowLogout(true)}>
          Logout
        </button>
        <LogoutModal
          show={showLogout}
          handleClose={() => setShowLogout(false)}
        />
      </div>

      {/* NAV BAR */}
      <nav className="nav">
        <ul className="nav-list">
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`nav-item ${activeLink === index ? "active" : ""}`}
              onClick={() => setActiveLink(index)}
            >
              {item.label}
            </li>
          ))}
        </ul>

        <div
          className="underline"
          style={{ transform: `translateX(${activeLink * 128}%)` }}
        />
      </nav>

      {/* CONTENT */}
      <div className="content">
        {navItems[activeLink].component}
      </div>
    </div>
  );
};

export default Navbar;
