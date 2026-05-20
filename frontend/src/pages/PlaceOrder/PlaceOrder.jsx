import axios from "axios";
import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);

  const apiUrl =
    window.location.hostname === "localhost"
      ? "http://localhost:4000"
      : window.location.origin;

  const handlePayment = async (event) => {
    event.preventDefault();

    try {
      const totalAmount = getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2;

      if (totalAmount === 0) {
        alert("Cart is empty");
        return;
      }

      const response = await axios.post(`${apiUrl}/api/order/place`, {
        amount: totalAmount,
      });

      if (response.data.success) {
        const order = response.data.order;

        const options = {
          key: response.data.key_id,
          amount: order.amount,
          currency: order.currency,
          name: "Food Delivery",
          description: "Food Order Payment",
          order_id: order.id,

          handler: function (response) {
            alert("Payment Successful ✅");
            console.log("Payment Response:", response);
          },

          prefill: {
            name: "Food Delivery User",
            email: "customer@example.com",
            contact: "9999999999",
          },

          theme: {
            color: "#ff512f",
          },
        };

        const razorpay = new window.Razorpay(options);

        razorpay.on("payment.failed", function (response) {
          console.log("Payment Failed:", response.error);
          alert(response.error.description || "Payment Failed");
        });

        razorpay.open();
      } else {
        alert(response.data.message || "Backend Failed");
      }
    } catch (error) {
      console.log("Payment Error:", error);
      alert("Payment Failed");
    }
  };

  return (
    <form className="place-order" onSubmit={handlePayment}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name" required />
        </div>

        <input type="email" placeholder="Email address" required />
        <input type="text" placeholder="Street" required />

        <div className="multi-fields">
          <input type="text" placeholder="City" required />
          <input type="text" placeholder="State" required />
        </div>

        <div className="multi-fields">
          <input type="text" placeholder="Zip code" required />
          <input type="text" placeholder="Country" required />
        </div>

        <input type="text" placeholder="Phone" required />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>

          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>

          <hr />

          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>

          <hr />

          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
          </div>

          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;