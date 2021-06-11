const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const { db } = require('./firebase.js');
const secret = require('./secret.js');
const blog_posts_route = require('./routes/blog_posts.js');
const forum_posts_route = require('./routes/forum_posts.js');
const login_route = require('./routes/login.js');
const signup_route = require('./routes/signup.js');
const users_route = require('./routes/users.js');
const merchandise_route = require('./routes/merchandise.js');
const comments_route = require('./routes/comments.js');

//Makes sure the bodies of posts are legible
app.use(express.json());
app.use(cors());

//Local token list initiation
const tokens = {};

/**
 * Returns a new JWT for the user to authenticate itself with every request instead of a password
 * @param {Object} user
 * @returns token
 */
const generateToken = (user) => {
	//Expires in 1 hour
	const token = jwt.sign(
		{
			exp: Math.floor(Date.now() / 1000) + 60 * 60,
			data: user.username,
		},
		secret
	);
	//Adds the token to the local list
	tokens[user.username] = token;
	return token;
};

/**
 * Verifies that the token is unaltered and matches the user
 * @param {String} uid
 * @param {String} token
 * @returns verified
 */
const verifyToken = (username, token) => {
	try {
		jwt.verify(token, secret);
		return tokens[username] === token;
	} catch (e) {
		return false;
	}
};

/**
 * Returns all results from a query snapshot of a collection
 * @param {Object} querySnapshot
 * @returns results
 */
const getAll = (querySnapshot) => {
	let all = [];
	querySnapshot.forEach((doc) => {
		all.push({ doc: doc.id, ...doc.data() });
	});
	return all;
};

const parameters = { app, db, verifyToken, getAll, generateToken };

blog_posts_route(parameters);
forum_posts_route(parameters);
login_route(parameters);
signup_route(parameters);
users_route(parameters);
merchandise_route(parameters);
comments_route(parameters);

/**
 * Initiates the server
 */
app.listen(5000, () => {
	console.log('Server started on port 5000');
});
