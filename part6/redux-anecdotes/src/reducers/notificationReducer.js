import { createSlice } from "@reduxjs/toolkit";

const initialState = "This is a notification";

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		showNotification: (state, action) => {
			return action.payload;
		},
	},
});

export const { showNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
