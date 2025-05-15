import React from 'react';
import { Descriptions, Typography, Card, Divider, Row, Col } from 'antd';
import {
  HeartOutlined,
  ExperimentOutlined,
  MedicineBoxOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
const { Title, Text } = Typography;

const AnalysisHistory: React.FC = () => {
  const bloodTestData = JSON.parse(
    localStorage.getItem('bloodTestData') || '{}'
  );
  const urineTestData = JSON.parse(
    localStorage.getItem('urineTestData') || '{}'
  );
  const vitaminTestData = JSON.parse(
    localStorage.getItem('vitaminTestData') || '{}'
  );
  const geneticTestData = JSON.parse(
    localStorage.getItem('geneticTestData') || '{}'
  );

  const testBloodResults = [
    {
      name: 'Hemoglobin',
      value: bloodTestData.hemoglobin,
      unit: 'g/dL',
      normalRange: '13.5-17.5',
      icon: <HeartOutlined />,
    },
    {
      name: 'White Blood Cells',
      value: bloodTestData.wbc,
      unit: '10³/μL',
      normalRange: '4.5-11.0',
      icon: <ExperimentOutlined />,
    },
    {
      name: 'Red Blood Cells',
      value: bloodTestData.rbc,
      unit: '10⁶/μL',
      normalRange: '4.5-5.9',
      icon: <MedicineBoxOutlined />,
    },
    {
      name: 'Platelets',
      value: bloodTestData.platelets,
      unit: '10³/μL',
      normalRange: '150-450',
      icon: <DashboardOutlined />,
    },
    {
      name: 'Glucose',
      value: bloodTestData.glucose,
      unit: 'mg/dL',
      normalRange: '70-99',
      icon: <ExperimentOutlined />,
    },
    {
      name: 'Cholesterol',
      value: bloodTestData.cholesterol,
      unit: 'mg/dL',
      normalRange: '<200',
      icon: <HeartOutlined />,
    },
  ];

  const testUrineResults = [
    {
      name: 'Ph',
      value: urineTestData.ph,
      unit: 'pH',
      normalRange: '4.5-7.5',
      icon: <HeartOutlined />,
    },
    {
      name: 'Specific Gravity',
      value: urineTestData.specificGravity,
      unit: 'g/dL',
      normalRange: '1.005-1.030',
      icon: <ExperimentOutlined />,
    },
    {
      name: 'Protein',
      value: urineTestData.protein,
      unit: 'mg/dL',
      normalRange: '0-150',
      icon: <MedicineBoxOutlined />,
    },
    {
      name: 'Glucose',
      value: urineTestData.glucose,
      unit: 'mg/dL',
      normalRange: '50-100',
      icon: <ExperimentOutlined />,
    },
    {
      name: 'Ketones',
      value: urineTestData.ketones,
      unit: 'mg/dL',
      normalRange: '0-5',
      icon: <MedicineBoxOutlined />,
    },
    {
      name: 'Bilirubin',
      value: urineTestData.bilirubin,
      unit: 'mg/dL',
      normalRange: '0.3-1.0',
      icon: <MedicineBoxOutlined />,
    },
    {
      name: 'Urobilinogen',
      value: urineTestData.urobilinogen,
      unit: 'mg/dL',
      normalRange: '0-10',
      icon: <MedicineBoxOutlined />,
    },
    {
      name: 'Nitrites',
      value: urineTestData.nitrites,
      unit: 'mg/dL',
      normalRange: '0-10',
      icon: <MedicineBoxOutlined />,
    },
    {
      name: 'Leukocyte Esterase',
      value: urineTestData.leukocyteEsterase,
      unit: 'mg/dL',
      normalRange: '0-10',
      icon: <MedicineBoxOutlined />,
    },
    {
      name: 'Blood',
      value: urineTestData.blood,
      unit: 'mg/dL',
      normalRange: '0-10',
      icon: <MedicineBoxOutlined />,
    },
  ];

  const testVitaminResults = [
    {
      name: 'Vitamin A',
      value: vitaminTestData.vitaminA,
      unit: 'mg/dL',
      normalRange: '0-10',
      icon: <MedicineBoxOutlined />,
    },
    {
      name: 'Vitamin B12',
      value: vitaminTestData.vitaminB12,
      unit: 'mg/dL',
      normalRange: '0-10',
      icon: <MedicineBoxOutlined />,
    },
    {
      name: 'Vitamin C',
      value: vitaminTestData.vitaminC,
      unit: 'mg/dL',
      normalRange: '0-10',
      icon: <MedicineBoxOutlined />,
    },
    {
      name: 'Vitamin D',
      value: vitaminTestData.vitaminD,
      unit: 'mg/dL',
      normalRange: '0-10',
      icon: <MedicineBoxOutlined />,
    },
    {
      name: 'Vitamin E',
      value: vitaminTestData.vitaminE,
      unit: 'mg/dL',
      normalRange: '0-10',
      icon: <MedicineBoxOutlined />,
    },
    {
      name: 'Vitamin K',
      value: vitaminTestData.vitaminK,
      unit: 'mg/dL',
      normalRange: '0-10',
      icon: <MedicineBoxOutlined />,
    },
  ];

  const testGeneticResults = [
    {
      name: 'brca1',
      value: geneticTestData.brca1,
      unit: 'mg/dL',
      normalRange: '0-10',
      icon: <MedicineBoxOutlined />,
    },
    {
      name: 'brca2',
      value: geneticTestData.brca2,
      unit: 'mg/dL',
      normalRange: '0-10',
      icon: <MedicineBoxOutlined />,
    },
    {
      name: 'apoe',
      value: geneticTestData.apoe,
      unit: 'mg/dL',
      normalRange: '0-10',
      icon: <MedicineBoxOutlined />,
    },
    {
      name: 'mthfr',
      value: geneticTestData.mthfr,
      unit: 'mg/dL',
      normalRange: '0-10',
      icon: <MedicineBoxOutlined />,
    },
    {
      name: 'factor_v_leiden',
      value: geneticTestData.factor_v_leiden,
      unit: 'mg/dL',
      normalRange: '0-10',
      icon: <MedicineBoxOutlined />,
    },
    {
      name: 'cyp2c19',
      value: geneticTestData.cyp2c19,
      unit: 'mg/dL',
      normalRange: '0-10',
      icon: <MedicineBoxOutlined />,
    },
  ];

  return (
    <div className="analysis-container">
      <Card className="patient-card">
        <Title level={3}>Patient Analysis History</Title>
        <Divider />

        {bloodTestData && (
          <>
            <Divider orientation="left">Blood Test Results</Divider>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Last updated">
                <Text>{bloodTestData.date}</Text>
              </Descriptions.Item>
            </Descriptions>

            <Row gutter={[16, 16]}>
              {testBloodResults.map((test, index) => (
                <Col xs={24} sm={12} md={8} lg={8} xl={6} key={index}>
                  <Card hoverable>
                    <div>{test.icon}</div>
                    <Text strong>{test.name}</Text>
                    <Title level={4}>
                      {test.value || 'N/A'}{' '}
                      <Text type="secondary">{test.unit}</Text>
                    </Title>
                    <Text type="secondary">Normal: {test.normalRange}</Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}

        {urineTestData && (
          <>
            <Divider orientation="left">Urine Test Results</Divider>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Last updated">
                <Text>{urineTestData.date}</Text>
              </Descriptions.Item>
            </Descriptions>

            <Row gutter={[16, 16]}>
              {testUrineResults.map((test, index) => (
                <Col xs={24} sm={12} md={8} lg={8} xl={6} key={index}>
                  <Card hoverable>
                    <div>{test.icon}</div>
                    <Text strong>{test.name}</Text>
                    <Title level={4}>
                      {test.value || 'N/A'}{' '}
                      <Text type="secondary">{test.unit}</Text>
                    </Title>
                    <Text type="secondary">Normal: {test.normalRange}</Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
        {vitaminTestData && (
          <>
            <Divider orientation="left">Vitamin Test Results</Divider>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Last updated">
                <Text>{vitaminTestData.date}</Text>
              </Descriptions.Item>
            </Descriptions>

            <Row gutter={[16, 16]}>
              {testVitaminResults.map((test, index) => (
                <Col xs={24} sm={12} md={8} lg={8} xl={6} key={index}>
                  <Card hoverable>
                    <div>{test.icon}</div>
                    <Text strong>{test.name}</Text>
                    <Title level={4}>
                      {test.value || 'N/A'}{' '}
                      <Text type="secondary">{test.unit}</Text>
                    </Title>
                    <Text type="secondary">Normal: {test.normalRange}</Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
        {geneticTestData && (
          <>
            <Divider orientation="left">Genetic Test Results</Divider>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Last updated">
                <Text>{geneticTestData.date}</Text>
              </Descriptions.Item>
            </Descriptions>
            <Row gutter={[16, 16]}>
              {testGeneticResults.map((test, index) => (
                <Col xs={24} sm={12} md={8} lg={8} xl={6} key={index}>
                  <Card hoverable>
                    <div>{test.icon}</div>
                    <Text strong>{test.name}</Text>
                    <Title level={4}>
                      {test.value || 'N/A'}{' '}
                      <Text type="secondary">{test.unit}</Text>
                    </Title>
                    <Text type="secondary">Normal: {test.normalRange}</Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
        <Divider />
      </Card>
    </div>
  );
};

export default AnalysisHistory;
