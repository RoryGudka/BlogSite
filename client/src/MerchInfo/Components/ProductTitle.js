import React from 'react';
import ItemImage from './ItemImage';

/**
 * @param {Array} merchData: an array of all of the merchandise items (for now hardcoded)
 * @returns the custom tag showing the title of the item
 */
function ProductTitle({ merchData }) {
	const item = merchData[1];

	return <h1>{item.Title}</h1>;
}

export default ProductTitle;
