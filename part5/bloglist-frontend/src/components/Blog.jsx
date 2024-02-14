import ToggleVisibility from "./ToggleVisibility";
import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, user, handleDelete }) => {
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
					{blog.user && user.username === blog.user.username && (
						<button onClick={handleDelete}>delete</button>
					)}
				</p>
			</ToggleVisibility>
		</div>
	);
};

export default Blog;
