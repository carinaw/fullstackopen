import { createContext, useContext, useReducer } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const initialState = {
	user: null,
};

const userReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return { ...state, user: action.payload };
		case "LOGOUT":
			return { ...state, user: null };
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};

export const UserProvider = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, initialState);

	return (
		<UserContext.Provider value={{ state, dispatch }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;
