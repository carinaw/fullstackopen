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

test("blog posts are returned as json", async () => {
	await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);
}, 10000);

afterAll(async () => {
	await mongoose.connection.close();
});

test("the correct amount of posts", async () => {
	const response = await api.get("/api/blogs");

	expect(response.body).toHaveLength(3);
});
