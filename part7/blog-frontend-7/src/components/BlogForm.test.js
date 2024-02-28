import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

jest.mock("../services/blogs", () => ({
  create: jest.fn().mockResolvedValue({
    title: "just testing",
    author: "author test",
    url: "url test",
  }),
}));

describe("blog form tests", () => {
  test("form calls event handler and receives right details", async () => {
    const addPost = jest.fn();
    const user = userEvent.setup();

    const { container } = render(<BlogForm addPost={addPost} />);

    const title = container.querySelector("#title-input");
    const author = container.querySelector("#author-input");
    const url = container.querySelector("#url-input");
    const submitButton = screen.getByRole("button", { name: /create/i });

    await user.type(title, "just testing");
    await user.type(author, "author test");
    await user.type(url, "url test");
    await user.click(submitButton);

    console.log(addPost.mock.calls);

    expect(addPost.mock.calls).toHaveLength(1);

    expect(addPost.mock.calls[0][0].title).toBe("just testing");
    expect(addPost.mock.calls[0][0].author).toBe("author test");
    expect(addPost.mock.calls[0][0].url).toBe("url test");
  });
});
