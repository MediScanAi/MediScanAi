import { Typography, Row, Col, Card, Carousel, Collapse, Spin } from 'antd';
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
import group101Dark from '../../assets/photos/Group 101Dark.svg';
import fileUpload from '../../assets/photos/Folder.webp';
import aiAnalysis from '../../assets/photos/Productivity 4.webp';
import insightsReport from '../../assets/photos/Finance 5.webp';
import clinicalDecision from '../../assets/photos/m11.webp';
import '../../assets/styles/pages/home-page.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import PrimaryButton from '../../components/common/buttons/PrimaryButton';
import SecondaryButton from '../../components/common/buttons/SecondaryButton';

const { Title, Text } = Typography;

function HomePage() {
  const { t } = useTranslation('homePage');
  const [width, setWidth] = useState(window.innerWidth);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const activities = [
    {
      title: t('activity.dataUpload.title'),
      text: t('activity.dataUpload.text'),
      icon: (
        <img
          draggable={false}
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
          draggable={false}
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
          draggable={false}
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
          draggable={false}
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

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(delay);
  }, []);

  if (loading) {
    return (
      <div className={`loading-state ${isDarkMode ? 'dark' : ''}`}>
        <Spin className="loading-spinner" />
        <Title level={3} className="loading-title">
          {t('homepage.loading')}
        </Title>
        <Text className="loading-subtitle">
          {t('homepage.loadingDescription')}
        </Text>
      </div>
    );
  }

  return (
    <Row className={`homepage ${isDarkMode ? 'dark' : ''}`}>
      <Col style={{ width: '100%' }}>
        <Row className="welcome-section">
          <Col lg={12} sm={24} className="welcome-section-column">
            <Text className={`welcome-text ${isDarkMode ? 'dark' : ''}`}>
              {t('homepage.welcome')}
            </Text>
            <Title className={`platform-title ${isDarkMode ? 'dark' : ''}`}>
              {t('homepage.platformTitle')}
            </Title>
            <p className={`platform-description ${isDarkMode ? 'dark' : ''}`}>
              {t('homepage.platformDescription')}
            </p>
            <PrimaryButton onClick={() => navigate('/ai-doctor')}>
              {t('homepage.consultButton')}
            </PrimaryButton>
          </Col>
          <Col>
            <img
              draggable={false}
              src={group99}
              alt="platform"
              className="platform-image"
            />
          </Col>
        </Row>
        <Col className="activity-section-column">
          <Title
            level={1}
            className={`activity-section-column-title ${isDarkMode ? 'dark' : ''}`}
          >
            {t('activity.title')}
          </Title>
          <Text
            className={`activity-section-column-text ${isDarkMode ? 'dark' : ''}`}
          >
            {t('activity.description')}
          </Text>
          <Row gutter={[24, 24]} style={{ marginTop: '40px' }}>
            {activities.map(({ title, text, icon }, index) => (
              <Col key={index} xs={24} sm={24} md={12} lg={6}>
                <Card className={'activity-card' + (isDarkMode ? ' dark' : '')}>
                  <div className="activity-card-content">
                    <div className="activity-icon">{icon}</div>
                    <Title
                      level={4}
                      className={`activity-card-title ${isDarkMode ? 'dark' : ''}`}
                    >
                      {title}
                    </Title>
                    <Text
                      className={`activity-card-text ${isDarkMode ? 'dark' : ''}`}
                    >
                      {text}
                    </Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
        <Row className="my-health-section">
          <Col span={24} className="my-health-title-container">
            <Title
              level={1}
              className={`my-health-title ${isDarkMode ? 'dark' : ''}`}
            >
              {t('myHealth.title')}
            </Title>
          </Col>
          <p className={`my-health-description ${isDarkMode ? 'dark' : ''}`}>
            {t('myHealth.description')}
          </p>
          <div className="my-health-step-images">
            <img
              draggable={false}
              src={myHealth}
              alt="Step 1"
              className="my-health-image"
            />
            <div className={`arrow ${isDarkMode ? 'dark' : ''}`}>→</div>
            <img
              draggable={false}
              src={myHealth2}
              alt="Step 2"
              className="my-health-image"
            />
          </div>
          <div className="my-health-text-content">
            <PrimaryButton onClick={() => navigate('/profile/info')}>
              {t('myHealth.button')}
            </PrimaryButton>
          </div>
        </Row>

        <Row className="leading-medicine-section">
          <Col lg={12} sm={24} className="leading-medicine-content">
            <Title
              className={`leading-medicine-title ${isDarkMode ? 'dark' : ''}`}
            >
              {t('leadingMedicine.title')}
            </Title>
            <Text
              className={`leading-medicine-description ${isDarkMode ? 'dark' : ''}`}
            >
              {t('leadingMedicine.description')}
            </Text>
          </Col>
          <Col>
            <img
              draggable={false}
              src={isDarkMode ? group101Dark : group101}
              alt="platform"
              className="platform-image"
            />
          </Col>
        </Row>
        <Row className="faq-section">
          <Col style={{ marginTop: 50, padding: '24px' }} span={24}>
            <Title
              level={1}
              className={`faq-title ${isDarkMode ? 'dark' : ''}`}
            >
              {t('homepage.faqTitle')}
            </Title>
            <Collapse
              accordion
              bordered={false}
              activeKey={openIndex !== null ? [openIndex.toString()] : []}
              onChange={(key) =>
                toggleOpen(key.length > 0 ? parseInt(key[0]) : null)
              }
              className={`faq-collapse ${isDarkMode ? 'dark' : ''}`}
              items={questions.map(({ title, text }, index) => ({
                key: index.toString(),
                label: (
                  <Title
                    level={3}
                    className={`faq-question ${isDarkMode ? 'dark' : ''}`}
                  >
                    {title}
                  </Title>
                ),
                children: (
                  <Text className={`faq-answer ${isDarkMode ? 'dark' : ''}`}>
                    {text}
                  </Text>
                ),
                showArrow: false,
                extra: (
                  <DownOutlined
                    style={{
                      transition: 'transform 0.3s',
                      transform:
                        openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      fontSize: 20,
                      color: isDarkMode ? 'white' : 'black',
                    }}
                  />
                ),
                className: `faq-panel ${isDarkMode ? 'dark' : ''}`,
              }))}
            />
          </Col>
        </Row>
        <div className="partners-section">
          <Col span={24} className="partners-column">
            <Title
              level={1}
              className={`partners-title ${isDarkMode ? 'dark' : ''}`}
            >
              {t('homepage.partnerTitle')}
            </Title>
            <div style={{ maxWidth: '99vw' }}>
              <Carousel
                autoplay
                autoplaySpeed={2000}
                infinite
                slidesToShow={
                  width > 1500 ? 4 : width > 1200 ? 3 : width > 820 ? 2 : 1
                }
                slidesToScroll={1}
                className="carousel-container"
              >
                {partners.map((partner, index) => (
                  <div key={index} className="partner-card-wrapper">
                    <Card
                      style={{
                        border: 'none',
                        width:
                          width > 1500
                            ? '300px'
                            : width > 1200
                              ? '350px'
                              : width > 820
                                ? '340px'
                                : '370px',
                      }}
                      hoverable
                      className={`partner-card ${isDarkMode ? 'dark' : ''}`}
                    >
                      <div className="partner-image-container">
                        <img
                          draggable={false}
                          src={partner.image}
                          alt={partner.name}
                          className="partner-image"
                        />
                        <Title
                          level={4}
                          className={`partner-name ${isDarkMode ? 'dark' : ''}`}
                        >
                          {t(`partners.${index}.name`)}
                        </Title>
                        <Text
                          className={`partner-description ${isDarkMode ? 'dark' : ''}`}
                        >
                          {t(`partners.${index}.description`)}
                        </Text>
                      </div>
                      <SecondaryButton className="partner-button">
                        <a
                          href={t(`partners.${index}.link`)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t('homepage.readMore')}
                        </a>
                      </SecondaryButton>
                    </Card>
                  </div>
                ))}
              </Carousel>
            </div>
          </Col>
        </div>
      </Col>
    </Row>
  );
}

export default HomePage;
