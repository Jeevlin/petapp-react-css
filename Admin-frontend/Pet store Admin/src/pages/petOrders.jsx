import React, { useEffect, useState } from 'react'
import './petOrders.css'
import { FindOrder, getOrder, deleteOrder } from '../../api.js/petApi'

const PetOrders = () => {

  const [orderID, setOrderID] = useState("")
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null)
  const [orderDetails, setOrderDetails] = useState({
    orderId: '',
    petId: '',
    quantity: '',
    shippingDate: '',
    orderStatus: '',
  })
  const [error, setError] = useState("")
  const [order, setOrder] = useState([])

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await getOrder()
        setOrder(data.data.reverse())
      } catch (err) {
        console.error("Failed to fetch orders:", err)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const handleOrderClick = (order, index) => {
    setOrderDetails(order)
    setSelectedOrderIndex(index)
    setOrderID(order.orderId)
  }

  const handleFindOrder = async () => {
    if (!orderID) {
      setError("Please enter a valid Order ID.")
      return
    }

    try {
      const response = await FindOrder(orderID)
      if (response) {
        setOrderDetails(response)
        setError("")
      } else {
        setOrderDetails({})
        setError("No order found with the given Order ID.")
      }
    } catch {
      setError("An error occurred while fetching order details.")
    }
  }

  const handleDelete = async () => {
    if (!orderID) return

    try {
      await deleteOrder(orderID)
      setOrderDetails({})
    } catch (error) {
      console.error("Failed to delete order:", error)
    }
  }

  return (
    <div className="container">
      <div className="petOrders">

        <div className="title">
          <h3>Manage Pet Orders</h3>
        </div>

        <div className="outline">
          <h3 className="find-title">Find Your Pet Order Status</h3>

          <div className="header">
            <input
              className="order-input"
              type="text"
              placeholder="Enter your order id"
              value={orderID}
              onChange={(e) => setOrderID(e.target.value)}
            />
            <button className="findbtn" onClick={handleFindOrder}>
              Find status
            </button>
          </div>
        </div>

        <div className="row">

          {/* Order Summary */}
          <div className="order order-summary">
            <h2 className="summary-title">Pet Order Summary</h2>

            <div className="summary">
              <p>Pet ID : {orderDetails.petId}</p>
              <p>Quantity : {orderDetails.quantity}</p>
              <p>Shipdate : {orderDetails.shippingDate}</p>
              <p>Status : {orderDetails.orderStatus}</p>

              <button className="delete-btn" onClick={handleDelete}>
                Delete order
              </button>
            </div>

            {error && <p className="error">{error}</p>}
          </div>

          {/* Recent Orders */}
          <div className="order recent-orders">
            <h2>Recent Orders</h2>

            {order.map((order, index) => (
              <div
                key={index}
                className={`outline recent-order-item ${
                  selectedOrderIndex === index ? "active" : ""
                }`}
              >
                <div>
                  <span className="order-id">{order.orderId}</span>
                  <span>{new Date(order.createdAt).toLocaleTimeString()}</span>
                </div>

                <div>
                  <span className="order-date">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                  <span
                    className="view-details"
                    onClick={() => handleOrderClick(order, index)}
                  >
                    view details
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default PetOrders;
