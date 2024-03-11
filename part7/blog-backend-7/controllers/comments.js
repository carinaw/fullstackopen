const middleware = require("../utils/middleware");
const commentsRouter = require("express").Router();
const Blog = require("../models/blog");
const Comment = require("../models/comment");

commentsRouter.get("/", async (request, response) => {
	const comments = await Comment.find({}).populate("blog");
	response.json(comments);
});

commentsRouter.get("/:id", async (request, response) => {
	console.log("Requested ID:", request.params.id);

	const specificComment = await Comment.findById(request.params.id);
	response.json(specificComment);
});

commentsRouter.post("/", async (request, response) => {
	const body = request.body;
	console.log("log the body", request.body);

	const blog = await Blog.findById(body.blog);
	if (!blog) {
		return response.status(404).json({ error: "Blog post not found" });
	}

	const comment = new Comment({
		content: body.content,
		blog: blog._id,
	});

	const savedComment = await comment.save();
	blog.comments = blog.comments.concat(savedComment._id);
	await blog.save();

	response.status(201).json(savedComment);
});

module.exports = commentsRouter;
