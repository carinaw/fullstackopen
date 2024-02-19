describe("Blog app", function () {
	beforeEach(function () {
		cy.request("POST", "http://localhost:3001/api/testing/reset");
		const user = {
			name: "mr",
			username: "testiman",
			password: "lumi",
		};
		cy.request("POST", "http://localhost:3001/api/users/", user);
	});
});

it("Login form is shown", function () {
	cy.visit("http://localhost:5173");
	cy.get("#username");
	cy.get("#password");
	cy.contains("login");
});

describe("Login", function () {
	it("login works", function () {
		cy.visit("http://localhost:5173");
		cy.login({ username: "testiman", password: "lumi" });
	});

	it("fails with wrong credentials", function () {
		cy.visit("http://localhost:5173");
		cy.get("#username").type("testiman");
		cy.get("#password").type("wrong");
		cy.contains("login").click();
		cy.contains("Wrong username or password. Please try again.");
	});

	describe("When logged in", function () {
		beforeEach(function () {
			cy.visit("http://localhost:5173");
			cy.get("#username").type("testiman");
			cy.get("#password").type("lumi");
			cy.contains("login").click();
		});
	});

	it.only("A blog can be created", function () {
		cy.visit("http://localhost:5173");

		cy.get("#username").type("testiman");
		cy.get("#password").type("lumi");
		cy.contains("login").click();
		cy.contains("add blog post").click();
		cy.get("#title-input").type("a blog post title by cypress");
		cy.get("#author-input").type("an author by cypress");
		cy.get("#url-input").type("a url by cypress");

		cy.contains("create").click();
		cy.addPost({
			title: "a blog post title by cypress",
			author: "an author by cypress",
			url: "a url by cypress",
		});
		cy.contains("a blog post title by cypress");
	});
});
