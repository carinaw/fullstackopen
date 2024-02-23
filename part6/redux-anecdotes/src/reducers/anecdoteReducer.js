import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
	name: "anecdotes",
	initialState: [],
	reducers: {
		voteThisA(state, action) {
			const id = action.payload.id;
			return state.map((anecdote) =>
				anecdote.id === id ? action.payload : anecdote
			);
		},
		addAnecdote(state, action) {
			state.push(action.payload);
		},
		setAnecdotes(state, action) {
			return action.payload;
		},
	},
});

export const { voteThisA, setAnecdotes, addAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll();
		dispatch(setAnecdotes(anecdotes));
	};
};

export const createA = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.create(content);
		dispatch(addAnecdote(newAnecdote));
	};
};

export const vote = (id) => {
	return async (dispatch, getState) => {
		const { anecdotes } = getState();
		const anecdoteToVote = anecdotes.find((anecdote) => anecdote.id === id);
		const updatedAnecdote = {
			...anecdoteToVote,
			votes: anecdoteToVote.votes + 1,
		};
		const votedAnecdote = await anecdoteService.vote(id, updatedAnecdote);
		dispatch({
			type: "anecdotes/voteThisA",
			payload: votedAnecdote,
		});
	};
};

export default anecdoteSlice.reducer;
