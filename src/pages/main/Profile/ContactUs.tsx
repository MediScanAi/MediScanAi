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

interface ContactUsProps {
  theme: boolean;
}

const ContactUs: React.FC<ContactUsProps> = ({ theme }) => {
  const { t } = useTranslation();
  return (
    <div style={{ minHeight: '50vh' }}>
      <Card
        title={
          <Title
            className={theme ? 'dark-mode-text' : ''}
            level={2}
            style={{ marginBottom: 0, color: '#3498db', fontWeight: 600,fontFamily: 'Poppins' }}
          >
            {t('contactUs.title')}
          </Title>
        }
        variant={'borderless'}
        style={{ borderRadius: '12px', backgroundColor: 'transparent' }}
      >
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Text
              className={theme ? 'dark-mode-text' : ''}
              style={{ fontSize: 16 }}
            >
              <PhoneOutlined style={{ marginRight: 8 }} />
              {t('contactUs.phone')}
            </Text>
          </Col>
          <Col span={24}>
            <Text
              className={theme ? 'dark-mode-text' : ''}
              style={{ fontSize: 16 }}
            >
              <MailOutlined style={{ marginRight: 8 }} />
              {t('contactUs.email')}
              <a href="mailto:mediscan@center.com">mediscan@center.com</a>
            </Text>
          </Col>
          <Col span={24}>
            <Text
              className={theme ? 'dark-mode-text' : ''}
              style={{ fontSize: 16 }}
            >
              <EnvironmentOutlined style={{ marginRight: 8 }} />
              {t('contactUs.address')}
            </Text>
          </Col>
          <Col span={24}>
            <Text
              className={theme ? 'dark-mode-text' : ''}
              style={{ fontSize: 16 }}
            >
              <ClockCircleOutlined style={{ marginRight: 8 }} />
              {t('contactUs.hours')}
            </Text>
          </Col>
          <Col span={24}>
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