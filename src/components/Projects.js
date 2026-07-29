import React, { useRef, useState, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaDownload } from 'react-icons/fa';

const ProjectsSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
  background: transparent;
  position: relative;
  overflow: hidden;
`;

const ProjectsContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  position: relative;
  z-index: 2;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  color: #0f172a;
  margin-bottom: 3rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.p)`
  color: #475569;
  text-align: center;
  font-size: 1.1rem;
  max-width: 600px;
  margin: -2rem auto 2.5rem auto;
  line-height: 1.6;
`;

const FilterBar = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 3rem;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1.25rem;
  border-radius: 20px;
  border: 1px solid ${({ $active }) => ($active ? '#d97706' : 'rgba(217, 119, 6, 0.35)')};
  background: ${({ $active }) => ($active ? 'rgba(217, 119, 6, 0.12)' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#b45309' : '#475569')};
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    color: #b45309;
    border-color: #d97706;
    background: rgba(217, 119, 6, 0.08);
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const ProjectCard = styled(motion.div)`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(217, 119, 6, 0.5);
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.12);
  }
`;

const CoverWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;

  ${ProjectCard}:hover & {
    transform: scale(1.05);
  }
`;

const CoverPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #d97706;
  background: linear-gradient(135deg, #e6f5f2 0%, #dcebf7 100%);
`;

const CategoryBadge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: #ffffff;
  background: #d97706;
`;

const CardBody = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ProjectTitle = styled.h3`
  color: #0f172a;
  font-size: 1.35rem;
  margin-bottom: 0.75rem;
`;

const ProjectDescription = styled.p`
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.25rem;
  flex: 1;
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
`;

const TechBadge = styled.span`
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #b45309;
  background: rgba(217, 119, 6, 0.12);
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $side }) => ($side === 'left' ? 'left: 10px;' : 'right: 10px;')}
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: #0f172a;
  font-size: 1.3rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.25);
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: #ffffff;
    transform: translateY(-50%) scale(1.1);
  }
`;

const Dots = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 6px;
  z-index: 3;
`;

const Dot = styled.button`
  width: ${({ $active }) => ($active ? '20px' : '7px')};
  height: 7px;
  padding: 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: ${({ $active }) => ($active ? '#d97706' : 'rgba(255, 255, 255, 0.75)')};
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.3);
  transition: all 0.25s ease;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1.25rem;
  align-items: center;
`;

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #475569;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  svg {
    font-size: 1.1rem;
  }

  &:hover {
    color: #b45309;
  }
`;

const CATEGORIES = ['Tümü', 'Web', 'Oyun', 'Ürün'];

const CATEGORY_ICON = {
  Web: '🌐',
  Oyun: '🎮',
  Ürün: '📦'
};

// Yeni bir iş eklemek için bu diziye obje ekle.
// image: public klasörüne koyduğun kapak görselinin yolu (ör. '/covers/proje.jpg'). Yoksa null bırak.
const projectsData = [
  {
    title: 'CV Sitesi',
    category: 'Web',
    description: 'React, Styled Components ve Framer Motion ile geliştirilmiş kişisel portfolyo sitesi. Amber temalı, animasyonlu ve responsive tasarım.',
    tech: ['React', 'Styled Components', 'Framer Motion'],
    image: process.env.PUBLIC_URL + '/covers/cv.png',
    github: 'https://github.com/OguzalpKocagoz/Personal-portfolio',
    live: 'https://reactportfolyo.vercel.app/'
  },
  {
    title: 'Randevu Sistemi',
    category: 'Web',
    description: 'Node.js ve MongoDB ile geliştirilmiş, sektörden bağımsız randevu yönetim uygulaması. Randevu oluşturma, iptal ve yönetici paneli özellikleri; JWT kimlik doğrulama ve PWA desteği.',
    tech: ['Node.js', 'MongoDB', 'JavaScript', 'PWA'],
    image: process.env.PUBLIC_URL + '/covers/randevu.png',
    gallery: [
      process.env.PUBLIC_URL + '/covers/randevu-1.png',
      process.env.PUBLIC_URL + '/covers/randevu-2.png',
      process.env.PUBLIC_URL + '/covers/randevu.png'
    ],
    github: 'https://github.com/OguzalpKocagoz/randevu-app',
    live: 'https://randevu-app-nine.vercel.app/index.html'
  },
  {
    title: 'Banka Uygulaması',
    category: 'Ürün',
    description: 'Python ile geliştirilmiş banka uygulaması. Hesap işlemleri ve temel bankacılık fonksiyonlarını içerir.',
    tech: ['Python'],
    image: process.env.PUBLIC_URL + '/covers/banka.png',
    github: 'https://github.com/OguzalpKocagoz/bank-application',
    live: null,
    download: process.env.PUBLIC_URL + '/downloads/banka.exe'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
};

// Kapak alanı: birden fazla görsel varsa ok tuşlu kaydırmalı galeri, tek görsel varsa düz kapak
const ProjectCover = ({ project }) => {
  const images =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : project.image
      ? [project.image]
      : [];
  const [idx, setIdx] = useState(0);
  const multi = images.length > 1;
  const go = (delta) => setIdx((i) => (i + delta + images.length) % images.length);

  return (
    <CoverWrapper>
      {images.length > 0 ? (
        <CoverImage
          key={idx}
          src={images[idx]}
          alt={`${project.title} görsel ${idx + 1}`}
          loading="lazy"
        />
      ) : (
        <CoverPlaceholder>{CATEGORY_ICON[project.category] || '💻'}</CoverPlaceholder>
      )}
      {multi && (
        <>
          <CarouselButton
            $side="left"
            onClick={() => go(-1)}
            aria-label="Önceki görsel"
            type="button"
          >
            ‹
          </CarouselButton>
          <CarouselButton
            $side="right"
            onClick={() => go(1)}
            aria-label="Sonraki görsel"
            type="button"
          >
            ›
          </CarouselButton>
          <Dots>
            {images.map((_, i) => (
              <Dot
                key={i}
                $active={i === idx}
                onClick={() => setIdx(i)}
                aria-label={`Görsel ${i + 1}`}
                type="button"
              />
            ))}
          </Dots>
        </>
      )}
      <CategoryBadge>{project.category}</CategoryBadge>
    </CoverWrapper>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const [activeCategory, setActiveCategory] = useState('Tümü');

  const filteredProjects = useMemo(
    () =>
      activeCategory === 'Tümü'
        ? projectsData
        : projectsData.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  return (
    <ProjectsSection id="works" ref={ref}>
      <ProjectsContainer>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          İşlerim
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Geliştirdiğim web siteleri, oyunlar ve ürünler. Aşağıdan kategoriye göre filtreleyebilirsin.
        </Subtitle>

        <FilterBar
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {CATEGORIES.map((cat) => (
            <FilterButton
              key={cat}
              $active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </FilterButton>
          ))}
        </FilterBar>

        <ProjectsGrid
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.title}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <ProjectCover project={project} />
                <CardBody>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  {project.tech && project.tech.length > 0 && (
                    <TechList>
                      {project.tech.map((t) => (
                        <TechBadge key={t}>{t}</TechBadge>
                      ))}
                    </TechList>
                  )}
                  <ProjectLinks>
                    {project.live && (
                      <ProjectLink href={project.live} target="_blank" rel="noopener noreferrer">
                        <FaExternalLinkAlt /> Ziyaret Et
                      </ProjectLink>
                    )}
                    {project.github && (
                      <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer">
                        <FaGithub /> Kaynak Kod
                      </ProjectLink>
                    )}
                    {project.download && (
                      <ProjectLink href={project.download} target="_blank" rel="noopener noreferrer" download>
                        <FaDownload /> İndir (.exe)
                      </ProjectLink>
                    )}
                  </ProjectLinks>
                </CardBody>
              </ProjectCard>
            ))}
          </AnimatePresence>
        </ProjectsGrid>
      </ProjectsContainer>
    </ProjectsSection>
  );
};

export default Projects;
