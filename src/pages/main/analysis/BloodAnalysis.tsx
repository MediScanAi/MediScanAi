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
import BloodMultic from '../../../assets/photos/BloodMultic.png';
import Done from '../../../assets/photos/Done.webp';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import ChartGoingDown from '../../../assets/photos/ChartGoingDown.webp';
import Syringe from '../../../assets/photos/Syringe.webp';
import MedKit from '../../../assets/photos/MedKit.webp';
import Cholesterol from '../../../assets/photos/Cholesterol.webp';
import Chocolate from '../../../assets/photos/Chocolate.webp';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import {useTranslation} from "react-i18next";

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

interface BloodTestFormValues {
  hemoglobin: number | null;
  wbc: number | null;
  rbc: number | null;
  platelets: number | null;
  glucose: number | null;
  cholesterol: number | null;
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
  <ResponsiveContainer style={{margin:'0 auto'}} width="90%" height={300}>
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

const { Title, Text } = Typography;

const BloodAnalysis: React.FC = () => {
  const { t } = useTranslation('global');
  const navigate = useNavigate();
  const bloodTestData = useAppSelector(
      (state) => state.tests.blood
  ) as unknown as BloodTestFormValues;
  const [width, setWidth] = useState(window.innerWidth);
  const language = localStorage.getItem('language')
  const [expandedWarnings, setExpandedWarnings] = useState<{
    [key: string]: boolean;
  }>({});

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleWarning = (warning: string) => {
    setExpandedWarnings((prev) => ({
      ...prev,
      [warning]: !prev[warning],
    }));
  };

  const getDiseaseRisks = (data: BloodTestFormValues): string[] => {
    const risks: string[] = [];
    const conditions = t('bloodAnalysis.warnings.conditions', { returnObjects: true });

    // Hemoglobin checks
    if (data.hemoglobin !== undefined && data.hemoglobin !== null) {
      if (data.hemoglobin < 12) risks.push(conditions.lowHemoglobin);
      if (data.hemoglobin > 17.5) risks.push(conditions.highHemoglobin);
    }

    // WBC checks
    if (data.wbc !== undefined && data.wbc !== null) {
      if (data.wbc < 4) risks.push(conditions.lowWbc);
      if (data.wbc > 11) risks.push(conditions.highWbc);
    }

    // RBC checks
    if (data.rbc !== undefined && data.rbc !== null) {
      if (data.rbc < 4) risks.push(conditions.lowRbc);
      if (data.rbc > 6.2) risks.push(conditions.highRbc);
    }

    // Platelets checks
    if (data.platelets !== undefined && data.platelets !== null) {
      if (data.platelets < 150) risks.push(conditions.lowPlatelets);
      if (data.platelets > 450) risks.push(conditions.highPlatelets);
    }

    // Glucose checks
    if (data.glucose !== undefined && data.glucose !== null) {
      if (data.glucose < 70) risks.push(conditions.lowGlucose);
      if (data.glucose > 126) risks.push(conditions.highGlucose);
    }

    // Cholesterol checks
    if (data.cholesterol !== undefined && data.cholesterol !== null) {
      if (data.cholesterol > 240) risks.push(conditions.highCholesterol);
    }

    return risks;
  };

  // Get translated content
  const diseaseExplanations = t('bloodAnalysis.warnings.explanations', { returnObjects: true });
  const interestingFacts = t('bloodAnalysis.facts', { returnObjects: true });

  // Chart data preparation
  const chartData: ChartData[] = [
    {
      name: 'Cholesterol',
      value: bloodTestData?.cholesterol || 0,
      color: '#f39c12',
      image: Cholesterol,
    },
    {
      name: 'Glucose',
      value: bloodTestData?.glucose || 0,
      color: '#16a085',
      image: Chocolate,
    },
    {
      name: 'Hemoglobin',
      value: bloodTestData?.hemoglobin || 0,
      color: '#e74c3c',
      image: Syringe,
    },
    {
      name: 'Platelets',
      value: bloodTestData?.platelets || 0,
      color: '#8e44ad',
      image: ChartGoingDown,
    },
    {
      name: 'RBC',
      value: bloodTestData?.rbc || 0,
      color: '#2980b9',
      image: MedKit,
    },
    {
      name: 'WBC',
      value: bloodTestData?.wbc || 0,
      color: '#27ae60',
      image: Done,
    },
  ];

  const handleAIConsultation = () => {
    const warnings = getDiseaseRisks(bloodTestData);
    navigate('/ai-doctor', {
      state: {
        bloodTests: bloodTestData,
        healthWarnings: warnings,
      },
    });
  };

  return (
      <div className="blood-analysis-container">
        {/* Header Section */}
        <Row className="welcome-section" justify="center" style={{ marginTop: -45 }}>
          <Col className="welcome-section-column">
            <Text style={{
              fontSize: width > 768 ? '30px' : '20px',
              marginTop: 50,
              marginLeft: 5,
            }}>
              {t('bloodAnalysis.title')}
            </Text>
            <Title level={1} style={{ fontSize: width > 800 ? language==='hy'?'35px':'50px' : '30px' }}>
              {t('bloodAnalysis.subtitle')}
            </Title>
          </Col>
          <Col>
            <img
                src={BloodMultic}
                alt="blood analysis"
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

        {/* Main Content */}
        {bloodTestData?.cholesterol ? (
            <div>
              {/* Chart Section */}
              <Card  bordered={false} className="chart-card">
                <CustomBarChart data={chartData} />
              </Card>

              {/* Warnings Section */}
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
                <Title level={3} style={{ color: 'rgb(255, 0, 0)', fontFamily: 'Poppins' }}>
                  {t('bloodAnalysis.warnings.title')}
                  <Button
                      type="primary"
                      size="large"
                      style={{ marginLeft: 20 }}
                      onClick={handleAIConsultation}
                  >
                    {t('bloodAnalysis.warnings.analyzeButton')}
                  </Button>
                </Title>

                <ul style={{ paddingLeft: 20 }}>
                  {getDiseaseRisks(bloodTestData).length > 0 ? (
                      getDiseaseRisks(bloodTestData).map((risk, index) => (
                          <li key={index} style={{ fontSize: 16, marginBottom: 8 }}>
                            {risk}
                            {diseaseExplanations[risk] && (
                                <div>
                                  <Button
                                      type="link"
                                      style={{ padding: 0 }}
                                      onClick={() => toggleWarning(risk)}
                                  >
                                    {expandedWarnings[risk]
                                        ? t('bloodAnalysis.warnings.showLess')
                                        : t('bloodAnalysis.warnings.showMore')}
                                  </Button>
                                  {expandedWarnings[risk] && (
                                      <Text type="secondary" style={{ display: 'block', marginTop: 5 }}>
                                        {diseaseExplanations[risk]}
                                      </Text>
                                  )}
                                </div>
                            )}
                          </li>
                      ))
                  ) : (
                      <Text style={{ fontSize: 16 }}>
                        {t('bloodAnalysis.warnings.allGood')}
                      </Text>
                  )}
                </ul>
              </Card>

              {/* Facts Section */}
              <div style={{
                width: '90%',
                margin: '20px auto 40px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                gap: '20px',
              }}>
                {chartData.map((item) => (
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
                      <Row align="middle" justify="center" gutter={16}>
                        <Col>
                          <Title level={2} style={{ color: '#3498db', margin: 0 }}>
                            {item.name}
                          </Title>
                        </Col>
                        <Col>
                          <img
                              src={item.image}
                              alt={item.name}
                              style={{ width: 40, height: 40 }}
                          />
                        </Col>
                      </Row>
                      <div style={{ marginTop: 15 ,}}>
                        {interestingFacts[item.name].map((fact, i) => (
                            <p key={i} style={{ marginBottom: 8 }}>{fact}</p>
                        ))}
                      </div>
                    </Card>
                ))}
              </div>
            </div>
        ) : (
            /* Empty State */
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '50vh'
            }}>
              <Title level={2} style={{ textAlign: 'center' }}>
                {t('bloodAnalysis.noData.title')}
              </Title>
              <Button
                  type="primary"
                  size="large"
                  onClick={() => navigate('/tests-form/blood-test')}
              >
                {t('bloodAnalysis.noData.button')}
              </Button>
            </div>
        )}
      </div>
  );
};

export default BloodAnalysis;
