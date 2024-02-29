const middleware = require("../utils/middleware");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  console.log("Requested ID:", request.params.id);

  const specificBlog = await Blog.findById(request.params.id);
  response.json(specificBlog);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;
  console.log("log the body", request.body);
  const user = request.user;

  if (!request.user) {
    return response.status(401).json({ error: "User not authenticated" });
  }

  console.log("user", user);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  if (!blog.title || !blog.url) {
    return response.status(400).send({ error: "property missing" });
  } else {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  // Decode token like in post request
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  // Find blog to delete
  const blogToDelete = await Blog.findById(request.params.id);

  // Handle error if post does not exist
  if (!blogToDelete) {
    return response.status(404).json({ error: "blog post not found" });
  }
  if (!blogToDelete.user) {
    return response
      .status(404)
      .json({ error: "user not associated with the blog post" });
  }
  console.log("who is the user", blogToDelete.user);
  if (blogToDelete.user && blogToDelete.user.toString() === decodedToken.id) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    response
      .status(403)
      .json({ error: "Unauthorized to delete this blog post" });
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const { likes } = request.body;

  const updatePost = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes },
    {
      new: true,
    },
  );
  response.json(updatePost);
});

module.exports = blogsRouter;
