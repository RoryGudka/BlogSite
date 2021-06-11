import axios from 'axios';

/**
 * Adds an item to a user's potentially previously existing cart
 * @param {*} primary_key Item doc you want to add to cart
 * @param {*} user User data
 * @returns 
 */
const addToCart = (primary_key, user) => {
    return axios
        .put("http://localhost:5000/cart/add", {
            ...user,
            primary_key,
        })
        .then((res) => {
        if (res.data.status === 200) return res.data.data;
        else {
            alert(res.data.message);
            return false;
        }
        })
        .catch((err) => {
        alert("An error has occurred");
        return false;
    });
};

/**
 * Removes an item from a user's potentially previously existing cart
 * @param {*} primary_key Item doc you want to remove to cart
 * @param {*} user User data
 * @returns 
 */
 const removeFromCart = (primary_key, user) => {
    return axios
        .put("http://localhost:5000/cart/remove", {
            ...user,
            primary_key,
        })
        .then((res) => {
        if (res.data.status === 200) return res.data.data;
        else {
            alert(res.data.message);
            return false;
        }
        })
        .catch((err) => {
        alert("An error has occurred");
        return false;
    });
};

export {addToCart, removeFromCart};