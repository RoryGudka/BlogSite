import React from "react";
import "../styles/Merchandise.css";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Link } from "react-router-dom";

const MerchandiseItem = ({ item }) => {
  return (
    <div className="merchandise-component">
      <Link to={`/item/${item.doc}`} className="item-link">
        <img
          className="merchandise-component-image"
          // src={new URL(item.img)}
          src={item.img}
          alt={item.name}
        />
      </Link>

      {/* <hr style={{ width: "150px" }} /> */}
      <div className="merchandise-component-text">
        <Link to={`/item/${item.doc}`} className="item-link">
          <div className="merchandise-component-subtitle">
            <h1 className="merchandise-component-title">{item.name}</h1>
            <h1 className="merchandise-component-data">${item.price}</h1>
          </div>
        </Link>

        <button
          className="shopping-cart-button"
          onClick={() => console.log(`added ${item.doc} to shopping cart`)}
        >
          <AddShoppingCartIcon />
        </button>
      </div>
    </div>
  );
};

export default MerchandiseItem;
