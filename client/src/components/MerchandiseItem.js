import React from "react";
import buckethat from "../merchandise/assets/buckethat1.jpg";
import "../styles/Merchandise.css";

const MerchandiseItem = () => {
  return (
    <div className="merchandise-component">
      <img
        className="merchandise-component-image"
        src={buckethat}
        alt="Bucket Hat"
      />
      <hr style={{ width: "150px" }} />
      <h1 className="merchandise-component-title">Dog Bucket Hat</h1>
      <h1 className="merchandise-component-data">$27.00</h1>
    </div>
  );
};

export default MerchandiseItem;
