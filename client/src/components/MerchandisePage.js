import React, { useState, useEffect, useContext } from "react";
import "../styles/Merchandise.css";
import MerchandiseItem from "./MerchandiseItem";
import { getAllMerchandise } from "../utils/MerchandiseControls";
import UserContext from "../contexts/UserContextProvider";

const MerchandisePage = () => {
  const [merchList, setMerchList] = useState(null);
  const [renderAll, setRenderAll] = useState(true);
  const [renderHats, setRenderHats] = useState(false);
  const [renderShirts, setRenderShirts] = useState(false);
  const [renderSkincare, setRenderSkincare] = useState(false);

  const [sortBy, setSortBy] = useState("Featured");

  //   const { user, setUser } = useContext(UserContext);

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
    setRenderHats(type === "hats" ? true : false);
    setRenderShirts(type === "shirts" ? true : false);
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
        <div className="mechandise-categories">
          <button onClick={() => handleOrgClick("all")}>All</button>
          <button onClick={() => handleOrgClick("shirts")}>Shirts</button>
          <button onClick={() => handleOrgClick("hats")}>Hats</button>
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
          {renderHats && (
            <div className="merchandise-items-container">
              <div className="merchandise-items">
                {getAllHats().map((item, key) => (
                  <MerchandiseItem item={item} key={key} />
                ))}
              </div>
            </div>
          )}
          {renderShirts && (
            <div className="merchandise-items-container">
              <div className="merchandise-items">
                {getAllShirts().map((item, key) => (
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
