import ToggleVisibility from "./ToggleVisibility";
import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, user }) => {
	const [likes, setLikes] = useState(blog.likes);

	const blogPostStyle = {
		padding: 10,
		border: "solid",
		borderWidth: 2,
		marginBottom: 10,
		width: 300,
	};

	const handleLikes = async (event) => {
		event.preventDefault();
		try {
			const updatedBlog = await blogService.update(blog.id, {
				likes: likes + 1,
			});
			setLikes(updatedBlog.likes);
			window.location.reload();
		} catch (exception) {
			console.log("error updating likes", exception);
		}
	};

	const handleDelete = async (event) => {
		event.preventDefault();
		try {
			const deleteBlog = await blogService.deletePost(blog.id);
		} catch (exception) {
			console.log("can't delete,", exception);
		}
	};

	return (
		<div style={blogPostStyle}>
			<div>
				<p>{blog.title}</p>
			</div>
			<ToggleVisibility setVisibleLabel="view" setHiddenLabel="back">
				<p>{blog.author}</p> <p>{blog.url}</p>{" "}
				<p>
					likes: {blog.likes}{" "}
					<button onClick={handleLikes}>like this post</button>
				</p>
				<p>{user.name}</p>
				<p>
					<button onClick={handleDelete}>delete</button>
				</p>
			</ToggleVisibility>
		</div>
	);
};

export default Blog;
