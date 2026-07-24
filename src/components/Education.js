import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaGraduationCap, FaUniversity, FaUsers } from 'react-icons/fa';

const EducationSection = styled.section`
  min-height: 100vh;
  padding: 100px 20px;
  background: linear-gradient(180deg,
    #edf1f8 0%,
    #ecf0f6 15%,
    #eaf1f4 30%,
    #e9f1f2 50%,
    #eaf2f3 70%,
    #eef4f4 85%,
    #f1f5f9 100%
  );
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(180deg, rgba(237, 241, 248, 0.95) 0%, transparent 100%);
    pointer-events: none;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(0deg, rgba(241, 245, 249, 0.95) 0%, transparent 100%);
    pointer-events: none;
    z-index: 1;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  color: #0f172a;
  margin-bottom: 4rem;
  text-align: center;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Timeline = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  
  &::after {
    content: '';
    position: absolute;
    width: 6px;
    background: #14b8a6;
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -3px;
    border-radius: 3px;
    box-shadow: 0 0 10px rgba(20, 184, 166, 0.25);
  }

  @media (max-width: 768px) {
    &::after {
      left: 31px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  padding: 10px 40px;
  position: relative;
  width: 50%;
  left: ${props => props.position === 'left' ? '0' : '50%'};

  @media (max-width: 768px) {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
    left: 0;
  }
`;

const TimelineContent = styled.div`
  padding: 20px;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(15, 23, 42, 0.08);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(15, 23, 42, 0.12);
  }
`;

const TimelineIcon = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  right: ${props => props.position === 'left' ? '-60px' : 'auto'};
  left: ${props => props.position === 'right' ? '-60px' : 'auto'};
  background: #14b8a6;
  border: 4px solid #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  z-index: 1;
  box-shadow: 0 2px 10px rgba(20, 184, 166, 0.35);

  @media (max-width: 768px) {
    left: 10px;
  }
`;

const TimelineTitle = styled.h3`
  color: #0d9488;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const TimelineDate = styled.p`
  color: #475569;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const TimelineDescription = styled.p`
  color: #334155;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  const timelineItems = [
    {
      title: 'Ünye Canik Fen Lisesi',
      date: '2019 - 2023',
      description: 'Fen Bilimleri alanında lise eğitimi',
      icon: <FaGraduationCap size={20} />,
      position: 'left'
    },
    {
      title: 'Balıkesir Üniversitesi',
      date: '2023 - Devam Ediyor',
      description: 'Bilgisayar Mühendisliği Bölümü',
      icon: <FaUniversity size={20} />,
      position: 'right'
    },
    {
      title: 'Computer Society',
      date: '2023 - Devam Ediyor',
      description: 'Teknik Ekip Üyesi - Gönüllü Çalışma',
      icon: <FaUsers size={20} />,
      position: 'left'
    }
  ];

  return (
    <EducationSection id="education" ref={ref}>
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Eğitim & Deneyim
        </Title>
        <Timeline>
          {timelineItems.map((item, index) => (
            <TimelineItem
              key={index}
              position={item.position}
              initial={{ opacity: 0, x: item.position === 'left' ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: item.position === 'left' ? -50 : 50 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <TimelineContent>
                <TimelineTitle>{item.title}</TimelineTitle>
                <TimelineDate>{item.date}</TimelineDate>
                <TimelineDescription>{item.description}</TimelineDescription>
              </TimelineContent>
              <TimelineIcon position={item.position}>
                {item.icon}
              </TimelineIcon>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </EducationSection>
  );
};

export default Education; 