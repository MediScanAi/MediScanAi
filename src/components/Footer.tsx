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
        <Col
          xs={24}
          sm={8}
          style={{ textAlign: 'center', marginBottom: '16px' }}
        >
          <Text className={'info'}>© 2025 Your AI Doctor.</Text>
          <Text className={'info'}> All rights reserved.</Text>
        </Col>
        <Col xs={24} sm={8} className={'info'}>
          <Link href="/" className={'info'}>
            About US
          </Link>
          <Link href="/" className={'info'}>
            Contacts
          </Link>
          <Link href="/" className={'info'}>
            Support
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
