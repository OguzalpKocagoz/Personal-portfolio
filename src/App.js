import React from 'react';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import AnimatedBackground from './components/AnimatedBackground';
import GlobalStyle from './styles/GlobalStyle';

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  background: transparent;
  position: relative;
  z-index: 0;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <AnimatedBackground />
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
