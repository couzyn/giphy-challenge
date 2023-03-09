import * as React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Favorites from './pages/Favs'
import Search from './pages/Search'
import Layout from './components/Layout'


const App: React.FC = () => {

	return (
		<BrowserRouter basename="/giphy">
			<Routes>
				<Route path="/" element={<Layout/>}>
					<Route index element={<Search/>}/>
					<Route path="/favs" element={<Favorites/>}/>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App

