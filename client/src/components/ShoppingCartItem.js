import React from "react";
// import "../styles/ShoppingCart.css";

const ShoppingCartItem = ({ item }) => {
  return (
    <div className="shopping-cart-component-container">
      <div className="shopping-cart-component">
        <img src={item.img} href={item.name} className="shopping-cart-image" />
        <div>
          <h2>{item.name}</h2>
          <h2>${item.price}.00</h2>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartItem;
