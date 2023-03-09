import { configureStore } from '@reduxjs/toolkit'
import favReducer from './favs'
import searchReducer from './search'



export const store = configureStore({
	reducer: {
		favs: favReducer,
		search: searchReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
