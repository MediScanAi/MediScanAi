import { Col, Card, Typography, Row, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../app/hooks';
import { motion } from 'framer-motion';
import PrimaryButton from '../../components/common/PrimaryButton';
import '../../assets/styles/mainTests.css';

const { Title, Text } = Typography;

export interface MainTestsProps {
  theme: boolean;
  width: number;
}

const MainTests: React.FC<MainTestsProps> = ({ theme, width }) => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const navigate = useNavigate();
  const { t } = useTranslation('mainTests');

  const testCards = [
    {
      title: t('mainTests.bloodTest'),
      subtitle: t('mainTests.bloodTestSubtitle'),
      onClick: () => navigate('/tests-form/blood-test'),
    },
    {
      title: t('mainTests.urineTest'),
      subtitle: t('mainTests.urineTestSubtitle'),
      onClick: () => navigate('/tests-form/urine-test'),
    },
    {
      title: t('mainTests.vitaminTest'),
      subtitle: t('mainTests.vitaminTestSubtitle'),
      onClick: () => navigate('/tests-form/vitamin-test'),
    },
    {
      title: t('mainTests.geneticTest'),
      subtitle: t('mainTests.geneticTestSubtitle'),
      onClick: () => navigate('/tests-form/genetic-test'),
    },
  ];

  return (
    <div className={`modern-user-profile ${theme ? 'dark' : ''}`}>
      <Card className="profile-container">
        <Title
          level={2}
          className="profile-name"
          style={{
            fontSize: width < 1200 ? '22px' : '36px',
          }}
        >
          {t('mainTests.fillForm')}
        </Title>

        <Row gutter={[24, 24]} className="info-grid">
          {testCards.map((card, index) => (
            <Col key={index} xs={24} sm={12} md={12} lg={12} xl={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="col-motion-div"
              >
                <div
                  className={`test-info-card ${theme ? 'dark' : ''}`}
                  onClick={card.onClick}
                >
                  <div className="test-info-label">
                    <Text
                      className="info-label-text"
                      strong
                      style={{ fontSize: 18 }}
                    >
                      {card.title}
                    </Text>
                  </div>

                  <div className="test-info-value">
                    <Text
                      className={`${isDarkMode ? 'dark' : ''} test-info-value-text`}
                    >
                      {card.subtitle}
                    </Text>
                  </div>
                  <span
                    className={`span-container ${isDarkMode ? 'dark' : ''}`}
                  >
                    {t('mainTests.viewMore')}
                  </span>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>

        <Space direction="vertical" className="space-container">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <PrimaryButton
              onClick={() => navigate('/tests-form/blood-test')}
              className="get-started-button"
            >
              {t('mainTests.getStarted')}
            </PrimaryButton>
          </motion.div>
        </Space>
      </Card>
    </div>
  );
};

export default MainTests;
