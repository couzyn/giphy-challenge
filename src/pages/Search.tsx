import styled from 'styled-components'
import React, { useRef } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { setSearch } from '../store/search'
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


const Search: React.FC = () => {

	const dispatch = useDispatch()
	const searchField = useRef<HTMLInputElement>(null)
	const searchResults = useSelector((state: RootState) => state.search.gifs)
	const searchQuery = useSelector((state: RootState) => state.search.query)


	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault()
		if (searchField.current?.value !== searchQuery && searchField.current?.value) {
			const query = searchField.current?.value
			try {
				const response = await axios.get(`${BASE_URL}/search?q=${query}&api_key=${API_KEY}&bundle=fixed_height`)
				const mappedData = response.data.data.map(((r:any) => {
					return {
						id: r.id,
						title: r.title,
						image: r.images.fixed_height,
					}
				}))
				dispatch(setSearch({ query: query, gifs: mappedData }))
			}
			catch (error) {
				console.log(error)
			}
		}
	}

	const renderResults = () => {
		if(!searchQuery) return
		if(searchResults.length) return <GifGrid gifs={searchResults} />
		else return <EmpyState emptyMessage="Looks pretty empty here. There are no results for your search!" />
	}

	return (
		<section className="container">
			<h1>
        Search Giphy
			</h1>

			<Form onSubmit={(e) => e.preventDefault()}>
				<Input autoComplete="off" ref={searchField} type="text" name="search-query" id="search-query" placeholder="Funny Cats" aria-label="Search term" />
				<Input onClick={(e) => handleSearch(e)} type="submit" value="Search" aria-label="search" />
			</Form>

			<Results>
				{
					searchQuery ? <h2><SearchSolid /> {searchQuery}</h2> : ''
				}
				{
					renderResults()
				}
			</Results>
		</section>
	)
}

export default Search

