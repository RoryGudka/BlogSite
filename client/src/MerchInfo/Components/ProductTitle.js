import React from 'react';
import ItemImage from './ItemImage';

function ProductTitle({ merchData }) {
	const item = merchData[1];

	return <h1>{item.Title}</h1>;
}

export default ProductTitle;
