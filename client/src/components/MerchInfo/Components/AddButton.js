import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useStyles } from '../../../styles/Button';
/**
 *
 * @param {array} shoppingCart: an array to simulate the shopping cart of the item.
 * @returns
 */
function AddButton({ shoppingCart, item, size }) {
	const classes = useStyles();
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
		size === '' && item.sizes
			? alert('NO SIZE SELECTED')
			: shoppingCart.push(itemToAdd);
		e.preventDefault();
	};
	return (
		<Button
			classes={classes}
			variant="primary"
			onClick={onClick}
			size="large"
			variant="contained"
			color="primary"
		>
			Add to cart
		</Button>
	);
}

export default AddButton;
