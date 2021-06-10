import React, { useState } from 'react';
import {
	makeStyles,
	Grid,
	Paper,
	Typography,
	ButtonBase,
} from '@material-ui/core';
import ItemImage from './Components/ItemImage';
import SizeSelect from './Components/SizeSelect';
import AddButton from './Components/AddButton';
import Price from './Components/Price';
import ProductTitle from './Components/ProductTitle';
import Description from './Components/Description';
import ProductRating from './Components/ProductRating';
import AllImages from './Components/AllImages';
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
		Images: [
			'https://images.unsplash.com/photo-1563389234808-52344934935c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
			'https://images.unsplash.com/photo-1563389494935-83e181bd6767?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2581&q=80',
		],
		Rating: '4.2',
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

//css styling for the grids in this page
const gridStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		margin: 'auto',
		maxWidth: 1000,
	},
	//-webkit-fill-available

	image: {
		width: 128,
		height: 128,
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%',
		width: '-webkit-fill-available',
	},
}));

//the styling for the elements of the grid
const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 50,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

/**
 *
 * @returns All of the components for the individual shopping site into one page.
 *
 */
function MerchInfo() {
	const item = data[1]; //hardcoding what would be the fetch for the specific item
	const [image, setImage] = useState(item.Images[0]);
	const [size, setSize] = useState('');
	const gridClasses = gridStyles();
	const classes = useStyles();
	const shoppingCart = []; //hardcoded to simulate a database collection of objects

	const images = item.Images;
	return (
		<div className={gridClasses.root}>
			<Paper className={gridClasses.paper}>
				<Grid container spacing={2}>
					{' '}
					<Grid item xs={14} sm={6}>
						<Grid item container direction="column">
							<ItemImage image={image} />
						</Grid>
					</Grid>
					<Grid item xs={14} sm={6} direction="column">
						<Paper>
							{' '}
							{/* made paper just to see outline */}
							<Grid item xs={12} sm container>
								<Grid item xs container direction="column" spacing={2}>
									<Grid item>
										<Typography gutterBottom variant="subtitle1">
											<ProductTitle item={item} />
										</Typography>
										<Grid item>
											<Price item={item} />
										</Grid>
										<Grid item>
											<ProductRating item={item} />
										</Grid>

										<SizeSelect
											size={size}
											setSize={setSize}
											item={item}
											classes={classes}
										/>
									</Grid>
									<Grid item>
										<AddButton
											size={size}
											shoppingCart={shoppingCart}
											item={item}
										/>
									</Grid>
									<Grid item>
										<Typography variant="body2" gutterBottom>
											<Description item={item} />
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid item>
						<AllImages item={item} images={images} />
					</Grid>
				</Grid>
			</Paper>
		</div>

		// <ProductTitle merchData={merchData} />
		// <Description merchData={merchData} />
		// <Price merchData={merchData} />
		// <ItemImage merchData={merchData} />
		// <SizeSelect merchData={merchData} classes={classes} />
		// <AddButton shoppingCart={shoppingCart} merchData={merchData} />
	);
}

export default MerchInfo;
