import ToggleVisibility from "./ToggleVisibility";

const Blog = ({ blog }) => {
	const blogPostStyle = {
		padding: 10,
		border: "solid",
		borderWidth: 2,
		marginBottom: 10,
		width: 300,
	};

	return (
		<div style={blogPostStyle}>
			<div>
				<p>{blog.title}</p>
			</div>
			<ToggleVisibility setVisibleLabel="view" setHiddenLabel="back">
				<p>{blog.author}</p> <p>{blog.url}</p>{" "}
				<p>
					likes: {blog.likes} <button>like this post</button>
				</p>
			</ToggleVisibility>
		</div>
	);
};

export default Blog;
