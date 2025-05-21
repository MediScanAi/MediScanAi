import { Typography, Card, Divider, Row, Col, Button } from 'antd';
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
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  deleteBloodTestData,
  type BloodTestFormValues,
} from '../../../app/slices/bloodTestSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  deleteUrineTestData,
  type UrineTestFormValues,
} from '../../../app/slices/urineTestSlice';
import {
  deleteVitaminTestData,
  type VitaminTestFormValues,
} from '../../../app/slices/vitaminTestSlice';
import {
  deleteGeneticTestData,
  type GeneticTestFormValues,
} from '../../../app/slices/geneticTestSlice';

const { Title, Text } = Typography;

type AnalysisHistoryProps = {
  theme: boolean;
  width: number;
};

const AnalysisHistory: React.FC<AnalysisHistoryProps> = ({theme,width}) => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [bloodTestData, setBloodTestData] =
    useState<BloodTestFormValues | null>(
      useAppSelector((state) => state.bloodTest.bloodTestData)
    );
  const [urineTestData, setUrineTestData] =
    useState<UrineTestFormValues | null>(
      useAppSelector((state) => state.urineTest.urineTestData)
    );
  const [vitaminTestData, setVitaminTestData] =
    useState<VitaminTestFormValues | null>(
      useAppSelector((state) => state.vitaminTest.vitaminTestData)
    );
  const [geneticTestData, setGeneticTestData] =
    useState<GeneticTestFormValues | null>(
      useAppSelector((state) => state.geneticTest.geneticTestData)
    );

  const handleDeleteBloodTestData = () => {
    dispatch(deleteBloodTestData());
    setBloodTestData(null);
  };

  const sendBloodTestData = () => {
    navigate('/tests-form/blood-test', {
      state: { bloodTestData: bloodTestData },
    });
  };

  const handleDeleteUrineTestData = () => {
    dispatch(deleteUrineTestData());
    setUrineTestData(null);
  };

  const sendUrineTestData = () => {
    navigate('/tests-form/urine-test', {
      state: { urineTestData: urineTestData },
    });
  };

  const handleDeleteVitaminTestData = () => {
    dispatch(deleteVitaminTestData());
    setVitaminTestData(null);
  };

  const sendVitaminTestData = () => {
    navigate('/tests-form/vitamin-test', {
      state: { vitaminTestData: vitaminTestData },
    });
  };

  const handleDeleteGeneticTestData = () => {
    dispatch(deleteGeneticTestData());
    setGeneticTestData(null);
  };

  const sendGeneticTestData = () => {
    navigate('/tests-form/genetic-test', {
      state: { geneticTestData: geneticTestData },
    });
  };

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
  ) =>{
    const fontSize=(width<800?'10px':width<1200?'14px':'20px');
    return(
    <Row gutter={[16, 16]}>
      {testArray.map(
        (test, index) =>
          test.value !== undefined &&
          test.value !== null &&
          test.value !== '' && (
            <Col xs={12} sm={8} md={6} lg={6} xl={6} key={index}>
              <Card hoverable style={{ border: 'none' ,backgroundColor:'transparent',padding:'5px'}}>
                <div style={{ fontSize: fontSize, marginBottom: 8 }}>{test.icon}</div>
                <Text style={{fontSize: fontSize}} strong>{test.name}</Text>
                <Title level={3} style={{ margin: '8px 0',fontSize: fontSize }}>

                  {test.value}{' '}
                  {test.unit && (
                    <Text type="secondary" style={{ fontSize: fontSize }}>
                      ({test.unit})
                    </Text>
                  )}
                </Title>

                {test.normalRange && (
                  <Text style={{fontSize: fontSize}} type="secondary">Normal: {test.normalRange}</Text>
                )}
              </Card>
            </Col>
          )
      )}
    </Row>
  )};

  const hasAnyTestData =
    bloodTestData || urineTestData || vitaminTestData || geneticTestData;

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px',backgroundColor:'transparent' }}>
      <Col>
        <Card className={theme?'dark-mode-text':''  } style={{ border: 'none',backgroundColor:'transparent' }}>
          <Title level={2} style={{ marginBottom: 24, color: '#3498db',fontSize:width<800?'18px':'32px' }}>

            Patient Analysis History
          </Title>

          {!hasAnyTestData && (
            <Text
              type="secondary"
              style={{ display: 'block', marginBottom: 24,fontSize:width<800?'10px':'20px' }}
            >
              No test results available. You haven't completed any tests yet.
            </Text>
          )}

          <Row gutter={[24, 32]}>
            {bloodTestData && (
              <Col span={24}>
                <div  style={{ marginBottom: 8 ,backgroundColor:'transparent',}}>
                  <Text strong style={{ fontSize:width<800?'10px':'16px' }}>

                    Blood Test
                  </Text>
                  <Text type="secondary" style={{marginLeft: 12, fontSize:width<800?'10px':'16px'}}>
                    Last updated: {bloodTestData.date || 'Date not specified'}
                  </Text>
                  <Button
                    onClick={handleDeleteBloodTestData}
                    style={{ marginLeft: 12 ,backgroundColor:'transparent',fontSize:width<800?'10px':'16px',padding:'0 5px',minWidth:40  }}

                  >
                    Delete
                  </Button>
                  <Button
                    onClick={sendBloodTestData}
                    style={{ marginLeft: 12,backgroundColor:'transparent',fontSize:width<800?'10px':'16px',padding:'0 5px',minWidth:40  }}

                  >
                    Edit
                  </Button>
                </div>
                <Divider style={{ margin: '12px 0' }} />
                {renderTestCards(
                  testBloodResults.map((result) => ({
                    ...result,
                    value: result.value?.toString() || '',
                  }))
                )}
              </Col>
            )}

            {urineTestData && (
              <Col span={24}>
                <div style={{ marginBottom: 8 }}>
                  <Text strong style={{ fontSize:width<800?'10px':'16px' }}>
                    Urine Test
                  </Text>
                  <Text type="secondary" style={{marginLeft: 12, fontSize:width<800?'10px':'16px'}}>
                    Last updated: {urineTestData.date || 'Date not specified'}
                  </Text>
                  <Button
                    onClick={handleDeleteUrineTestData}
                    style={{ marginLeft: 12 ,backgroundColor:'transparent',fontSize:width<800?'10px':'16px',padding:'0 5px',minWidth:40  }}

                  >
                    Delete
                  </Button>
                  <Button
                    onClick={sendUrineTestData}
                    style={{ marginLeft: 12 ,backgroundColor:'transparent',fontSize:width<800?'10px':'16px',padding:'0 5px',minWidth:40  }}

                  >
                    Edit
                  </Button>
                </div>
                <Divider style={{ margin: '12px 0' }} />
                {renderTestCards(
                  testUrineResults.map((result) => ({
                    ...result,
                    value: result.value?.toString() || '',
                  }))
                )}
              </Col>
            )}

            {vitaminTestData && (
              <Col span={24}>
                <div style={{ marginBottom: 8 }}>
                  <Text strong style={{ fontSize:width<800?'10px':'16px' }}>
                    Vitamin Test
                  </Text>
                  <Text type="secondary" style={{ marginLeft: 12,fontSize:width<800?'10px':'16px' }}>
                    Last updated: {vitaminTestData.date || 'Date not specified'}
                  </Text>
                  <Button
                    onClick={handleDeleteVitaminTestData}
                    style={{ marginLeft: 12 ,backgroundColor:'transparent',fontSize:width<800?'10px':'16px',padding:'0 5px',minWidth:40  }}

                  >
                    Delete
                  </Button>
                  <Button
                    onClick={sendVitaminTestData}
                    style={{ marginLeft: 12 ,backgroundColor:'transparent',fontSize:width<800?'10px':'16px',padding:'0 5px',minWidth:40  }}

                  >
                    Edit
                  </Button>
                </div>
                <Divider style={{ margin: '12px 0' }} />
                {renderTestCards(
                  testVitaminResults.map((result) => ({
                    ...result,
                    value: result.value?.toString() || '',
                  }))
                )}
              </Col>
            )}

            {geneticTestData && (
              <Col span={24}>
                <div style={{ marginBottom: 8 }}>
                  <Text strong style={{ fontSize:width<800?'10px':'16px' }}>
                    Genetic Test
                  </Text>
                  <Text type="secondary" style={{marginLeft: 12, fontSize:width<800?'10px':'16px'}}>
                    Last updated: {geneticTestData.date || 'Date not specified'}
                  </Text>
                  <Button
                    onClick={handleDeleteGeneticTestData}
                    style={{ marginLeft: 12 ,backgroundColor:'transparent',fontSize:width<800?'10px':'16px',padding:'0 5px',minWidth:40  }}

                  >
                    Delete
                  </Button>
                  <Button
                    onClick={sendGeneticTestData}
                    style={{ marginLeft: 12 ,backgroundColor:'transparent',fontSize:width<800?'10px':'16px',padding:'0 5px',minWidth:40  }}

                  >
                    Edit
                  </Button>
                </div>
                <Divider style={{ margin: '12px 0' }} />
                {renderTestCards(
                  testGeneticResults.map((result) => ({
                    ...result,
                    value: result.value?.toString() || '',
                    unit: '',
                    normalRange: '',
                  }))
                )}
              </Col>
            )}
          </Row>
        </Card>
      </Col>
    </div>
  );
};

export default AnalysisHistory;
