import styled, { keyframes } from 'styled-components'
import React, { useEffect, useRef, useState } from 'react'
import StarSolid from '../img/icons/StarSolid'
import StarOutline from '../img/icons/StarOutline'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { addFav, removeFav } from '../store/favs'
import { Gif } from '../util/Gif'


const fadeIn = keyframes`{
	0% { opacity: 0 };  
  100% {opacity: 1}
}`

const Card = styled.div<{ fav: boolean, visible: boolean, hideOverlay: boolean}>`
position: relative;
overflow: hidden;
width: fit-content;
margin: 0 auto;
cursor: pointer;
max-width: 100%;

img.gif {
  background: var(--text-transparent);

    animation: ${fadeIn} 4s forwards;
	  animation-timing-function: cubic-bezier(.075,.82,.165,1);
    max-width: 100%;
    height: auto;
  }

div.overlay {
  z-index: 1;
  width: 100%;
  height: 100%;
  background: ${props => props.fav ? 'var(--background)' : 'var(--accent)'};
  position: absolute;
  top: 0;
  left: 0;
  display: ${props => props.hideOverlay ? 'none' : 'grid' };
  place-items: center;
  transform: translateY(-100%);
  transition: all cubic-bezier(.075,.82,.165,1) 1s;
  opacity: .9;

  span {
    font-size: .75rem;
    display: flex;
    text-align: left;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  svg {
    height: 1.2rem;
    margin: 0 .2rem .1rem 0;
  }
}

div.star {
    z-index: 1;
    display: ${props => props.fav && !props.hideOverlay ? 'block' : 'none'};
    background: var(--accent);
    padding: .2rem;
    position: absolute;
    border-radius: 100%;
    aspect-ratio: 1/1;
    height: 25px;
    right: 2px;
    top: 2px;

  svg {
    height: 90%;
    width: auto;
    color: var(--text);
  }
}

&:hover {
  div.overlay {
      transform: translateY(0%);
  }
}  
`

const Placeholder = styled.div<{ height: number, width: number }>`
height: ${props => props.height}px;
width: ${props => props.width}px;
`

const GifCard: React.FC<{ gif: Gif, hideOverlay?:boolean }> = ({ gif, hideOverlay = false }) => {

	const card = useRef<HTMLDivElement>(null)
	const [visible, setVisible] = useState(false)

	const dispatch = useDispatch()
	const favs = useSelector((state: RootState) => state.favs.gifs)

	const observer = useRef<null | IntersectionObserver>(null)
	
	const cleanObserver = () => {
		if (observer.current) {
			observer.current.disconnect()
		}
	}

	useEffect(() => {
		if (!card.current) return
		const ob = observer.current = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) setVisible(true)
		})
		ob.observe(card.current)
		return () => {
			cleanObserver()
		}
	}, [])


	const handleClick = () => {
		getIsFav() ? dispatch(removeFav(gif)) : dispatch(addFav(gif))
	}

	const getIsFav = () => {
		return favs.some((f) => f.id === gif.id)
	}

	return (
		<Card fav={getIsFav()} ref={card} visible={visible} hideOverlay={hideOverlay} >
			<div className='overlay' onClick={handleClick}>
				{getIsFav() ? <span> <StarOutline /> Un-Fav </span> : <span> <StarSolid /> Add to Favs </span>}
			</div>

			<div className='star'> <StarSolid /> </div>
			{ visible ?
				<img
					className="gif"
					src={gif.image.url}
					height={gif.image.height}
					width={gif.image.width}
					alt={gif.title} />
				:
				<Placeholder height={gif.image.height}
					width={gif.image.width}/>
			}
		</Card>
	)
}

export default GifCard

