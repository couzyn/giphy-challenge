import { createSlice } from '@reduxjs/toolkit'
import { Gif } from '../util/Gif'

export interface SearchState {
    query: string,
    gifs: Gif[],
	totalPages: number,
	activePage: number
}

const initialState:SearchState = {
	query: '',
	gifs: [],
	totalPages: 0,
	activePage: 0
}

const searchSlice = createSlice({
	name: 'search',
	initialState, 
	reducers: {
		setSearch: (state, action) => {
			state.query = action.payload.query
			state.gifs = action.payload.gifs
		},
		showMore: (state, action) => {
			state.gifs =  [...state.gifs, ...action.payload]
		},
		setActivePage: (state, action) => {
			state.activePage = action.payload
		},
		setTotalPages: (state, action) => {
			state.totalPages = action.payload
		}
	}
})

export const {setSearch, showMore, setActivePage, setTotalPages} = searchSlice.actions

export default searchSlice.reducer