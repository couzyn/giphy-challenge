import styled from 'styled-components'
import React, { useEffect, useRef } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { setSearch, showMore, setTotalPages, setActivePage } from '../store/search'
import { API_KEY, BASE_URL } from '../util/api'

import EmpyState from '../components/EmptyState'
import GifGrid from '../components/GifGrid'
import SearchSolid from '../img/icons/SearchSolid'


const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
  `

const Input = styled.input`
  max-width: 600px;
  background: var(--background);
  color: var(--text);
  border: solid var(--accent);
  border-radius: 15px;
  padding: .75rem 1.75rem;
  font-size: clamp(16px, 2vw, 1.2rem);

  &[type=text]:focus-visible, &[type=submit]:focus-visible, &[type=submit]:hover {
    outline: none;
    background: var(--background);
    border-color: var(--accent);
    color: var(--text);
  }

  &[type=text] {
    flex-grow: 1;
    border: solid var(--text);
}

  &[type=submit] {
    background: var(--accent);
    color: var(--background);
  }
`

const Results = styled.div`
    margin-top: 5vh;

    h2 {
      font-size: 1rem;
      opacity: .5;
      font-weight: 400;
      margin: 0 auto;
      margin-bottom: 2rem;
      display: flex;
      gap: .5rem;
      width: 80%;
      
      svg {
        height: 1.5rem;
      }
    }

  `

const ShowMoreButton = styled.button`
  background: var(--background);
  color: var(--accent);
  border: solid var(--accent);
  border-radius: 15px;
  padding: .75rem 1.75rem;
  margin: 2rem auto;
  cursor: pointer;
	&:hover {
		color: var(--background);
 		background: var(--accent);
	}
`


const Search: React.FC = () => {

	const dispatch = useDispatch()
	const searchField = useRef<HTMLInputElement>(null)
	const searchResults = useSelector((state: RootState) => state.search.gifs)
	const searchQuery = useSelector((state: RootState) => state.search.query)
	const activePage = useSelector((state: RootState) => state.search.activePage)
	const totalPages = useSelector((state: RootState) => state.search.totalPages)

	const REQUEST_LIMIT = 50

	useEffect(() => {
		if(activePage > 0) handleShowMore()
	}, [activePage])

	const fetchData = async (query:string, offset:number) => {
		try {
			const response = await axios.get(`${BASE_URL}/search?q=${query}&api_key=${API_KEY}&bundle=fixed_height&limit=${REQUEST_LIMIT}&offset=${offset}`)
			dispatch(setTotalPages(Math.floor(response.data.pagination.total_count / REQUEST_LIMIT)))
			const mappedData = response.data.data.map(((r:any) => {
				return {
					id: r.id,
					title: r.title,
					image: r.images.fixed_height,
				}
			}))
			return mappedData
		}
		catch (error) {
			console.error(error)
		}

	}

	const handleSearch = async () => {
		if (searchField.current?.value && searchField.current.value != searchQuery) {
			const query = searchField.current.value
			const response = await fetchData(query, 0)
			dispatch(setSearch({ query: query, gifs: response }))
		}
	}

	const handleShowMore = async () => {
		const response = await fetchData(searchQuery, REQUEST_LIMIT * activePage)
		dispatch(showMore(response))
	}


	const renderResults = () => {
		if(!searchQuery) return
		if(searchResults.length) return <GifGrid gifs={searchResults} />
		else return <EmpyState emptyMessage="Looks pretty empty here. There are no results for your search!" />
	}

	const renderShowMoreButton = () => {

		if(totalPages > 1 && activePage < totalPages) 
			return <ShowMoreButton onClick={() => dispatch(setActivePage(activePage+1))}> show more </ShowMoreButton> 


	}

	return (
		<section className="container">
			<h1>
        Search Giphy
			</h1>

			<Form onSubmit={(e) => e.preventDefault()}>
				<Input autoComplete="off" ref={searchField} type="text" name="search-query" id="search-query" placeholder="Funny Cats" aria-label="Search term" />
				<Input onClick={() => {handleSearch()}} type="submit" value="Search" aria-label="search" />
			</Form>

			<Results>
				{
					searchQuery ? <h2><SearchSolid /> {searchQuery}</h2> : ''
				}
				{
					renderResults()
				}
			</Results>

			{renderShowMoreButton()}
		</section>
	)
}

export default Search

