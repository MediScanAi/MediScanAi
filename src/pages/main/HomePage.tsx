import { Typography, Row, Col, Card, Carousel, List, Button } from 'antd';
import 'antd/dist/reset.css';
import { DownOutlined } from '@ant-design/icons';
import partner1 from '../../assets/photos/partner1.webp';
import partner2 from '../../assets/photos/partner2.webp';
import partner3 from '../../assets/photos/partner3.webp';
import partner4 from '../../assets/photos/partner4.webp';
import partner5 from '../../assets/photos/partner5.webp';
import partner6 from '../../assets/photos/partner6.webp';
import partner7 from '../../assets/photos/partner7.webp';
import partner8 from '../../assets/photos/partner8.webp';
import myHealth from '../../assets/photos/my-health.webp';
import myHealth2 from '../../assets/photos/my-health-second.webp';
import group99 from '../../assets/photos/Group 99.svg';
import group101 from '../../assets/photos/Group 101.svg';
import fileUpload from '../../assets/photos/Folder.webp';
import aiAnalysis from '../../assets/photos/Productivity 4.webp';
import insightsReport from '../../assets/photos/Finance 5.webp';
import clinicalDecision from '../../assets/photos/m11.webp';
import '../../assets/styles/homepage.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

function HomePage() {
  const { t } = useTranslation('global');
  const [width, setWidth] = useState(window.innerWidth);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [theme, setTheme] = useState(false);
  const navigate = useNavigate();

  const activities = [
    {
      title: t('activity.dataUpload.title'),
      text: t('activity.dataUpload.text'),
      icon: (
        <img
          src={fileUpload}
          alt="frame"
          style={{ width: '110px', height: '100%' }}
        />
      ),
      color: '#e6f7ff',
    },
    {
      title: t('activity.aiAnalysis.title'),
      text: t('activity.aiAnalysis.text'),
      icon: (
        <img
          src={aiAnalysis}
          alt="frame1"
          style={{ width: '110px', height: '100%' }}
        />
      ),
      color: '#fff1b8',
    },
    {
      title: t('activity.insightsReport.title'),
      text: t('activity.insightsReport.text'),
      icon: (
        <img
          src={insightsReport}
          alt="frame2"
          style={{ width: '110px', height: '100%' }}
        />
      ),
      color: '#f4ffb8',
    },
    {
      title: t('activity.clinicalDecision.title'),
      text: t('activity.clinicalDecision.text'),
      icon: (
        <img
          src={clinicalDecision}
          alt="frame3"
          style={{ width: '125px', height: '110px' }}
        />
      ),
      color: '#ffd6e7',
    },
  ];

  const questions = [
    {
      title: t('faqs.items.0.question'),
      text: t('faqs.items.0.answer'),
    },
    {
      title: t('faqs.items.1.question'),
      text: t('faqs.items.1.answer'),
    },
    {
      title: t('faqs.items.2.question'),
      text: t('faqs.items.2.answer'),
    },
    {
      title: t('faqs.items.3.question'),
      text: t('faqs.items.3.answer'),
    },
    {
      title: t('faqs.items.4.question'),
      text: t('faqs.items.4.answer'),
    },
  ];

  const partners = [
    {
      id: 0,
      image: partner1,
      link: t('partners.0.link'),
      name: t('partners.0.name'),
      description: t('partners.0.description'),
    },
    {
      id: 1,
      image: partner2,
      link: t('partners.1.link'),
      name: t('partners.1.name'),
      description: t('partners.1.description'),
    },
    {
      id: 2,
      image: partner3,
      link: t('partners.2.link'),
      name: t('partners.2.name'),
      description: t('partners.2.description'),
    },
    {
      id: 3,
      image: partner4,
      link: t('partners.3.link'),
      name: t('partners.3.name'),
      description: t('partners.3.description'),
    },
    {
      id: 4,
      image: partner5,
      link: t('partners.4.link'),
      name: t('partners.4.name'),
      description: t('partners.4.description'),
    },
    {
      id: 5,
      image: partner6,
      link: t('partners.5.link'),
      name: t('partners.5.name'),
      description: t('partners.5.description'),
    },
    {
      id: 7,
      image: partner7,
      link: t('partners.6.link'),
      name: t('partners.6.name'),
      description: t('partners.6.description'),
    },
    {
      id: 8,
      image: partner8,
      link: t('partners.7.link'),
      name: t('partners.7.name'),
      description: t('partners.7.description'),
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleOpen = (index: number | null) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Row className={`homepage ${theme ? 'dark-theme' : ''}`}>
      <Col style={{ width: '100%' }}>
        <Row className="welcome-section">
          <Col lg={12} sm={24} className="welcome-section-column">
            <Text className="welcome-text">{t('homepage.welcome')}</Text>
            <Title className="platform-title">
              {t('homepage.platformTitle')}
            </Title>
            <p className="platform-description">
              {t('homepage.platformDescription')}
            </p>
            <Button
              className="consult-button"
              type="primary"
              size="large"
              onClick={() => navigate('/tests-form/blood-test')}
            >
              {t('homepage.consultButton')}
            </Button>
          </Col>
          <Col>
            <img src={group99} alt="platform" className="platform-image" />
          </Col>
        </Row>
        <Row className="activity-section">
          <Col className="activity-section-column">
            <Title level={1} className="activity-section-column-title">
              {t('activity.title')}
            </Title>
            <Text className="activity-section-column-text">
              {t('activity.description')}
            </Text>
            <Row gutter={[24, 24]} style={{ marginTop: '40px' }}>
              {activities.map(({ title, text, icon }, index) => (
                <Col key={index} xs={24} sm={24} md={12} lg={6}>
                  <Card
                    className={
                      'activity-card' +
                      (theme ? ' dark-mode-text dark-theme' : '')
                    }
                    bodyStyle={{ padding: 0 }}
                  >
                    <div className="activity-card-content">
                      <div className="activity-icon">{icon}</div>
                      <Title level={4} className="activity-card-title">
                        {title}
                      </Title>
                      <Text className="activity-card-text">{text}</Text>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        <Row className="my-health-section">
          <Col span={24} className="my-health-title-container">
            <Title
              level={1}
              className={'my-health-title' + (theme ? ' dark-theme' : '')}
            >
              {t('myHealth.title')}
            </Title>
          </Col>
          <p className="my-health-description">{t('myHealth.description')}</p>
          <div className="my-health-step-images">
            <img src={myHealth} alt="Step 1" className="my-health-image" />
            <div className="arrow">→</div>
            <img src={myHealth2} alt="Step 2" className="my-health-image" />
          </div>
          <div className="my-health-text-content">
            <Button
              className="my-health-button"
              type="primary"
              size="large"
              onClick={() => navigate('/profile/info')}
            >
              {t('myHealth.button')}
            </Button>
          </div>
        </Row>

        <Row className="leading-medicine-section">
          <Col lg={12} sm={24} className="leading-medicine-content">
            <Title className="leading-medicine-title">
              {t('leadingMedicine.title')}
            </Title>
            <Text className="leading-medicine-description">
              {t('leadingMedicine.description')}
            </Text>
          </Col>
          <Col>
            <img src={group101} alt="platform" className="platform-image" />
          </Col>
        </Row>
        <Row className="faq-section">
          <Col style={{ marginTop: 50, padding: '24px' }} span={24}>
            <Title
              level={1}
              className={'faq-title' + (theme ? ' dark-theme' : '')}
            >
              {t('homepage.faqTitle')}
            </Title>
            <List
              itemLayout="horizontal"
              dataSource={questions}
              split={false}
              style={{ width: '100%', margin: '0 auto' }}
              renderItem={({ title, text }, index) => (
                <List.Item
                  className={`faq-item ${theme ? 'faq-item-dark' : 'faq-item-light'}`}
                  onClick={() => toggleOpen(index)}
                >
                  <Row gutter={[16, 16]} style={{ width: '100%' }}>
                    <Col xs={24}>
                      <Row justify="space-between" style={{ width: '100%' }}>
                        <Col span={22}>
                          <Title level={3} className="faq-question">
                            {title}
                          </Title>
                        </Col>
                        <Col span={2} style={{ textAlign: 'right' }}>
                          <DownOutlined
                            style={{
                              transition: 'transform 0.3s',
                              transform:
                                openIndex === index
                                  ? 'rotate(180deg)'
                                  : 'rotate(0deg)',
                              fontSize: 20,
                              color: theme ? 'white' : 'black',
                            }}
                          />
                        </Col>
                      </Row>
                      {openIndex === index && (
                        <Text className="faq-answer">{text}</Text>
                      )}
                    </Col>
                  </Row>
                </List.Item>
              )}
            />
          </Col>
        </Row>
        <Row gutter={[24, 24]} className="partners-section">
          <Col span={24}>
            <Title level={1} className="partners-title">
              {t('homepage.partnerTitle')}
            </Title>
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
              {partners.map((partner, index) => (
                <div key={index} className="partner-card-wrapper">
                  <Card
                    style={{ border: 'none' }}
                    hoverable
                    className={`partner-card ${theme ? 'partner-card-dark' : 'partner-card-light'}`}
                    bodyStyle={{
                      padding: 20,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                    }}
                  >
                    <div className="partner-image-container">
                      <img
                        src={partner.image}
                        alt={partner.name}
                        className="partner-image"
                      />
                      <Title level={4} className="partner-name">
                        {t(`partners.${index}.name`)}
                      </Title>
                      <Text className="partner-description">
                        {t(`partners.${index}.description`)}
                      </Text>
                    </div>
                    <Button
                      className="partner-button"
                      type="primary"
                      size="large"
                    >
                      <a
                        href={t(`partners.${index}.link`)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('homepage.readMore')}
                      </a>
                    </Button>
                  </Card>
                </div>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default HomePage;
