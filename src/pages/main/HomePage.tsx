import { Typography, Row, Col, Card, Carousel, List, Button } from 'antd';
import 'antd/dist/reset.css';
import {
  DownOutlined,
  LineOutlined,
} from '@ant-design/icons';
import partner1 from '../../assets/photos/partner1.webp';
import partner2 from '../../assets/photos/partner2.webp';
import partner3 from '../../assets/photos/partner3.webp';
import partner4 from '../../assets/photos/partner4.webp';
import partner5 from '../../assets/photos/partner5.webp';
import partner6 from '../../assets/photos/partner6.webp';
import partner7 from '../../assets/photos/partner7.webp';
import partner8 from '../../assets/photos/partner8.webp';
import group99 from '../../assets/photos/Group 99.png';
import group101 from '../../assets/photos/Group 101.png';
// import illustation from '../../assets/photos/illustration.svg';
import frame from '../../assets/photos/Frame.svg';
import frame1 from '../../assets/photos/Frame1.svg';
import frame2 from '../../assets/photos/Frame3.svg';
import frame3 from '../../assets/photos/Frame4.svg';
import '../../assets/styles/homepage.css';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const activities = [
  {
    title: 'Data Upload',
    text: 'Securely upload your genomic data via encrypted portal',
    icon: <img src={frame} alt="frame" style={{ width: '60px', height: '100px' }} />,
    color: '#e6f7ff',
  },
  {
    title: 'AI Analysis',
    text: 'AI analyzes genomic data using multi-omic integration techniques',
    icon: <img src={frame1} alt="frame1" style={{ width: '60px', height: '100px' }} />,
    color: '#fff1b8',
  },
  {
    title: 'Insights Report',
    text: 'Receive biomarkers and recommendations in a detailed report',
    icon: <img src={frame2} alt="frame2" style={{ width: '60px', height: '100px' }} />,
    color: '#f4ffb8',
  },
  {
    title: 'Clinical Decision',
    text: 'Physicians apply findings for personalized treatment decision',
    icon: <img src={frame3} alt="frame3" style={{ width: '60px', height: '100px' }} />,
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
    <Row
      className={theme ? 'dark-theme' : ''}
      justify="center"
      align="middle"
      style={{
        minHeight: '100vh',
        padding: '20px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "space-around",
      }}
    >
      <Col style={{ width: '100%' }}>
        <Row
          style={{
            width: '100%',
            padding: '20px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '220px',
            borderRadius: '15px',
            margin: '0 auto',
          }}
        >
          <Col
            style={{
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'space-around',
            }}
          >
            <Text style={{ color: '#3498db', fontSize: '22px', fontWeight: 'bold', marginBottom: '10px', fontFamily: 'Poppins', }}>
              Welcome
            </Text>
            <Title style={{ color: 'black', fontWeight: 'bold', fontSize: '50px', fontFamily: 'Poppins', }}>
              MediScanAi Platform
            </Title>
            <Text style={{ color: 'black', fontSize: '22px', fontWeight: 'bold', fontFamily: 'Poppins', }}>
              Advanced AI-powered diagnostics and medical<br /> analysis for healthcare professionals.
            </Text>
            <Button
              type="primary"
              size="large"
              style={{
                marginTop: '20px',
                height: '50px',
                fontSize: '16px',
                fontFamily: 'Poppins',
                fontWeight: 500,
                borderRadius: '22px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                background: 'linear-gradient(45deg,rgb(100, 157, 211), #0052d9)',
                border: 'none',
                animation: 'fadeInUp 1s ease-out 0.4s forwards',
                opacity: 0,
                transition: 'all 0.3s ease',
                padding: '0 35px',
              }}
              onClick={() => navigate('/tests-form/blood-test')}
            >
              Consult Today
            </Button>
          </Col>
          <Col>
            <img
              src={group99}
              alt="platform"
              style={{
                marginTop: '20px',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '15px',
              }}
            />
          </Col>
        </Row>
        <Row
          style={{
            padding: '20px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '220px',
            borderRadius: '15px',
            margin: '0 auto',
            marginTop: '60px',
          }}
        >
          <Col
            style={{
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <Title level={1} style={{ color: 'black', fontWeight: 'bold', fontFamily: 'Poppins', }}>
              Our Activity
            </Title>
            <Text style={{ color: 'black', fontSize: '22px', fontWeight: 'bold', fontFamily: 'Poppins', }}>
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics.
            </Text>
            <Row gutter={[16, 16]} style={{ marginTop: '40px' }} align="top">
              {activities.map(({ title, text, icon }, index) => (
                <Col key={index} xs={24} sm={14} md={12} lg={6}>
                  <Card
                    style={{
                      height: '260px',
                      width: '100%',
                      borderRadius: 20,
                      overflow: 'hidden',
                      padding: '16px',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: "white",
                      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    }}
                    bodyStyle={{ padding: 0 }}
                  >
                    <div style={{ position: 'relative', zIndex: 2, textAlign: 'left' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: 12,
                        }}
                      >
                        {icon}
                      </div>
                      <Title level={4} style={{ color: '#2c3e50', textAlign: 'left', fontFamily: 'Poppins', }}>
                        {title}
                      </Title>
                      <Text style={{ color: '#2c3e50', fontSize: '15px', textAlign: 'left', fontFamily: 'Poppins', }}>
                        {text}
                      </Text>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        <Row
          style={{
            padding: '20px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '220px',
            margin: '0 auto',
            marginTop: '40px',
            width: '100%',
          }}
        >
          <Col
            style={{
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'space-around',
            }}
          >
            <LineOutlined style={{ fontSize: 68, color: 'rgb(210, 46, 18)' }} />
            <Title style={{ color: 'black', fontWeight: 'bold', fontSize: '50px', fontFamily: 'Poppins', }}>
              Leading Medicine
            </Title>
            <Text style={{ color: 'black', fontSize: '22px', fontWeight: 'bold', fontFamily: 'Poppins', }}>
              Advanced AI-powered diagnostics and medical<br /> analysis for healthcare professionals.
            </Text>
          </Col>
          <Col>
            <img
              src={group101}
              alt="platform"
              style={{
                marginTop: '20px',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '15px',
              }}
            />
          </Col>
        </Row>
        <Row
          style={{
            padding: '20px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '220px',
            margin: '0 auto',
            marginTop: '40px',
            maxWidth: '1300px',
          }}
        >

          <Col style={{ marginTop: 50, padding: '24px' }} span={24}>
            <Title
              level={1}
              style={{
                color: '#3498db',
                marginBottom: 32,
                fontFamily: 'Poppins',
                textAlign: 'center',
              }}
            >
              Frequently Asked Questions
            </Title>

            <List
              itemLayout="horizontal"
              dataSource={questions}
              split={false}
              style={{ width: '100%' }}
              renderItem={({ title, text }, index) => (
                <List.Item
                  style={{
                    padding: '16px',
                    borderBottom: theme
                      ? '1px solid rgb(52, 50, 50)'
                      : '1px solid rgb(221, 219, 219)',
                    cursor: 'pointer',
                    width: '100%',
                    borderRadius: 12,
                    transition: 'background 0.3s',
                  }}
                  onClick={() => toggleOpen(index)}
                >
                  <Row gutter={[16, 16]} style={{ width: '100%' }}>
                    <Col xs={24}>
                      <Row
                        justify="space-between"
                        style={{ width: '100%' }}
                      >
                        <Col span={22}>
                          <Title
                            level={3}
                            style={{
                              color: theme ? 'gray' : '#2c3e50',
                              margin: 0,
                              fontFamily: 'Poppins',
                            }}
                          >
                            {title}
                          </Title>
                        </Col>
                        <Col span={2} style={{ textAlign: 'right' }}>
                          <DownOutlined
                            style={{
                              transition: 'transform 0.3s',
                              transform:
                                openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                              fontSize: 20,
                              color: theme ? 'white' : 'black',
                            }}
                          />
                        </Col>
                      </Row>

                      {openIndex === index && (
                        <Text
                          type="secondary"
                          style={{
                            fontSize: '20px',
                            display: 'block',
                            color: theme ? 'white' : 'black',
                            fontFamily: 'Poppins',
                            marginTop: 12,
                            fontWeight: 300,
                            lineHeight: 1.5,
                          }}
                        >
                          {text}
                        </Text>
                      )}
                    </Col>
                  </Row>
                </List.Item>
              )}
            />
          </Col>
        </Row>

        <Col style={{ textAlign: 'center', marginTop: 25, padding: '24px' }}>
          <Title level={1} style={{ color: '#3498db', marginBottom: 32, fontFamily: 'Poppins', }}>
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
                    fontFamily: 'Poppins',
                    fontWeight: 'semibold',
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
                    fontFamily: 'Poppins',
                    fontWeight: 'semibold',
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