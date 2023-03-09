import { createSlice } from '@reduxjs/toolkit'
import { Gif } from '../util/Gif'

export interface SearchState {
    query: string,
    gifs: Gif[]
}

const initialState:SearchState = {
	query: '',
	gifs: []
}

const searchSlice = createSlice({
	name: 'search',
	initialState, 
	reducers: {
		setSearch: (state, action) => {
			state.query = action.payload.query
			state.gifs = action.payload.gifs
		},
	}
})

export const {setSearch} = searchSlice.actions

export default searchSlice.reducer