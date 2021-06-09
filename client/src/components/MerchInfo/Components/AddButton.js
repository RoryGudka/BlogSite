import React, { useState } from 'react';
import { Button } from '@material-ui/core';

/**
 *
 * @param {array} shoppingCart: an array to simulate the shopping cart of the item.
 * @returns
 */
function AddButton({ shoppingCart, item, size }) {
	// const item = merchData[1];
	const itemToAdd = {
		doc_id: item.doc_id,
		price: item.price,
		name: item.name,
		img: item.img,
		rating: item.rating,
		//Size: size,
		description: item.description,
		category: item.category,
	};
	const onClick = (e) => {
		size === '' ? alert('NO SIZE') : shoppingCart.push(itemToAdd);
		e.preventDefault();
	};
	return (
		<Button onClick={onClick} size="large" variant="contained" color="primary">
			Add to cart
		</Button>
	);
}

export default AddButton;
