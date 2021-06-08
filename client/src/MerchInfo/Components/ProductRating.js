import React from 'react';
import { Rating } from '@material-ui/lab';

/**
 *
 * @param {*} merchData : array of the merchandise objects. Hardcoded for now
 * @returns //rating tag with the passed rating value (Rating tag from MUI)
 */
function ProductRating({ merchData }) {
	const item = merchData[1]; //once again hard coding the simulation of a given item.
	const rating = item.Rating;
	return (
		<Rating
			name="half-rating-read"
			defaultValue={rating}
			precision={0.1}
			readOnly
		/>
	);
}

export default ProductRating;
