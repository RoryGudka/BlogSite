import React, { useState } from 'react';
import { Paper } from '@material-ui/core';

function ItemImage({ merchData }) {
	const url = merchData[1].Image;
	return (
		<Paper>
			<img src={url} />
		</Paper>
	);
}

export default ItemImage;
