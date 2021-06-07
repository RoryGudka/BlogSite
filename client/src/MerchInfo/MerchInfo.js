import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import ItemImage from './Components/ItemImage';
import SizeSelect from './Components/SizeSelect';
import AddButton from './Components/AddButton';
import Price from './Components/Price';
import ProductTitle from './Components/ProductTitle';
//dummy data

const data = [
	{
		doc_id: 'IHRhv392840h',
		Price: '99.99',
		Image: 'url',
		Rating: '3.9',
		Sizes: ['One Size Fits All'],
		Description: 'A cool hat',
		Category: 'Hats',
	},
	{
		doc_id: 'ei48rh33848h',
		Price: '109.99',
		Title: 'The Shirt',
		Image:
			'https://images.unsplash.com/photo-1563389234808-52344934935c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
		Rating: '4',
		Sizes: ['Small', 'Medium', 'Large'],
		Description: 'A Really cool shirt',
		Category: 'Apparel',
	},
	{
		doc_id: 'u38r7843422',
		Price: '22.99',
		Image: 'url',
		Rating: '2.7',
		Sizes: ['One Size Fits All'],
		Description: 'A lame hat',
		Category: 'Hats',
	},
];

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

function MerchInfo() {
	const merchData = data;
	const classes = useStyles();
	const [shoppingCart, setShoppingCart] = useState([]);

	//title
	//stars
	//price
	//add button
	//size dropdown
	//image for the item
	//other picture options

	return (
		<div>
			<ProductTitle merchData={merchData} />
			<Price merchData={merchData} />
			<ItemImage merchData={merchData} />
			<SizeSelect merchData={merchData} classes={classes} />
			<AddButton shoppingCart={shoppingCart} merchData={merchData} />
		</div>
	);
}

export default MerchInfo;
