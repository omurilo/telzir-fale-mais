import { createGlobalStyle, css } from "styled-components"

const GlobalStyle = createGlobalStyle`
  ${({ theme }) => css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      outline: 0;
    }

    html {
      height: 100vh;
      width: 100vw;
    }

    body {
      color: ${theme.colors.grey};
      text-rendering: optimizeLegibility !important;
      -webkit-font-smoothing: antialiased !important;
      -moz-osx-font-smoothing: grayscale;
      height: 100%;
    }

    #__next {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
    }

    body,
    input,
    button {
      font: 1rem "Roboto", Helvetica, "Lato", -apple-system, BlinkMacSystemFont,
        "Segoe UI", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol";
      line-height: 1.48;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    strong {
      font-weight: 700;
    }

    a {
      text-decoration: none;
      background: none;
      font-weight: 700;
      cursor: pointer;
      border: 0;
      transition: ${theme.transition.default};
    }

    button {
      cursor: pointer;
    }

    ul {
      list-style: none;
      text-align: left;
      padding: 0;
    }
  `}
`

export default GlobalStyle
