import React, { useContext, useState } from "react";
import ShoppingCartItem from "./ShoppingCartItem";
import "../styles/ShoppingCart.css";
import { UserContext } from "../contexts/UserContextProvider";

const ShoppingCart = () => {
  const { user, setUser } = useContext(UserContext);

  const [userCart, setUserCart] = useState(null);

  if (!user) return <h1>Loading...</h1>;

  console.log("CART", user.cart);

  return (
    <div>
      <div className="banner">
        <div className="opacity-layer">
          <h1 className="banner-text">Shopping Cart</h1>
        </div>
      </div>
      <div className="shopping-data-container">
        {/* user.shopping_cart */}
        {user.cart.map((item, key) => (
          <ShoppingCartItem item={item} key={key} />
        ))}
      </div>
    </div>
  );
};

export default ShoppingCart;
