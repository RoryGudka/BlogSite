import React, { useState, useEffect, useContext } from "react";
import "../styles/ShoppingCart.css";
import { getMerchandise } from "../utils/MerchandiseControls";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeFromCart } from "../utils/CartControls";
import { UserContext } from "../contexts/UserContextProvider";

const ShoppingCartItem = ({ item }) => {
  // console.log("shpitem, ", item);
  const { user, setUser } = useContext(UserContext);

  async function remove() {
    console.log(removeFromCart(item.doc, user));
    let data = await removeFromCart(item.doc, user);
    console.log("rmv user: ", data);

    if (data) setUser(data);
  }

  const [curItem, setCurItem] = useState(null);

  console.log("item id ", item);

  useEffect(() => {
    getMerchandise(item).then((response) => {
      setCurItem(response);
    });

    // getMerchandise().then((res) => {
    // 	setItem(res);
    // });
  }, []);

  if (!curItem) return <h1>Loading</h1>;

  console.log("cur doc: ", item);

  return (
    <div className="shopping-cart-component-container">
      <div className="shopping-cart-component">
        <img
          src={curItem.img}
          href={curItem.name}
          className="shopping-cart-image"
        />
        <div className="shopping-cart-data">
          <div>
            <h2>{curItem.name}</h2>
            <h2>${curItem.price}.00</h2>
          </div>
          <DeleteIcon
            style={{ cursor: "pointer" }}
            onClick={() => {
              remove();
              console.log("deleted: ", item);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartItem;
