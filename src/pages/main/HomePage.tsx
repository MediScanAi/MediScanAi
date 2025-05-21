import { Typography, Row, Col, Card, Carousel, List, Button } from 'antd';
import 'antd/dist/reset.css';
import { DownOutlined, LineOutlined } from '@ant-design/icons';
import partner1 from '../../assets/photos/partner1.webp';
import partner2 from '../../assets/photos/partner2.webp';
import partner3 from '../../assets/photos/partner3.webp';
import partner4 from '../../assets/photos/partner4.webp';
import partner5 from '../../assets/photos/partner5.webp';
import partner6 from '../../assets/photos/partner6.webp';
import partner7 from '../../assets/photos/partner7.webp';
import partner8 from '../../assets/photos/partner8.webp';
import group99 from '../../assets/photos/Group 99.svg';
import group101 from '../../assets/photos/Group 101.png';
import fileUpload from '../../assets/photos/Folder.png';
import aiAnalysis from '../../assets/photos/Productivity 4.png';
import insightsReport from '../../assets/photos/Finance 5.png';
import clinicalDecision from '../../assets/photos/m11.png';
import '../../assets/styles/homepage.css';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const activities = [
  {
    title: 'Data Upload',
    text: 'Securely upload your genomic data via encrypted portal',
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
    title: 'AI Analysis',
    text: 'AI analyzes genomic data using multi-omic integration techniques',
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
    title: 'Insights Report',
    text: 'Receive biomarkers and recommendations in a detailed report',
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
    title: 'Clinical Decision',
    text: 'Physicians apply findings for personalized treatment decision',
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
    title: 'What is Mediscan AI?',
    text: 'Mediscan AI is an advanced web-based health integration platform that uses artificial intelligence to analyze medical and genomic data. It supports clinicians with fast, accurate, and personalized insights for better patient care.',
  },
  {
    title: 'How does Mediscan AI ensure data security?',
    text: 'We prioritize data privacy and security. Mediscan AI is built with enterprise-level encryption and complies with HIPAA, GDPR, and other global standards, ensuring all health data is fully protected.',
  },
  {
    title: 'Who can use Mediscan AI?',
    text: 'Mediscan AI is designed for healthcare professionals, researchers, and institutions. Its user-friendly interface allows clinicians of all levels to easily access, interpret, and apply AI-driven insights in their workflow.',
  },
  {
    title: 'How accurate are the AI diagnostics?',
    text: 'Our AI models are trained on vast, high-quality datasets and continuously updated to ensure clinical accuracy. Mediscan AI provides detailed, clinician-ready reports backed by real-world medical intelligence.',
  },
  {
    title: 'What makes Mediscan AI different?',
    text: 'Mediscan AI stands out with its seamless integration, fast turnaround times, intuitive design, and trusted clinical accuracy. We bring advanced diagnostics within reach — no specialized training required.',
  },
];

const partners = [
  {
    id: 1,
    image: partner1,
    link: 'https://www.mcastghik.com/',
    name: 'Astghik Medical Center',
    description:
      'Astghik Medical Center is a modern, multidisciplinary hospital offering advanced medical services with international standards and cutting-edge technologies.',
  },
  {
    id: 2,
    image: partner2,
    link: 'https://i-mc.am/',
    name: 'Izmirlyan Medical Center',
    description:
      'Izmirlyan Medical Center is a multifunctional hospital known for specialties like urology, cardiology, and surgery, affiliated with the Mother See of Holy Etchmiadzin.',
  },
  {
    id: 3,
    image: partner3,
    name: 'Erebuni Medical Center',
    link: 'https://www.erebunimed.com/',
    description:
      'Erebuni Medical Center is Armenia’s largest hospital, providing full-spectrum care including emergency services, diagnostics, and surgery since 1991.',
  },
  {
    id: 4,
    image: partner4,
    name: 'Davidyants Laboratory',
    link: 'https://davlab.am/hy',
    description:
      'Davidyants Laboratory specializes in clinical diagnostics, offering services like histology, immunohistochemistry, and infectious disease testing.',
  },
  {
    id: 5,
    image: partner5,
    link: 'https://slavmed.am/en/',
    name: 'Slawmed Medical Center',
    description:
      'Slawmed is a multidisciplinary medical center offering treatments in gynecology, urology, ENT, ophthalmology, and other fields with modern equipment.',
  },
  {
    id: 6,
    image: partner6,
    link: 'https://wigmore.am/en/',
    name: 'Wigmore Medical Center',
    description:
      'Wigmore Medical Center provides top-quality care in orthopedics, spine surgery, vascular surgery, cardiology, and more, with a patient-focused approach.',
  },
  {
    id: 7,
    image: partner7,
    name: 'Nairi Medical Center',
    link: 'https://nairimed.com/hy',
    description:
      'Nairi Medical Center is a leading Armenian hospital offering high-standard medical care across multiple specialties and promoting medical research and education.',
  },
  {
    id: 8,
    image: partner8,
    link: 'https://blood.am/arm',
    name: ' Hematological Center',
    description:
      'The Armenian Hematological Center specializes in diagnosing and treating blood disorders, providing advanced care for both children and adults.',
  },
];

function HomePage() {
  const [width, setWidth] = useState(window.innerWidth);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const theme = useAppSelector((state) => state.theme.isDarkMode);

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
          <Col className="welcome-section-column">
            <Text className="welcome-text">Welcome</Text>
            <Title className="platform-title">MediScanAi Platform</Title>
            <Text className="platform-description">
              Advanced AI-powered diagnostics and medical
              <br /> analysis for healthcare professionals.
            </Text>
            <Button
              className="consult-button"
              type="primary"
              size="large"
              onClick={() => navigate('/tests-form/blood-test')}
            >
              Consult Today
            </Button>
          </Col>
          <Col>
            <img src={group99} alt="platform" className="platform-image" />
          </Col>
        </Row>
        <Row className="activity-section">
          <Col className="activity-section-column">
            <Title level={1} className="activity-section-column-title">
              Our Activity
            </Title>
            <Text className="activity-section-column-text">
              Problems trying to resolve the conflict between the two major
              realms of Classical physics: Newtonian mechanics.
            </Text>
            <Row gutter={[24, 24]} style={{ marginTop: '40px' }}>
              {activities.map(({ title, text, icon }, index) => (
                <Col key={index} xs={24} sm={24} md={12} lg={6}>
                  <Card className={"activity-card"+(theme?' dark-mode-text dark-theme':'')} bodyStyle={{ padding: 0 }}>
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
        <Row className="leading-medicine-section">
          <Col className="leading-medicine-content">
            <LineOutlined className="leading-medicine-icon" />
            <Title className="leading-medicine-title">Leading Medicine</Title>
            <Text className="leading-medicine-description">
              Advanced AI-powered diagnostics and medical
              <br /> analysis for healthcare professionals.
            </Text>
          </Col>
          <Col>
            <img src={group101} alt="platform" className="platform-image" />
          </Col>
        </Row>
        <Row className="faq-section">
          <Col style={{ marginTop: 50, padding: '24px' }} span={24}>
            <Title level={1} className={"faq-title"+(theme?' dark-theme':'')}>
              Frequently Asked Questions
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
              Partner With Us
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
                        {partner.name}
                      </Title>
                      <Text className="partner-description">
                        {partner.description}
                      </Text>
                    </div>
                    <Button
                      className="partner-button"
                      type="primary"
                      size="large"
                    >
                      <a
                        href={partner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read More
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
