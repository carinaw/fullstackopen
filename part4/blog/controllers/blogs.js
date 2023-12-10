const middleware = require("../utils/middleware");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (request, response) => {
	Blog.find({}).then((blogs) => {
		blogs.forEach((blog) => {
			console.log();
		});
		response.json(blogs);
	});
});

blogsRouter.get("/:id", (request, response) => {
	Blog.findById(request.params.id).then((blog) => response.json(blog));
});

blogsRouter.post("/", (request, response) => {
	const blog = new Blog(request.body);

	blog.save().then((result) => {
		response.status(201).json(result);
	});
});

module.exports = blogsRouter;
