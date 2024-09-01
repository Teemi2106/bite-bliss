import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import "../CSS/Dashboard.css";
import Searchbox from "../Components/Searchbox";
import DrinkSearchbox from "../Components/DrinkSearchbox.jsx";

const Dashboard = ({
  meals,
  search,
  setSearch,
  cart,
  setCart,
  mealCount,
  setMealCount,
  addCart,
  updateQuantity,
  removeCart,
  handleCheckout,
  drinks,
  setDrinks,
  searchDrink,
  setSearchDrink,
  drinkSearch,
}) => {
  return (
    <div style={{ scrollSnapType: "y mandatory" }}>
      <Header search={search} setSearch={setSearch} />
      <div className="parent">
        <section id="mealSection">
          <h1 className=" mealHeader">
            Meals
            <span>
              <Searchbox search={search} setSearch={setSearch} />
            </span>
          </h1>
          <div className="mealList">
            {meals ? (
              meals.map((meal) => (
                <div key={meal.id} className="mealItem">
                  <h3>{meal.meal}</h3>
                  <p>${meal.price}</p>
                  <img src={meal.image} alt=""></img>
                  <button className="add" onClick={() => addCart(meal.id)}>
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <h2>Sorry, No meals available</h2>
            )}
          </div>
        </section>
        <section id="drinksSection">
          <h1 className=" mealHeader">
            Drinks
            <span>
              <DrinkSearchbox
                searchDrink={searchDrink}
                setSearchDrink={setSearchDrink}
              />
            </span>
          </h1>
          <div className="mealList">
            {drinkSearch ? (
              drinkSearch.map((drink) => (
                <div key={drink.id} className="mealItem">
                  <h3>{drink.drink}</h3>
                  <p>${drink.price}</p>
                  <img src={drink.image} alt=""></img>
                  <button className="add" onClick={() => addCart(drink.id)}>
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <h2>Sorry, No meals available</h2>
            )}
          </div>
        </section>
      </div>
      <section id="cartSection">
        <h2 className="text-center">Shopping Cart</h2>
        <div className="cartList">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="cartItem">
                <img src={item.image} alt="" />
                <h3>{item.meal || item.drink}</h3>
                <p>${item.price}</p>
                <p className="quantity">
                  <button
                    className="minus"
                    onClick={() => {
                      if (item.quantity > 1) {
                        updateQuantity(item.id, item.quantity - 1);
                      } else {
                        return;
                      }
                    }}
                  >
                    -
                  </button>{" "}
                  {item.quantity}
                  <button
                    className="plus"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </p>
                <button className="delete" onClick={() => removeCart(item.id)}>
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        <p className="text-center total">
          Total: $
          {cart
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}
          <button id="checkout" onClick={handleCheckout}>
            Checkout
          </button>
        </p>
      </section>
    </div>
  );
};

export default Dashboard;
