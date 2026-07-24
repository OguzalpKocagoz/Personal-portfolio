import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const StyledContactSection = styled(motion.section)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
  background: transparent;
  position: relative;
  overflow: hidden;
`;

const ContactContainer = styled.div`
  max-width: 1000px;
  width: 100%;
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  color: #78350f;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ContactInfoContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.55);
  box-shadow: 0 8px 32px rgba(120, 53, 15, 0.18);
  max-width: 600px;
  margin: 0 auto 2rem auto;
`;

const ContactInfoTitle = styled.h3`
  color: #b45309;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ContactInfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #475569;
  font-size: 1.1rem;
  padding: 1rem;
  border-radius: 8px;
  background: #f8fafc;
  transition: all 0.3s ease;

  svg {
    font-size: 1.5rem;
    color: #b45309;
  }

  &:hover {
    transform: translateX(5px);
    background: rgba(217, 119, 6, 0.1);
  }
`;

const FormContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.55);
  box-shadow: 0 8px 32px rgba(120, 53, 15, 0.18);
  margin-bottom: 3rem;
  max-width: 600px;
  margin: 0 auto 3rem auto;
`;

const FormTitle = styled.h3`
  color: #b45309;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #b45309;
  font-size: 1rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  color: #0f172a;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #d97706;
    box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.15);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  color: #0f172a;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #d97706;
    box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.15);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  background: #d97706;
  border: 2px solid #d97706;
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;
  margin: 0 auto;

  &:hover {
    background: #b45309;
    border-color: #b45309;
    transform: translateY(-2px);
  }
`;

const SocialContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.55);
  box-shadow: 0 8px 32px rgba(120, 53, 15, 0.18);
  max-width: 600px;
  margin: 0 auto;
`;

const SocialTitle = styled.h3`
  color: #b45309;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const SocialLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #475569;
  font-size: 1.1rem;
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: #f8fafc;

  svg {
    font-size: 1.8rem;
  }

  &:hover {
    color: #b45309;
    transform: translateY(-3px);
    background: rgba(217, 119, 6, 0.1);
  }
`;

const Contact = React.memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = React.useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = React.useCallback((e) => {
    e.preventDefault();
    console.log(formData);
  }, [formData]);

  const animationProps = {
    initial: { opacity: 0, y: 20 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
  };

  return (
    <StyledContactSection id="contact" ref={ref}>
      <ContactContainer>
        <Title
          {...animationProps}
          transition={{ duration: 0.5 }}
        >
          İletişim
        </Title>
        <ContactInfoContainer
          {...animationProps}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ContactInfoTitle>İletişim Bilgilerim</ContactInfoTitle>
          <ContactInfoList>
            <ContactInfoItem>
              <FaEnvelope />
              <span>kocagozoguzalp@gmail.com</span>
            </ContactInfoItem>
            <ContactInfoItem>
              <FaPhone />
              <span>+90 505 368 90 84</span>
            </ContactInfoItem>
            <ContactInfoItem>
              <FaMapMarkerAlt />
              <span>Balıkesir, Türkiye</span>
            </ContactInfoItem>
          </ContactInfoList>
        </ContactInfoContainer>
        <FormContainer
          {...animationProps}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <FormTitle>Benimle iletişime geçmek için lütfen formu doldurunuz</FormTitle>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label htmlFor="name">İsim</Label>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="İsminizi girin"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Email adresinizi girin"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="message">Mesaj</Label>
              <TextArea
                id="message"
                name="message"
                placeholder="Mesajınızı girin"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </InputGroup>
            <SubmitButton type="submit">Gönder</SubmitButton>
          </Form>
        </FormContainer>
        <SocialContainer
          {...animationProps}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <SocialTitle>Sosyal Medya Hesaplarım</SocialTitle>
          <SocialLinks>
          </SocialLinks>
        </SocialContainer>
      </ContactContainer>
    </StyledContactSection>
  );
});

Contact.displayName = 'Contact';

export default Contact; 
