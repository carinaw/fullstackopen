import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const initialState = anecdotesAtStart.map((anecdote) => ({
	content: anecdote,
	id: getId(),
	votes: 0,
}));

const anecdoteSlice = createSlice({
	name: "anecdotes",
	initialState: [],
	reducers: {
		createA(state, action) {
			state.push(action.payload);
		},
		voteThisA(state, action) {
			const id = action.payload.id;

			console.log(state);
			return state.map((anecdote) =>
				anecdote.id === id
					? { ...anecdote, votes: anecdote.votes + 1 }
					: anecdote
			);
		},
		setAnecdotes(state, action) {
			return action.payload;
		},
	},
});

export const { createA, voteThisA, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
