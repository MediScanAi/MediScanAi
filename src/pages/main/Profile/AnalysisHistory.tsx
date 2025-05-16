import { Typography, Card, Divider, Row, Col } from 'antd';
import {
  HeartOutlined,
  AlertOutlined,
  FundOutlined,
  DashboardOutlined,
  ExperimentOutlined,
  MedicineBoxOutlined,
  SafetyCertificateOutlined,
  FireOutlined,
  EyeOutlined,
  SmileOutlined,
  ThunderboltOutlined,
  SolutionOutlined,
  SunOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const AnalysisHistory: React.FC = () => {
  const hasTestData = (testData: { [key: string]: string | number | null }) => {
    if (!testData) return false;
    return Object.values(testData).some(
      (val) => val !== undefined && val !== null && val !== ''
    );
  };

  const getDataFromStorage = (key: string) => {
    const item = localStorage.getItem(key);
    const parsed = item ? JSON.parse(item) : null;
    return hasTestData(parsed) ? parsed : null;
  };

  const bloodTestData = getDataFromStorage('bloodTestData');
  const urineTestData = getDataFromStorage('urineTestData');
  const vitaminTestData = getDataFromStorage('vitaminTestData');
  const geneticTestData = getDataFromStorage('geneticTestData');

  const testBloodResults = [
    {
      name: 'Hemoglobin',
      value: bloodTestData?.hemoglobin,
      unit: 'g/dL',
      normalRange: '13.5-17.5',
      icon: <HeartOutlined />,
    },
    {
      name: 'White Blood Cells',
      value: bloodTestData?.wbc,
      unit: '10³/μL',
      normalRange: '4.5-11.0',
      icon: <AlertOutlined />,
    },
    {
      name: 'Red Blood Cells',
      value: bloodTestData?.rbc,
      unit: '10⁶/μL',
      normalRange: '4.5-5.9',
      icon: <FundOutlined />,
    },
    {
      name: 'Platelets',
      value: bloodTestData?.platelets,
      unit: '10³/μL',
      normalRange: '150-450',
      icon: <DashboardOutlined />,
    },
    {
      name: 'Glucose',
      value: bloodTestData?.glucose,
      unit: 'mg/dL',
      normalRange: '70-99',
      icon: <ExperimentOutlined />,
    },
    {
      name: 'Cholesterol',
      value: bloodTestData?.cholesterol,
      unit: 'mg/dL',
      normalRange: '<200',
      icon: <HeartOutlined />,
    },
  ];

  const testUrineResults = [
    {
      name: 'pH',
      value: urineTestData?.ph,
      unit: 'pH',
      normalRange: '4.5-7.5',
      icon: <ExperimentOutlined />,
    },
    {
      name: 'Specific Gravity',
      value: urineTestData?.specificGravity,
      unit: 'g/dL',
      normalRange: '1.005-1.030',
      icon: <DashboardOutlined />,
    },
    {
      name: 'Protein',
      value: urineTestData?.protein,
      unit: 'mg/dL',
      normalRange: '0-150',
      icon: <MedicineBoxOutlined />,
    },
    {
      name: 'Glucose',
      value: urineTestData?.glucose,
      unit: 'mg/dL',
      normalRange: '50-100',
      icon: <ExperimentOutlined />,
    },
    {
      name: 'Ketones',
      value: urineTestData?.ketones,
      unit: 'mg/dL',
      normalRange: '0-5',
      icon: <FireOutlined />,
    },
    {
      name: 'Bilirubin',
      value: urineTestData?.bilirubin,
      unit: 'mg/dL',
      normalRange: '0.3-1.0',
      icon: <MedicineBoxOutlined />,
    },
  ];

  const testVitaminResults = [
    {
      name: 'Vitamin A',
      value: vitaminTestData?.vitaminA,
      unit: 'mg/dL',
      normalRange: '0-10',
      icon: <EyeOutlined />,
    },
    {
      name: 'Vitamin B12',
      value: vitaminTestData?.vitaminB12,
      unit: 'mg/dL',
      normalRange: '0-10',
      icon: <ThunderboltOutlined />,
    },
    {
      name: 'Vitamin C',
      value: vitaminTestData?.vitaminC,
      unit: 'mg/dL',
      normalRange: '0-10',
      icon: <SmileOutlined />,
    },
    {
      name: 'Vitamin D',
      value: vitaminTestData?.vitaminD,
      unit: 'mg/dL',
      normalRange: '0-10',
      icon: <SunOutlined />,
    },
    {
      name: 'Vitamin E',
      value: vitaminTestData?.vitaminE,
      unit: 'mg/dL',
      normalRange: '0-10',
      icon: <MedicineBoxOutlined />,
    },
    {
      name: 'Vitamin K',
      value: vitaminTestData?.vitaminK,
      unit: 'mg/dL',
      normalRange: '0-10',
      icon: <SolutionOutlined />,
    },
  ];

  const testGeneticResults = [
    { name: 'BRCA1', value: geneticTestData?.brca1, icon: <HeartOutlined /> },
    { name: 'BRCA2', value: geneticTestData?.brca2, icon: <HeartOutlined /> },
    {
      name: 'APOE',
      value: geneticTestData?.apoe,
      icon: <SafetyCertificateOutlined />,
    },
    {
      name: 'MTHFR',
      value: geneticTestData?.mthfr,
      icon: <SafetyCertificateOutlined />,
    },
    {
      name: 'Factor V Leiden',
      value: geneticTestData?.factor_v_leiden,
      icon: <SafetyCertificateOutlined />,
    },
    {
      name: 'CYP2C19',
      value: geneticTestData?.cyp2c19,
      icon: <SafetyCertificateOutlined />,
    },
  ];

  const renderTestCards = (
    testArray: {
      name: string;
      value: string;
      unit: string;
      normalRange: string;
      icon: React.ReactNode;
    }[]
  ) => (
    <Row gutter={[16, 16]}>
      {testArray.map(
        (test, index) =>
          test.value !== undefined &&
          test.value !== null &&
          test.value !== '' && (
            <Col xs={24} sm={12} md={8} lg={6} xl={6} key={index}>
              <Card hoverable style={{ border: 'none' }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{test.icon}</div>
                <Text strong>{test.name}</Text>
                <Title level={3} style={{ margin: '8px 0' }}>
                  {test.value}{' '}
                  {test.unit && (
                    <Text type="secondary" style={{ fontSize: 25 }}>
                      ({test.unit})
                    </Text>
                  )}
                </Title>
                {test.normalRange && (
                  <Text type="secondary">Normal: {test.normalRange}</Text>
                )}
              </Card>
            </Col>
          )
      )}
    </Row>
  );

  const hasAnyTestData =
    bloodTestData || urineTestData || vitaminTestData || geneticTestData;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px' }}>
      <Card style={{ border: 'none' }}>
        <Title level={2} style={{ marginBottom: 24, color: '#3498db' }}>
          Patient Analysis History
        </Title>

        {!hasAnyTestData && (
          <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
            No test results available. You haven't completed any tests yet.
          </Text>
        )}

        <Row gutter={[24, 32]}>
          {bloodTestData && (
            <Col span={24}>
              <div style={{ marginBottom: 8 }}>
                <Text strong style={{ fontSize: 16 }}>
                  Blood Test
                </Text>
                <Text type="secondary" style={{ marginLeft: 12 }}>
                  Last updated: {bloodTestData.date || 'Date not specified'}
                </Text>
              </div>
              <Divider style={{ margin: '12px 0' }} />
              {renderTestCards(testBloodResults)}
            </Col>
          )}

          {urineTestData && (
            <Col span={24}>
              <div style={{ marginBottom: 8 }}>
                <Text strong style={{ fontSize: 16 }}>
                  Urine Test
                </Text>
                <Text type="secondary" style={{ marginLeft: 12 }}>
                  Last updated: {urineTestData.date || 'Date not specified'}
                </Text>
              </div>
              <Divider style={{ margin: '12px 0' }} />
              {renderTestCards(testUrineResults)}
            </Col>
          )}

          {vitaminTestData && (
            <Col span={24}>
              <div style={{ marginBottom: 8 }}>
                <Text strong style={{ fontSize: 16 }}>
                  Vitamin Test
                </Text>
                <Text type="secondary" style={{ marginLeft: 12 }}>
                  Last updated: {vitaminTestData.date || 'Date not specified'}
                </Text>
              </div>
              <Divider style={{ margin: '12px 0' }} />
              {renderTestCards(testVitaminResults)}
            </Col>
          )}

          {geneticTestData && (
            <Col span={24}>
              <div style={{ marginBottom: 8 }}>
                <Text strong style={{ fontSize: 16 }}>
                  Genetic Test
                </Text>
                <Text type="secondary" style={{ marginLeft: 12 }}>
                  Last updated: {geneticTestData.date || 'Date not specified'}
                </Text>
              </div>
              <Divider style={{ margin: '12px 0' }} />
              {renderTestCards(
                testGeneticResults.map((result) => ({
                  ...result,
                  unit: '',
                  normalRange: '',
                }))
              )}
            </Col>
          )}
        </Row>
      </Card>
    </div>
  );
};

export default AnalysisHistory;
