import { Row, Col, Typography } from 'antd';
import {
  FacebookFilled,
  InstagramOutlined,
  LinkedinFilled,
  TwitterOutlined,
  MailOutlined,
  YoutubeFilled,
  EnvironmentOutlined,
  PhoneOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import '../assets/styles/footer.css';
import { useAppSelector } from '../app/hooks.ts';
import logoLight from '../assets/photos/logo-light.svg';
import logoDark from '../assets/photos/logo-dark.svg';


const { Text, Link, Title } = Typography;

const Footer = () => {
  const theme = useAppSelector((state) => state.theme.isDarkMode);

  return (
    <footer className={theme ? 'dark-footer' : ''}>
      <div className="footer-container">
        <Row gutter={[32, 32]} style={{ width: '100%' }}>
          <Col xs={24} md={12} lg={8}>
            <img draggable={false} src={theme ? logoDark : logoLight} alt="MediScan AI Logo" className="footer-logo" />
            <Text className='footer-description'>
              Advanced AI-powered medical diagnostics platform revolutionizing healthcare accessibility.
            </Text>
            <div className="footer-socials">
              <a href="#"><FacebookFilled /></a>
              <a href="#"><InstagramOutlined /></a>
              <a href="#"><LinkedinFilled /></a>
              <a href="#"><TwitterOutlined /></a>
              <a href="#"><YoutubeFilled /></a>
            </div>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Title level={5} className="footer-heading">Company</Title>
            <div className="footer-links">
              <Link href="/about">About Us</Link>
              <Link href="/my-health">My Health</Link>
              <Link href="/ai-doctor">AI Doctor</Link>
              <Link href="/profile/info">Profile</Link>
              <Link href="/profile/tests">Tests</Link>
              <Link href="/profile/contact-us">Contact</Link>
              <Link href="/about-us">Our Location</Link>
            </div>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Title level={5} className="footer-heading">Contact Us</Title>
            <div className="footer-contact">
              <p><EnvironmentOutlined />Yerevan, Armenia</p>
              <p><PhoneOutlined /> +374 99 198 028 (Support)</p>
              <p><MailOutlined /> contact@mediscan.ai</p>
              <p><ClockCircleOutlined /> Mon-Fri: 9:00 - 18:00</p>
            </div>
          </Col>
        </Row>

        <div className="footer-bottom">
          <Text className='footer-copyright'>
            Â© {new Date().getFullYear()} MediScan AI. All rights reserved. |
            <Link href="/about-us" style={{ marginLeft: '10px' }}>Privacy Policy</Link> |
            <Link href="/about-us" style={{ marginLeft: '10px' }}>Terms of Service</Link> |
          </Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;