import { createGlobalStyle } from 'styled-components'
 
const GlobalStyle = createGlobalStyle`

 * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    // Colors
    --background: #141414;
    --background-transparent: #141414d3;
    --text: #e2e2e2;
    --accent: #4E5CFF; 
   
    // Layout
    --content-width: 90%;
  }

body {
    font-family: 'Unbounded', sans-serif;
    background: var(--background);
    color: var(--text);
    max-width: 100%;
}

section.container {
    padding: 3rem calc((100% - var(--content-width)) / 2);
    margin: 0 auto;
    min-height: 100vh;
    max-width: 1500px;
    text-align: center;
}

h1 {
    font-size: clamp(2.2rem, 7vw, 5rem);
    font-weight: 200;
    margin-bottom: min(5rem, 5vh);
}

a {
  padding-bottom: .5rem;
}

nav a.active {
  color: var(--accent);
}

nav a.active:focus {
  border-color: var(--accent);
}

nav a:focus {
      border-bottom: solid white .2rem;
      outline: none;
}

input {
  font-family: 'Unbounded', sans-serif;
}
`
 
export default GlobalStyle