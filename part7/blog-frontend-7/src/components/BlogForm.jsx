import { useState } from "react";
import blogService from "../services/blogs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNotification } from "../contexts/NotificationContext";

const BlogForm = () => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const { setSuccessMessage, setErrorMessage } = useNotification();

	const queryClient = useQueryClient();

	const newBlogPost = useMutation({
		mutationFn: blogService.create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["blogs"] }),
				setSuccessMessage("New blog post added!");
		},
		onError: () => {
			setErrorMessage("Error creating blog post!");
		},
	});

	const handleNewPost = async (event) => {
		event.preventDefault();
		console.log("adding post", title, author, url);
		newBlogPost.mutate({ title, author, url });
		setAuthor("");
		setTitle("");
		setUrl("");
	};
	return (
		<div>
			<h2>create new blog post</h2>
			<form onSubmit={handleNewPost}>
				<div>
					title:{" "}
					<input
						type="text"
						value={title}
						name="title"
						onChange={({ target }) => setTitle(target.value)}
						id="title-input"
					/>
				</div>
				<div>
					author:{" "}
					<input
						type="text"
						value={author}
						name="author"
						onChange={({ target }) => setAuthor(target.value)}
						id="author-input"
					/>
				</div>
				<div>
					url:{" "}
					<input
						type="text"
						value={url}
						name="url"
						onChange={({ target }) => setUrl(target.value)}
						id="url-input"
					/>
				</div>
				<button type="submit" id="login">
					create
				</button>
			</form>
		</div>
	);
};

export default BlogForm;
