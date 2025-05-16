import { Col, Card, Typography, Row, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Title, Text } = Typography;

function MainTests() {
  const navigate = useNavigate();

  const testCards = [
    {
      title: 'Blood Test',
      subtitle: 'Complete blood count & biochemistry',
      onClick: () => navigate('/tests-form/blood-test'),
    },
    {
      title: 'Urine Test',
      subtitle: 'Urinalysis & microalbumin test',
      onClick: () => navigate('/tests-form/urine-test'),
    },
    {
      title: 'Vitamin Test',
      subtitle: 'Vitamin D, B12 & minerals',
      onClick: () => navigate('/tests-form/vitamin-test'),
    },
    {
      title: 'Genetic Test',
      subtitle: 'DNA analysis & health risks',
      onClick: () => navigate('/tests-form/genetic-test'),
    },
  ];

  return (
    <div style={{ padding: '24px', margin: '0 auto' }}>
      <Title
        level={2}
        style={{ marginBottom: '24px', color: '#3498db', fontWeight: 500 }}
      >
        Fill the form to get your test results
      </Title>
      <Row gutter={[24, 24]} justify="center">
        {testCards.map((card, index) => (
          <Col key={index} xs={24} sm={12} md={12} lg={6}>
            <Card
              hoverable
              style={{
                border: 'none',
                height: '200px',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              bodyStyle={{
                padding: 0,
                height: '100%',
              }}
              onClick={card.onClick}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(3px)',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 2,
                }}
              />

              <div
                style={{
                  position: 'relative',
                  zIndex: 3,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  padding: '24px',
                }}
              >
                <Title
                  level={3}
                  style={{
                    color: 'black',
                    marginBottom: '8px',
                    fontSize: '22px',
                  }}
                >
                  {card.title}
                </Title>

                <Text
                  style={{
                    color: 'black',
                    fontSize: '15px',
                    textAlign: 'center',
                  }}
                >
                  {card.subtitle}
                </Text>

                <Button
                  type="text"
                  style={{
                    color: 'black',
                    alignSelf: 'flex-start',
                    fontWeight: 500,
                    marginTop: '16px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  View More
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
          marginTop: '48px',
          textAlign: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          type="primary"
          size="large"
          onClick={() => navigate('/tests-form/blood-test')}
          style={{
            width: '220px',
            height: '48px',
            borderRadius: '24px',
            fontWeight: 500,
            fontSize: '16px',
          }}
        >
          Start Testing
        </Button>
      </Space>
    </div>
  );
}

export default MainTests;
