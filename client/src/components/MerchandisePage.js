import React, { useState, useEffect } from "react";
import "../styles/Merchandise.css";
import MerchandiseItem from "./MerchandiseItem";
import { Link } from "react-router-dom";
import { getAllMerchandise } from "../utils/MerchandiseControls";

const MerchandisePage = () => {
  const [merchList, setMerchList] = useState(null);

  /**
   * gets all merchandise from Firestore database and stores it into the state variable: merchList
   */
  useEffect(() => {
    getAllMerchandise().then((res) => {
      setMerchList(res);
    });
  }, []);
  /**
   *
   * @returns a list of all hats in merchList
   */
  const getAllHats = () => {
    return merchList.filter((item) => item.category === "hats");
  };
  /**
   *
   * @returns a list of all shirts in merchList
   */
  const getAllShirts = () => {
    return merchList.filter((item) => item.category === "shirts");
  };
  /**
   *
   * @returns a list of all skincare items in merchList
   */
  const getAllSkincare = () => {
    return merchList.filter((item) => item.category === "skincare");
  };
  /**
   *
   * @returns a list of all merchandise sorted by ascending price
   */
  const sortAscendingPrice = () => {
    return merchList.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  };
  /**
   *
   * @returns a list of all merchandise sorted by descending price
   */
  const sortDescendingPrice = () => {
    return merchList.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  };
  /**
   *
   * @returns a list of all merchandise sorted by ascending rating
   */
  const sortAscendingRating = () => {
    return merchList.sort(
      (a, b) => parseFloat(a.rating) - parseFloat(b.rating)
    );
  };
  /**
   *
   * @returns a list of all merchandise sorted by descending rating
   */
  const sortDescendingRating = () => {
    return merchList.sort(
      (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
    );
  };

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
        {merchList && (
          <div className="merchandise-items">
            {merchList.map((item, key) => (
              <Link to={`/item/${item.doc}`} key={key} className="item-link">
                <MerchandiseItem item={item} key={key} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MerchandisePage;
