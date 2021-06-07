import React from "react";
import "./Merchandise.css";
import MerchandiseItem from "./MerchandiseItem";

const MerchandisePage = () => {
  return (
    <div className="container">
      <div className="banner">
        <div className="opacity-layer">
          <br />
          <h1 className="banner-text">Merchandise</h1>
        </div>
      </div>
      <div className="merchandise-options">
        <div className="mechandise-categories">
          <button>All</button>
          <button>Shirts</button>
          <button>Hats</button>
          <button>Sunscreen</button>
        </div>
        <button>Sort By</button>
      </div>
      <div className="merchandise-items-container">
        <div className="merchandise-items">
          <MerchandiseItem />
          <MerchandiseItem />
          <MerchandiseItem />
          <MerchandiseItem />
          <MerchandiseItem />
          <MerchandiseItem />
          <MerchandiseItem />
        </div>
      </div>
    </div>
  );
};

export default MerchandisePage;
