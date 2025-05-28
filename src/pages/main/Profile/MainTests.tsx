import { Col, Card, Typography, Row, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useTranslation } from 'react-i18next';
const { Title, Text } = Typography;

interface MainTestsProps {
  theme?: boolean;
  width?: number;
}

const MainTests: React.FC<MainTestsProps> = ({ theme, width }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
    <div style={{ padding: '40px 24px' }}>
      <Title
        className={'test-title' + (theme ? ' dark-mode-text' : '')}
        level={2}
        style={{
          marginBottom: '40px',
          fontSize: width && width < 1200 ? '22px' : '36px',
        }}
      >
        {t('mainTests.fillForm')}
      </Title>

      <Row gutter={[32, 32]} justify="center">
        {testCards.map((card, index) => (
          <Col
            key={index}
            xs={24}
            sm={24}
            md={24}
            lg={12}
            xl={12}
            xxl={6}
            style={{ backgroundColor: 'transparent' }}
          >
            <Card
              className={theme ? 'dark-mode-text' : ''}
              hoverable
              onClick={card.onClick}
              style={{
                height: '220px',
                borderRadius: '16px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '24px',
                border: '2px solid #2BC0E4',
                minWidth: '200px',
                backgroundColor: 'transparent',
              }}
            >
              <div>
                <Title
                  className={'test-title' + (theme ? ' dark-mode-text' : '')}
                  level={4}
                >
                  {card.title}
                </Title>
                <Text
                  style={{
                    color: '#555',
                    fontSize: '15px',
                    display: 'block',
                    marginBottom: '16px',
                  }}
                >
                  {card.subtitle}
                </Text>
                <Button type="link" style={{ padding: 0, fontWeight: 500 }}>
                  {t('mainTests.viewMore')}
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Space
        direction="vertical"
        style={{
          width: '100%',
          marginTop: '60px',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Button
          type="primary"
          size="large"
          onClick={() => navigate('/tests-form/blood-test')}
          style={{
            height: '52px',
            padding: '0 48px',
            fontSize: '1.1rem',
            fontWeight: 600,
            borderRadius: '28px',
            background: 'linear-gradient(90deg, #2563eb, #1d4ed8)',
            boxShadow: '0 6px 16px rgba(37, 99, 235, 0.3)',
            border: 'none',
          }}
        >
          {t('mainTests.getStarted')}
        </Button>
      </Space>
    </div>
  );
};

export default MainTests;
