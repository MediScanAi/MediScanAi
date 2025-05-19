import { Row, Typography, Col, Carousel, Avatar } from 'antd';
import { useAppSelector } from '../../app/hooks.ts';
import aboutUsImage from '../../assets/photos/aboutUs.webp';
import member1 from '../../assets/photos/teamMember1.webp';
import member2 from '../../assets/photos/teamMember2.webp';
import member3 from '../../assets/photos/teamMember3.webp';
import member4 from '../../assets/photos/teamMember4.webp';
import member5 from '../../assets/photos/teamMember5.webp';
import {
  CheckCircleOutlined,
  FormOutlined,
  OpenAIOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';

const { Title, Text, Paragraph } = Typography;

function AboutUsPage() {
  const theme = useAppSelector((state) => state.theme.isDarkMode);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
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

  const teamMembers = [
    {
      name: 'Vahe Nersesyan',
      role: 'Frontend Developer',
      image: member1,
    },
    {
      name: 'Vache Aseyan',
      role: 'Frontend Developer',
      image: member2,
    },
    {
      name: 'Artur Baghramyan',
      role: 'Frontend Developer',
      image: member3,
    },
    {
      name: 'Arayik Avagyan',
      role: 'Frontend Developer',
      image: member4,
    },
    {
      name: 'Davit Mutafyan',
      role: 'Frontend Developer',
      image: member5,
    },
  ];

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
            backgroundImage: `url(${aboutUsImage})`,
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
            <Title level={1} style={{ color: 'black', marginBottom: 16 }}>
              <b>About Us</b>
            </Title>
            <Text
              type="secondary"
              style={{ fontSize: 23, color: 'black', fontWeight: 500 }}
            >
              We are a team of developers who are passionate about creating
              innovative solutions for the healthcare industry.
            </Text>

            <Text
              type="secondary"
              style={{
                fontSize: 23,
                color: 'black',
                fontWeight: 500,
                marginTop: '1rem',
              }}
            >
              With backgrounds in medicine, artificial intelligence, and
              software engineering, we strive to bridge the gap between
              technology and patient care. Our goal is to make healthcare
              smarter, faster, and more accessible to everyone.
            </Text>
          </Col>
        </Row>
      </Col>
      <Col style={{ textAlign: 'center', marginTop: 25, padding: '24px' }}>
        <Title level={1} style={{ color: '#3498db', marginBottom: 16 }}>
          Meet Technologies
        </Title>
        <Col style={{ textAlign: 'center', padding: '24px' }}>
          <Paragraph
            style={{
              fontSize: 20,
              maxWidth: 800,
              margin: '0 auto',
              color: theme ? 'white' : 'black',
            }}
          >
            Discover how our AI-driven process simplifies your healthcare
            journey in 3 simple steps.
          </Paragraph>
          <Row gutter={[32, 32]} justify="center" style={{ marginTop: 40 }}>
            <Col xs={24} sm={12} md={8}>
              <FormOutlined style={{ fontSize: 48, color: '#2ecc71' }} />
              <Title
                level={4}
                style={{ marginTop: 16, color: theme ? 'white' : 'black' }}
              >
                {' '}
                Fill Out the Smart Form
              </Title>
              <Text style={{ fontSize: 16, color: theme ? 'white' : 'black' }}>
                Answer a few easy questions about your health, symptoms, and
                concerns.
              </Text>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <OpenAIOutlined style={{ fontSize: 48, color: 'black' }} />
              <Title
                level={4}
                style={{ marginTop: 16, color: theme ? 'white' : 'black' }}
              >
                Let AI Analyze
              </Title>
              <Text style={{ fontSize: 16, color: theme ? 'white' : 'black' }}>
                Our AI engine processes your responses to understand your
                condition.
              </Text>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <CheckCircleOutlined style={{ fontSize: 48, color: '#3498db' }} />
              <Title
                level={4}
                style={{ marginTop: 16, color: theme ? 'white' : 'black' }}
              >
                Get Your Results
              </Title>
              <Text style={{ fontSize: 16, color: theme ? 'white' : 'black' }}>
                Receive personalized insights, suggestions, and possible next
                steps.
              </Text>
            </Col>
          </Row>
        </Col>
      </Col>
      <Col style={{ textAlign: 'center', marginTop: 25, padding: '24px' }}>
        <Title level={1} style={{ color: '#3498db', marginBottom: 32 }}>
          Opinions
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
          {opinions.map((opinion, index) => (
            <Col
              key={index}
              style={{
                position: 'relative',
                padding: '20px',
                margin: '0 15px',
                textAlign: 'center',
                background: 'transparent',
                width: '180px',
                height: '160px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex',
                alignItems: 'center',
              }}
            >
              <Title
                level={3}
                style={{
                  color: theme ? 'white' : '#2c3e50',
                  marginBottom: '8px',
                }}
              >
                {opinion.name}
              </Title>
              <Text
                type="secondary"
                style={{
                  fontSize: 20,
                  color: theme ? 'rgba(255,255,255,0.8)' : '#7f8c8d',
                  lineHeight: '1.4',
                  textAlign: 'center',
                  fontWeight: 500,
                }}
              >
                {opinion.description}
              </Text>
            </Col>
          ))}
        </Carousel>
      </Col>
      <Col style={{ textAlign: 'center', marginTop: 25, padding: '24px' }}>
        <Title level={1} style={{ color: '#3498db', marginBottom: 16 }}>
          Our Team
        </Title>
        <Row gutter={[24, 24]} justify="center" style={{ marginTop: 40 }}>
          {teamMembers.map((member) => (
            <Col xs={24} sm={12} md={8}>
              <Avatar style={{ width: 200, height: 200 }} src={member.image} />
              <Title
                level={4}
                style={{ marginTop: 16, color: theme ? 'white' : 'black' }}
              >
                {member.name}
              </Title>
              <Text style={{ fontSize: 16, color: theme ? 'white' : 'black' }}>
                {member.role}
              </Text>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
}

export default AboutUsPage;
