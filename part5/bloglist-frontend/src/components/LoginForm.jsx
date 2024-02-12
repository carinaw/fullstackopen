const LoginForm = ({
	handleLogin,
	username,
	password,
	handlePasswordChange,
	handleUsernameChange,
}) => {
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
						onChange={handleUsernameChange}
					/>
				</div>
				<div>
					password
					<input
						type="password"
						value={password}
						name="password"
						onChange={handlePasswordChange}
					/>
				</div>
				<button type="submit">login</button>
				<div></div>
			</form>
		</div>
	);
};

export default LoginForm;
