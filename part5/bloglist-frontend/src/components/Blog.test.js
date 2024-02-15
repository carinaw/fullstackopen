import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";
import ToggleVisibility from "./ToggleVisibility";

describe("rendering correct details after log in", () => {
	test("renders title and author", () => {
		const blog = {
			title: "A blog post title",
			author: "an author",
		};

		const user = {
			name: "Testi",
			username: "Tester",
		};

		const { container } = render(<Blog blog={blog} user={user} />);

		const div = container.querySelector(".short");
		expect(div).toHaveTextContent("A blog post title");
	});

	test("does not render url and likes", () => {
		const blog = {
			url: "link",
			likes: 3,
		};

		const user = {
			name: "Testi",
			username: "Tester",
		};

		render(<Blog blog={blog} user={user} />);

		const element = screen.queryByText("link");
		expect(element).toBeNull();
	});
});

describe("button clicks work", () => {
	test("details are shown after clicking view button", async () => {
		const blog = {
			title: "A blog post title",
			author: "an author",
			url: "blog-link",
			likes: 5,
			user: { username: "testi" },
		};

		const user = {
			name: "Testi",
			username: "testi",
		};

		const { container } = render(<Blog blog={blog} user={user} />);

		const user1 = userEvent.setup();
		const button = screen.queryByText("view");
		await user1.click(button);

		expect(screen.getByText("blog-link")).toBeInTheDocument();

		const div = container.querySelector(".blog-likes");
		expect(div).toBeInTheDocument();
	});
});
