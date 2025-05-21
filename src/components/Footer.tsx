import { Col, Row, Typography } from 'antd';
import {
  FacebookFilled,
  InstagramOutlined, LinkedinFilled, MailFilled,
} from '@ant-design/icons';
import '../assets/styles/footer.css';
import { useAppSelector } from '../app/hooks.ts';

const { Text, Link } = Typography;

const Footer = () => {
  const theme = useAppSelector((state) => state.theme.isDarkMode);

  return (
    <footer className={theme ? 'dark-footer' : ''}>
      <Row justify="space-around" align="middle">
        <Col xs={24} sm={12} lg={12} style={{ textAlign: 'center' }}>
          <Text className={'info'}>© 2025 Your AI Doctor.</Text>
          <Text className={'info'}> All rights reserved.</Text>
        </Col>
        <Col xs={20} sm={12} lg={11} className={'info'}>
          <Link href="/about-us" className={'info'}>
            About US
          </Link>
          <Link href="/profile/contact-us" className={'info'}>
            Contacts
          </Link>
          <Link href="/profile/partner-with-us" className={'info'}>
            Partner With Us
          </Link>
        </Col>
      </Row>
      <Row  justify={'center'}>
        <Col xs={12} sm={12} className={'info'} >
          <InstagramOutlined className={'info-icons'} />
          <FacebookFilled className={'info-icons'} />
          <MailFilled className={'info-icons'} />
          <LinkedinFilled className={'info-icons'} />
        </Col>
      </Row>
    </footer>
  );
};
export { Footer };
