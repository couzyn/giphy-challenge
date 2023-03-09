import { createSlice } from '@reduxjs/toolkit'
import { Gif } from '../util/Gif'

export interface FavState {
    gifs: Gif[]
}

const initialState:FavState = {
	gifs: JSON.parse(localStorage.getItem('favs') || '[]') || []
}

const favsSlice = createSlice({
	name: 'favs',
	initialState, 
	reducers: {
		addFav: (state, action) => {
			const updatedGifs = [...state.gifs, action.payload]
			localStorage.setItem('favs', JSON.stringify(updatedGifs))
			state.gifs = updatedGifs
		},
		removeFav: (state, action) => {
			const updatedGifs = state.gifs.filter((f:Gif) => f.id !== action.payload.id)
			localStorage.setItem('favs', JSON.stringify(updatedGifs))
			state.gifs = updatedGifs
		},
	}
})

export const {addFav, removeFav} = favsSlice.actions

export default favsSlice.reducer