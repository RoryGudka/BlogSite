import React from "react";
import "../styles/Merchandise.css";
import MerchandiseItem from "./MerchandiseItem";
import { Link } from "react-router-dom";

const MerchandisePage = () => {
  return (
    <div className="container">
      <div className="banner">
        <div className="opacity-layer">
          <h1 className="banner-text">Merchandise</h1>
        </div>
      </div>
      <div className="merchandise-options">
        <div className="mechandise-categories">
          <button>All</button>
          <button>Shirts</button>
          <button>Hats</button>
          <button>Skincare</button>
        </div>
        <button>Sort By</button>
      </div>
      <div className="merchandise-items-container">
        <div className="merchandise-items">
          <Link to="/" className="item-link">
            <MerchandiseItem />
          </Link>
          <Link to="/" className="item-link">
            <MerchandiseItem />
          </Link>
          <Link to="/" className="item-link">
            <MerchandiseItem />
          </Link>
          <Link to="/" className="item-link">
            <MerchandiseItem />
          </Link>
          <Link to="/" className="item-link">
            <MerchandiseItem />
          </Link>
          <Link to="/" className="item-link">
            <MerchandiseItem />
          </Link>
          <Link to="/" className="item-link">
            <MerchandiseItem />
          </Link>
          <Link to="/" className="item-link">
            <MerchandiseItem />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MerchandisePage;
