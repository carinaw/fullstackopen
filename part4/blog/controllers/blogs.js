const middleware = require("../utils/middleware");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
	const specificBlog = await Blog.findById(request.params.id);
	response.json(specificBlog);
});

blogsRouter.post("/", async (request, response) => {
	const body = request.body;

	const blog = new Blog({
		title: body.title,
		autor: body.author,
		url: body.url,
		likes: body.likes,
	});

	if (!blog.title || !blog.url) {
		return response.status(400).send({ error: "property missing" });
	} else {
		const savedBlog = await blog.save();

		response.status(201).json(savedBlog);
	}
});

module.exports = blogsRouter;
