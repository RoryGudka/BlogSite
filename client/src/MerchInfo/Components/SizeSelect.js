import React, { useState } from 'react';
import {
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	FormHelperText,
	Menu,
} from '@material-ui/core';

//------------Dropdown----------------
/**
 *
 * @param {arr} merchData the array of objects, each object being a merch item
 * @param {function} classes Theming/css.
 * @returns dropdown for size selection given a specific item
 */
function SizeSelect({ merchData, classes, setSize, size }) {
	// const [size, setSize] = useState('');
	const item = merchData[1]; //simulate selection w hard coded data
	const handleChange = (e) => {
		setSize(e.target.value);
	};
	return (
		<div>
			<FormControl required className={classes.formControl}>
				<InputLabel id="demo-simple-select-required-label">Size</InputLabel>
				<Select
					labelId="demo-simple-select-required-label"
					id="demo-simple-select-required"
					value={size}
					onChange={handleChange}
					className={classes.selectEmpty}
				>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					{item.Sizes.map((size) => {
						return <MenuItem value={size}> {size} </MenuItem>;
					})}
				</Select>
				<FormHelperText>Required</FormHelperText>
			</FormControl>
		</div>
	);
}

export default SizeSelect;
