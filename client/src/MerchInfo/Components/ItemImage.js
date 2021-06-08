import React, { useState } from 'react';
import { Paper } from '@material-ui/core';

/**
 * @param {Array} merchData: an array of all of the merchandise items (for now hardcoded)
 * @returns the custom tag showing the image of the item
 */
function ItemImage({ merchData, gridClasses }) {
	const url = merchData[1].Image;
	return (
		<div className={gridClasses}>
			<img src={url} width="80%" />
		</div>
	);
}

export default ItemImage;
