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
          <Text style={{ color: 'black', fontSize: 20 }}>
            © 2025 Your AI Doctor.
          </Text>
          <Text style={{ marginLeft: 10, fontSize: 20 }}>
            {' '}
            All rights reserved.
          </Text>
        </Col>
        <Col
          xs={24}
          sm={8}
          style={{ textAlign: 'center', marginBottom: '16px', fontSize: 20 }}
        >
          <Link
            href="/"
            style={{ color: 'black', margin: '0 8px', fontSize: 20 }}
          >
            About US
          </Link>
          <Link
            href="/"
            style={{ color: 'black', margin: '0 8px', fontSize: 20 }}
          >
            Contacts
          </Link>
          <Link
            href="/"
            style={{ color: 'black', margin: '0 8px', fontSize: 20 }}
          >
            Support
          </Link>
          <InstagramOutlined
            style={{
              color: 'black',
              marginLeft: 30,
              marginRight: 8,
              fontSize: 25,
            }}
          />
          <FacebookFilled
            style={{ color: 'black', margin: '0 8px', fontSize: 25 }}
          />
          <GooglePlusOutlined
            style={{ color: 'black', margin: '0 8px', fontSize: 25 }}
          />
        </Col>
      </Row>
    </footer>
  );
};
export { Footer };
