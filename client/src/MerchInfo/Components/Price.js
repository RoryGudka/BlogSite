import React from 'react';
import { Typography } from '@material-ui/core';

/**
 * @param {Array} merchData: an array of all of the merchandise items (for now hardcoded)
 * @returns the custom tag showing the price of the item
 */
function Price({ merchData }) {
	const price = merchData[1].Price;
	return <Typography variant="subtitle1"> ${price}</Typography>;
}

export default Price;
