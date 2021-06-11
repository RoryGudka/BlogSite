import React, { useState, useEffect } from "react";
import "../styles/Merchandise.css";
import MerchandiseItem from "./MerchandiseItem";
import { getAllMerchandise } from "../utils/MerchandiseControls";

const MerchandisePage = () => {
  const [merchList, setMerchList] = useState(null);
  const [renderAll, setRenderAll] = useState(true);
  const [renderApparel, setRenderApparel] = useState(false);
  const [renderAcc, setRenderAcc] = useState(false);
  const [renderSkincare, setRenderSkincare] = useState(false);

  const [sortBy, setSortBy] = useState("Featured");
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
  const getAllApparel = () => {
    return merchList.filter((item) => item.category === "app");
  };
  /**
   *
   * @returns a list of all shirts in merchList
   */
  const getAllAcc = () => {
    return merchList.filter((item) => item.category === "acc");
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
    return merchList
      .slice(0)
      .sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  };
  /**
   *
   * @returns a list of all merchandise sorted by descending price
   */
  const sortDescendingPrice = () => {
    return merchList
      .slice(0)
      .sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  };
  /**
   *
   * @returns a list of all merchandise sorted by ascending rating
   */
  const sortTopRated = () => {
    return merchList
      .slice(0)
      .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
  };
  /**
   *
   * @returns a list of all merchandise sorted by order uploaded to site
   */
  const sortFeatured = () => {
    return merchList
      .slice(0)
      .sort((a, b) => parseFloat(a.feature) - parseFloat(b.feature));
  };
  /**
   *
   * @param {String} type is the type of object the user want to categorize the merchandise by
   * the function sets the state variables to render only the merchandise represented by the type parameter
   */
  const handleOrgClick = (type) => {
    setRenderAll(type === "all" ? true : false);
    setRenderApparel(type === "app" ? true : false);
    setRenderAcc(type === "acc" ? true : false);
    setRenderSkincare(type === "skincare" ? true : false);
  };

  return (
    <div className="merchandise-container">
      <div className="banner">
        <div className="opacity-layer">
          <h1 className="banner-text">Shop</h1>
        </div>
      </div>
      <div className="merchandise-options">
        <div className="merchandise-categories">
          <button onClick={() => handleOrgClick("all")}>All</button>
          <button onClick={() => handleOrgClick("acc")}>Accessories</button>
          <button onClick={() => handleOrgClick("app")}>Apparel</button>
          <button onClick={() => handleOrgClick("skincare")}>Skincare</button>
        </div>
        <form>
          <label for="sort">Sort by: </label>
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              if (e.target.value === "featured") setMerchList(sortFeatured());
              else if (e.target.value === "price-ascending")
                setMerchList(sortAscendingPrice());
              else if (e.target.value === "price-descending")
                setMerchList(sortDescendingPrice());
              else setMerchList(sortTopRated());
            }}
            name="sort"
            id="sort"
          >
            <option value="featured">Featured</option>
            <option value="price-ascending">Price: Low To High</option>
            <option value="price-descending">Price: High To Low</option>
            <option value="top-rated">Top Rated</option>
          </select>
        </form>
      </div>
      {merchList && (
        <div>
          {renderAll && (
            <div className="merchandise-items-container">
              <div className="merchandise-items">
                {merchList.map((item, key) => (
                  <MerchandiseItem item={item} key={key} />
                ))}
              </div>
            </div>
          )}
          {renderApparel && (
            <div className="merchandise-items-container">
              <div className="merchandise-items">
                {getAllApparel().map((item, key) => (
                  <MerchandiseItem item={item} key={key} />
                ))}
              </div>
            </div>
          )}
          {renderAcc && (
            <div className="merchandise-items-container">
              <div className="merchandise-items">
                {getAllAcc().map((item, key) => (
                  <MerchandiseItem item={item} key={key} />
                ))}
              </div>
            </div>
          )}
          {renderSkincare && (
            <div className="merchandise-items-container">
              <div className="merchandise-items">
                {getAllSkincare().map((item, key) => (
                  <MerchandiseItem item={item} key={key} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MerchandisePage;
