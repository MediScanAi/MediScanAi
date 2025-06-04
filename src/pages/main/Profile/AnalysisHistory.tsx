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
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deleteTestData, clearTestData } from '../../../app/slices/testSlice';
import { useNavigate } from 'react-router';
import { type TestType } from '../../../app/slices/testSlice';
import { useTranslation } from 'react-i18next';
import { auth } from '../../../api/authApi';
import SecondaryButton from '../../../components/common/SecondaryButton';
import PrimaryButton from '../../../components/common/PrimaryButton';

const { Title, Text } = Typography;

type AnalysisHistoryProps = {
  theme: boolean;
  width: number;
};

const AnalysisHistory: React.FC<AnalysisHistoryProps> = ({ theme, width }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation('analysisHistory');
  const bloodTestData = useAppSelector((state) => state.tests.blood);
  const urineTestData = useAppSelector((state) => state.tests.urine);
  const vitaminTestData = useAppSelector((state) => state.tests.vitamin);
  const geneticTestData = useAppSelector((state) => state.tests.genetic);

  const handleDeleteTest = async (testType: TestType) => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      console.error('No user logged in');
      return;
    }

    try {
      dispatch(deleteTestData({ uid, testType }));
      dispatch(clearTestData(testType));
    } catch (error) {
      console.error(`Error deleting ${testType} test:`, error);
    }
  };

  const sendBloodTestData = () => {
    navigate('/tests-form/blood-test', {
      state: { bloodTestData: bloodTestData },
    });
  };

  const sendUrineTestData = () => {
    navigate('/tests-form/urine-test', {
      state: { urineTestData: urineTestData },
    });
  };

  const sendVitaminTestData = () => {
    navigate('/tests-form/vitamin-test', {
      state: { vitaminTestData: vitaminTestData },
    });
  };

  const sendGeneticTestData = () => {
    navigate('/tests-form/genetic-test', {
      state: { geneticTestData: geneticTestData },
    });
  };

  const testBloodResults = [
    {
      name: t('analysisHistory.hemoglobin'),
      value: bloodTestData?.hemoglobin,
      unit: t('analysisHistory.hemoglobinUnit'),
      normalRange: '13.5-17.5',
      icon: <HeartOutlined />,
    },
    {
      name: t('analysisHistory.whiteBloodCells'),
      value: bloodTestData?.wbc,
      unit: t('analysisHistory.whiteBloodCellsUnit'),
      normalRange: '4.5-11.0',
      icon: <AlertOutlined />,
    },
    {
      name: t('analysisHistory.redBloodCells'),
      value: bloodTestData?.rbc,
      unit: t('analysisHistory.redBloodCellsUnit'),
      normalRange: '4.5-5.9',
      icon: <FundOutlined />,
    },
    {
      name: t('analysisHistory.platelets'),
      value: bloodTestData?.platelets,
      unit: t('analysisHistory.plateletsUnit'),
      normalRange: '150-450',
      icon: <DashboardOutlined />,
    },
    {
      name: t('analysisHistory.glucose'),
      value: bloodTestData?.glucose,
      unit: t('analysisHistory.glucoseUnit'),
      normalRange: '70-99',
      icon: <ExperimentOutlined />,
    },
    {
      name: t('analysisHistory.cholesterol'),
      value: bloodTestData?.cholesterol,
      unit: t('analysisHistory.cholesterolUnit'),
      normalRange: '<200',
      icon: <HeartOutlined />,
    },
  ];

  const testUrineResults = [
    {
      name: t('analysisHistory.ph'),
      value: urineTestData?.ph,
      unit: t('analysisHistory.phUnit'),
      normalRange: '4.5-7.5',
      icon: <ExperimentOutlined />,
    },
    {
      name: t('analysisHistory.specificGravity'),
      value: urineTestData?.specificGravity,
      unit: t('analysisHistory.specificGravityUnit'),
      normalRange: '1.005-1.030',
      icon: <DashboardOutlined />,
    },
    {
      name: t('analysisHistory.protein'),
      value: urineTestData?.protein,
      unit: t('analysisHistory.proteinUnit'),
      normalRange: '0-150',
      icon: <MedicineBoxOutlined />,
    },
    {
      name: t('analysisHistory.glucose'),
      value: urineTestData?.glucose,
      unit: t('analysisHistory.glucoseUnit'),
      normalRange: '50-100',
      icon: <ExperimentOutlined />,
    },
    {
      name: t('analysisHistory.ketones'),
      value: urineTestData?.ketones,
      unit: t('analysisHistory.ketonesUnit'),
      normalRange: '0-5',
      icon: <FireOutlined />,
    },
    {
      name: t('analysisHistory.bilirubin'),
      value: urineTestData?.bilirubin,
      unit: t('analysisHistory.bilirubinUnit'),
      normalRange: '0.3-1.0',
      icon: <MedicineBoxOutlined />,
    },
    {
      name: t('analysisHistory.urobilinogen'),
      value: urineTestData?.urobilinogen,
      unit: t('analysisHistory.urobilinogenUnit'),
      normalRange: '0-10',
      icon: <DashboardOutlined />,
    },
    {
      name: t('analysisHistory.nitrite'),
      value: urineTestData?.nitrites,
      unit: t('analysisHistory.nitriteUnit'),
      normalRange: '0-10',
      icon: <MedicineBoxOutlined />,
    },
    {
      name: t('analysisHistory.leukocyteEsterase'),
      value: urineTestData?.leukocyteEsterase,
      unit: t('analysisHistory.leukocyteEsteraseUnit'),
      normalRange: '0-10',
      icon: <ExperimentOutlined />,
    },
    {
      name: t('analysisHistory.blood'),
      value: urineTestData?.blood,
      unit: t('analysisHistory.bloodUnit'),
      normalRange: '0-10',
      icon: <HeartOutlined />,
    },
  ];

  const testVitaminResults = [
    {
      name: t('analysisHistory.vitaminA'),
      value: vitaminTestData?.vitaminA,
      unit: t('analysisHistory.vitaminAUnit'),
      normalRange: '0-10',
      icon: <EyeOutlined />,
    },
    {
      name: t('analysisHistory.vitaminB12'),
      value: vitaminTestData?.vitaminB12,
      unit: t('analysisHistory.vitaminB12Unit'),
      normalRange: '0-10',
      icon: <ThunderboltOutlined />,
    },
    {
      name: t('analysisHistory.vitaminC'),
      value: vitaminTestData?.vitaminC,
      unit: t('analysisHistory.vitaminCUnit'),
      normalRange: '0-10',
      icon: <SmileOutlined />,
    },
    {
      name: t('analysisHistory.vitaminD'),
      value: vitaminTestData?.vitaminD,
      unit: t('analysisHistory.vitaminDUnit'),
      normalRange: '0-10',
      icon: <SunOutlined />,
    },
    {
      name: t('analysisHistory.vitaminE'),
      value: vitaminTestData?.vitaminE,
      unit: t('analysisHistory.vitaminEUnit'),
      normalRange: '0-10',
      icon: <MedicineBoxOutlined />,
    },
    {
      name: t('analysisHistory.vitaminK'),
      value: vitaminTestData?.vitaminK,
      unit: t('analysisHistory.vitaminKUnit'),
      normalRange: '0-10',
      icon: <SolutionOutlined />,
    },
  ];

  const testGeneticResults = [
    {
      name: t('analysisHistory.brca1'),
      value: geneticTestData?.brca1,
      icon: <HeartOutlined />,
    },
    {
      name: t('analysisHistory.brca2'),
      value: geneticTestData?.brca2,
      icon: <HeartOutlined />,
    },
    {
      name: t('analysisHistory.apoe'),
      value: geneticTestData?.apoe,
      icon: <SafetyCertificateOutlined />,
    },
    {
      name: t('analysisHistory.mthfr'),
      value: geneticTestData?.mthfr,
      icon: <SafetyCertificateOutlined />,
    },
    {
      name: t('analysisHistory.factorVLeiden'),
      value: geneticTestData?.factor_v_leiden,
      icon: <SafetyCertificateOutlined />,
    },
    {
      name: t('analysisHistory.cyp2c19'),
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
  ) => {
    return (
      <div style={{ padding: '16px' }}>
        <Row gutter={[24, 16]} className="info-grid">
          {testArray.map(
            (test, index) =>
              test.value !== undefined &&
              test.value !== null &&
              test.value !== '' && (
                <Col xs={24} sm={12} md={8} key={index}>
                  <div className={`info-card ${theme ? 'dark' : ''}`}>
                    <div className="info-label">
                      {test.icon}
                      <Text className="info-label-text" strong>
                        {test.name}
                      </Text>
                    </div>

                    <div className="view-mode-container">
                      <div className="info-value">
                        <Text className="info-value-text">
                          {test.value}
                          {test.unit && (
                            <span className="unit"> ({test.unit})</span>
                          )}
                        </Text>
                      </div>
                    </div>

                    {test.normalRange && (
                      <div className="info-value">
                        <Text className="info-value-text" type="secondary">
                          Normal: {test.normalRange}
                        </Text>
                      </div>
                    )}
                  </div>
                </Col>
              )
          )}
        </Row>
      </div>
    );
  };

  const hasAnyTestData =
    bloodTestData || urineTestData || vitaminTestData || geneticTestData;

  return (
    <div className="analysis-history-container">
      <Col>
        <Card className={`analysis-card ${theme ? 'dark-mode-text' : ''}`}>
          <Title
            level={2}
            className="analysis-title"
            style={{ fontSize: width < 800 ? '18px' : '32px' }}
          >
            {t('analysisHistory.title')}
          </Title>

          {!hasAnyTestData && (
            <Text
              type="secondary"
              className="no-test-results"
              style={{ fontSize: width < 800 ? '10px' : '20px' }}
            >
              {t('analysisHistory.noTestResults')}
            </Text>
          )}

          <Row gutter={[24, 32]}>
            {bloodTestData && (
              <Col span={20}>
                <div className="test-header">
                  <Text
                    strong
                    style={{ fontSize: width < 800 ? '10px' : '16px' }}
                  >
                    {t('analysisHistory.bloodTest')}
                  </Text>
                  <Text
                    type="secondary"
                    className="last-updated"
                    style={{ fontSize: width < 800 ? '10px' : '16px' }}
                  >
                    {t('analysisHistory.lastUpdated')}
                    {bloodTestData.date ||
                      t('analysisHistory.dateNotSpecified')}
                  </Text>
                  <PrimaryButton
                    onClick={sendBloodTestData}
                    className="edit-button"
                    style={{ fontSize: width < 800 ? '10px' : '16px' }}
                  >
                    {t('analysisHistory.edit')}
                  </PrimaryButton>
                  <SecondaryButton
                    onClick={() => handleDeleteTest('blood')}
                    className="delete-button"
                    style={{ fontSize: width < 800 ? '10px' : '16px' }}
                  >
                    {t('analysisHistory.delete')}
                  </SecondaryButton>
                </div>
                <Divider className="test-divider" />
                {renderTestCards(
                  testBloodResults.map((result) => ({
                    ...result,
                    value: result.value?.toString() || '',
                  }))
                )}
              </Col>
            )}

            {urineTestData && (
              <Col span={20}>
                <div className="test-header">
                  <Text
                    strong
                    style={{ fontSize: width < 800 ? '10px' : '16px' }}
                  >
                    {t('analysisHistory.urineTest')}
                  </Text>
                  <Text
                    type="secondary"
                    className="last-updated"
                    style={{ fontSize: width < 800 ? '10px' : '16px' }}
                  >
                    {t('analysisHistory.lastUpdated')}
                    {urineTestData.date ||
                      t('analysisHistory.dateNotSpecified')}
                  </Text>
                  <PrimaryButton
                    onClick={sendUrineTestData}
                    className="edit-button"
                    style={{ fontSize: width < 800 ? '10px' : '16px' }}
                  >
                    {t('analysisHistory.edit')}
                  </PrimaryButton>
                  <SecondaryButton
                    onClick={() => handleDeleteTest('urine')}
                    className="delete-button"
                    style={{ fontSize: width < 800 ? '10px' : '16px' }}
                  >
                    {t('analysisHistory.delete')}
                  </SecondaryButton>
                </div>
                <Divider className="test-divider" />
                {renderTestCards(
                  testUrineResults.map((result) => ({
                    ...result,
                    value: result.value?.toString() || '',
                  }))
                )}
              </Col>
            )}

            {vitaminTestData && (
              <Col span={20}>
                <div className="test-header">
                  <Text
                    strong
                    style={{ fontSize: width < 800 ? '10px' : '16px' }}
                  >
                    {t('analysisHistory.vitaminTest')}
                  </Text>
                  <Text
                    type="secondary"
                    className="last-updated"
                    style={{ fontSize: width < 800 ? '10px' : '16px' }}
                  >
                    {t('analysisHistory.lastUpdated')}
                    {vitaminTestData.date ||
                      t('analysisHistory.dateNotSpecified')}
                  </Text>
                  <PrimaryButton
                    onClick={sendVitaminTestData}
                    className="edit-button"
                    style={{ fontSize: width < 800 ? '10px' : '16px' }}
                  >
                    {t('analysisHistory.edit')}
                  </PrimaryButton>
                  <SecondaryButton
                    onClick={() => handleDeleteTest('vitamin')}
                    className="delete-button"
                    style={{ fontSize: width < 800 ? '10px' : '16px' }}
                  >
                    {t('analysisHistory.delete')}
                  </SecondaryButton>
                </div>
                <Divider className="test-divider" />
                {renderTestCards(
                  testVitaminResults.map((result) => ({
                    ...result,
                    value: result.value?.toString() || '',
                  }))
                )}
              </Col>
            )}

            {geneticTestData && (
              <Col span={20}>
                <div className="test-header">
                  <Text
                    strong
                    style={{ fontSize: width < 800 ? '10px' : '16px' }}
                  >
                    {t('analysisHistory.geneticTest')}
                  </Text>
                  <Text
                    type="secondary"
                    className="last-updated"
                    style={{ fontSize: width < 800 ? '10px' : '16px' }}
                  >
                    {t('analysisHistory.lastUpdated')}
                    {geneticTestData.date ||
                      t('analysisHistory.dateNotSpecified')}
                  </Text>
                  <PrimaryButton
                    onClick={sendGeneticTestData}
                    className="edit-button"
                    style={{ fontSize: width < 800 ? '10px' : '16px' }}
                  >
                    {t('analysisHistory.edit')}
                  </PrimaryButton>
                  <SecondaryButton
                    onClick={() => handleDeleteTest('genetic')}
                    className="delete-button"
                    style={{ fontSize: width < 800 ? '10px' : '16px' }}
                  >
                    {t('analysisHistory.delete')}
                  </SecondaryButton>
                </div>
                <Divider className="test-divider" />
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
