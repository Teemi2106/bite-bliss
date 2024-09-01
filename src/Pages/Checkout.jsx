import React, { useState } from "react";
import "../CSS/checkout.css";
import { useNavigate } from "react-router-dom";

const Checkout = ({ cart, setCart, removeCart }) => {
  const navigate = useNavigate();
  const storedOrders = localStorage.getItem("orders");
  const initialOrders = storedOrders ? JSON.parse(storedOrders) : [];
  const [orders, setOrders] = useState(initialOrders);

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      var encodedURI = encodeURIComponent(
        "http://localhost:4000/customer-orders"
      );
      var decodedURI = decodeURIComponent(encodedURI);

      const response = await fetch(decodedURI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meal: orders.map((order) => {
            return order.map((item) => item.meal);
          }),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const newPost = await response.json();
      setOrders((prevPosts) => [...prevPosts, newPost]);
      /* navigate("/blogs"); */
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      <h1 className="checkHead">Checkout</h1>
      {cart.length > 0 ? (
        cart.map((item) => (
          <div key={item.id} className="cartItem">
            <img src={item.image} alt="" />
            <h3>{item.meal || item.drink}</h3>
            <p>${item.price}</p>
            <p className="quantity">{item.quantity}</p>
            <button className="delete" onClick={() => removeCart(item.id)}>
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
      <div className="check">
        <section className="add-card page">
          <form className="form">
            <label htmlFor="name" className="label">
              <span className="title">Card holder full name</span>
              <input
                className="input-field"
                type="text"
                name="input-name"
                title="Input title"
                placeholder="Enter your full name"
              />
            </label>
            <label htmlFor="name" className="label">
              <span className="title">Home Address / Closest Bus-stop</span>
              <input
                className="input-field"
                type="text"
                name="address"
                title="Input address"
                placeholder="Enter address"
              />
            </label>
            <label htmlFor="serialCardNumber" className="label">
              <span className="title">Phone Number</span>
              <input
                id="serialCardNumber"
                className="input-field"
                type="tel"
                name="input-phone"
                title="Input phone"
                placeholder="Phone Number"
              />
            </label>
            <label htmlFor="serialCardNumber" className="label">
              <span className="title">Card Number</span>
              <input
                id="serialCardNumber"
                className="input-field"
                type="number"
                name="input-name"
                title="Input title"
                placeholder="0000 0000 0000 0000"
              />
            </label>
            <div className="split">
              <label htmlFor="ExDate" className="label">
                <span className="title">Expiry Date</span>
                <input
                  id="ExDate"
                  className="input-field"
                  type="text"
                  name="input-name"
                  title="Expiry Date"
                  placeholder="01/23"
                />
              </label>
              <label htmlFor="cvv" className="label">
                <span className="title"> CVV</span>
                <input
                  id="cvv"
                  className="input-field"
                  type="number"
                  name="cvv"
                  title="CVV"
                  placeholder="CVV"
                />
              </label>
            </div>
            <button
              className="checkout-btn"
              id="checkout-btn"
              type="submit"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Checkout;
