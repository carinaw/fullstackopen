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
import { useUser } from "./contexts/UserContext";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	useParams,
} from "react-router-dom";
import Users from "./components/Users";
import UserDetails from "./components/UserDetails";
import BlogDetails from "./components/BlogDetails";
import {
	Box,
	Text,
	Flex,
	Button,
	Spacer,
	Heading,
	SimpleGrid,
	CardBody,
	Card,
	Link as ChakraLink,
	Stack,
} from "@chakra-ui/react";

const Menu = ({ user, handleLogout }) => {
	console.log(user);
	return (
		<Flex
			minWidth="max-content"
			alignItems="center"
			gap="2"
			padding="1.5em"
			bg="teal"
			textColor="white"
		>
			<Box w="200px">
				<Heading fontSize="2xl" noOfLines={1}>
					blog app
				</Heading>
			</Box>

			<Box w="80px">
				<ChakraLink>
					<Link to="/">blogs</Link>
				</ChakraLink>
			</Box>
			<Box w="80px">
				<ChakraLink>
					<Link to="/users">users</Link>
				</ChakraLink>
			</Box>
			<Spacer />
			<Box mr="20px">
				{user.name} {user.username} is logged in.{" "}
			</Box>

			<Box>
				<Button
					padding="10px"
					borderRadius="6px"
					colorScheme="blackAlpha"
					onClick={handleLogout}
				>
					logout
				</Button>
			</Box>
		</Flex>
	);
};

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
	// const [user, setUser] = useState(null);
	const [blogFormVisible, setBlogFormVisible] = useState(false);
	const { setSuccessMessage, setErrorMessage } = useNotification();
	const { state, dispatch } = useUser();

	const user = state.user;
	const id = useParams().id;
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
			dispatch({ type: "LOGIN", payload: user });
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
		dispatch({ type: "LOGOUT" });
	};

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			dispatch({ type: "LOGIN", payload: user });
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
		return <div>loading...</div>;
	}

	const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
	console.log(sortedBlogs, "sorted");

	if (user === null) {
		return (
			<div>
				<SimpleGrid minChildWidth="120px" spacing="40px">
					<Box>
						<LoginForm
							username={username}
							password={password}
							handleLogin={handleLogin}
							handleUsernameChange={({ target }) => setUsername(target.value)}
							handlePasswordChange={({ target }) => setPassword(target.value)}
						/>
					</Box>
				</SimpleGrid>
			</div>
		);
	}

	return (
		<Router>
			<Menu user={user} handleLogout={handleLogout} />
			<Box
				minWidth="max-content"
				alignItems="left"
				gap="2"
				padding="1.5em"
				textColor="black"
			>
				<Notification />
				<Routes>
					<Route
						path="/"
						element={
							<>
								<Stack direction="row" spacing="24px">
									<Box my="1em">
										<ToggleVisibility
											setHiddenLabel="cancel"
											setVisibleLabel="add blog post"
										>
											{" "}
											<BlogForm />
										</ToggleVisibility>
									</Box>
								</Stack>
								<Box my="1em">
									<Heading as="h2">all blog posts</Heading>
								</Box>
								<Box className="blog-list">
									<SimpleGrid columns={3} spacing="60px">
										{sortedBlogs.map((blog) => (
											<Box key={blog.id} height="80px">
												<Blog
													key={blog.id}
													blog={blog}
													user={user}
													handleDelete={() => handleDelete(blog.id)}
													handleLikes={() => handleLikes(blog.id, blog)}
													className="blog"
												/>
											</Box>
										))}
									</SimpleGrid>
								</Box>
							</>
						}
						user={user}
						blogs={blogs}
					/>
					<Route path="/users" element={<Users />}></Route>
					<Route
						path="/users/:id"
						element={<UserDetails user={user} />}
					></Route>
					<Route
						path="/blogs/:id"
						element={<BlogDetails handleLikes={handleLikes} />}
					></Route>
				</Routes>
			</Box>
		</Router>
	);
};
export default App;
