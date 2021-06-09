import React from "react";
import "../styles/Merchandise.css";

const MerchandiseItem = ({ item }) => {
  return (
    <div className="merchandise-component">
      <img
        className="merchandise-component-image"
        // src={new URL(item.img)}
        src={item.img}
        alt={item.name}
      />
      {/* <hr style={{ width: "150px" }} /> */}
      <h1 className="merchandise-component-title">{item.name}</h1>
      <h1 className="merchandise-component-data">${item.price}</h1>
    </div>
  );
};

export default MerchandiseItem;