import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
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
import { getAllMerchandise } from '../../utils/MerchandiseControls';
import { getMerchandise } from '../../utils/MerchandiseControls';
import CartButton from './Components/CartButton';
import { UserContext } from '../../contexts/UserContextProvider';
//dummy data

//css styling for the grids in this page
const gridStyles = makeStyles((theme) => ({
	root: {
		margin: '40px',
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
		margin: '40px',
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
	const { user } = useContext(UserContext);
	const { itemId } = useParams();
	const [item, setItem] = useState();
	//const item = data[1];
	// setItem(data);

	useEffect(() => {
		console.log(itemId);
		getMerchandise(itemId).then((response) => {
			setItem(response);
		});

		// getMerchandise().then((res) => {
		// 	setItem(res);
		// });
	}, []);

	const [image, setImage] = useState('');
	const [size, setSize] = useState('');
	const gridClasses = gridStyles();
	const classes = useStyles();
	const shoppingCart = []; //hardcoded to simulate a database collection of objects

	//need to conditionally set the image
	// const images = item.Images;
	if (!item) {
		return <h1> Loading... </h1>;
	}
	return (
		<div className={gridClasses.root}>
			<Paper className={gridClasses.paper}>
				<Grid container spacing={2}>
					{' '}
					<Grid item xs={14} sm={6}>
						<Grid item container direction="column">
							<ItemImage item={item} />
						</Grid>
					</Grid>
					<Grid item xs={14} sm={6} direction="column">
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
									{/* <Grid item>
										<ProductRating item={item} />
									</Grid> */}

									{item.sizes && (
										<SizeSelect
											size={size}
											setSize={setSize}
											item={item}
											classes={classes}
										/>
									)}
								</Grid>
								<br></br>
								<Grid item>
									<CartButton
										itemID={itemId}
										user={user}
										item={item}
										size={size}
										setSize={setSize}
									/>
									{/* <AddButton
										size={size}
										shoppingCart={shoppingCart}
										item={item}
									/> */}
								</Grid>

								<Grid item>
									<Typography variant="body2" gutterBottom>
										<Description item={item} />
									</Typography>
								</Grid>
							</Grid>
						</Grid>
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
