const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
const bcrypt = require("bcrypt");

describe("requests work", () => {
	beforeEach(async () => {
		await User.deleteMany({});

		const passwordHash = await bcrypt.hash("sekret", 10);
		const testUser = new User({ username: "root", passwordHash });

		await user.save();
	});

	test("all users can be found", async () => {
		await api
			.get("/api/users")
			.expect(200)
			.expect("Content-Type", /application\/json/);
	}, 10000);

	test("creating a new user works", async () => {
		const newUser = new User({
			name: "Carina",
			username: "trackingcarina",
			passwordHash: "somethingpasswordlike",
		});

		await newUser.save();
		const allUsers = await api.get("/api/users");

		expect(allUsers.body).toHaveLength(2);
	});

	test("unique usernames validation works", async () => {
		const newUser = new User({
			name: "I am testing",
			username: "root",
			passwordHash: "somethingpasswordlike",
		});

		await api.post("/api/users").send(newUser).expect(400);
	});
});

describe("user format is ok", () => {
	test("username too short", async () => {
		const newUser = new User({
			name: "Carina",
			username: "ca",
			password: "somepasswordadagin",
		});

		await api.post("/api/users").send(newUser).expect(400);
	}, 10000);

	test("password is too short, error message", async () => {
		const newUser = {
			name: "Carina",
			username: "a-good-username",
			password: "hi",
		};

		const response = await api.post("/api/users").send(newUser);
		expect(response.body.error).toContain(
			"Username and password need to have at least 3 characters"
		);
	}, 10000);
});

afterAll(async () => {
	await mongoose.connection.close();
});
