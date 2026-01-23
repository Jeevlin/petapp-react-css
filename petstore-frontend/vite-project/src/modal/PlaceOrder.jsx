import { addOrder } from '../db/db';
import { useEffect, useState } from "react";
import BaseModal from "./BaseModal";
import { toast } from "react-toastify";
import styles from "./PlaceOrder.module.css"; 

export default function PlaceOrder({ show, handleClose, orderDetails }) {
  const [quantity, setQuantity] = useState(1);
  const [OrderData, setOrderData] = useState({
    orderId: "",
    petId: "",
    quantity: 1,
    shippingDate: "",
  });

  useEffect(() => {
    if (orderDetails) {
      setOrderData({
        orderId: orderDetails.orderId || "",
        petId:
          typeof orderDetails.petId === "object"
            ? orderDetails.petId.id
            : orderDetails.petId || "",
        quantity,
        shippingDate: orderDetails.shippingDate || "",
      });
    }
  }, [orderDetails, quantity]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addOrder(OrderData);
      console.log("Response:", response);
      toast.success("Placed Order Successfully", { position: "top-center" });
      handleClose();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to place order", { position: "top-center" });
    }
  };

  return (
    <BaseModal
      show={show}
      onClose={handleClose}
      title="Place order for pet"
      secondTitle="Order summary"
      size="placeorder"
    >
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label>Order Id:</label>
          <input type="text" value={OrderData.orderId} readOnly />
        </div>

        <div className={styles.formGroup}>
          <label>Pet Id:</label>
          <input type="text" value={OrderData.petId} readOnly />
        </div>

        <div className={styles.formGroup}>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            step="1"
            max="5"
            min="1"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Shipping Date:</label>
          <input type="text" value={OrderData.shippingDate} readOnly />
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.button}>
            Place Order
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
