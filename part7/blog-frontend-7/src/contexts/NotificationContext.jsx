import { createContext, useContext, useReducer } from "react";

const NotificationContext = createContext();

// custom hook because so I don't have to import both, useContext and NotificationContext everywhere
export const useNotification = () => useContext(NotificationContext);

const initialState = {
	message: "",
	type: "",
};

const notificationReducer = (state, action) => {
	switch (action.type) {
		case "SET_SUCCESS":
			return { message: action.message, type: "success" };
		case "SET_ERROR":
			return { message: action.message, type: "error" };
		case "CLEAR":
			return { ...initialState };
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};

export const NotificationProvider = ({ children }) => {
	const [state, dispatch] = useReducer(notificationReducer, initialState);

	const setSuccessMessage = (message) => {
		dispatch({ message: message, type: "SET_SUCCESS" });
		setTimeout(() => dispatch({ message: "", type: "CLEAR" }), 5000);
	};

	const setErrorMessage = (message) => {
		dispatch({ message: message, type: "SET_ERROR" });
		setTimeout(() => dispatch({ message, type: "CLEAR" }), 5000);
	};

	return (
		<NotificationContext.Provider
			value={{ state, setErrorMessage, setSuccessMessage }}
		>
			{children}
		</NotificationContext.Provider>
	);
};

export default NotificationContext;
