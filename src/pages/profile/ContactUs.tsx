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
import '../../assets/styles/contuctUs.css';
const { Title, Text } = Typography;

export interface ContactUsProps {
  theme: boolean;
  width: number;
}

const ContactUs: React.FC<ContactUsProps> = ({ theme }) => {
  const { t } = useTranslation('contactUs');
  return (
    <div className="contact-us-container">
      <Card
        title={
          <Title
            className={`contact-us-card-title ${theme ? 'dark' : ''}`}
            level={2}
          >
            {t('contactUs.title')}
          </Title>
        }
        className="contact-us-card"
      >
        <Row className="contact-row" gutter={[0, 16]}>
          <Col className="contact-col" span={24}>
            <Text className={`contact-text ${theme ? 'dark-mode-text' : ''}`}>
              <PhoneOutlined className="contact-icon" />
              {t('contactUs.phone')}
            </Text>
          </Col>
          <Col className="contact-col" span={24}>
            <Text className={`contact-text ${theme ? 'dark-mode-text' : ''}`}>
              <MailOutlined className="contact-icon" />
              {t('contactUs.email')}
              <a href="mailto:mediscan@center.com" className="contact-link">
                {' '}
                mediscan@center.com
              </a>
            </Text>
          </Col>
          <Col className="contact-col" span={24}>
            <Text className={`contact-text ${theme ? 'dark-mode-text' : ''}`}>
              <EnvironmentOutlined className="contact-icon" />
              {t('contactUs.address')}
            </Text>
          </Col>
          <Col className="contact-col" span={24}>
            <Text className={`contact-text ${theme ? 'dark-mode-text' : ''}`}>
              <ClockCircleOutlined className="contact-icon" />
              {t('contactUs.hours')}
            </Text>
          </Col>
          <Col className="contact-col" span={24}>
            <Text className={`contact-text ${theme ? 'dark-mode-text' : ''}`}>
              <LinkedinOutlined className="contact-icon" />
              {t('contactUs.linkedin')}
              <a
                href="https://www.linkedin.com/company/mediscan-center"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
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
