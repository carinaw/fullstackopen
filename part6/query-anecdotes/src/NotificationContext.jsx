import { createContext, useContext, useReducer, useEffect } from "react";

const NotificationContext = createContext();

const initialState = "";
const messageReducer = (state, action) => {
	console.log("Current state:", state); // Log current state
	console.log("Dispatched action:", action);
	switch (action.type) {
		case "ADD":
			return `You added ${action.payload}!`;
		case "VOTE":
			return `You voted for ${action.payload}!`;
		case "CLEAR":
			return "";
		default:
			return state;
	}
};

export const NotificationContextProvider = ({ children }) => {
	const [message, dispatch] = useReducer(messageReducer, initialState);

	useEffect(() => {
		if (message) {
			const timer = setTimeout(() => dispatch({ type: "CLEAR" }), 5000);
			return () => clearTimeout(timer);
		}
	}, [message]);

	const value = { message, dispatch };
	return (
		<NotificationContext.Provider value={value}>
			{children}
		</NotificationContext.Provider>
	);
};

export const useNotification = () => {
	const context = useContext(NotificationContext);
	return context;
};

export default NotificationContext;
