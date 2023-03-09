import styled from 'styled-components'
import React from 'react'

import GifCard from './GifCard'
import { Gif } from '../util/Gif'



const GridContainer = styled.ul`
    	list-style: none;
      width: 100%;
      max-width: 1500px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: .5rem;
      li {
        max-width: 100%;
      }
`


const GifGrid: React.FC<{ gifs: Gif[] }> = ({ gifs }) => {
	return (
		<GridContainer>
			{
				gifs.map((gif: Gif) => {
					return (
						<li key={gif.id}>
							<GifCard gif={gif} />
						</li>)
				})}
		</GridContainer>

	)
}

export default GifGrid

