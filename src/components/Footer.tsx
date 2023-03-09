import styled from 'styled-components'
import * as React from 'react'

const FooterContainer = styled.header`
width: 100%;
background: var(--background-transparent);
color: var(--white);
padding: 1rem;
text-align: center;
font-size: .75rem;
font-weight: 200;
opacity: .6;
`

const Header: React.FC = () => {

	return (
		<FooterContainer>
       Carmen Couzyn | Powered by Giphy
		</FooterContainer>

	)
  
}

export default Header

