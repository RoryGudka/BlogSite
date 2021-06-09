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
		Price: item.Price,
		Title: item.Title,
		Image: item.Image,
		Rating: item.Rating,
		Size: size,
		Description: item.Description,
		Category: item.Category,
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
