import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommendation from "./components/Recommendation";
import { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	NavLink,
} from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { loadErrorMessages } from "@apollo/client/dev";

loadErrorMessages();

const Notify = ({ errorMessage }) => {
	if (!errorMessage) {
		return null;
	}
	return <div style={{ color: "red" }}>{errorMessage}</div>;
};

const App = () => {
	const [errorMessage, setErrorMessage] = useState(null);
	const [token, setToken] = useState(null);
	const client = useApolloClient();

	const notify = (message) => {
		setErrorMessage(message);
		setTimeout(() => {
			setErrorMessage(null);
		}, 5000);
	};

	const nav = {
		display: "inline",
		paddingRight: 20,
	};
	const navbar = {
		padding: 10,
	};

	const logout = () => {
		setToken(null);
		localStorage.clear();
		client.resetStore();
	};

	useEffect(() => {
		const storedToken = localStorage.getItem("library-user-token");
		if (storedToken) {
			setToken(storedToken); // get token first and then setToken if it exists
		}
	}, []);

	const tokenInStorage = (newToken) => {
		localStorage.setItem("library-user-token", newToken); // Save the new token to localStorage
		setToken(newToken); // Also update the state with the new token
	};

	console.log(token, "token");

	return (
		<Router>
			<div>
				<ul style={navbar}>
					<li style={nav}>
						<Link to="/">home</Link>
					</li>
					<li style={nav}>
						<Link to="/authors">authors</Link>
					</li>
					<li style={nav}>
						<Link to="/books">books</Link>
					</li>
					{token && (
						<li style={nav}>
							<Link to="/new-book">add book</Link>
						</li>
					)}
					{token && (
						<li style={nav}>
							<Link to="/recommendations">recommendations</Link>
						</li>
					)}
					{token ? (
						<li style={nav}>
							<button onClick={logout}>logout</button>
						</li>
					) : (
						<Link to="/login">login</Link>
					)}
				</ul>
				<Notify errorMessage={errorMessage} />
			</div>
			<Routes>
				<Route path="/" element={<div>welcome to the library!</div>} />
				<Route
					path="/authors"
					element={<Authors setError={notify} token={token} />}
				/>
				<Route path="/books" element={<Books />} />
				<Route path="/new-book" element={<NewBook setError={notify} />} />
				<Route
					path="/recommendations"
					element={<Recommendation setError={notify} />}
				/>

				<Route
					path="/login"
					element={<Login setError={notify} setToken={tokenInStorage} />}
				/>
			</Routes>
		</Router>
	);
};

export default App;
