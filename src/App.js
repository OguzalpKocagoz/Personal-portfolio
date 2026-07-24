import React from 'react';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import GlobalStyle from './styles/GlobalStyle';

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    #fffdf5 12%,
    #fffbeb 24%,
    #fef3c7 38%,
    #fde68a 52%,
    #fcd34d 66%,
    #f59e0b 78%,
    #d97706 90%,
    #b45309 100%
  );
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Navbar />
        <Hero />
        <Projects />
        <Contact />
      </AppContainer>
    </>
  );
}

export default App;
