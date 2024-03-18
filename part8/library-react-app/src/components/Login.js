import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../queries";

const Login = ({ setError, setToken }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const [login, result] = useMutation(LOGIN, {
		onError: (error) => {
			setError(error.graphQLErrors[0].message);
		},
	});

	useEffect(() => {
		if (result.data) {
			const token = result.data.login.value;
			setToken(token); // setToken from App
			navigate("/");
		}
	}, [result.data, setToken, navigate]);

	const padding = {
		padding: 10,
	};

	const submit = async (event) => {
		event.preventDefault();

		login({ variables: { username, password } });

		setUsername("");
		setPassword("");
	};

	return (
		<div style={padding}>
			<form onSubmit={submit}>
				<div>
					username
					<input
						value={username}
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						value={password}
						onChange={({ target }) => setPassword(target.value)}
						type="password"
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	);
};

export default Login;
