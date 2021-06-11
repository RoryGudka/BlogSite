import React from "react";
import ShoppingCartItem from "./ShoppingCartItem";
import "../styles/ShoppingCart.css";

const ShoppingCart = () => {
  const tempData = [
    {
      category: "shirts",
      description:
        "Scare all of your friends and look stylish doing it with this awesome shirt. ",
      doc: "12J2jooIyDGtNLSWKbiJ",
      feature: 4,
      img: "https://images.unsplash.com/photo-1503341733017-1901578f9f1e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      name: "Skeleton T-Shirt",
      price: 15,
      rating: 2,
      sizes: ["small", "medium", "large"],
    },
    {
      category: "hats",
      description:
        "The butterfly bucket hat will bring you out of your cocoon and into summer. All of your friends will be jealous and wish they were you because they will look super lame and bad next to you.",
      doc: "8jgJZ5Ve7F9sEnH4tuwh",
      feature: 0,
      img: "https://images.unsplash.com/photo-1618371814506-44f47062e695?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
      name: "Butterfly Bucket Hat",
      price: 27,
      rating: 3,
    },
  ];

  return (
    <div>
      <div className="banner">
        <div className="opacity-layer">
          <h1 className="banner-text">Shopping Cart</h1>
        </div>
      </div>
      <div className="shopping-data-container">
        {/* user.shopping_cart */}
        {tempData.map((item, key) => (
          <ShoppingCartItem item={item} key={key} />
        ))}
      </div>
    </div>
  );
};

export default ShoppingCart;
