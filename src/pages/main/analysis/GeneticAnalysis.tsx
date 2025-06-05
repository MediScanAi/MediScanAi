import { Card, Row, Col, Typography, Progress } from 'antd';
import '../../../assets/styles/analysis.css';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import ChartGoingDown from '../../../assets/photos/ChartGoingDown.webp';
import Syringe from '../../../assets/photos/Syringe.webp';
import Bilirubin from '../../../assets/photos/Bilirubin.webp';
import BRCA1 from '../../../assets/photos/BRCA1.webp';
import APOE from '../../../assets/photos/APOE.webp';
import { useEffect } from 'react';
import { useState } from 'react';
import Gen from '../../../assets/photos/Gen.webp';
import type { GeneticTestFormValues } from '../../../app/slices/testSlice';
import { useAppSelector } from '../../../app/hooks';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import PrimaryButton from '../../../components/common/PrimaryButton';
import { useTranslation } from 'react-i18next';

interface ChartData {
  name: string;
  value: number | string;
  color: string;
  image: string;
  key: string;
}

interface Scorecard {
  label: string;
  value: string | null | undefined;
  percent: number;
}

const { Title } = Typography;

function GeneticAnalysis() {
  const { t } = useTranslation('geneticAnalysis');
  const geneticTestData = useAppSelector((state) => state.tests.genetic);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const [width, setWidth] = useState(window.innerWidth);

  const [expandedWarnings, setExpandedWarnings] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleWarning = (warning: string) => {
    setExpandedWarnings((prev) => ({
      ...prev,
      [warning]: !prev[warning],
    }));
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const PieData: ChartData[] = [
    {
      name: t('geneticAnalysis.BRCA1'),
      value:
        geneticTestData?.brca1 === 'positive'
          ? t('geneticTest.positive')
          : t('geneticTest.negative'),
      color: '#f39c12',
      image: BRCA1,
      key: 'BRCA1',
    },
    {
      name: t('geneticAnalysis.BRCA2'),
      value:
        geneticTestData?.brca2 === 'positive'
          ? t('geneticTest.positive')
          : t('geneticTest.negative'),
      color: '#16a085',
      image: Gen,
      key: 'BRCA2',
    },
    {
      name: t('geneticAnalysis.FactorVLeiden'),
      value:
        geneticTestData?.factor_v_leiden === 'positive'
          ? t('geneticTest.positive')
          : t('geneticTest.negative'),
      color: '#e74c3c',
      image: Syringe,
      key: 'Factor V Leiden',
    },
    {
      name: t('geneticAnalysis.APOE'),
      value: geneticTestData?.apoe || '',
      color: '#8e44ad',
      image: APOE,
      key: 'APOE',
    },
    {
      name: t('geneticAnalysis.MTHFR'),
      value: geneticTestData?.mthfr || '',
      color: '#2980b9',
      image: ChartGoingDown,
      key: 'MTHFR',
    },
    {
      name: t('geneticAnalysis.CYP2C19'),
      value: geneticTestData?.cyp2c19 || '',
      color: '#27ae60',
      image: Bilirubin,
      key: 'CYP2C19',
    },
  ];

  const navigate = useNavigate();

  const interestingFacts: { [key: string]: string[] } = {
    BRCA1: [
      t('geneticAnalysis.facts.BRCA1.0'),
      t('geneticAnalysis.facts.BRCA1.1'),
      t('geneticAnalysis.facts.BRCA1.2'),
      t('geneticAnalysis.facts.BRCA1.3'),
      t('geneticAnalysis.facts.BRCA1.4'),
      t('geneticAnalysis.facts.BRCA1.5'),
    ],
    BRCA2: [
      t('geneticAnalysis.facts.BRCA2.0'),
      t('geneticAnalysis.facts.BRCA2.1'),
      t('geneticAnalysis.facts.BRCA2.2'),
      t('geneticAnalysis.facts.BRCA2.3'),
      t('geneticAnalysis.facts.BRCA2.4'),
      t('geneticAnalysis.facts.BRCA2.5'),
    ],
    'Factor V Leiden': [
      t('geneticAnalysis.facts.FactorVLeiden.0'),
      t('geneticAnalysis.facts.FactorVLeiden.1'),
      t('geneticAnalysis.facts.FactorVLeiden.2'),
      t('geneticAnalysis.facts.FactorVLeiden.3'),
      t('geneticAnalysis.facts.FactorVLeiden.4'),
      t('geneticAnalysis.facts.FactorVLeiden.5'),
    ],
    APOE: [
      t('geneticAnalysis.facts.APOE.0'),
      t('geneticAnalysis.facts.APOE.1'),
      t('geneticAnalysis.facts.APOE.2'),
      t('geneticAnalysis.facts.APOE.3'),
      t('geneticAnalysis.facts.APOE.4'),
      t('geneticAnalysis.facts.APOE.5'),
    ],
    MTHFR: [
      t('geneticAnalysis.facts.MTHFR.0'),
      t('geneticAnalysis.facts.MTHFR.1'),
      t('geneticAnalysis.facts.MTHFR.2'),
      t('geneticAnalysis.facts.MTHFR.3'),
      t('geneticAnalysis.facts.MTHFR.4'),
      t('geneticAnalysis.facts.MTHFR.5'),
    ],
    CYP2C19: [
      t('geneticAnalysis.facts.CYP2C19.0'),
      t('geneticAnalysis.facts.CYP2C19.1'),
      t('geneticAnalysis.facts.CYP2C19.2'),
      t('geneticAnalysis.facts.CYP2C19.3'),
      t('geneticAnalysis.facts.CYP2C19.4'),
      t('geneticAnalysis.facts.CYP2C19.5'),
    ],
  };

  const geneticExplanations: { [key: string]: string } = {
    [t('geneticAnalysis.warnings.conditions.brca1Positive')]: t(
      'geneticAnalysis.warnings.explanations.brca1Positive'
    ),
    [t('geneticAnalysis.warnings.conditions.brca2Positive')]: t(
      'geneticAnalysis.warnings.explanations.brca2Positive'
    ),
    [t('geneticAnalysis.warnings.conditions.factorVLeidenPositive')]: t(
      'geneticAnalysis.warnings.explanations.factorVLeidenPositive'
    ),
    [t('geneticAnalysis.warnings.conditions.apoeE4E4')]: t(
      'geneticAnalysis.warnings.explanations.apoeE4E4'
    ),
    [t('geneticAnalysis.warnings.conditions.mthfrHomozygous')]: t(
      'geneticAnalysis.warnings.explanations.mthfrHomozygous'
    ),
    [t('geneticAnalysis.warnings.conditions.cyp2c19PoorMetabolizer')]: t(
      'geneticAnalysis.warnings.explanations.cyp2c19PoorMetabolizer'
    ),
  };

  const getGeneticRisks = (data: GeneticTestFormValues) => {
    const risks: string[] = [];

    if (data.brca1 === 'positive') {
      risks.push(t('geneticAnalysis.warnings.conditions.brca1Positive'));
    }

    if (data.brca2 === 'positive') {
      risks.push(t('geneticAnalysis.warnings.conditions.brca2Positive'));
    }

    if (data.factor_v_leiden === 'positive') {
      risks.push(
        t('geneticAnalysis.warnings.conditions.factorVLeidenPositive')
      );
    }

    if (data.apoe === 'ε4/ε4') {
      risks.push(t('geneticAnalysis.warnings.conditions.apoeE4E4'));
    }

    if (data.mthfr === 'homozygous') {
      risks.push(t('geneticAnalysis.warnings.conditions.mthfrHomozygous'));
    }

    if (data.cyp2c19 === 'categoryIII') {
      risks.push(
        t('geneticAnalysis.warnings.conditions.cyp2c19PoorMetabolizer')
      );
    }

    return risks;
  };

  const scorecards = [
    {
      label: 'BRCA1',
      value:
        geneticTestData?.brca1 === 'positive'
          ? t('geneticAnalysis.geneticTest.positive')
          : t('geneticAnalysis.geneticTest.negative'),
      percent: geneticTestData?.brca1 === 'positive' ? 100 : 0,
    },
    {
      label: 'BRCA2',
      value:
        geneticTestData?.brca2 === 'positive'
          ? t('geneticAnalysis.geneticTest.positive')
          : t('geneticAnalysis.geneticTest.negative'),
      percent: geneticTestData?.brca2 === 'positive' ? 100 : 0,
    },
    {
      label: 'APOE',
      value: geneticTestData?.apoe || '',
      percent:
        geneticTestData?.apoe === 'ε4/ε4'
          ? 0
          : geneticTestData?.apoe === 'ε3/ε4'
            ? 25
            : geneticTestData?.apoe === 'ε3/ε3'
              ? 50
              : geneticTestData?.apoe === 'ε2/ε2'
                ? 75
                : 0,
    },
    {
      label: 'MTHFR',
      value: geneticTestData?.mthfr || '',
      percent:
        geneticTestData?.mthfr === 'homozygous'
          ? 0
          : geneticTestData?.mthfr === 'heterozygous'
            ? 50
            : geneticTestData?.mthfr === 'normal'
              ? 100
              : 0,
    },
    {
      label: 'Factor V Leiden',
      value:
        geneticTestData?.factor_v_leiden === 'positive'
          ? t('geneticAnalysis.geneticTest.positive')
          : t('geneticAnalysis.geneticTest.negative'),
      percent: geneticTestData?.factor_v_leiden === 'positive' ? 100 : 0,
    },
    {
      label: 'CYP2C19',
      value: geneticTestData?.cyp2c19 || '',
      percent:
        geneticTestData?.cyp2c19 === 'categoryI'
          ? 100
          : geneticTestData?.cyp2c19 === 'categoryII'
            ? 50
            : geneticTestData?.cyp2c19 === 'categoryIII'
              ? 0
              : 0,
    },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className={`analysis-page ${isDarkMode ? 'dark' : ''}`}>
      <Row className="welcome-section">
        <Col className="welcome-section-column">
          <Typography
            className={`welcome-text ${isDarkMode ? 'dark' : ''}`}
            style={{
              fontSize: width > 768 ? '30px' : '20px',
            }}
          >
            {t('geneticAnalysis.title')}
          </Typography>
          <Typography
            className={`platform-title ${isDarkMode ? 'dark' : ''}`}
            style={{ fontSize: width > 768 ? '50px' : '30px' }}
          >
            {t('geneticAnalysis.subtitle')}
          </Typography>
        </Col>
        <Col>
          <img
            draggable={false}
            src={Gen}
            alt="platform"
            style={{
              width: width > 768 ? '300px' : '80px',
              height: width > 768 ? '300px' : '80px',
            }}
            className="welcome-image"
          />
        </Col>
      </Row>

      <div>
        {geneticTestData?.brca1 ? (
          <div>
            <Card
              className={`card2-design ${isDarkMode ? 'dark' : ''}`}
              style={{ border: 'none' }}
            >
              <Col
                style={{
                  display: 'flex',
                  flexDirection: width > 768 ? 'row' : 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {scorecards.map((item: Scorecard, idx) => (
                  <Card
                    key={idx}
                    className={`card2-design ${isDarkMode ? 'dark' : ''}`}
                    style={{
                      textAlign: 'center',
                      borderRadius: '15px',
                      border: 'none',
                    }}
                  >
                    <div
                      className={`card2-design-text ${isDarkMode ? 'dark' : ''}`}
                      style={{ marginTop: 10 }}
                    >
                      {item.value}
                    </div>
                    <Progress
                      type="circle"
                      percent={Math.min(item.percent, 100)}
                      format={() => (
                        <span
                          className={`card2-design-text ${isDarkMode ? 'dark' : ''}`}
                          style={{ fontSize: 15 }}
                        >
                          {item.value || 'N/A'}
                        </span>
                      )}
                      strokeWidth={7}
                    />
                    <div
                      className={`card2-design-text ${isDarkMode ? 'dark' : ''}`}
                      style={{ marginTop: 30 }}
                    >
                      {item.label}
                    </div>
                  </Card>
                ))}
              </Col>
            </Card>

            <Card className={`warning-section ${isDarkMode ? 'dark' : ''}`}>
              <Title
                level={3}
                style={{ color: 'rgb(255, 0, 0)', fontFamily: 'Poppins' }}
              >
                {t('geneticAnalysis.warnings.title')}
                <PrimaryButton
                  style={{ marginLeft: 20 }}
                  onClick={() => {
                    const warnings = getGeneticRisks(
                      geneticTestData as GeneticTestFormValues
                    );
                    navigate('/ai-doctor', {
                      state: {
                        geneticTests: geneticTestData,
                        geneticWarnings: warnings,
                      },
                    });
                  }}
                >
                  {t('geneticAnalysis.warnings.analyzeButton')}
                </PrimaryButton>
              </Title>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {getGeneticRisks(geneticTestData as GeneticTestFormValues)
                  .length > 0 ? (
                  getGeneticRisks(geneticTestData as GeneticTestFormValues).map(
                    (risk, index) => (
                      <li
                        className={`warning-section-text ${isDarkMode ? 'dark' : ''}`}
                        key={index}
                        style={{ fontSize: 16, marginBottom: 8 }}
                      >
                        {risk}
                        {geneticExplanations[risk] && (
                          <div>
                            <Button
                              type="link"
                              style={{ padding: 0, color: '#3498db' }}
                              onClick={() => toggleWarning(risk)}
                            >
                              {expandedWarnings[risk]
                                ? t('geneticAnalysis.warnings.showLess')
                                : t('geneticAnalysis.warnings.showMore')}
                            </Button>
                            {expandedWarnings[risk] && (
                              <p
                                className={`warning-section-text ${isDarkMode ? 'dark' : ''}`}
                                style={{
                                  marginTop: 5,
                                  fontSize: 14,
                                  color: '#555',
                                }}
                              >
                                {geneticExplanations[risk]}
                              </p>
                            )}
                          </div>
                        )}
                      </li>
                    )
                  )
                ) : (
                  <p
                    className={`warning-section-text ${isDarkMode ? 'dark' : ''}`}
                    style={{ fontSize: 16 }}
                  >
                    {t('geneticAnalysis.warnings.allGood')}
                  </p>
                )}
              </ul>
            </Card>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Title
              className={`platform-title ${isDarkMode ? 'dark' : ''}`}
              style={{ textAlign: 'center' }}
              level={2}
            >
              {t('geneticAnalysis.noData.title')}
            </Title>
            <PrimaryButton onClick={() => navigate('/tests-form/genetic-test')}>
              {t('geneticAnalysis.noData.button')}
            </PrimaryButton>
          </div>
        )}
      </div>

      <div
        style={{
          width: '90%',
          margin: '20px auto 40px auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '20px',
        }}
      >
        {PieData.map((item) => (
          <Card
            key={item.name}
            className={`interesting-card ${isDarkMode ? 'dark' : ''}`}
            style={{
              flex: width > 900 ? '0 1 calc(50% - 10px)' : '1 1 100%',
            }}
          >
            <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Title
                level={2}
                className={`interesting-card-title ${isDarkMode ? 'dark' : ''}`}
              >
                {item.name}
              </Title>
              <img
                draggable={false}
                style={{
                  width: '16%',
                  height: '16%',
                }}
                src={item.image}
              />
            </Row>
            <p
              className={`interesting-card-text ${isDarkMode ? 'dark' : ''}`}
              style={{ margin: 0, fontSize: 16 }}
            >
              {interestingFacts[item.key]}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default GeneticAnalysis;
