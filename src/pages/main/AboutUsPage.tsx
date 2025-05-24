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
import { useTranslation } from 'react-i18next';
const { Title, Paragraph, Text } = Typography;

function AboutUsPage() {
  const theme = useAppSelector((state) => state.theme.isDarkMode);
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const { t } = useTranslation('global');

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const opinions = [
    {
      name: t('aboutUs.opinions.0.name'),
      description: t('aboutUs.opinions.0.description')
    },
    {
      name: t('aboutUs.opinions.1.name'),
      description: t('aboutUs.opinions.1.description')
    },
    {
      name: t('aboutUs.opinions.2.name'),
      description: t('aboutUs.opinions.2.description')
    },
    {
      name: t('aboutUs.opinions.3.name'),
      description: t('aboutUs.opinions.3.description')
    },
    {
      name: t('aboutUs.opinions.4.name'),
      description: t('aboutUs.opinions.4.description')
    },
    {
      name: t('aboutUs.opinions.5.name'),
      description: t('aboutUs.opinions.5.description')
    },
    {
      name: t('aboutUs.opinions.6.name'),
      description: t('aboutUs.opinions.6.description')
    },
    {
      name: t('aboutUs.opinions.7.name'),
      description: t('aboutUs.opinions.7.description')
    }
  ];

  const cardItems = [
    {
      title: t('aboutUs.mission.title'),
      text: t('aboutUs.mission.text'),
      img: mission,
      alt: 'mission',
    },
    {
      title: t('aboutUs.vision.title'), 
      text: t('aboutUs.vision.text'),
      img: vision,
      alt: 'vision',
    },
    {
      title: t('aboutUs.values.title'),
      text: t('aboutUs.values.text'),
      img: values,
      alt: 'values',
    },
  ];

  return (
    <Row className={`about-us ${theme ? 'dark-theme' : ''}`}>
      <Row className="welcome-section-about-us">
        <Col xs={22} md={16}>
          <Text className="welcome-section-title">{t('aboutUs.title')}</Text>
          <Paragraph className="welcome-section-description">
            {t('aboutUs.description')}
          </Paragraph>
          <Button
            className="contact-us-button"
            type="primary"
            size="large"
            onClick={() => navigate('/profile/contact-us')}
          >
            {t('aboutUs.contactButton')}
          </Button>
        </Col>
      </Row>
      <Row className="about-us-cards" justify="center">
        <Col span={24}>
          <Title level={1} className="about-us-cards-title">{t('aboutUs.coreValues')}</Title>
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
          <Title level={1} className="opinions-title">{t('aboutUs.clientOpinions')}</Title>
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
          <Title level={1} className="location-title">{t('aboutUs.location.title')}</Title>
          <Text className="location-description">
            {t('aboutUs.location.description')}
          </Text>
          <Text className="location-phone">
            {t('aboutUs.location.phone')}
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
