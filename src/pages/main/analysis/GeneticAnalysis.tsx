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
import { useTranslation } from 'react-i18next';

interface ChartData {
  name: string;
  value: number | string;
  color: string;
  image: string;
}

interface Scorecard {
  label: string;
  value: string | null | undefined;
  percent: number;
}

const { Title } = Typography;

function GeneticAnalysis() {
  const { t } = useTranslation();
  const geneticTestData = useAppSelector((state) => state.tests.genetic);

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
      name: 'BRCA1',
      value: geneticTestData?.brca1 || 0,
      color: '#f39c12',
      image: BRCA1,
    },
    {
      name: 'BRCA2',
      value: geneticTestData?.brca2 || 0,
      color: '#16a085',
      image: Gen,
    },
    {
      name: 'Factor V Leiden',
      value: geneticTestData?.factor_v_leiden || 0,
      color: '#e74c3c',
      image: Syringe,
    },
    {
      name: 'APOE',
      value: geneticTestData?.apoe || 0,
      color: '#8e44ad',
      image: APOE,
    },
    {
      name: 'MTHFR',
      value: geneticTestData?.mthfr || 0,
      color: '#2980b9',
      image: ChartGoingDown,
    },
    {
      name: 'CYP2C19',
      value: geneticTestData?.cyp2c19 || 0,
      color: '#27ae60',
      image: Bilirubin,
    },
  ];

  const navigate = useNavigate();

  const interestingFacts: { [key: string]: string[] } = {
    BRCA1: [
      t('genetic.brca1.fact1'),
      t('genetic.brca1.fact2'),
      t('genetic.brca1.fact3'),
      t('genetic.brca1.fact4'),
      t('genetic.brca1.fact5'),
      t('genetic.brca1.fact6'),
    ],
    BRCA2: [
      t('genetic.brca2.fact1'),
      t('genetic.brca2.fact2'),
      t('genetic.brca2.fact3'),
      t('genetic.brca2.fact4'),
      t('genetic.brca2.fact5'),
      t('genetic.brca2.fact6'),
    ],
    'Factor V Leiden': [
      t('genetic.factorV.fact1'),
      t('genetic.factorV.fact2'),
      t('genetic.factorV.fact3'),
      t('genetic.factorV.fact4'),
      t('genetic.factorV.fact5'),
      t('genetic.factorV.fact6'),
    ],
    APOE: [
      t('genetic.apoe.fact1'),
      t('genetic.apoe.fact2'),
      t('genetic.apoe.fact3'),
      t('genetic.apoe.fact4'),
      t('genetic.apoe.fact5'),
      t('genetic.apoe.fact6'),
    ],
    MTHFR: [
      t('genetic.mthfr.fact1'),
      t('genetic.mthfr.fact2'),
      t('genetic.mthfr.fact3'),
      t('genetic.mthfr.fact4'),
      t('genetic.mthfr.fact5'),
      t('genetic.mthfr.fact6'),
    ],
    CYP2C19: [
      t('genetic.cyp2c19.fact1'),
      t('genetic.cyp2c19.fact2'),
      t('genetic.cyp2c19.fact3'),
      t('genetic.cyp2c19.fact4'),
      t('genetic.cyp2c19.fact5'),
      t('genetic.cyp2c19.fact6'),
    ],
  };

  const geneticExplanations: { [key: string]: string } = {
    '⚠️ BRCA1 Positive — Increased Cancer Risk': t('genetic.warnings.brca1'),
    '⚠️ BRCA2 Positive — Increased Cancer Risk': t('genetic.warnings.brca2'),
    '⚠️ Factor V Leiden Positive — Clotting Risk': t('genetic.warnings.factorV'),
    "⚠️ APOE ε4/ε4 — High Alzheimer's Risk": t('genetic.warnings.apoe'),
    '⚠️ MTHFR Homozygous — Folate Metabolism Impact': t('genetic.warnings.mthfr'),
    '⚠️ CYP2C19 Poor Metabolizer — Drug Response Altered': t('genetic.warnings.cyp2c19'),
  };

  const getGeneticRisks = (data: GeneticTestFormValues) => {
    const risks: string[] = [];

    if (data.brca1 === 'positive') {
      risks.push(t('genetic.riskTitles.brca1'));
    }

    if (data.brca2 === 'positive') {
      risks.push(t('genetic.riskTitles.brca2'));
    }

    if (data.factor_v_leiden === 'positive') {
      risks.push(t('genetic.riskTitles.factorV'));
    }

    if (data.apoe === 'ε4/ε4') {
      risks.push(t('genetic.riskTitles.apoe'));
    }

    if (data.mthfr === 'Homozygous') {
      risks.push(t('genetic.riskTitles.mthfr'));
    }

    if (data.cyp2c19 === 'Category III') {
      risks.push(t('genetic.riskTitles.cyp2c19'));
    }

    return risks;
  };

  const scorecards = [
    {
      label: 'BRCA1',
      value: geneticTestData?.brca1,
      percent: geneticTestData?.brca1 === 'positive' ? 100 : 0,
    },
    {
      label: 'BRCA2',
      value: geneticTestData?.brca2,
      percent: geneticTestData?.brca2 === 'positive' ? 100 : 0,
    },
    {
      label: 'APOE',
      value: geneticTestData?.apoe,
      percent:
          geneticTestData?.apoe === 'E1/ε1'
              ? 100
              : geneticTestData?.apoe === 'E2/ε2'
                  ? 50
                  : geneticTestData?.apoe === 'ε3/ε3'
                      ? 25
                      : geneticTestData?.apoe === 'E4/ε4'
                          ? 0
                          : 0,
    },
    {
      label: 'MTHFR',
      value: geneticTestData?.mthfr,
      percent:
          geneticTestData?.mthfr === 'Homozygous'
              ? 0
              : geneticTestData?.mthfr === 'Heterozygous'
                  ? 50
                  : geneticTestData?.mthfr === 'Normal'
                      ? 100
                      : 0,
    },
    {
      label: 'Factor V Leiden',
      value: geneticTestData?.factor_v_leiden,
      percent: geneticTestData?.factor_v_leiden === 'positive' ? 100 : 0,
    },
    {
      label: 'CYP2C19',
      value: geneticTestData?.cyp2c19,
      percent:
          geneticTestData?.cyp2c19 === 'Category I'
              ? 100
              : geneticTestData?.cyp2c19 === 'Category II'
                  ? 50
                  : geneticTestData?.cyp2c19 === 'Category III'
                      ? 0
                      : 0,
    },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
      <div>
        <Row
            className="welcome-section"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: -45,
            }}
        >
          <Col className="welcome-section-column">
            <Typography
                className="welcome-text"
                style={{
                  fontSize: width > 768 ? '30px' : '20px',
                  marginTop: 50,
                  marginLeft: 5,
                }}
            >
              {t('genetic.title')}
            </Typography>
            <Typography
                className="platform-title"
                style={{ fontSize: width > 768 ? '50px' : '30px' }}
            >
              {t('genetic.subtitle')}
            </Typography>
          </Col>
          <Col>
            <img
                src={Gen}
                alt="platform"
                style={{
                  marginBottom: -50,
                  width: width > 768 ? '300px' : '80px',
                  height: width > 768 ? '300px' : '80px',
                  objectFit: 'cover',
                  borderRadius: 15,
                }}
            />
          </Col>
        </Row>

        <div>
          {geneticTestData?.brca1 ? (
              <div>
                <Card className="card2-design" style={{ border: 'none' }}>
                  <Col className="card2-col-design">
                    <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          marginBottom: 20,
                        }}
                    ></div>
                  </Col>
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
                            style={{
                              textAlign: 'center',
                              borderRadius: '15px',
                              border: 'none',
                            }}
                        >
                          <div style={{ marginTop: 10 }}>{item.value}</div>
                          <Progress
                              type="circle"
                              percent={Math.min(item.percent, 100)}
                              strokeWidth={7}
                          />
                          <div style={{ marginTop: 30 }}>{item.label}</div>
                        </Card>
                    ))}
                  </Col>
                </Card>

                <Card
                    style={{
                      margin: '20px auto',
                      width: '90%',
                      backgroundColor: '#fffbe6',
                      border: '1px solid #faad14',
                      borderRadius: 10,
                      padding: 16,
                    }}
                >
                  <Title
                      level={3}
                      style={{ color: 'rgb(255, 0, 0)', fontFamily: 'Poppins' }}
                  >
                    {t('genetic.warnings.title')}
                    <Button
                        className="consult-button"
                        type="primary"
                        size="large"
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
                      {t('genetic.analyzeButton')}
                    </Button>
                  </Title>
                  <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {getGeneticRisks(geneticTestData as GeneticTestFormValues)
                        .length > 0 ? (
                        getGeneticRisks(geneticTestData as GeneticTestFormValues).map(
                            (risk, index) => (
                                <li key={index} style={{ fontSize: 16, marginBottom: 8 }}>
                                  {risk}
                                  {geneticExplanations[risk] && (
                                      <div>
                                        <Button
                                            type="link"
                                            style={{ padding: 0 }}
                                            onClick={() => toggleWarning(risk)}
                                        >
                                          {expandedWarnings[risk]
                                              ? t('genetic.showLess')
                                              : t('genetic.showMore')}
                                        </Button>
                                        {expandedWarnings[risk] && (
                                            <p
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
                        <p style={{ fontSize: 16 }}>
                          {t('genetic.allNormal')}
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
                <Title style={{ textAlign: 'center' }} level={2}>
                  {t('genetic.noDataMessage')}
                </Title>
                <Button
                    className="consult-button"
                    type="primary"
                    size="large"
                    onClick={() => navigate('/tests-form/genetic-test')}
                >
                  {t('genetic.fillTestButton')}
                </Button>
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
                  style={{
                    flex: width > 900 ? '0 1 calc(50% - 10px)' : '1 1 100%',
                    backgroundColor: 'white',
                    padding: 20,
                    borderRadius: 10,
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                  }}
              >
                <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Title
                      level={2}
                      style={{
                        color: '#3498db',
                        fontFamily: 'Poppins',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                  >
                    {item.name}
                  </Title>
                  <img
                      style={{
                        width: '16%',
                        height: '16%',
                      }}
                      src={item.image}
                  />
                </Row>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {interestingFacts[item.name].map((fact, index) => (
                      <li key={index} style={{ fontSize: 16, marginBottom: 8 }}>
                        {fact}
                      </li>
                  ))}
                </ul>
              </Card>
          ))}
        </div>
      </div>
  );
}

export default GeneticAnalysis;