import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  background: transparent;
  backdrop-filter: blur(6px);
  z-index: 1000;

  @media (max-width: 480px) {
    padding: 0 15px;
    height: 60px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  margin-left: auto;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #475569;
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: #d97706;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #b45309;
    &:after {
      width: 100%;
    }
  }

  @media (max-width: 1024px) {
    font-size: 0.9rem;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  margin-left: auto;
  background: none;
  border: none;
  color: #b45309;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 8px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    padding: 6px;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: rgba(255, 251, 235, 0.95);
  padding: 1rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(120, 53, 15, 0.15);
  border-bottom: 1px solid rgba(180, 83, 9, 0.12);
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  z-index: 999;

  @media (max-width: 768px) {
    display: block;
  }

  @media (max-width: 480px) {
    top: 60px;
    padding: 0.75rem;
  }
`;

const MobileNavLink = styled(NavLink)`
  display: block;
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
  font-size: 1.1rem;

  &:last-child {
    border-bottom: none;
  }

  &:after {
    display: none;
  }

  &:hover {
    background: rgba(217, 119, 6, 0.1);
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    font-size: 1rem;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Mobil menü açıkken scroll'u engelle
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <Nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          boxShadow: 'none',
        }}
      >
        <NavLinks>
          <NavLink href="#home">Ana Sayfa</NavLink>
          <NavLink href="#works">İşlerim</NavLink>
          <NavLink href="#contact">İletişim</NavLink>
        </NavLinks>
        <MobileMenuButton 
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Menüyü aç/kapat"
        >
          {isOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </Nav>

      <MobileMenu
        isOpen={isOpen}
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : -20,
          transition: {
            duration: 0.3,
            ease: "easeInOut"
          }
        }}
      >
        <MobileNavLink href="#home" onClick={() => setIsOpen(false)}>
          Ana Sayfa
        </MobileNavLink>
        <MobileNavLink href="#works" onClick={() => setIsOpen(false)}>
          İşlerim
        </MobileNavLink>
        <MobileNavLink href="#contact" onClick={() => setIsOpen(false)}>
          İletişim
        </MobileNavLink>
      </MobileMenu>
    </>
  );
};

export default Navbar; 