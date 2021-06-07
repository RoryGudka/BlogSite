import React, { useState } from 'react';
import { Button } from '@material-ui/core';

//-----add to cart-------
function AddButton({ merchData, shoppingCart }) {
	const onClick = (e) => {
		// shoppingCart.push(data[2]);
		console.log(shoppingCart);
		e.preventDefault();
	};
	return (
		<Button onClick={onClick} size="large" variant="contained" color="primary">
			Add to cart
		</Button>
	);
}

export default AddButton;
