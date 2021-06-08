import React from 'react';

/**
 * @param {Array} merchData: an array of all of the merchandise items (for now hardcoded)
 * @returns the custom tag showing the description of the item
 */
function Description({ merchData }) {
	const item = merchData[1]; //dummy data (should really have the item passed in as context once the data is fetched)
	const description = item.Description;
	return (
		<div>
			<h3> Product description </h3>
			<p> {description}</p>
		</div>
	);
}

export default Description;
