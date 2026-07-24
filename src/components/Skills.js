import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  FaUnity, FaReact, FaNodeJs, FaHtml5,
  FaCss3Alt, FaPhp, FaCode
} from 'react-icons/fa';
import {
  SiExpress, SiPostgresql,
  SiMysql, SiKalilinux, SiLinux
} from 'react-icons/si';

const SkillsSection = styled.section`
  min-height: 100vh;
  padding: 100px 20px;
  background: linear-gradient(180deg,
    #f1f5f9 0%,
    #eef4f4 15%,
    #eaf2f3 30%,
    #e9f1f2 50%,
    #eaf1f4 70%,
    #ecf0f6 85%,
    #edf1f8 100%
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
    background: linear-gradient(180deg, rgba(241, 245, 249, 0.95) 0%, transparent 100%);
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
    background: linear-gradient(0deg, rgba(237, 241, 248, 0.95) 0%, transparent 100%);
    pointer-events: none;
    z-index: 1;
  }
`;

const SkillsContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  color: #0f172a;
  margin-bottom: 3rem;
  text-align: center;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  justify-items: center;
  margin: 0 auto;
  max-width: 1200px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 500px;
  }
`;

const SkillCard = styled(motion.div)`
  width: 100%;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(15, 23, 42, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
  }
`;

const CardTitle = styled.h3`
  color: #0d9488;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 600;
`;

const SubSkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const SubSkill = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const SkillIcon = styled.div`
  font-size: 2.5rem;
  color: #14b8a6;
  margin-bottom: 0.5rem;
`;

const SkillName = styled.p`
  color: #475569;
  font-size: 1rem;
  text-align: center;
`;

const SubTitle = styled.h4`
  color: #0f172a;
  font-size: 1.2rem;
  margin: 1rem 0;
  text-align: center;
`;

const AnimationContainer = styled.div`
  max-width: 400px;
  margin: 0 auto 2rem;
`;

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  const skillsData = [
    {
      title: "Unity Game Development",
      skills: [
        { name: 'Unity', icon: FaUnity },
        { name: 'C#', icon: FaCode }
      ]
    },
    {
      title: "Fullstack Development",
      sections: [
        {
          title: "Frontend",
          skills: [
            { name: 'React', icon: FaReact },
            { name: 'HTML5', icon: FaHtml5 },
            { name: 'CSS3', icon: FaCss3Alt }
          ]
        },
        {
          title: "Backend",
          skills: [
            { name: 'Node.js', icon: FaNodeJs },
            { name: 'Express', icon: SiExpress },
            { name: 'PHP', icon: FaPhp }
          ]
        }
      ]
    },
    {
      title: "Siber Güvenlik & Veritabanı",
      skills: [
        { name: 'Kali Linux', icon: SiKalilinux },
        { name: 'Linux', icon: SiLinux },
        { name: 'MySQL', icon: SiMysql },
        { name: 'PostgreSQL', icon: SiPostgresql }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <SkillsSection id="skills" ref={ref}>
      <SkillsContainer>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Yeteneklerim
        </Title>
        <SkillsGrid
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skillsData.map((category, index) => (
            <SkillCard key={index} variants={itemVariants}>
              <CardTitle>{category.title}</CardTitle>
              {category.sections ? (
                category.sections.map((section, sIndex) => (
                  <div key={sIndex}>
                    <SubTitle>{section.title}</SubTitle>
                    <SubSkillsGrid>
                      {section.skills.map((skill, skillIndex) => (
                        <SubSkill key={skillIndex}>
                          <SkillIcon as={skill.icon} />
                          <SkillName>{skill.name}</SkillName>
                        </SubSkill>
                      ))}
                    </SubSkillsGrid>
                  </div>
                ))
              ) : (
                <SubSkillsGrid>
                  {category.skills.map((skill, skillIndex) => (
                    <SubSkill key={skillIndex}>
                      <SkillIcon as={skill.icon} />
                      <SkillName>{skill.name}</SkillName>
                    </SubSkill>
                  ))}
                </SubSkillsGrid>
              )}
            </SkillCard>
          ))}
        </SkillsGrid>
      </SkillsContainer>
    </SkillsSection>
  );
};

export default Skills; 