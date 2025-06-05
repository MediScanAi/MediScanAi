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
  ClockCircleOutlined,
} from '@ant-design/icons';
import '../assets/styles/footer.css';
import { useAppSelector } from '../app/hooks.ts';
import logoLight from '../assets/photos/logo-light.svg';
import logoDark from '../assets/photos/logo-dark.svg';
import { useTranslation } from 'react-i18next';

const { Text, Link, Title } = Typography;

const Footer = () => {
  const theme = useAppSelector((state) => state.theme.isDarkMode);
  const { t } = useTranslation('footer');

  return (
    <footer className={theme ? 'dark-footer' : ''}>
      <div className="footer-container">
        <Row gutter={[32, 32]} style={{ width: '100%' }}>
          <Col xs={24} md={12} lg={8}>
            <img
              draggable={false}
              src={theme ? logoDark : logoLight}
              alt="MediScan AI Logo"
              className="footer-logo"
            />
            <Text className={`footer-description ${theme ? 'dark' : ''}`}>
              {t('footer.advancedAI')}
            </Text>
            <div className="footer-socials">
              <a href="#">
                <FacebookFilled />
              </a>
              <a href="#">
                <InstagramOutlined />
              </a>
              <a href="#">
                <LinkedinFilled />
              </a>
              <a href="#">
                <TwitterOutlined />
              </a>
              <a href="#">
                <YoutubeFilled />
              </a>
            </div>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Title level={5} className="footer-heading">
              {t('footer.company')}
            </Title>
            <div className="footer-links">
              <Link href="/about">{t('footer.aboutUs')}</Link>
              <Link href="/my-health">{t('footer.myHealth')}</Link>
              <Link href="/ai-doctor">{t('footer.aiDoctor')}</Link>
              <Link href="/profile/info">{t('footer.profile')}</Link>
              <Link href="/profile/tests">{t('footer.tests')}</Link>
              <Link href="/profile/contact-us">{t('footer.contactUs')}</Link>
            </div>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Title level={5} className="footer-heading">
              {t('footer.contactUs')}
            </Title>
            <div className="footer-contact">
              <p>
                <EnvironmentOutlined /> {t('footer.location')}
              </p>
              <p>
                <PhoneOutlined /> {t('footer.phone')}
              </p>
              <p>
                <MailOutlined /> contact@mediscan.ai
              </p>
              <p>
                <ClockCircleOutlined /> {t('footer.workingHours')}
              </p>
            </div>
          </Col>
        </Row>

        <div className="footer-bottom">
          <Text className="footer-copyright">
            © {new Date().getFullYear()} MediScan AI.{' '}
            {t('footer.allRightsReserved')} |
            <Link href="/about-us" style={{ marginLeft: '10px' }}>
              {t('footer.privacyPolicy')}
            </Link>{' '}
            |
            <Link href="/about-us" style={{ marginLeft: '10px' }}>
              {t('footer.termsOfService')}
            </Link>{' '}
            |
          </Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
