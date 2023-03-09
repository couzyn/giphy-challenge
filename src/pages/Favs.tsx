import * as React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

import GifGrid from '../components/GifGrid'
import EmpyState from '../components/EmptyState'

const Favorites: React.FC = () => {

	const gifs = useSelector((state: RootState) => state.favs.gifs)

	return (
		<section className="container">
			<h1> Your Favs </h1>

			{
				gifs.length ?
					<GifGrid gifs={gifs} />
					: <EmpyState emptyMessage="Looks pretty empty here. Start a search and add some Favs!" />
			}
		</section>

	)

}

export default Favorites

