describe("Blog app", function () {
	beforeEach(function () {
		cy.request("POST", "http://localhost:3001/api/testing/reset");
		const user1 = {
			name: "mr",
			username: "testiman",
			password: "lumi",
		};

		cy.request("POST", "http://localhost:3001/api/users/", user1);
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
			cy.get("#username").type("testiman");
			cy.get("#password").type("lumi");
			cy.contains("login").click();
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

			it("a blog can be created", function () {
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
			it("a blog can be deleted", function () {
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
				cy.contains("view").click();
			});
		});

		describe("When blog posts already exist", function () {
			beforeEach(function () {
				cy.visit("http://localhost:5173");
				cy.get("#username").type("testiman");
				cy.get("#password").type("lumi");
				cy.contains("login").click();
				cy.contains("add blog post").click();
				cy.addPost({
					title: "a blog post title by cypress",
					author: "an author by cypress",
					url: "a url by cypress",
				});
				cy.contains("add blog post").click();
				cy.contains("create").click();
				cy.addPost({
					title: "another blog post title by cypress",
					author: "another author by cypress",
					url: "another url by cypress",
				});
			});

			it("a user can like blog posts", function () {
				cy.contains("a blog post title by cypress")
					.should("be.visible")
					.parents()
					.find("#show-details")
					.contains("view")
					.click()
					.parents()
					.find(".like-button")
					.click();
			});

			it("a blog can be deleted by user", function () {
				cy.contains("a blog post title by cypress")
					.should("be.visible")
					.parents()
					.find("#show-details")
					.contains("view")
					.click()
					.parents()
					.contains("delete")
					.click();
			});

			it("delete button can only be seen by correct user", function () {
				const user2 = {
					name: "mr",
					username: "flauscherl",
					password: "hundi",
				};
				cy.request("POST", "http://localhost:3001/api/users/", user2);
				cy.contains("logout").click();
				cy.get("#username").type("flauscherl");
				cy.get("#password").type("hundi");
				cy.contains("login").click();
				cy.contains("a blog post title by cypress")
					.should("be.visible")
					.parents()
					.find("#show-details")
					.contains("view")
					.click();
				cy.contains("a blog post title by cypress")
					.parents()
					.find("#delete-button")
					.should("not.exist");
			});
		});
	});

	describe("blog posts are in the right order", function () {
		beforeEach(function () {
			cy.visit("http://localhost:5173");
			cy.get("#username").type("testiman");
			cy.get("#password").type("lumi");
			cy.contains("login").click();
			cy.contains("add blog post").click();
			cy.addPost({
				title: "blog post one",
				author: "one",
				url: "one",
			});
			cy.addPost({
				title: "blog post two",
				author: "two",
				url: "two",
			});
			cy.addPost({
				title: "blog post three",
				author: "three",
				url: "three",
			});
		});

		it("blog posts are ordered based on likes", function () {
			cy.contains("blog post one")
				.should("be.visible")
				.parents()
				.find("#show-details")
				.contains("view")
				.click();
			cy.contains("blog post one")
				.parent()
				.parent()
				.find(".blog-likes")
				.parent()
				.contains("like this post")
				.click();
			cy.contains("blog post two")
				.should("be.visible")
				.parents()
				.find("#show-details")
				.contains("view")
				.click();
			cy.contains("blog post two")
				.parent()
				.parent()
				.find(".blog-likes")
				.parent()
				.contains("like this post")
				.click()
				.wait(1000)
				.click()
				.wait(1000)
				.click()
				.wait(1000);
			cy.get(".a-blog").eq(0).should("contain", "blog post two");
			cy.get(".a-blog").eq(1).should("contain", "blog post one");
		});
	});
});
