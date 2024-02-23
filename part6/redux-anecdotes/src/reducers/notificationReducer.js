import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: "notification",
	initialState: "",
	reducers: {
		showNotification: (state, action) => {
			return action.payload;
		},
		hideNotification: (state) => {
			return "";
		},
	},
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export const setNotification = (message, duration) => {
	return (dispatch) => {
		dispatch(showNotification(message));
		setTimeout(() => {
			dispatch(hideNotification());
		}, duration * 1000);
	};
};

export default notificationSlice.reducer;
