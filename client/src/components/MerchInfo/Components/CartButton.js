import React, { useState, useContext } from 'react';
import { Button, Popover, makeStyles, Typography } from '@material-ui/core';
import { useStyles } from '../../../styles/Button';
import { addToCart } from '../../../utils/CartControls';
import { UserContext } from '../../../contexts/UserContextProvider';
import { getMerchandise } from '../../../utils/MerchandiseControls';
import { useParams } from 'react-router-dom';
const styles = makeStyles((theme) => ({
	typography: {
		padding: theme.spacing(2),
	},
}));

function CartButton(item, size, itemID) {
	const { user } = useContext(UserContext);
	const classes = styles();
	const classes0 = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);

	const { itemId } = useParams();
	// const itemToAdd = {
	// 	doc_id: item.item.doc_id,
	// 	price: item.item.price,
	// 	name: item.item.name,
	// 	img: item.item.img,
	// 	rating: item.item.rating,
	// 	size: size,
	// 	description: item.item.description,
	// 	category: item.item.category,
	// };
	const handleClick = (event) => {
		console.log(user);
		if (user) {
			addToCart(itemId, user);
		} else {
			alert('Sign in to shop');
		}
		// size === '' && item.sizes
		// 	? alert('NO SIZE SELECTED')
		// 	: addToCart(item, user);
		console.log('ADDED TO CART');
		console.log(itemId);
		setAnchorEl(event.currentTarget);

		// console.log(item.item.doc_id);
		event.preventDefault();
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	function StupidButton() {
		const clicky = (e) => {
			console.log(itemID);
			e.preventDefault();
		};
		return <button onClick={clicky}>Log Item to add</button>;
	}
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<div>
			<Button
				classes={classes0}
				variant="primary"
				onClick={handleClick}
				size="large"
				variant="contained"
				color="primary"
			>
				Add to cart
			</Button>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<Typography className={classes.typography}>
					Item has been added to cart
				</Typography>
			</Popover>
		</div>
	);
}

export default CartButton;
