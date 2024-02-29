import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./index.css";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import ToggleVisibility from "./components/ToggleVisibility";
import { useNotification } from "./contexts/NotificationContext";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAll } from "./services/blogs";

const Notification = () => {
	// this {} allows me to destructure!!
	const { state } = useNotification();

	if (!state.message) {
		return null;
	}
	return (
		<div className={`${state.type === "success" ? "success" : "error"}`}>
			{state.message}
		</div>
	);
};

const App = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const [blogFormVisible, setBlogFormVisible] = useState(false);
	const { setSuccessMessage, setErrorMessage } = useNotification();

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const queryClient = useQueryClient();

	const result = useQuery({
		queryKey: ["blogs"],
		queryFn: blogService.getAll,
		retry: 1,
	});
	console.log(JSON.parse(JSON.stringify(result)));

	const updatePost = useMutation({
		mutationFn: blogService.update,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["blogs"],
			});
		},
	});

	const handleLikes = (id, blog) => {
		// continue here later with useMutation for updating blog posts
		console.log("blog to like", blog);

		const updatedPost = { ...blog, likes: blog.likes + 1 };

		updatePost.mutate({ id: id, updatedObject: updatedPost });
	};

	// Make sure blogs is an array even if data hasn't arrived from async operation.
	const blogs = result.data || [];
	console.log("blogs", blogs);

	const handleLogin = async (event) => {
		event.preventDefault();
		console.log("logging in with", username, password);

		try {
			const user = await loginService.login({
				username,
				password,
			});

			window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
			blogService.setToken(user.token);
			setUser(user);
			setUsername("");
			setPassword("");
			setSuccessMessage(`${user.name} ${user.username} logged in.`);
		} catch (exception) {
			console.log(exception, "something went wrong");
			setErrorMessage("Wrong username or password. Please try again.");
		}
	};

	const handleLogout = () => {
		window.localStorage.removeItem("loggedBlogappUser");
		window.localStorage.clear();
		window.location.reload();
	};

	const deleteBlogPost = useMutation({
		mutationFn: (id) => blogService.deletePost(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["blogs"],
			});
		},
		onError: () => {
			setErrorMessage("Error deleting post!");
		},
	});

	// CONTINUE HERE
	const handleDelete = async (id) => {
		const postToDelete = blogs.find((blog) => blog.id === id);
		if (!postToDelete) {
			window.alert("No post to delete!");
		}

		if (
			window.confirm(
				`Do you really want to delete the post ${postToDelete.title} from ${postToDelete.author}?`
			)
		)
			deleteBlogPost.mutate(id);
		setSuccessMessage("Blog post has been deleted successfully.");
	};

	if (result.isLoading) {
		return <div>loading anecdotes...</div>;
	}

	const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
	console.log(sortedBlogs, "sorted");

	if (user === null) {
		return (
			<div>
				<Notification />

				<LoginForm
					username={username}
					password={password}
					handleLogin={handleLogin}
					handleUsernameChange={({ target }) => setUsername(target.value)}
					handlePasswordChange={({ target }) => setPassword(target.value)}
				/>
			</div>
		);
	}

	return (
		<div>
			<h2>blog posts</h2>
			<Notification />
			<p>
				{user.name} {user.username} is logged in.{" "}
				<button onClick={handleLogout}>logout</button>
			</p>
			<div>
				<ToggleVisibility
					setHiddenLabel="cancel"
					setVisibleLabel="add blog post"
				>
					<BlogForm />
				</ToggleVisibility>
			</div>

			<h2>view all</h2>
			<div className="blog-list">
				{sortedBlogs.map((blog) => (
					<Blog
						key={blog.id}
						blog={blog}
						user={user}
						handleDelete={() => handleDelete(blog.id)}
						handleLikes={() => handleLikes(blog.id, blog)}
						className="blog"
					/>
				))}
			</div>
		</div>
	);
};
export default App;
