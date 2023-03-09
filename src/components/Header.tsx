import styled from 'styled-components'
import * as React from 'react'
import { NavLink } from 'react-router-dom'
import StarSolid from '../img/icons/StarSolid'
import SearchSolid from '../img/icons/SearchSolid'

const HeaderContainer = styled.header`
width: 100%;
top: 0;
position: fixed;
z-index: 100;
background: var(--background-transparent);
padding: 1rem;
text-align: center;

  a {
    margin: 0 1rem;
    color: var(--text);
    text-decoration: none;
    display: inline-block;

    :hover {
      color: var(--accent);
    }

    span {
      display: flex;
      align-items: flex-end;
      gap: .5rem;

      svg {
        height: 1.5rem;
      }
    }
  }

`

const Header: React.FC = () => {

	return (
		<HeaderContainer>
			<nav>
				<NavLink tabIndex={0} to='/favs'><span><StarSolid/>Favs</span></NavLink>
				<NavLink tabIndex={0} to='/'><span><SearchSolid/>Search</span></NavLink>
			</nav>
		</HeaderContainer>

	)
  
}

export default Header

