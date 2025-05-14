import { Col, Row, Typography } from 'antd';
import {
  FacebookFilled,
  GooglePlusOutlined,
  InstagramOutlined,
} from '@ant-design/icons';

const { Text, Link } = Typography;

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: 'white',
        padding: '24px 0',
        marginTop: 'auto',
        borderTop: '1px solid #e8e8e8',
      }}
    >
      <Row justify="space-around" align="middle">
        <Col
          xs={24}
          sm={8}
          style={{ textAlign: 'center', marginBottom: '16px' }}
        >
          <Text style={{ color: 'black', fontSize: 16 }}>
            © 2025 Your AI Doctor.
          </Text>
          <Text style={{ marginLeft: 10, fontSize: 16 }}>
            {' '}
            All rights reserved.
          </Text>
        </Col>
        <Col
          xs={24}
          sm={8}
          style={{ textAlign: 'center', marginBottom: '16px', fontSize: 16 }}
        >
          <Link
            href="/"
            style={{ color: 'black', margin: '0 8px', fontSize: 16 }}
          >
            About US
          </Link>
          <Link
            href="/"
            style={{ color: 'black', margin: '0 8px', fontSize: 16 }}
          >
            Contacts
          </Link>
          <Link
            href="/"
            style={{ color: 'black', margin: '0 8px', fontSize: 16 }}
          >
            Support
          </Link>
          <InstagramOutlined
            style={{
              color: 'black',
              marginLeft: 30,
              marginRight: 8,
              fontSize: 20,
            }}
          />
          <FacebookFilled
            style={{ color: 'black', margin: '0 8px', fontSize: 20 }}
          />
          <GooglePlusOutlined
            style={{ color: 'black', margin: '0 8px', fontSize: 20 }}
          />
        </Col>
      </Row>
    </footer>
  );
};
export { Footer };
