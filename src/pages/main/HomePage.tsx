import { Typography, Row, Col, Card, Carousel, List, Button } from 'antd';
import 'antd/dist/reset.css';
import {
  CloudUploadOutlined,
  FileTextOutlined,
  SolutionOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import partner1 from '../../assets/photos/partner1.webp';
import partner2 from '../../assets/photos/partner2.webp';
import partner3 from '../../assets/photos/partner3.webp';
import partner4 from '../../assets/photos/partner4.webp';
import partner5 from '../../assets/photos/partner5.webp';
import partner6 from '../../assets/photos/partner6.webp';
import partner7 from '../../assets/photos/partner7.webp';
import partner8 from '../../assets/photos/partner8.webp';
import dataUpload from '../../assets/photos/dataUpload.webp';
import aiAnalysis from '../../assets/photos/aiAnalysis.webp';
import insightsReport from '../../assets/photos/insightsReport.webp';
import clinicalDecision from '../../assets/photos/clinicalDecision.webp';
import backGroundPlatform from '../../assets/photos/backGroundPlatform.webp';
import mission from '../../assets/photos/ourMission.webp';
import getStartedBackground from '../../assets/photos/getStartedBackground.webp';
import '../../assets/styles/homepage.css';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const steps = [
  {
    title: 'Data Upload',
    text: 'Securely upload your genomic data via encrypted portal',
    icon: <CloudUploadOutlined style={{ fontSize: 40 }} />,
    backgroundImage: dataUpload,
  },
  {
    title: 'AI Analysis',
    text: 'AI analyzes genomic data using multi-omic integration techniques',
    icon: <BarChartOutlined style={{ fontSize: 40 }} />,
    backgroundImage: aiAnalysis,
  },
  {
    title: 'Insights Report',
    text: 'Receive biomarkers and recommendations in a detailed report',
    icon: <FileTextOutlined style={{ fontSize: 40 }} />,
    backgroundImage: insightsReport,
  },
  {
    title: 'Clinical Decision',
    text: 'Physicians apply findings for personalized treatment decision-making',
    icon: <SolutionOutlined style={{ fontSize: 40 }} />,
    backgroundImage: clinicalDecision,
  },
];

const chooseUs = [
  {
    title: 'Advanced AI Technology',
    text: 'We leverage state-of-the-art artificial intelligence to process and interpret complex medical and genomic data. Our models are continuously updated to ensure accurate diagnostics and personalized recommendations, helping clinicians stay ahead in a rapidly evolving field.',
  },
  {
    title: 'Secure & Compliant',
    text: 'Your privacy is our priority. Our platform is built with enterprise-grade encryption and adheres strictly to HIPAA and GDPR standards. We ensure that all sensitive health data remains protected and compliant with global healthcare regulations.',
  },
  {
    title: 'Clinician-Ready Reports',
    text: 'Our reports are designed with healthcare professionals in mind — easy to read, focused on what matters, and integrated with clinical insights. Each report highlights key findings and suggests next steps, supporting better-informed decisions at the point of care.',
  },
  {
    title: 'Fast Turnaround',
    text: 'In healthcare, time is critical. Our system delivers detailed analysis and comprehensive results quickly — without compromising accuracy. This means patients can get timely care, and clinicians can act with confidence.',
  },
  {
    title: 'Easy to Use',
    text: 'Designed for simplicity, our platform requires no specialized training. With an intuitive interface, healthcare providers can upload data, run analyses, and review results in just a few steps, making advanced insights accessible to all.',
  },
];

const partners = [
  {
    id: 1,
    image: partner1,
    name: 'Astghik Medical Center',
    description:
      'Astghik Medical Center is a modern, multidisciplinary hospital offering advanced medical services with international standards and cutting-edge technologies.',
  },
  {
    id: 2,
    image: partner2,
    name: 'Izmirlyan Medical Center',
    description:
      'Izmirlyan Medical Center is a multifunctional hospital known for specialties like urology, cardiology, and surgery, affiliated with the Mother See of Holy Etchmiadzin.',
  },
  {
    id: 3,
    image: partner3,
    name: 'Erebuni Medical Center',
    description:
      'Erebuni Medical Center is Armenia’s largest hospital, providing full-spectrum care including emergency services, diagnostics, and surgery since 1991.',
  },
  {
    id: 4,
    image: partner4,
    name: 'Davidyants Laboratory',
    description:
      'Davidyants Laboratory specializes in clinical diagnostics, offering services like histology, immunohistochemistry, and infectious disease testing.',
  },
  {
    id: 5,
    image: partner5,
    name: 'Slawmed Medical Center',
    description:
      'Slawmed is a multidisciplinary medical center offering treatments in gynecology, urology, ENT, ophthalmology, and other fields with modern equipment.',
  },
  {
    id: 6,
    image: partner6,
    name: 'Wigmore Medical Center',
    description:
      'Wigmore Medical Center provides top-quality care in orthopedics, spine surgery, vascular surgery, cardiology, and more, with a patient-focused approach.',
  },
  {
    id: 7,
    image: partner7,
    name: 'Nairi Medical Center',
    description:
      'Nairi Medical Center is a leading Armenian hospital offering high-standard medical care across multiple specialties and promoting medical research and education.',
  },
  {
    id: 8,
    image: partner8,
    name: 'Armenian Hematological Center',
    description:
      'The Armenian Hematological Center specializes in diagnosing and treating blood disorders, providing advanced care for both children and adults.',
  },
];


function HomePage() {

  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const theme = useAppSelector((state) => state.theme.isDarkMode);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Row
      className={theme ? 'dark-theme' : ''}
      justify="center"
      align="middle"
      style={{
        minHeight: '100vh',
        padding: '20px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Col style={{ width: '100%' }}>
        <Row
          style={{
            width: '96.5%',
            padding: '20px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundImage: `url(${backGroundPlatform})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '220px',
            borderRadius: '15px',
            margin: '0 auto',
          }}
        >
          <Col
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Title
              style={{ color: 'black', marginBottom: 16, fontWeight: 500 }}
            >
              <b>Medical Analysis Platform</b>
            </Title>
            <Text
              type="secondary"
              style={{ fontSize: 23, color: 'black', fontWeight: 500 }}
            >
              Advanced AI-powered diagnostics and medical analysis for
              healthcare professionals. The platform uses the latest AI to
              analyze complex medical and genomic data accurately.
            </Text>
          </Col>
        </Row>
        <Row
          style={{
            width: '96.5%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundImage: `url(${getStartedBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '220px',
            borderRadius: '15px',
            margin: '0 auto',
            marginTop: '20px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
            }}
          ></div>

          <Col
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 2,
              padding: '20px',
            }}
          >
            <Title
              style={{ color: 'black', marginBottom: 16, fontWeight: 700 }}
            >
              Ready to Get Started?
            </Title>

            <Text
              style={{
                fontSize: 23,
                color: 'black',
                fontWeight: 500,
                marginBottom: 20,
              }}
            >
              Embrace wellness with us - where health meets happiness in every
              step of your journey.
            </Text>

            <Button
              type="primary"
              size="large"
              style={{
                height: '50px',
                padding: '0 40px',
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: '25px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                background: 'linear-gradient(45deg, #1890ff, #0052d9)',
                border: 'none',
                animation: 'fadeInUp 1s ease-out 0.4s forwards',
                opacity: 0,
                transition: 'all 0.3s ease',
              }}
              onClick={() => navigate('/tests-form/blood-test')}
            >
              Hand over your first test
            </Button>
          </Col>
        </Row>
        <Col
          style={{
            textAlign: 'center',
            marginTop: 25,
            padding: '0 24px',
          }}
        >
          <Title level={2} style={{ color: '#3498db', marginBottom: 32 }}>
            How It Works ?
          </Title>
          <Row gutter={[16, 16]} justify="space-around" align="top">
            {steps.map(({ title, text, icon, backgroundImage }, index) => (
              <Col key={index} xs={24} sm={14} md={12} lg={6}>
                <Card
                  style={{
                    minHeight: '200px',
                    borderRadius: 12,
                    overflow: 'hidden',
                    padding: 0,
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundImage: `url(${backgroundImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'blur(2px)',
                      zIndex: 1,
                    }}
                  />
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 16,
                      }}
                    >
                      {icon}
                    </div>
                    <Title level={3} style={{ color: 'black' }}>
                      {' '}
                      {title}
                    </Title>
                    <Text style={{ color: 'black', fontSize: '15px' }}>
                      {text}
                    </Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        <Col style={{ textAlign: 'center', marginTop: 25, padding: '24px' }}>
          <Title level={2} style={{ color: '#3498db', marginBottom: 32 }}>
            Why Choose Us ?
          </Title>

          <List
            itemLayout="horizontal"
            dataSource={chooseUs}
            split={false}
            renderItem={({ title, text }) => (
              <List.Item
                style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}
              >
                <Row gutter={[16, 16]} align="middle" style={{ width: '100%' }}>
                  <Col xs={24} md={6}>
                    <Title
                      level={4}
                      style={{
                        color: theme ? 'gray' : '#2c3e50',
                        margin: 0,
                        textAlign: 'left',
                      }}
                    >
                      {title}
                    </Title>
                  </Col>
                  <Col xs={24} md={18}>
                    <Text
                      type="secondary"
                      style={{
                        fontSize: 16,
                        textAlign: 'left',
                        display: 'block',
                        color: theme ? 'white' : 'black',
                      }}
                    >
                      {text}
                    </Text>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </Col>

        <Col style={{ textAlign: 'center', marginTop: 50 }}>
          <Title style={{ color: '#3498db', marginBottom: 32 }}>
            Our Mission
          </Title>
          <Row justify="center" align="middle" gutter={[32, 32]}>
            <Col xs={24} md={12}>
              <img
                src={mission}
                alt="mission"
                style={{
                  width: '96.5%',
                  borderRadius: '25px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </Col>
            <Col xs={24} md={12}>
              <Text
                type="secondary"
                style={{
                  fontSize: 20,
                  display: 'block',
                  textAlign: 'center',
                  color: theme ? 'white' : 'black',
                }}
              >
                Our mission is to provide healthcare professionals with
                accurate, actionable insights to make informed decisions for
                their patients. By leveraging advanced AI and genomic data, we
                aim to improve patient care, enhance diagnostic accuracy, and
                support personalized treatment plans.
              </Text>
            </Col>
          </Row>
        </Col>
        <Col style={{ textAlign: 'center', marginTop: 25, padding: '24px' }}>
          <Title level={1} style={{ color: '#3498db', marginBottom: 32 }}>
            Partner With Us
          </Title>
          <Carousel
            autoplay
            autoplaySpeed={2000}
            dots={false}
            slidesToShow={
              width > 1200 ? 4 : width > 900 ? 3 : width > 600 ? 2 : 1
            }
            slidesToScroll={1}
            infinite
            style={{ padding: '40px' }}
          >
            {partners.map((partner, index) => (
              <Col
                style={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
                key={index}
              >
                <Title
                  level={4}
                  style={{
                    color: theme ? 'white' : '#2c3e50',
                    textAlign: 'center',
                    fontSize: '17px',
                  }}
                >
                  {partner.name}
                </Title>
                <Row
                  style={{
                    height: '250px',
                    padding: '15px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={partner.image}
                    alt={partner.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '25px',
                    }}
                  />
                </Row>
                <Text
                  type="secondary"
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    marginTop: '10px',
                    marginBottom: '10px',
                    marginLeft: '10px',
                    marginRight: '10px',
                    color: theme ? 'white' : 'black',
                  }}
                >
                  {partner.description}
                </Text>
              </Col>
            ))}
          </Carousel>
        </Col>
      </Col>
    </Row>
  );
}

export default HomePage;