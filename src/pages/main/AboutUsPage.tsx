import { Row, Typography, Col, Card, Carousel } from 'antd';
import '../../assets/styles/pages/about-us-page.css';
import mission from '../../assets/photos/target.png';
import vision from '../../assets/photos/opportunity.png';
import values from '../../assets/photos/core-values.png';
import opinionImage from '../../assets/photos/quotes.png';
import teamMember1 from '../../assets/photos/TeamMemberVache.png';
import teamMember2 from '../../assets/photos/TeammemberVahe.png';
import teamMember3 from '../../assets/photos/TeamMemberArtur.png';
import teamMember4 from '../../assets/photos/TeamMemberArayik.png';
import teamMember5 from '../../assets/photos/TeamMemberDavit.png';
import { useNavigate } from 'react-router';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import PrimaryButton from '../../components/common/buttons/PrimaryButton';
import {
  GithubOutlined,
  LinkedinFilled,
  MailOutlined,
} from '@ant-design/icons';
const { Title, Paragraph, Text } = Typography;

const AboutUsPage: React.FC = () => {
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const { t } = useTranslation('aboutUs');
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

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
      description: t('aboutUs.opinions.0.description'),
    },
    {
      name: t('aboutUs.opinions.1.name'),
      description: t('aboutUs.opinions.1.description'),
    },
    {
      name: t('aboutUs.opinions.2.name'),
      description: t('aboutUs.opinions.2.description'),
    },
    {
      name: t('aboutUs.opinions.3.name'),
      description: t('aboutUs.opinions.3.description'),
    },
    {
      name: t('aboutUs.opinions.4.name'),
      description: t('aboutUs.opinions.4.description'),
    },
    {
      name: t('aboutUs.opinions.5.name'),
      description: t('aboutUs.opinions.5.description'),
    },
    {
      name: t('aboutUs.opinions.6.name'),
      description: t('aboutUs.opinions.6.description'),
    },
    {
      name: t('aboutUs.opinions.7.name'),
      description: t('aboutUs.opinions.7.description'),
    },
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

  const teamMembers = [
    {
      name: t('aboutUs.meetOurTeam.members.0.name'),
      img: teamMember1,
      links: {
        linkedin: 'https://www.linkedin.com/in/vache-aseyan-120547314/',
        github: 'https://github.com/VachAseyan',
        email: 'vacheaseyan39@gmail.com',
      },
    },
    {
      name: t('aboutUs.meetOurTeam.members.1.name'),
      img: teamMember2,
      links: {
        linkedin: 'https://www.linkedin.com/in/vahe-nersesyan-4a533a268',
        github: 'https://github.com/VaheNerseesyan',
        email: 'nersesyanvahe073@gmail.com',
      },
    },
    {
      name: t('aboutUs.meetOurTeam.members.2.name'),
      img: teamMember3,
      links: {
        linkedin: 'https://www.linkedin.com/in/artur-bagramyan/',
        github: 'https://github.com/arturbagramyan1',
        email: 'arturbaghramian@gmail.com',
      },
    },
    {
      name: t('aboutUs.meetOurTeam.members.3.name'),
      img: teamMember4,
      links: {
        linkedin: 'https://www.linkedin.com/in/arayik-avagyan-1300972b7',
        github: 'https://github.com/GolDrag3060',
        email: 'araik.avagyan.y@gmail.com',
      },
    },
    {
      name: t('aboutUs.meetOurTeam.members.4.name'),
      img: teamMember5,
      links: {
        linkedin: 'https://www.linkedin.com/in/mutafyan',
        github: 'https://github.com/mutafyan',
        email: 'davitmutafyan.work@gmail.com',
      },
    },
  ];

  return (
    <Row className={`about-us ${isDarkMode ? 'dark' : ''}`}>
      <Row className="welcome-section-about-us">
        <Col xs={22} md={16}>
          <Text className={`welcome-section-title ${isDarkMode ? 'dark' : ''}`}>
            {t('aboutUs.title')}
          </Text>
          <Paragraph
            className={`welcome-section-description ${isDarkMode ? 'dark' : ''}`}
          >
            {t('aboutUs.description')}
          </Paragraph>
          <PrimaryButton onClick={() => navigate('/profile/contact-us')}>
            {t('aboutUs.contactButton')}
          </PrimaryButton>
        </Col>
      </Row>
      <Row className="about-us-cards" justify="center">
        <Col span={24}>
          <Title
            level={1}
            className={`about-us-cards-title ${isDarkMode ? 'dark' : ''}`}
          >
            {t('aboutUs.coreValues')}
          </Title>
        </Col>

        {cardItems.map((item, index) => (
          <Col xs={24} sm={24} md={12} lg={8} key={index}>
            <Card className={`about-us-card ${isDarkMode ? 'dark' : ''}`}>
              <div className="about-us-card-content">
                <img
                  draggable={false}
                  className="about-us-card-icon"
                  src={item.img}
                  alt={item.alt}
                />
                <Title
                  level={2}
                  className={`about-us-card-title ${isDarkMode ? 'dark' : ''}`}
                >
                  {item.title}
                </Title>
                <Text
                  className={`about-us-card-text ${isDarkMode ? 'dark' : ''}`}
                >
                  {item.text}
                </Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="opinions-section">
        <Col span={24}>
          <Title
            level={1}
            className={`opinions-title ${isDarkMode ? 'dark' : ''}`}
          >
            {t('aboutUs.clientOpinions')}
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
            {opinions.map((opinion, index) => (
              <div key={index} className="opinion-card-wrapper">
                <Card
                  className={`opinion-card ${isDarkMode ? 'dark' : ''}`}
                  styles={{
                    body: {
                      padding: 20,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                    },
                  }}
                >
                  <div className="opinion-item-container">
                    <img
                      draggable={false}
                      src={opinionImage}
                      alt="opinion"
                      className="opinion-image"
                    />
                    <Text
                      className={`opinion-description ${isDarkMode ? 'dark' : ''}`}
                    >
                      {opinion.description}
                    </Text>
                    <Title
                      level={4}
                      className={`opinion-name ${isDarkMode ? 'dark' : ''}`}
                    >
                      {opinion.name}
                    </Title>
                  </div>
                </Card>
              </div>
            ))}
          </Carousel>
        </Col>
      </Row>
      <div className="team-container">
        <h2 className="team-header">{t('aboutUs.meetOurTeam.title')}</h2>
        <Paragraph
          className={`welcome-section-description ${isDarkMode ? 'dark' : ''}`}
        >
          {t('aboutUs.meetOurTeam.description')}
        </Paragraph>
        <Row
          className="team-section custom-team-layout"
          gutter={[24, 24]}
          justify="center"
        >
          {teamMembers.map((member, index) => (
            <Col key={index} xs={24} sm={20} md={12} lg={8} xl={8}>
              <div className={`team-card ${isDarkMode ? 'dark' : ''}`}>
                <img
                  src={member.img}
                  alt={member.name}
                  className="team-img"
                  draggable={false}
                />
                <div className={`team-info ${isDarkMode ? 'dark' : ''}`}>
                  <h3>{member.name}</h3>
                  <div className="name-underline"></div>
                  <div className={`member-socials ${isDarkMode ? 'dark' : ''}`}>
                    <a
                      href={member.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      <LinkedinFilled />
                    </a>
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${member.links.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Email"
                    >
                      <MailOutlined />
                    </a>
                    <a
                      href={member.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                    >
                      <GithubOutlined />
                    </a>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <Row justify="center" gutter={[32, 32]} className="location-section">
        <Col xs={24} md={10} className="location-text">
          <Title
            level={1}
            className={`location-title ${isDarkMode ? 'dark' : ''}`}
          >
            {t('aboutUs.location.title')}
          </Title>
          <Text className={`location-description ${isDarkMode ? 'dark' : ''}`}>
            {t('aboutUs.location.description')}
          </Text>
          <Text className={`location-phone ${isDarkMode ? 'dark' : ''}`}>
            {t('aboutUs.location.phone')}
          </Text>
        </Col>
        <Col xs={24} md={14} className="location-map-wrapper">
          {typeof window !== 'undefined' && (
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d97531.48691527452!2d44.498944!3d40.189952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abce69a1b0d77%3A0x31ea9da813693c2e!2sArmenian%20Code%20Academy!5e0!3m2!1sru!2sam!4v1749478067681!5m2!1sru!2sam"
              width="100%"
              height="320"
              className="iframe"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MediScanAI Map"
              allowFullScreen={true}
            ></iframe>
          )}
        </Col>
      </Row>
    </Row>
  );
}

export default AboutUsPage;
