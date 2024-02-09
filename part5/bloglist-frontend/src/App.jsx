import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");
	const [post, setPost] = useState(null);

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
		} catch (exception) {
			console.log(exception);
		}
	};

	const handleLogout = () => {
		window.localStorage.removeItem("loggedBlogappUser");
		window.localStorage.clear();
		window.location.reload();
	};

	const addPost = async (event) => {
		event.preventDefault();
		console.log("adding post", title, author, url);

		try {
			const post = await blogService.create({
				title,
				author,
				url,
			});
			setPost(post);
		} catch (exception) {
			console.log(exception);
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
				<h2>Please log in to the application.</h2>
				<form onSubmit={handleLogin}>
					<div>
						username
						<input
							type="text"
							value={username}
							name="username"
							onChange={({ target }) => setUsername(target.value)}
						/>
					</div>
					<div>
						password
						<input
							type="password"
							value={password}
							name="password"
							onChange={({ target }) => setPassword(target.value)}
						/>
					</div>
					<button type="submit">login</button>
				</form>
			</div>
		);
	}

	return (
		<div>
			<p>
				{user.name} {user.username} is logged in.{" "}
				<button onClick={handleLogout}>logout</button>
			</p>
			<h2>create new blog post</h2>
			<form onSubmit={addPost}>
				<div>
					title:{" "}
					<input
						type="text"
						value={title}
						name="title"
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author:{" "}
					<input
						type="text"
						value={author}
						name="author"
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					url:{" "}
					<input
						type="text"
						value={url}
						name="url"
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button type="submit">create</button>
			</form>
			<h2>blogs</h2>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);
};
export default App;
