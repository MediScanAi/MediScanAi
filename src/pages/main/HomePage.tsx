import { Typography, Row, Col, Card, Carousel, List, Button } from 'antd';
import 'antd/dist/reset.css';
import {
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
// import group99 from '../../assets/photos/Group 99.png';
import group101 from '../../assets/photos/Group 101.png';
import illustation from '../../assets/photos/illustration.svg';
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
            <Text style={{ color: '#3498db', fontSize: '25px', fontWeight: 'bold', marginBottom: '10px',fontFamily: 'Poppins', }}>
              Welcome
            </Text>
            <Title style={{ color: 'black', fontWeight: 'bold', fontSize: '50px',fontFamily: 'Poppins', }}>
              MediScanAi Platform
            </Title>
            <Text style={{ color: 'black', fontSize: '22px', fontWeight: 'bold',fontFamily: 'Poppins', }}>
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
              }}
              onClick={() => navigate('/tests-form/blood-test')}
            >
              Consult Today
            </Button>
          </Col>
          <Col>
            <img
              src={illustation}
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
            <Title level={1} style={{ color: 'black', fontWeight: 'bold',fontFamily: 'Poppins', }}>
              Our Activity
            </Title>
            <Text style={{ color: 'black', fontSize: '22px', fontWeight: 'bold',fontFamily: 'Poppins', }}>
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
                      <Title level={4} style={{ color: '#2c3e50', textAlign: 'left',fontFamily: 'Poppins', }}>
                        {title}
                      </Title>
                      <Text style={{ color: '#2c3e50', fontSize: '15px', textAlign: 'left',fontFamily: 'Poppins', }}>
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
            <Title style={{ color: 'black', fontWeight: 'bold', fontSize: '50px',fontFamily: 'Poppins', }}>
              Leading Medicine
            </Title>
            <Text style={{ color: 'black', fontSize: '22px', fontWeight: 'bold',fontFamily: 'Poppins', }}>
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
                        fontFamily: 'Poppins',
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
                        fontFamily: 'Poppins',
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
        <Col style={{ textAlign: 'center', marginTop: 25, padding: '24px' }}>
          <Title level={1} style={{ color: '#3498db', marginBottom: 32,fontFamily: 'Poppins', }}>
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