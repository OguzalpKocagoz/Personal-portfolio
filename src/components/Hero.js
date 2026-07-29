import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import animationData from '../assets/animation.json';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
  background: transparent;
  position: relative;
  overflow: hidden;

  @media (max-width: 480px) {
    padding: 90px 16px;
  }

  .bottom-fade {
    display: none;
  }
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  position: relative;
  z-index: 2;

  @media (max-width: 968px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
`;

const AnimationContainer = styled.div`
  flex: 1;
  max-width: 500px;
  height: 500px;

  @media (max-width: 968px) {
    max-width: 300px;
    height: 300px;
    order: -1;
  }
`;

const Subtitle = styled(motion.h2)`
  font-size: 2.5rem;
  color: #b45309;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: #475569;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const Hero = () => {
  return (
    <HeroSection id="home">
      <HeroContainer>
        <ContentContainer>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Web Siteleri • Oyunlar • Ürünler
          </Subtitle>
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Geliştirdiğim projelerin bir araya geldiği vitrin. Aşağıda web siteleri,
            oyunlar ve ürünlerimi keşfedebilir; canlı demolara ve kaynak koduna ulaşabilirsin.
          </Description>
        </ContentContainer>
        <AnimationContainer>
          <Lottie 
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{ width: '100%', height: '100%' }}
          />
        </AnimationContainer>
      </HeroContainer>
      <div className="bottom-fade" />
    </HeroSection>
  );
};

export default Hero; 