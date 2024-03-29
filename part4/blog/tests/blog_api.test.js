const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { LEGAL_TLS_SOCKET_OPTIONS } = require("mongodb");

const initialPosts = [
	{
		title: "Raw feeding is important",
		author: "AM",
		url: "raw-feeding",
		likes: 3,
	},
	{
		title: "Activation games",
		author: "CA",
		url: "activation-games-2023",
		likes: 3,
	},
	{
		title: "Hobby sports",
		author: "NT",
		url: "nose-work-and-such",
		likes: 7,
	},
];

let token;

beforeEach(async () => {
	await Blog.deleteMany({});
	await User.deleteMany({});

	const passwordHash = await bcrypt.hash("sekret", 10);
	const user = new User({ username: "root", passwordHash });
	await user.save();

	const fullBlogPosts = initialPosts.map(
		(post) => new Blog({ ...post, user: user._id })
	);
	await Promise.all(fullBlogPosts.map((blog) => blog.save()));

	token = jwt.sign(
		{ username: user.username, id: user._id },
		process.env.SECRET
	);
});

describe("blog posts exist correctly", () => {
	test("blog posts are returned as json", async () => {
		await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/);
	}, 10000);

	test("the correct amount of posts", async () => {
		const response = await api.get("/api/blogs");

		expect(response.body).toHaveLength(3);
	});
});

describe("format is correct", () => {
	test("unique identifier exists and is named id", async () => {
		const blogPost = new Blog({
			title: "Dogs",
			author: "Carina",
			url: "life-with-dogs",
			likes: "5",
		});

		await blogPost.save();
		expect(blogPost.id).toBeDefined();
	});

	test("if likes does not exist default to 0", async () => {
		const blogPost = new Blog({
			title: "Dogs",
			author: "Carina",
			url: "life-with-dogs",
		});

		await blogPost.save();
		console.log("zero likes blog post", blogPost);

		expect(blogPost.likes).toBe(0);
	});
});

describe("posting works", () => {
	test("http post request creates blog post", async () => {
		const blogPost = {
			title: "Dogs",
			author: "Carina",
			url: "life-with-dogs",
			likes: "5",
			user: "",
		};
		console.log(blogPost, "request body");
		const response = await api
			.post("/api/blogs")
			.send(blogPost)
			.set("Authorization", `Bearer ${token}`);

		if (response.status !== 201) {
			console.log(response.body);
		}

		expect(response.status).toBe(201);

		const newPosts = await api.get("/api/blogs");

		expect(newPosts.body).toHaveLength(initialPosts.length + 1);
	}, 10000);
});

describe("missing properties", () => {
	test("missing title property returns 400 bad request", async () => {
		const blogPost = {
			author: "Flausch",
			url: "here-would-be-url",
			likes: 5,
		};
		console.log("the post to test with", blogPost);
		await api
			.post("/api/blogs")
			.send(blogPost)
			.set("Authorization", `Bearer ${token}`)
			.expect(400);
	});

	test("missing url property returns 400 bad request", async () => {
		const blogPost = {
			title: "Grooming for beginners",
			author: "Flausch",
			likes: 5,
		};

		await api
			.post("/api/blogs")
			.send(blogPost)
			.set("Authorization", `Bearer ${token}`)
			.expect(400);
	}, 50000);
});

describe("token tests", () => {
	test("blog fails with 401 unauthorized if no token is provided", async () => {}, 10000);
});

describe("deleting posts", () => {
	test("check if deleting a post works", async () => {
		const initialPosts = await api.get("/api/blogs");
		const postsBeforeDelete = initialPosts.body;
		const blogToDelete = postsBeforeDelete[0];

		console.log("id of blog to delete", blogToDelete.id);
		console.log("blog to delete user", blogToDelete.user);
		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set("Authorization", `Bearer ${token}`);

		const finalPosts = await api.get("/api/blogs");
		console.log("posts after delete", finalPosts.body);
		const postsAfterDelete = finalPosts.body;

		expect(postsAfterDelete).toHaveLength(postsBeforeDelete.length - 1);
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});
