import styled from 'styled-components'
import * as React from 'react'
import { Outlet } from 'react-router-dom'
import GlobalStyle from '../style/GlobalStyles'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../font/font.css'

const ContentContainer = styled.div`
padding-top: 5rem;
`

const Layout: React.FC = () => {

	return (
		<>
			<GlobalStyle />
			<Header/>
			<ContentContainer>
				<Outlet />
			</ContentContainer>
			<Footer/>
		</>
	)
}

export default Layout

