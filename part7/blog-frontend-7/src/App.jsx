import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./index.css";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import ToggleVisibility from "./components/ToggleVisibility";
import { useNotification } from "./contexts/NotificationContext";

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
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const [blogFormVisible, setBlogFormVisible] = useState(false);
	const { setSuccessMessage, setErrorMessage } = useNotification();
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
			setSuccessMessage(`${user.name} logged in.`);
		} catch (exception) {
			console.log(exception, "something went wrong");
			setErrorMessage("Wrong username or password. Please try again.");
		}
	};

	const addPost = (post) => {
		setBlogs([...blogs, post]);
		setBlogFormVisible(false);
		setSuccessMessage(`A new blog post named ${post.title} has been added.`);
	};

	const handleLogout = () => {
		window.localStorage.removeItem("loggedBlogappUser");
		window.localStorage.clear();
		window.location.reload();
	};

	const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

	const handleLikes = async (id) => {
		try {
			const likedBlog = blogs.find((blog) => blog.id === id);
			const updatedBlog = await blogService.update(id, {
				...likedBlog,
				likes: likedBlog.likes + 1,
			});
			setBlogs(blogs.map((blog) => (blog.id === id ? updatedBlog : blog)));
		} catch (exception) {
			console.log("error updating likes", exception);
		}
	};

	const handleDelete = async (id, blog) => {
		try {
			const deleteBlog = blogs.find((blog) => blog.id === id);
			if (
				confirm(
					`Do you really want to delete the post ${deleteBlog.title} from ${deleteBlog.author}?`
				)
			) {
				await blogService.deletePost(deleteBlog.id);
				setBlogs(blogs.filter((b) => b.id !== deleteBlog.id));
			}
		} catch (exception) {
			console.log("can't delete,", exception);
		}
	};

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

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
					<BlogForm addPost={addPost} />
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
						handleLikes={() => handleLikes(blog.id)}
						className="blog"
					/>
				))}
			</div>
		</div>
	);
};
export default App;
