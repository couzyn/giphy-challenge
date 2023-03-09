import styled from 'styled-components'
import React, { useEffect, useState } from 'react'

import GifCard from './GifCard'
import { Gif } from '../util/Gif'
import { API_KEY, BASE_URL } from '../util/api'


import axios from 'axios'

const Container = styled.div`
 max-width: 80%;
 margin: 0 auto;
 filter: saturate(0);
 display: grid;
 place-items: center;

`
const EmptyMessage = styled.p`
 opacity: .5; 
 max-width: 20ch;
 margin-bottom: 2rem;
`

const EmpyState: React.FC<{ emptyMessage?: string }> = ({ emptyMessage }) => {

	const [randomGif, setRandomGif] = useState<Gif>()
    
	useEffect(() => {
		const controller = new AbortController()
		const fetchRandomGif = async () => {
			try {
				const response = await axios.get(`${BASE_URL}/random?tag=empty&api_key=${API_KEY}&bundle=fixed_height`, {signal: controller.signal})
				const randomGif = {
					id: response.data.data.id,
					title: response.data.data.title,
					image: response.data.data.images.fixed_height,
				}
				setRandomGif(randomGif)
			}
			catch (error) {
				console.log(error)
			}
		}

		fetchRandomGif()

		return () => {
			controller.abort()
		}
	}, [])



	return (
		<Container>
			<EmptyMessage>{emptyMessage}</EmptyMessage>
			{
				randomGif ? <GifCard gif={randomGif} hideOverlay></GifCard> : ''
			}
		</Container>
	)
}

export default EmpyState

