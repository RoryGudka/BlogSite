import React, { useContext } from "react";
import "../styles/Merchandise.css";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Link } from "react-router-dom";
import { addToCart } from "../utils/CartControls";
import { UserContext } from "../contexts/UserContextProvider";

const MerchandiseItem = ({ item }) => {
  const { user, setUser } = useContext(UserContext);

  console.log(user);

  async function add() {
    const data = await addToCart(item.doc, user);
    console.log("data, ", data);
    if (data) {
      setUser(data);
    }
    console.log("data", data);
    console.log(user.token);
  }

  // console.log(user);
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
          onClick={async () => {
            if (user) {
              add();
              alert(`Added ${item.name} to cart!`);
            } else {
              alert(`Log In to add an item to cart`);
            }
          }}
        >
          <AddShoppingCartIcon />
        </button>
      </div>
    </div>
  );
};

export default MerchandiseItem;
