const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

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

beforeEach(async () => {
	await Blog.deleteMany({});
	let blogObject = new Blog(initialPosts[0]);
	await blogObject.save();
	blogObject = new Blog(initialPosts[1]);
	await blogObject.save();
	blogObject = new Blog(initialPosts[2]);
	await blogObject.save();
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
		const blogPost = new Blog({
			title: "Dogs",
			author: "Carina",
			url: "life-with-dogs",
			likes: "5",
		});

		await blogPost.save();
		const newPosts = await api.get("/api/blogs");

		expect(newPosts.body).toHaveLength(initialPosts.length + 1);
	});
});

describe("missing properties", () => {
	test("missing title property returns 400 bad request", async () => {
		const blogPost = new Blog({
			author: "Flausch",
			url: "here-would-be-url",
			likes: 5,
		});

		await api.post("/api/blogs").send(blogPost).expect(400);
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});
