import { Col, Row, Typography } from 'antd';
import {
  FacebookFilled,
  GooglePlusOutlined,
  InstagramOutlined,
} from '@ant-design/icons';
import '../assets/styles/footer.css';
import { useAppSelector } from '../app/hooks.ts';

const { Text, Link } = Typography;

const Footer = () => {
  const theme = useAppSelector((state) => state.theme.isDarkMode);

  return (
    <footer className={theme ? 'dark-footer' : ''}>
      <Row justify="space-around" align="middle">
        <Col xs={24} sm={12} style={{ textAlign: 'center' }}>
          <Text className={'info'}>© 2025 Your AI Doctor.</Text>
          <Text className={'info'}> All rights reserved.</Text>
        </Col>
        <Col xs={24} sm={11} className={'info'}>
          <Link href="/about-us" className={'info'}>
            About US
          </Link>
          <Link href="/profile/contact-us" className={'info'}>
            Contacts
          </Link>
          <Link href="/profile/partner-with-us" className={'info'}>
            Partner With Us
          </Link>
          <InstagramOutlined className={'info-icons'} />
          <FacebookFilled className={'info-icons'} />
          <GooglePlusOutlined className={'info-icons'} />
        </Col>
      </Row>
    </footer>
  );
};
export { Footer };
