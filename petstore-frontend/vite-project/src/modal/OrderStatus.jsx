import  { useState, useEffect } from "react";
import BaseModal from "./BaseModal";
import { deleteOrder } from "../db/db";
import { toast } from "react-toastify";
import styles from "./OrderStatus.module.css"; 

const OrderStatus = ({ show, handleClose, orderDetails }) => {
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if (orderDetails?.orderId) {
      setOrderId(orderDetails.orderId);
    }
  }, [orderDetails]);

  const handleDelete = async (e) => {
    e.preventDefault(); 
    if (!orderId) toast.error("No order ID found!", { position: "top-center" });


    try {
      await deleteOrder(orderId);
      handleClose();
      toast.success("Deleted Order Successfully", { position: "top-center"});
    } catch (error) {
      console.error("Failed to delete order:", error);
      toast.error("Failed to delete order", { position: "top-center" });
    }
  };

  return (
    <BaseModal
      show={show}
      onClose={handleClose}
      title="Order Status"
      secondTitle="Order Summary"
      size="orderstatus"
    >
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label>Order ID:</label>
          <input type="text" value={orderDetails.orderId || ""} readOnly />
        </div>
        <div className={styles.formGroup}>
          <label>Pet ID:</label>
          <input type="text" value={orderDetails.petId || ""} readOnly />
        </div>
        <div className={styles.formGroup}>
          <label>Quantity:</label>
          <input type="text" value={orderDetails.quantity || ""} readOnly />
        </div>
        <div className={styles.formGroup}>
          <label>Shipping Date:</label>
          <input type="text" value={orderDetails.shippingDate || ""} readOnly />
        </div>
        <div className={styles.formGroup}>
          <label>Status:</label>
          <input type="text" value={orderDetails.status || ""} readOnly />
        </div>
     <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleDelete}>
          Cancel Order
        </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default OrderStatus;
