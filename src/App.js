import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Signin from "./Pages/Signin";
import Dashboard from "./Pages/Dashboard";
import Checkout from "./Pages/Checkout.jsx";
import { useEffect, useState } from "react";
import Admin from "./Pages/Admin.jsx";

function App() {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const [search, setSearch] = useState("");
  const [searchDrink, setSearchDrink] = useState("");
  const navigate = useNavigate();

  const signinmail = "casper@blogger.com";
  const signinpass = "Caspersmiles";
  const adminMail = "admin@admin.com";
  const adminPass = "Admin";

  const handleLogin = () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === signinmail && password === signinpass) {
      navigate("/dashboard");
    } else if (username === adminMail && password === adminPass) {
      navigate("/admin");
    } else {
      alert("Invalid Email or Password");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/Meal-list");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setMeals(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  });
  useEffect(() => {
    const fetchDrinkData = async () => {
      try {
        const response = await fetch("http://localhost:4000/drinks");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setDrinks(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDrinkData();
  });

  const [cart, setCart] = useState([]);
  const [mealCount, setMealCount] = useState(0);

  const addCart = (id) => {
    const selectedMeal =
      meals.find((meal) => meal.id === id) ||
      drinks.find((meal) => meal.id === id);

    const isMealInCart = cart.some((item) => item.id === id);

    if (!isMealInCart && selectedMeal) {
      // Add the selected meal to the cart
      setCart([...cart, { ...selectedMeal, quantity: 1 }]);
      setMealCount(mealCount + 1);
      console.log(
        `Added ${selectedMeal.meal || selectedMeal.drink} to the cart.`
      );
    } else {
      console.log(`Meal is already in the cart.`);
      setMealCount(mealCount + 1);
    }
  };

  const updateQuantity = (id, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  const removeCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    setMealCount(mealCount - 1);
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      /* const val = document.getElementById("checkout");
      val.textContent = "Pending";
      val.style.backgroundColor = "var(--main-color)";
      val.style.color = "white";
      setTimeout(() => {
        val.textContent = "Success";
        val.style.backgroundColor = "green";
        val.style.color = "white";

        setTimeout(() => {
          const val = document.getElementById("checkout");
          val.textContent = "Checkout";
          val.style.backgroundColor = "var(--main-color)";
          val.style.color = "white";

          navigate("/checkout");
        }, 2000);
      }, 2000); */
      navigate("/checkout");
    } else {
      alert("Empty Cart");
    }
  };

  /*   useEffect(() => {
    const val = document.getElementById("checkout");
    val.textContent = "Checkout";
    val.style.backgroundColor = "var(--main-color)";
    val.style.color = "white";
  }, []);
 */
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signin handleLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              meals={meals.filter((meal) =>
                meal.meal.toLowerCase().includes(search.toLocaleLowerCase())
              )}
              drinkSearch={drinks.filter((drink) =>
                drink.drink
                  .toLowerCase()
                  .includes(searchDrink.toLocaleLowerCase())
              )}
              setMeals={setMeals}
              search={search}
              setSearch={setSearch}
              cart={cart}
              setCart={setCart}
              mealCount={mealCount}
              setMealCount={setMealCount}
              addCart={addCart}
              removeCart={removeCart}
              updateQuantity={updateQuantity}
              handleCheckout={handleCheckout}
              drinks={drinks}
              setDrinks={setDrinks}
              searchDrink={searchDrink}
              setSearchDrink={setSearchDrink}
            />
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/checkout"
          element={<Checkout cart={cart} setCart={setCart} />}
        />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
