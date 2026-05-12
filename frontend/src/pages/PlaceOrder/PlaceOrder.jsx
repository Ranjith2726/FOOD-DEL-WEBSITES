import axios from "axios";
import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {

  const { getTotalCartAmount } = useContext(StoreContext)

  const handlePayment = async (event) => {

    event.preventDefault()

    try {

      const response = await axios.post(
        "http://localhost:4000/api/order/place",
        {
          amount: getTotalCartAmount() + 2
        }
      )

      console.log("Backend Response:", response.data)

      if (response.data.success) {

        const order = response.data.order

        const options = {

          key: "rzp_test_SoPUkndJJYBF9y",

          amount: order.amount,

          currency: "INR",

          name: "Food Delivery",

          description: "Food Order Payment",

          order_id: order.id,

          handler: async function (response) {

            alert("Payment Successful ✅")

            console.log("Payment Response:", response)

          },

          theme: {
            color: "#ff512f"
          }

        }

        console.log("Razorpay Options:", options)

        const razorpay = new window.Razorpay(options)

        razorpay.open()

      } else {

        alert("Backend Failed")

      }

    } catch (error) {

      console.log("FULL ERROR:", error)

      console.log("ERROR RESPONSE:", error.response)

      console.log("ERROR DATA:", error.response?.data)

      alert("Payment Failed")

    }

  }

  return (

    <form className='place-order' onSubmit={handlePayment}>

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

            <p>${getTotalCartAmount()}</p>

          </div>

          <hr />

          <div className="cart-total-details">

            <p>Delivery Fee</p>

            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>

          </div>

          <hr />

          <div className="cart-total-details">

            <b>Total</b>

            <b>
              ${getTotalCartAmount() === 0
                ? 0
                : getTotalCartAmount() + 2}
            </b>

          </div>

          <button type="submit">
            PROCEED TO PAYMENT
          </button>

        </div>

      </div>

    </form>
  )
}

export default PlaceOrder