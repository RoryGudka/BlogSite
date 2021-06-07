import React from 'react';

function Price({ merchData }) {
	const price = merchData[1].Price;
	return <h2> ${price} </h2>;
}

export default Price;
