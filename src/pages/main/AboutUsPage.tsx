import { Row, Typography, Col, Button, Card, Carousel } from 'antd';
import { useAppSelector } from '../../app/hooks.ts';
import '../../assets/styles/aboutUs.css';
import mission from '../../assets/photos/target.png';
import vision from '../../assets/photos/opportunity.png';
import values from "../../assets/photos/core-values.png";
import opinionImage from "../../assets/photos/quotes.png";
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useState } from 'react';
import { LineOutlined } from '@ant-design/icons';
const { Title, Paragraph, Text } = Typography;

function AboutUsPage() {
  const theme = useAppSelector((state) => state.theme.isDarkMode);
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const opinions = [
    {
      name: 'Dr. Emily Carter',
      description:
        'Medical AI has completely transformed the way I approach diagnostics. The insights are fast, accurate, and help me make better decisions for my patients.',
    },
    {
      name: 'Michael Nguyen',
      description:
        'As a patient, I found the symptom checker extremely helpful. Within minutes, I had a clear idea of what might be wrong and what steps to take next.',
    },
    {
      name: 'Sophia Rodriguez',
      description:
        'This platform made me feel empowered. I could describe my issues in simple terms and the AI guided me to relevant information before even visiting a clinic.',
    },
    {
      name: 'Dr. Ahmed Al-Karim',
      description:
        'I use Medical AI regularly to double-check symptoms and get evidence-based suggestions. It’s a reliable assistant in my daily workflow.',
    },
    {
      name: 'Liam Thompson',
      description:
        'The form-based approach is intuitive and user-friendly. I was surprised how accurately the system matched my symptoms with the right advice.',
    },
    {
      name: 'Nora Ishikawa',
      description:
        'Medical AI gave me peace of mind when I couldn’t reach a doctor immediately. The recommendations were clear, professional, and useful.',
    },
    {
      name: 'Dr. Anna Müller',
      description:
        'This tool is not here to replace doctors — it’s here to assist us. It helps speed up the diagnostic process and reduce errors.',
    },
    {
      name: 'Carlos Mendoza',
      description:
        'I’ve tried multiple online health tools, but this is by far the most accurate and easiest to use. The AI feedback feels personal and thoughtful.',
    },
  ];

  const cardItems = [
    {
      title: 'Our mission',
      text: 'Our mission is to create innovative solutions in the healthcare system that simplify life for doctors and patients.',
      img: mission,
      alt: 'mission',
    },
    {
      title: 'Our vision',
      text: 'We see a future where healthcare is accessible to everyone, regardless of location or time.',
      img: vision,
      alt: 'vision',
    },
    {
      title: 'Our values',
      text: 'Transparency, innovation, and user-focus guide everything we do.',
      img: values,
      alt: 'values',
    },
  ];

  return (
    <Row className={`about-us ${theme ? 'dark-theme' : ''}`}>
      <Row className="welcome-section-about-us">
        <Col xs={22} md={16}>
          <Text className="welcome-section-title">About Us</Text>
          <Paragraph className="welcome-section-description">
            We combine artificial intelligence and medicine with the goal of making healthcare accessible, fast, and clear for everyone.
          </Paragraph>
          <Button
            className="contact-us-button"
            type="primary"
            size="large"
            onClick={() => navigate('/profile/contact-us')}
          >
            Contact Us
          </Button>
        </Col>
      </Row>
      <Row className="about-us-cards" justify="center">
        <Col span={24}>
          <Title level={1} className="about-us-cards-title">Our Core Values</Title>
        </Col>

        {cardItems.map((item, index) => (
          <Col xs={24} sm={24} md={12} lg={8} key={index}>
            <Card
              className={`about-us-card${theme ? ' dark-mode-text dark-theme' : ''}`}
              bodyStyle={{ padding: 0 }}
            >
              <div className="about-us-card-content">
                <img className="about-us-card-icon" src={item.img} alt={item.alt} />
                <Title level={2} className="about-us-card-title">{item.title}</Title>
                <Text className="about-us-card-text">{item.text}</Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="opinions-section">
        <Col span={24}>
          <Title level={1} className="opinions-title">What Clients Say About Us</Title>
          <Carousel
            autoplay
            autoplaySpeed={2000}
            dots={false}
            infinite
            slidesToShow={
              width > 1200 ? 4 : width > 900 ? 3 : width > 600 ? 2 : 1
            }
            slidesToScroll={1}
            className="carousel-container"
          >
            {opinions.map((opinion, index) => (
              <div key={index} className="opinion-card-wrapper">
                <Card
                  className={`opinion-card ${theme ? 'opinion-card-dark' : 'opinion-card-light'}`}
                  bodyStyle={{
                    padding: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                  }}
                >
                  <div className="opinion-item-container">
                    <img src={opinionImage} alt="opinion" className="opinion-image" />
                    <Text className="opinion-description">
                      {opinion.description}
                    </Text>
                    <LineOutlined className="opinion-divider" />
                    <Title level={4} className="opinion-name">
                      {opinion.name}
                    </Title>
                  </div>
                </Card>
              </div>
            ))}
          </Carousel>
        </Col>
      </Row>
      <Row justify="center" gutter={[32, 32]} className="location-section">
        <Col xs={24} md={10} className="location-text">
          <Title level={1} className="location-title">Our Location</Title>
          <Text className="location-description">
            Visit us at our MediScanAI office to learn more about our services!
          </Text>
          <Text className="location-phone">
            Tel: +374 91 234 567
          </Text>
        </Col>
        <Col xs={24} md={14} className="location-map-wrapper">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.123456789!2d44.4904102!3d40.1986492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abce69a1b0d77%3A0x31ea9da813693c2e!2sArmenian%20Code%20Academy!5e0!3m2!1sen!2sam!4v1716491835202!5m2!1sen!2sam"
            width="100%"
            height="320"
            style={{ border: 0, borderRadius: "10px" }}
            allowFullScreen={true}
            referrerPolicy="no-referrer-when-downgrade"
            title="MediScanAI Map"
          ></iframe>
        </Col>
      </Row>

    </Row>
  );
}

export default AboutUsPage;
