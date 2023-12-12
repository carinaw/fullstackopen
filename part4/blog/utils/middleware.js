const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requestLogger = (request, response, next) => {
	logger.info("Method:", request.method);
	logger.info("Path:  ", request.path);
	logger.info("Body:  ", request.body);
	logger.info("---");
	next();
};

const unknownEndpoint = (request, response, next) => {
	response.status(404).send({ error: "unknown endpoint" });
	next();
};

const errorHandler = (error, request, response, next) => {
	logger.error(error.message);

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" });
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message });
	} else if (error.name === "JsonWebTokenError") {
		return response.status(401).json({ error: error.message });
	} else {
		logger.error("Undefined error received in errorHandler");
		return response.status(500).json({ error: "Internal Server Error" });
	}

	next(error);
};

const tokenExtractor = (request, response, next) => {
	const authorization = request.get("authorization");
	if (authorization && authorization.startsWith("Bearer ")) {
		request.token = authorization.split(" ")[1];
	} else {
		request.token = null;
	}
	next();
};

const userExtractor = async (request, response, next) => {
	// Make sure that this only runs if there is a token. Otherwise it will ask for a token in the request.

	if (!request.token) {
		return next();
	}
	try {
		const decodedToken = jwt.verify(request.token, process.env.SECRET);
		console.log("decodedToken", decodedToken);
		if (!decodedToken.id) {
			return response.status(401).json({ error: "token invalid" });
		}
		const user = await User.findById(decodedToken.id);
		console.log("is a user found?", user);
		if (user) {
			request.user = user;
			next();
		} else {
			response.status(404).json({ error: "user not found" });
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	userExtractor,
};
