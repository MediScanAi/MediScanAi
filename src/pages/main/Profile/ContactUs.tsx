import { Card, Typography, Row, Col } from 'antd';
import React from 'react';
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  LinkedinOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
const { Title, Text } = Typography;

export interface ContactUsProps {
  theme: boolean;
  width: number;
}

const ContactUs: React.FC<ContactUsProps> = ({ theme }) => {
  const { t } = useTranslation('contactUs');
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Card
        title={
          <Title
            className={theme ? 'dark-mode-text' : ''}
            level={2}
            style={{
              marginBottom: 10,
              color: '#3498db',
              fontWeight: 600,
              fontFamily: 'Poppins',
            }}
          >
            {t('contactUs.title')}
          </Title>
        }
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <Row style={{ marginTop: '20px' }} gutter={[0, 16]}>
          <Col style={{ marginTop: '10px' }} span={24}>
            <Text
              className={theme ? 'dark-mode-text' : ''}
              style={{ fontSize: 16, marginTop: '20px' }}
            >
              <PhoneOutlined style={{ marginRight: 8 }} />
              {t('contactUs.phone')}
            </Text>
          </Col>
          <Col style={{ marginTop: '10px' }} span={24}>
            <Text
              className={theme ? 'dark-mode-text' : ''}
              style={{ fontSize: 16 }}
            >
              <MailOutlined style={{ marginRight: 8 }} />
              {t('contactUs.email')}
              <a href="mailto:mediscan@center.com"> mediscan@center.com</a>
            </Text>
          </Col>
          <Col style={{ marginTop: '10px' }} span={24}>
            <Text
              className={theme ? 'dark-mode-text' : ''}
              style={{ fontSize: 16 }}
            >
              <EnvironmentOutlined style={{ marginRight: 8 }} />
              {t('contactUs.address')}
            </Text>
          </Col>
          <Col style={{ marginTop: '10px' }} span={24}>
            <Text
              className={theme ? 'dark-mode-text' : ''}
              style={{ fontSize: 16 }}
            >
              <ClockCircleOutlined style={{ marginRight: 8 }} />
              {t('contactUs.hours')}
            </Text>
          </Col>
          <Col style={{ marginTop: '10px' }} span={24}>
            <Text
              className={theme ? 'dark-mode-text' : ''}
              style={{ fontSize: 16 }}
            >
              <LinkedinOutlined style={{ marginRight: 8 }} />
              {t('contactUs.linkedin')}
              <a
                href="https://www.linkedin.com/company/mediscan-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mediscan Center
              </a>
            </Text>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ContactUs;
