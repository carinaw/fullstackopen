import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Notify = ({ errorMessage }) => {
	if (!errorMessage) {
		return null;
	}
	return <div style={{ color: "red" }}>{errorMessage}</div>;
};

const App = () => {
	const [errorMessage, setErrorMessage] = useState(null);

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
					<li style={nav}>
						<Link to="/new-book">add book</Link>
					</li>
				</ul>
				<Notify errorMessage={errorMessage} />
			</div>
			<Routes>
				<Route path="/" element={<div>placeholder</div>} />
				<Route path="/authors" element={<Authors setError={notify} />} />
				<Route path="/books" element={<Books />} />
				<Route path="/new-book" element={<NewBook setError={notify} />} />
			</Routes>
		</Router>
	);
};

export default App;
