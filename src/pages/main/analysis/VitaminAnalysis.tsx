import { Card, Row, Col, Typography } from 'antd';
import {
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  XAxis,
  YAxis,
  Bar,
} from 'recharts';
import '../../../assets/styles/analysis.css';
import type { VitaminTestFormValues } from '../../../app/slices/testSlice';
import Drugs from '../../../assets/photos/Drugs.webp';
import VitaminK from '../../../assets/photos/VitaminK.webp';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Apple from '../../../assets/photos/Apple.webp';
import Cholesterol from '../../../assets/photos/Cholesterol.webp';
import Cow from '../../../assets/photos/Cow.webp';
import Protein from '../../../assets/photos/Protein.webp';
import PopCorn from '../../../assets/photos/PopCorn.webp';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { useTranslation } from 'react-i18next';

interface ChartData {
  name: string;
  value: number;
  color: string;
  image: string;
}

interface CustomTooltipProps {
  active: boolean;
  payload: Array<{ color: string; name: string; value: string }>;
}

interface LegendPayload {
  color: string;
  value: string;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
        <div
            style={{ background: '#fff', padding: 10, border: '1px solid #ccc' }}
        >
          <p style={{ margin: 0, color: item.color }}>{item.name}</p>
          <p style={{ margin: 0 }}>
            <b>Value:</b> {item.value}
          </p>
        </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: { payload: LegendPayload[] }) => (
    <ul style={{ display: 'flex', gap: 20, listStyle: 'none', paddingLeft: 0 }}>
      {payload.map((entry, index: number) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            ● {entry.value}
          </li>
      ))}
    </ul>
);

const CustomBarChart = ({ data }: { data: ChartData[] }) => (
    <ResponsiveContainer width="90%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00c6ff" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#0072ff" stopOpacity={0.8} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip active={false} payload={[]} />} />
        <Legend content={<CustomLegend payload={[]} />} />
        <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="url(#barGradient)">
          {data.map((entry, index) => (
              <Cell key={index} fill={entry.color || 'url(#barGradient)'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
);

const { Title } = Typography;

function VitaminAnalysis() {
  const { t } = useTranslation(['vitaminAnalysis']);
  const vitaminTestData = useAppSelector((state) => state.tests.vitamin);

  const [width, setWidth] = useState(window.innerWidth);
  const [expandedWarnings, setExpandedWarnings] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleWarning = (warning: string) => {
    setExpandedWarnings((prev) => ({
      ...prev,
      [warning]: !prev[warning],
    }));
  };

  const getVitaminRisks = (data: VitaminTestFormValues) => {
    const risks: string[] = [];
    const conditions = t('vitaminAnalysis.warnings.conditions', { returnObjects: true });
    if (data.vitaminA !== undefined && data.vitaminA !== null) {
      if (data.vitaminA < 0.02) risks.push(conditions.vitaminA.low);
      if (data.vitaminA > 0.05) risks.push(conditions.vitaminA.high);
    }

    if (data.vitaminB12 !== undefined && data.vitaminB12 !== null) {
      if (data.vitaminB12 < 200) risks.push(conditions.vitaminB12.low);
      if (data.vitaminB12 > 900) risks.push(conditions.vitaminB12.high);
    }

    if (data.vitaminC !== undefined && data.vitaminC !== null) {
      if (data.vitaminC < 0.4) risks.push(conditions.vitaminC.low);
      if (data.vitaminC > 2.0) risks.push(conditions.vitaminC.high);
    }

    if (data.vitaminD !== undefined && data.vitaminD !== null) {
      if (data.vitaminD < 20) risks.push(conditions.vitaminD.low);
      if (data.vitaminD > 100) risks.push(conditions.vitaminD.high);
    }

    if (data.vitaminE !== undefined && data.vitaminE !== null) {
      if (data.vitaminE < 5) risks.push(conditions.vitaminE.low);
      if (data.vitaminE > 20) risks.push(conditions.vitaminE.high);
    }

    if (data.vitaminK !== undefined && data.vitaminK !== null) {
      if (data.vitaminK < 0.1) risks.push(conditions.vitaminK.low);
      if (data.vitaminK > 2.5) risks.push(conditions.vitaminK.high);
    }

    return risks;
  };

  const PieData: ChartData[] = [
    {
      name: t('vitaminAnalysis.parameters.vitaminA'),
      value: vitaminTestData?.vitaminA || 0,
      color: '#f39c12',
      image: Cholesterol,
    },
    {
      name: t('vitaminAnalysis.parameters.vitaminB12'),
      value: vitaminTestData?.vitaminB12 || 0,
      color: '#16a085',
      image: Cow,
    },
    {
      name: t('vitaminAnalysis.parameters.vitaminC'),
      value: vitaminTestData?.vitaminC || 0,
      color: '#e74c3c',
      image: Apple,
    },
    {
      name: t('vitaminAnalysis.parameters.vitaminD'),
      value: vitaminTestData?.vitaminD || 0,
      color: '#8e44ad',
      image: Protein,
    },
    {
      name: t('vitaminAnalysis.parameters.vitaminE'),
      value: vitaminTestData?.vitaminE || 0,
      color: '#2980b9',
      image: PopCorn,
    },
    {
      name: t('vitaminAnalysis.parameters.vitaminK'),
      value: vitaminTestData?.vitaminK || 0,
      color: '#27ae60',
      image: VitaminK,
    },
  ];

  const BarData: ChartData[] = [...PieData];

  const interestingFacts = t('vitaminAnalysis.interestingFacts', {
    returnObjects: true
  }) as Record<string, string[]>;

  const navigate = useNavigate();

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
              {t('vitaminAnalysis.title')}
            </Typography>
            <Typography
                className="platform-title"
                style={{ fontSize: width > 768 ? '50px' : '30px' }}
            >
              {t('vitaminAnalysis.subtitle')}
            </Typography>
          </Col>
          <Col>
            <img
                src={Drugs}
                alt="platform"
                style={{
                  marginBottom: -50,
                  width: width > 768 ? '230px' : '80px',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 15,
                }}
            />
          </Col>
        </Row>

        <div>
          {vitaminTestData?.vitaminA ? (
              <>
                <Card className="card2-design" style={{ border: 'none' }}>
                  <Col className="card2-col-design">
                    <div
                        style={{ display: 'flex', justifyContent: 'center' }}
                    ></div>
                  </Col>
                  <Col
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                  >
                    <CustomBarChart data={BarData} />
                  </Col>
                </Card>

                {vitaminTestData.vitaminA && (
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
                        {t('vitaminAnalysis.warnings.title')}
                        <Button
                            className="consult-button"
                            type="primary"
                            size="large"
                            style={{ marginLeft: 20 }}
                            onClick={() => {
                              const warnings = getVitaminRisks(
                                  vitaminTestData as VitaminTestFormValues
                              );
                              navigate('/ai-doctor', {
                                state: {
                                  vitaminTests: vitaminTestData,
                                  vitaminWarnings: warnings,
                                },
                              });
                            }}
                        >
                          {t('vitaminAnalysis.warnings.analyzeButton')}
                        </Button>
                      </Title>
                      <ul style={{ paddingLeft: 20 }}>
                        {getVitaminRisks(vitaminTestData as VitaminTestFormValues)
                            .length > 0 ? (
                            getVitaminRisks(
                                vitaminTestData as VitaminTestFormValues
                            ).map((risk, index) => {
                              let riskKey = risk.split('—')[0].split(' ');
                              riskKey.shift();
                              riskKey.shift();
                              riskKey = riskKey.join('')
                              return (
                                  <li key={index} style={{ fontSize: 16, marginBottom: 8 }}>
                                    {risk}
                                    <div>
                                      <Button
                                          type="link"
                                          style={{ padding: 0 }}
                                          onClick={() => toggleWarning(riskKey)}
                                      >
                                        {expandedWarnings[riskKey]
                                            ? t('vitaminAnalysis.warnings.showLess')
                                            : t('vitaminAnalysis.warnings.showMore')}
                                      </Button>
                                      {expandedWarnings[riskKey] && (
                                          <p
                                              style={{
                                                marginTop: 5,
                                                fontSize: 14,
                                                color: '#555',
                                              }}
                                          >
                                            {t(`vitaminAnalysis.warnings.explanations.${riskKey.replace(' ', '')}`)}
                                          </p>
                                      )}
                                    </div>
                                  </li>
                              );
                            })
                        ) : (
                            <p style={{ fontSize: 16 }}>
                              {t('vitaminAnalysis.warnings.allGood')}
                            </p>
                        )}
                      </ul>
                    </Card>
                )}
              </>
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
                <Title style={{ textAlign: 'center' }} level={width > 768 ? 2 : 4}>
                  {t('vitaminAnalysis.noData.title')}
                </Title>
                <Button
                    className="consult-button"
                    type="primary"
                    size="large"
                    onClick={() => navigate('/tests-form/vitamin-test')}
                >
                  {t('vitaminAnalysis.noData.button')}
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
                      alt={item.name}
                  />
                </Row>
                <p style={{ margin: 0, fontSize: 16 }}>
                  {interestingFacts[item.name.replace(' ', '')]?.join('\n')}
                </p>
              </Card>
          ))}
        </div>
      </div>
  );
}

export default VitaminAnalysis;