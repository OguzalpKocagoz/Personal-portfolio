import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: #fffaf3;
    color: #0f172a;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #e2e8f0;
  }

  ::-webkit-scrollbar-thumb {
    background: #d97706;
    border-radius: 10px;
  }

  ::selection {
    background: #d97706;
    color: #fff;
  }
`;

export default GlobalStyle; 